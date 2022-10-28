import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnAutocompleteOptions } from './gln-autocomplete-options.interface';

import { GlnAutocompleteConfig } from './gln-autocomplete-config.interface';
import { GlnAutocompletePosition, GlnAutocompletePositionUtil } from './gln-autocomplete.interface';
import { GlnAutocompletePanelConfig } from './gln-autocomplete-panel.directive';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';
import { GlnOptionsPanel } from '../gln-option/gln-options-panel.interface';

let uniqueIdCounter = 0;

export const GLN_AUTOCOMPLETE_CONFIG = new InjectionToken<GlnAutocompleteConfig>('GLN_AUTOCOMPLETE_CONFIG');

@Component({
  selector: 'gln-autocomplete',
  exportAs: 'glnAutocomplete',
  templateUrl: './gln-autocomplete.component.html',
  styleUrls: ['./gln-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnAutocompleteComponent }],
})
export class GlnAutocompleteComponent implements OnChanges, OnInit, GlnOptionParent, GlnAutocompleteOptions {
  @Input()
  public id = `glnac-${uniqueIdCounter++}`;
  @Input()
  public config: GlnAutocompleteConfig | null | undefined;

  @Input()
  /** Flag for displaying a "checkbox" for each option. (only for isMultiple) */
  public isCheckmark: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = '';
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public visibleSize: number = 0;

  @Input()
  public wdOrigin: string | null | undefined;

  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  // @Output()
  // readonly selected: EventEmitter<{ value: unknown | null; values: unknown[]; change: GlnSelectionChange<GlnOptionComponent> }> =
  //   new EventEmitter();

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;
  @ViewChild('panel', { read: ElementRef<HTMLElement>, static: true })
  public panel: ElementRef<HTMLElement> | null = null;

  /** List of possible options. */
  @ContentChildren(GlnOptionComponent, { descendants: true })
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnAutocompleteConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public hasPanelAnimation: boolean = false;
  public isOptionsPanelOpen: boolean = false;
  public isWdOrigin: boolean = false; // Binding attribute "wdOrigin".
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public panelClassList: string | string[] | Set<string> | { [key: string]: any } | undefined; // Binding attribute "panelClass"
  public panelConfig: GlnAutocompletePanelConfig | null = null;
  public positionValue: GlnAutocompletePosition = GlnAutocompletePosition.start; // Binding attribute "position" ('start' | 'center' | 'end').
  public visibleSizeValue: number | null = null; // Binding attribute "visibleSize".

  private autocompleteTrigger: GlnAutocompleteTrigger | null = null;
  private optionsPanel: GlnOptionsPanel | null = null;

  constructor(
    // // eslint-disable-next-line @typescript-eslint/ban-types
    // @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    // private ngZone: NgZone,
    @Optional() @Inject(GLN_AUTOCOMPLETE_CONFIG) private rootConfig: GlnAutocompleteConfig | null // @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null, // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any // @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: any
  ) {
    this.currConfig = this.rootConfig || {};
    // this.scrollStrategy = this.scrollStrategyFactory();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-autocomplete', true);
    // window.addEventListener('blur', function () {
    //   console.log(`window.addEventListener(blur)`); // #
    // });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      this.panelClassList = this.panelClass || this.currConfig?.panelClass;
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionValue = GlnAutocompletePositionUtil.create(this.position ?? (this.currConfig.position || null));
    }
    if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null && this.currConfig.visibleSize != null)) {
      this.visibleSizeValue = this.visibleSize || this.currConfig?.visibleSize || null;
    }
    if (changes['wdOrigin']) {
      this.isWdOrigin = !!BooleanUtil.init(this.wdOrigin);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.panelClassList == null) {
      this.panelClassList = this.currConfig?.panelClass;
    }
    if (this.positionValue == null) {
      this.positionValue = GlnAutocompletePositionUtil.create(this.currConfig.position || null);
    }
    if (this.visibleSizeValue == null) {
      this.visibleSizeValue = this.currConfig?.visibleSize || null;
    }
  }

  // ** interface GlnOptionParent - start **

  public optionSelection(optionItem: GlnOptionComponent): void {
    console.log(`optionSelection(); optionItem.value=`, optionItem.value); // #
    Promise.resolve().then(() => {
      if (this.autocompleteTrigger) {
        this.autocompleteTrigger.setValueForInput(String(optionItem.value));
        console.log(`optionSelection(); autocompleteTrigger.setValueForInput(String(optionItem.value));`); // #
        if (this.isOptionsPanelOpen) {
          this.autocompleteTrigger?.setFocus();
          this.close();
        }
      }
    });
  }

  public setOptionsPanel(value: GlnOptionsPanel): void {
    this.optionsPanel = value;
    console.log(`this.optionsPanel ${this.optionsPanel != null ? '!' : ''}=null`); // #
  }

  // ** interface GlnOptionParent - finish **

  // ** interface GlnAutocompleteOptions - start **

  /** A sign that the panel is open. */
  public isPanelOpen = (): boolean => {
    return this.isOptionsPanelOpen;
  };
  /** Open the autocomplete suggestion panel. */
  public openPanel = (autocompleteTrigger: GlnAutocompleteTrigger): void => {
    this.autocompleteTrigger = autocompleteTrigger;
    const originRect: DOMRect | null = this.autocompleteTrigger.getOriginRect();
    if (originRect) {
      this.open(originRect, this.isWdOrigin, this.positionValue, this.visibleSizeValue || 0);
    }
  };
  /** Close the autocomplete suggestion panel. */
  public closePanel = (): void => {
    this.close();
    this.autocompleteTrigger = null;
    this.optionsPanel = null;
  };
  /** Move the option marker by the amount of the offset. */
  public movingMarkedOption = (delta: number): void => {
    this.optionsPanel?.movingMarkedOption(delta);
  };

  // ** interface GlnAutocompleteOptions - finish **

  // ** Public methods **

  /** Open overlay panel. */
  public open(originRect: DOMRect | null, isWdOrigin: boolean, position: GlnAutocompletePosition, visibleSize: number): void {
    if (!this.disabled && originRect != null && !this.isOptionsPanelOpen && this.options.length > 0) {
      this.isOptionsPanelOpen = true;

      // console.log(`Panel();   origin left=${originRect.left} right=${originRect.right} top=${originRect.top} height=${originRect.height}`); // #
      const hostRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      // console.log(`Panel();   host   left=${hostRect.left} right=${hostRect.right} top=${hostRect.top} height=${hostRect.height}`); // #

      // #const maxWidthVal = Number(getComputedStyle(originRef.nativeElement).getPropertyValue('max-width').replace('px', ''));
      // #const maxWidth: number = !isNaN(maxWidthVal) ? maxWidthVal : 0;
      const maxWidth: number = 0; // #

      // this.optionsConfig = { options: this.options, visibleSize };

      this.panelConfig = { hostRect, isWdOrigin, maxWidth, options: this.options, originRect, position, visibleSize };
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Closes the panel and focuses the main element. */
  public close(): void {
    this.isOptionsPanelOpen = false;
    this.changeDetectorRef.markForCheck();
  }

  /** Callback when the panel is attached. */
  /*public attached = (elem: ElementRef<HTMLElement>, position: GlnAutocompletePosition, origWidth: number | null, wdOrigin: boolean): void => {
    console.log(`attached(); elem=`, elem); // #
    if (origWidth != null) {
      if (!wdOrigin) {
        if (position === GlnAutocompletePosition.end) {
          this.panelLeft = null;
          this.panelRight = -origWidth;
        } else if (position === GlnAutocompletePosition.center) {
          console.log(``); // #
        }
        this.changeDetectorRef.markForCheck(); // ?
      }
    }
  };*/

  /** Callback when the panel is detached. */
  /*public detached = (elem: ElementRef<HTMLElement>): void => {
    console.log(`detached(); elem=`, elem); // #
    this.originRef = null;
    this.panelLeft = null;
    this.panelMinWidth = null;
    this.panelMaxWidth = null;
    this.panelRight = null;
    this.panelTop = null;
  };*/

  public getPanelClass(
    list: string | string[] | Set<string> | { [key: string]: any } | undefined
  ): string | string[] | Set<string> | { [key: string]: any } {
    return list ?? '';
  }

  public log(text: string): void {
    console.log(text);
  }
  // ** Private methods **
}

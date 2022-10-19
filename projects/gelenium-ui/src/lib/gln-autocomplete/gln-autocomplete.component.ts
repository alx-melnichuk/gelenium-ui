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
import { NumberUtil } from '../_utils/number.util';

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
  /** Position the panel to the right. */
  public isPositionRight: string | boolean | null | undefined;

  @Input()
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = '';

  @Input()
  public wdFull: string | null | undefined;

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
  public isPanelOpen: boolean = false;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public originRef: ElementRef<HTMLElement> | null = null;
  public panelClassList: string | string[] | Set<string> | { [key: string]: any } | undefined; // Binding attribute "panelClass"
  public panelMaxWidth: number | null = null;
  public panelLeft: number | null = null;
  public panelRight: number | null = null;
  public panelTop: number | null = null;
  public panelMinWidth: number | null = null;
  public positionRight: boolean | null = null; // Binding attribute "isPositionRight".

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
    if (changes['isPositionRight'] || (changes['config'] && this.isPositionRight == null && this.currConfig.isPositionRight != null)) {
      this.positionRight = BooleanUtil.init(this.isPositionRight) ?? !!this.currConfig.isPositionRight;
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.panelClassList == null) {
      this.panelClassList = this.currConfig?.panelClass;
    }
    if (this.positionRight == null) {
      this.positionRight = !!this.currConfig.isPositionRight;
    }
  }

  // ** interface GlnOptionParent - start **

  public optionSelection(optionItem: GlnOptionComponent): void {
    console.log(`optionSelection(); optionItem=`, optionItem); // #
    // Promise.resolve().then(() => {
    //   this.selectionOptionElement(optionItem);
    //   if (this.isPanelOpen && !this.isFocused) {
    //     this.isFocused = true;
    //     this.focus();
    //   }
    //   if (!this.multiple) {
    //     this.close();
    //   }
    // });
  }

  // ** interface GlnOptionParent - finish **

  // ** interface GlnAutocompleteOptions - start **

  /** Open the autocomplete suggestion panel. */
  public openPanel = (originRef: ElementRef<HTMLElement>): void => {
    console.log(`openPanel();`); // #
    this.open(originRef, !!BooleanUtil.init(this.wdFull), !!this.positionRight);
  };

  /** Close the autocomplete suggestion panel. */
  public closePanel = (): void => {
    console.log(`closePanel();`); // #
    this.close();
  };

  public toggle(): void {
    this.isPanelOpen = !this.isPanelOpen;
    if (this.isPanelOpen) {
      this.open(this.hostRef, !!BooleanUtil.init(this.wdFull), !!this.positionRight);
    } else {
      this.close();
    }
  }
  // ** interface GlnAutocompleteOptions - finish **

  // ** Public methods **

  /** Open overlay panel. */
  public open(originRef: ElementRef<HTMLElement>, isWdFull: boolean, isPositionRight: boolean): void {
    /*if (!this.disabled && originRef != null && !this.isPanelOpen && this.options.length > 0) {
      this.originRef = originRef;
      this.isPanelOpen = true;
      const panelRect: GlnRect = this.getPanelRect(this.originRef, this.hostRef);
      this.panelHeight = panelRect.height;
      this.panelLeft = panelRect.x;
      this.panelTop = panelRect.y;
      this.panelWidth = panelRect.width;
      this.panelFontSize = Number((getComputedStyle(this.originRef.nativeElement).fontSize || '0').replace('px', ''));
      console.log(`open(); panelTop=${this.panelTop} panelLeft=${this.panelLeft} panelFontSize=${this.panelFontSize}`); // #
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }*/
    if (!this.disabled && originRef != null && !this.isPanelOpen && this.options.length > 0) {
      this.originRef = originRef;
      this.isPanelOpen = true;
      // this.hasPanelAnimation = !this.noAnimation;
      // this.markedOption = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;
      // this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
      const panelRect = this.getPanelRect(this.originRef, this.hostRef);
      // #this.panelHeight = this.panelRect.height;
      // #this.panelLeft = this.panelRect.x;
      // #this.panelTop = this.panelRect.y;
      // #this.panelWidth = this.panelRect.width;
      // this.isFocusAttrOnFrame = false;
      // this.panelFontSize = Number((getComputedStyle(this.originRef.nativeElement).fontSize || '0').replace('px', ''));
      this.panelLeft = panelRect.left;
      this.panelMinWidth = panelRect.width;
      this.panelRight = null;
      this.panelTop = panelRect.top;

      console.log(`open(); panelTop=${this.panelTop} panelLeft=${this.panelLeft} panelRight=${this.panelRight}`); // #

      let maxWidth = Number(getComputedStyle(this.originRef.nativeElement).getPropertyValue('max-width').replace('px', ''));
      this.panelMaxWidth = !isNaN(maxWidth) && maxWidth > 0 ? maxWidth : null;
      if (this.panelMaxWidth === null && isWdFull) {
        this.panelMaxWidth = panelRect.width;
      }

      if (!isWdFull && isPositionRight) {
        this.panelLeft = null;
        this.panelRight = -panelRect.width;
      }

      console.log(`open(); panelMinWidth=${this.panelMinWidth} panelMaxWidth=${this.panelMaxWidth}`); // #

      const borderRadius = panelRect.height > 0 ? NumberUtil.roundTo100(panelRect.height / 10) : null;
      HtmlElemUtil.setProperty(this.hostRef, '--glnacp-border-radius', NumberUtil.str(borderRadius)?.concat('px'));

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Closes the panel and focuses the main element. */
  public close(): void {
    this.originRef = null;
    this.isPanelOpen = false;
    this.changeDetectorRef.markForCheck();
  }
  /** Callback when the panel is attached. */
  public attached = (elem: ElementRef<HTMLElement>): void => {
    console.log(`attached(); elem=`, elem); // #
  };

  /** Callback when the panel is detached. */
  public detached = (elem: ElementRef<HTMLElement>): void => {
    console.log(`detached(); elem=`, elem); // #
    this.originRef = null;
    this.panelLeft = null;
    this.panelMinWidth = null;
    this.panelMaxWidth = null;
    this.panelRight = null;
    this.panelTop = null;
  };

  public getPanelClass(
    list: string | string[] | Set<string> | { [key: string]: any } | undefined
  ): string | string[] | Set<string> | { [key: string]: any } {
    return list ?? '';
  }

  // ** Public methods **

  private getPanelRect(originRef: ElementRef<HTMLElement> | null, hostRef: ElementRef<HTMLElement> | null): DOMRect {
    const result: DOMRect = new DOMRect();
    if (originRef && hostRef) {
      const originRect: DOMRect = originRef.nativeElement.getBoundingClientRect();
      const hostRect: DOMRect = hostRef.nativeElement.getBoundingClientRect();
      result.x = originRect.left - hostRect.left;
      result.y = originRect.bottom - hostRect.top;
      result.width = originRect.width;
      result.height = originRect.height;
    }
    return result;
  }
}

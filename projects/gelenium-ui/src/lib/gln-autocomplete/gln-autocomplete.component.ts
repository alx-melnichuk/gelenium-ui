import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnAutocompleteOptions } from './gln-autocomplete-options.interface';

import { GlnAutocompleteConfig } from './gln-autocomplete.interface';

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
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = '';

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

  isOpen = false;

  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnAutocompleteConfig;
  public hasPanelAnimation: boolean = false;
  public isPanelOpen: boolean = false;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public panelClassList: string | string[] | Set<string> | { [key: string]: any } | undefined; // Binding attribute "panelClass"

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

    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      this.panelClassList = this.panelClass || this.currConfig?.panelClass;
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.panelClassList == null) {
      this.panelClassList = this.currConfig?.panelClass;
    }

    // setTimeout(() => {
    //   this.open();
    // }, 4000);
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
  public openPanel = (): void => {
    console.log(`openPanel();`); // #
    this.open();
  };

  /** Close the autocomplete suggestion panel. */
  public closePanel = (): void => {
    console.log(`closePanel();`); // #
    this.close();
  };

  public toggle(): void {
    this.isPanelOpen = !this.isPanelOpen;
    if (this.isPanelOpen) {
      this.open();
    } else {
      this.close();
    }
  }
  // ** interface GlnAutocompleteOptions - finish **

  // ** Public methods **

  /** Open overlay panel. */
  public open(): void {
    this.isOpen = true;
    this.isPanelOpen = true;
    this.changeDetectorRef.markForCheck();
    // if (!this.disabled && !this.readOnly && !this.isPanelOpen && this.options.length > 0) {
    //   this.isPanelOpen = true;
    //   this.hasPanelAnimation = !this.noAnimation;
    //   this.markedOption = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;
    //   this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
    //   this.isFocusAttrOnFrame = false;
    //   this.triggerFontSize = Number((getComputedStyle(this.triggerRef.nativeElement).fontSize || '0').replace('px', ''));
    //   this.changeDetectorRef.markForCheck();
    //   this.opened.emit();
    // }
  }
  /** Closes the overlay panel and focuses the main element. */
  public close(): void {
    this.isPanelOpen = false;
    this.isOpen = false;
    this.changeDetectorRef.markForCheck();
  }
  /** Callback when the overlay panel is attached. */
  public attach(): void {
    console.log(`attach();`); // #
  }

  public getPanelClass(
    list: string | string[] | Set<string> | { [key: string]: any } | undefined
  ): string | string[] | Set<string> | { [key: string]: any } {
    return list ?? '';
  }
}

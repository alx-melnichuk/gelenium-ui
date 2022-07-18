import { CdkConnectedOverlay, ConnectedPosition, HorizontalConnectionPos, ScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { GlnFrameSizePaddingVerHorRes } from '../directives/gln-frame-size/gln-frame-size-prepare.interface';
import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnBasisFrame } from '../gln-frame/gln-basis-frame.class';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnOptionItem, GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnSelectConfig } from './gln-select-config.interface';
import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select.providers';
import { GlnSelectedOptions } from './gln-selected-options';

let uniqueIdCounter = 0;

export const GLN_SELECT_CONFIG = new InjectionToken<GlnSelectConfig>('GLN_SELECT_CONFIG');

const CSS_CLASS_OVERLAY = 'glnsp-overlay';
const CSS_CLASS_OVERLAY_EVENTS_AUTO = 'gln-overlay-events-auto';
const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const CSS_PROP_TRANSLATE_Y = '--glnspo-translate-y';
const CSS_PROP_BORDER_RADIUS = '--glnspo-border-radius';

@Component({
  selector: 'gln-select',
  exportAs: 'glnSelect',
  templateUrl: './gln-select.component.html',
  styleUrls: ['./gln-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSelectComponent },
    { provide: GLN_OPTION_PARENT, useExisting: GlnSelectComponent },
  ],
})
export class GlnSelectComponent
  extends GlnBasisFrame
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnOptionParent
{
  // @Input() // #public id = `glns-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSelectConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null = null; // GlnFrameSizeType
  @Input()
  public helperText: string | null = null;
  @Input()
  public hoverColor: string | null = null;
  // @Input() // #public isDisabled: string | null = null;
  @Input()
  public isError: string | null = null;
  @Input()
  public isFixRight: string | boolean | null | undefined;
  @Input()
  public isMultiple: string | boolean | null | undefined;
  @Input()
  public isCheckmark: string | null = null;
  @Input()
  public isNoRipple: string | null = null;
  @Input()
  public isReadOnly: string | null = null;
  @Input()
  public isRequired: string | null = null;
  // @Input() // #public isValueInit: string | null = null;
  @Input()
  public label = '';
  @Input()
  public lbShrink: string | null = null;
  // @Input()
  // #public noAnimation: string | boolean | null = null;
  @Input()
  public noElevation: string | null = null;
  @Input()
  public noIcon: string | null = null;
  @Input()
  public noLabel: string | null = null;
  @Input()
  public ornamLfAlign: string | null = null; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null = null; // OrnamAlign
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  @Input()
  public panelClass: string | string[] | Set<string> | { [key: string]: any } = '';
  @Input()
  public visibleSize = -1; // TODO ??
  @Input()
  public tabIndex = 0;
  @Input()
  public wdFull: string | null = null;

  @Input()
  get value(): unknown | unknown[] | null {
    return this.valueData;
  }
  set value(newValue: unknown | unknown[] | null) {
    if (this.multiple && !Array.isArray(newValue)) {
      throw Error('The value must be an array in multi-select mode.');
    }
    if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
      // Get a list of menu items according to an array of values.
      const newOptions = this.selectedOptions.getOptionsByValues(newValue, this.options);
      // Set the selected menu items to the new list of items.
      this.selectedOptions.setSelectionOptions(newOptions, this.options);
      this.updateValueDataAndIsFilledAndValidity(newValue);
      this.changeDetectorRef.markForCheck();
    }
  }
  private valueData: unknown | unknown[] | null;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly selected: EventEmitter<{ value: unknown | null; values: unknown[] }> = new EventEmitter();
  // @Output() // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter();

  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;
  @ViewChild('frameRef', { read: ElementRef, static: true })
  public frameRef!: ElementRef<HTMLElement>;
  /** A scoreboard that displays the selected options. */
  @ViewChild('scoreboardRef', { static: true })
  public scoreboardRef!: ElementRef<HTMLElement>;
  /** A trigger that opens a dropdown list of options. */
  @ViewChild('triggerRef', { static: true })
  public triggerRef!: ElementRef<HTMLElement>;
  /** List of possible options. */
  @ContentChildren(GlnOptionComponent)
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnFrameConfig | null = null;
  // #public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public errors: ValidationErrors | null = null;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public hasPanelAnimation = false;
  public isFocused = false;
  public isFilled = false;
  // #public isNoAnimation: boolean | null = null; // Binding attribute "noAnimation".
  // ##public isOpenPanel = false;
  public isPanelOpen = false;
  // #public isWriteValueInit: boolean | null = null;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public overlayPanelClass: string | string[] = /*this._defaultOptions?.overlayPanelClass ||*/ '';
  public positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];
  public required: boolean | null = null; // Binding attribute "isRequired".
  public selectedOptions: GlnSelectedOptions = new GlnSelectedOptions();
  // #public valueInit: boolean | null = null; // Binding attribute "isValueInit".
  /** Strategy for handling scrolling when the selection panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;

  private fixRight = false;
  private isFocusAttrOnFrame = false;
  private markedOption: GlnOptionComponent | null = null;
  /** Saving the font size of the trigger element. */
  private triggerFontSize = 0;
  /** Saving the frame size of the trigger element. */
  private triggerFrameSize = 0; // BorderRadius = -1;

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    changeDetectorRef: ChangeDetectorRef,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: any
  ) {
    super(uniqueIdCounter++, 'glns', hostRef, renderer, changeDetectorRef);
    this.currConfig = this.rootConfig;
    this.scrollStrategy = this.scrollStrategyFactory();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // ** abstract class GlnBasisFrame -v **
    // if (changes.isDisabled) {
    //   this.disabled = BooleanUtil.init(this.isDisabled);
    //   this.setDisabledState(!!this.disabled);
    // }
    // if (changes.isValueInit) {
    //   this.valueInit = BooleanUtil.init(this.isValueInit);
    // }
    // if (changes.noAnimation) {
    //   this.isNoAnimation = BooleanUtil.init(this.noAnimation != null ? '' + this.noAnimation : null);
    // }
    // ** abstract class GlnBasisFrame -^ **

    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isFixRight) {
      this.fixRight = !!BooleanUtil.init(this.isFixRight != null ? '' + this.isFixRight : null);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'is-fix-right', !!this.isFixRight);
    }
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.init(this.isMultiple != null ? '' + this.isMultiple : null);
    }
    if (changes.isCheckmark) {
      this.checkmark = BooleanUtil.init(this.isCheckmark);
    }
    if (changes.isNoRipple) {
      this.noRipple = BooleanUtil.init(this.isNoRipple);
    }
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngAfterContentInit(): void {
    // Initialized when the value is received via "writeValue()" but the list of menu items is just now.
    if (this.selectedOptions.isEmpty && this.options.length > 0) {
      const newValue = this.valueData;
      this.valueData = undefined;
      this.value = newValue;
    }
    super.ngAfterContentInit();

    const horizontalAlignment: HorizontalConnectionPos = !this.fixRight ? 'start' : 'end';
    this.positions = [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom', offsetY: -5 },
    ];
    this.triggerFontSize = Number((getComputedStyle(this.triggerRef.nativeElement).fontSize || '0').replace('px', ''));
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    this.value = value;
    // Execute the base class method.
    super.writeValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
      super.setDisabledState(isDisabled);
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return (this.errors = !this.disabled && this.required && this.isEmpty() ? { required: true } : null);
  }

  // ** interface Validator - finish **

  // ** interface GlnOptionParent - start **

  public optionSelection(optionItem: GlnOptionItem): void {
    const addOption = optionItem as GlnOptionComponent;
    Promise.resolve().then(() => {
      this.selectionOptionElement(addOption);
      if (!this.multiple) {
        this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  // ** Public methods **

  public trackByOption(index: number, item: GlnOptionComponent): string {
    return item.id;
  }
  /** Determine the value of the css variable "frame size". */
  public frameSizeChange(event: GlnFrameSizePaddingVerHorRes): void {
    this.triggerFrameSize = event.frameSizeValue || 0;
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId)) {
      this.scoreboardRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      const isFocusedEmit = !this.isFocused;
      this.isFocused = true;
      if (isFocusedEmit) {
        this.focused.emit();
      }
    }
  }
  // The selection panel cease working in the following cases:
  // (Cases-B1) Panel is close and on the trigger, click the Tab key.
  // (Cases-B2) Panel is open and mouse click within the panel.
  // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
  // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
  // (Cases-B5) Panel is open and click the Escape key.
  // (Cases-B6) Panel is open and click the Tab key.
  // (Cases-B7) Panel is open and click the Enter key.

  /** Calls the touch callback only when the panel is closed.
   * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
   */
  public doBlur(): void {
    if (!this.disabled) {
      // console.log(``); // TODO del;
      // console.log(`    doBlur() isFocused:=false;`); // TODO del;
      this.isFocused = false;
      if (!this.isPanelOpen) {
        // (Cases-B1) Panel is open and on the trigger, click the Tab key.
        this.blured.emit();
      } else {
        // (Cases-B2) Panel is open and mouse click within the panel.
        // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
        // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
        // For case Cases-B3,B4, let's add the "foc" attribute to force the display of focus.
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      }
    }
  }
  /** Occurs when mouse click events are outside the overlay. */
  public overlayOutsideClick(): void {
    // console.log(``); // TODO del;
    // console.log(`    OutsideClick()`); // TODO del;
    if (!this.disabled) {
      // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
      // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
      this.isFocused = true;
      this.focus();
      this.close();
    }
  }
  /** Occurs when the panel receives input focus. */
  public doFocusOnPanel(): void {
    if (!this.disabled) {
      // (Cases-B2) Panel is open and mouse click within the panel.
      this.isFocused = true;
      this.focus();
    }
  }
  /** Open or close the overlay panel. */
  public toggle(): void {
    if (!this.disabled) {
      if (this.isPanelOpen) {
        this.close();
      } else {
        if (!this.isFocused) {
          this.focus();
        }
        this.open();
      }
    }
  }
  /** Open overlay panel. */
  public open(): void {
    // console.log(``); // TODO del;
    // console.log(`    open() ${this.isPanelOpen ? '' : '!'}isPanelOpen`); // TODO del;
    if (!this.disabled && this.isCanOpen()) {
      // Open a panel with a selection list.
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.isNoAnimation;
      this.markedOption = this.selectedOptions.length > 0 ? this.selectedOptions.items[this.selectedOptions.length - 1] : null;
      this.changeDetectorRef.markForCheck();
      if (this.triggerRect === null) {
        this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
      }
      this.isFocusAttrOnFrame = false;
      this.opened.emit();
    }
  }
  /** Closes the overlay panel and focuses the main element. */
  public close(): void {
    // console.log(``); // TODO del;
    // console.log(`    close() ${this.isPanelOpen ? '' : '!'}isPanelOpen ${this.isFocusAttrOnFrame ? '' : '!'}isFocusAttrOnFrame`); // TODO
    if (this.disabled || !this.isPanelOpen) {
      return;
    }
    if (this.isFocusAttrOnFrame) {
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
    }
    // Close the panel with the selection list.
    this.isPanelOpen = false;
    this.changeDetectorRef.markForCheck();
    this.onTouched();
    this.markedOption?.setMarked(false);
    this.markedOption = null;

    const overlay = this.connectedOverlay?.overlayRef?.overlayElement;
    const overlayRef = HtmlElemUtil.getElementRef(overlay);
    const panelHeight = this.getHeight(HtmlElemUtil.getElementRef(overlay?.children[0]?.children[0] as HTMLElement));
    if (!this.isNoAnimation && overlay && panelHeight > 0) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
    }
    this.closed.emit();
  }
  /** Callback when the overlay panel is attached. */
  public attach(): void {
    const overlay = this.connectedOverlay?.overlayRef?.overlayElement;
    if (!overlay) {
      return;
    }
    // Adding a class to not skip mouse events (pointer-events: auto;).
    const hostElementRef = HtmlElemUtil.getElementRef(this.connectedOverlay.overlayRef.hostElement);
    HtmlElemUtil.setClass(this.renderer, hostElementRef, CSS_CLASS_OVERLAY_EVENTS_AUTO, true);
    // Adding a class so that custom styles can be applied.
    const overlayRef = HtmlElemUtil.getElementRef(overlay);
    HtmlElemUtil.setAttr(this.renderer, overlayRef, CSS_CLASS_OVERLAY, '');

    if (this.triggerFrameSize > 0) {
      const borderRadius = NumberUtil.roundTo100(this.triggerFrameSize / 10);
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_BORDER_RADIUS, NumberUtil.str(borderRadius)?.concat('px'));
    }
    const panelHeight = this.getHeight(HtmlElemUtil.getElementRef(overlay?.children[0]?.children[0] as HTMLElement));
    if (!this.isNoAnimation && panelHeight > 0) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
    }
    // Set the font size for the overlay.
    if (this.triggerFontSize > 0) {
      overlay.style.fontSize = `${this.triggerFontSize}px`;
    }
  }
  /** Handles all keypress events for the component's panel. */
  public scoreboardKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      // // console.log(`    scoreboardKeydown()`, event); // TODO del;
      if (!this.isPanelOpen) {
        // Open the selection panel by pressing the keys: 'up arrow', 'down arrow', 'space' and 'enter'.
        if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(event.key)) {
          event.preventDefault(); // prevents the page from scrolling down when pressing space
          this.open();
        }
      } else {
        if (['ArrowDown', 'ArrowUp', ' ', 'Tab'].includes(event.key)) {
          // Prevents the page from scrolling down when pressing: 'up arrow', 'down arrow', 'space' and 'tab'.
          event.preventDefault();
        }
        switch (event.key) {
          // (Cases-B5) Panel is open and click the Escape key.
          // (Cases-B6) Panel is open and click the Tab key.
          case 'Escape':
          case 'Tab':
            this.close();
            break;
          case 'ArrowDown':
          case 'ArrowUp':
            // Moving the cursor marker.
            this.markedOption = this.movingMarkedOption(event.key === 'ArrowDown', this.markedOption);
            this.changeDetectorRef.markForCheck();
            break;
          // (Cases-B7) Panel is open and click the Enter key.
          case 'Enter':
            if (this.markedOption != null) {
              // Selects the element of the current marker.
              this.selectionOptionElement(this.markedOption);
              // And if not multiple, then closing the panel.
              if (!this.multiple) {
                this.close();
              }
            }
            break;
        }
      }
    }
  }
  public clear(): void {
    if (!this.disabled && !this.isEmpty()) {
      this.selectedOptions.clear();
      // Select the first option with the value null.
      const optionWithValueNull = !this.multiple ? this.selectedOptions.findOptionByValue(null, this.options) : null;
      if (optionWithValueNull) {
        // Set the selected options to the new list of options.
        this.selectedOptions.setSelectionOptions([optionWithValueNull], this.options);
      }
      this.updateValueDataAndIsFilledAndValidity(this.multiple ? [] : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Processing the option selected by the user. */
  public selectionOptionElement(addOption: GlnOptionComponent | null): void {
    const addOptions = addOption !== null ? [addOption] : [];
    if (!this.disabled && addOptions.length > 0) {
      // Get a new list of options.
      const mergeOptions: GlnOptionComponent[] = this.selectedOptions.mergeOptions(!!this.multiple, addOptions, this.options);
      // Set the selected options to the new list of items.
      this.selectedOptions.setSelectionOptions(mergeOptions, this.options);

      const values = this.selectedOptions.getValues();
      const value = values.length > 0 ? values[0] : null;
      this.updateValueDataAndIsFilledAndValidity(this.multiple ? values : value); // TODO del; => this.onChange(this.valueData);
      this.changeDetectorRef.markForCheck();

      this.selected.emit({ value: !this.multiple ? value : null, values: this.multiple ? values : [] });
    }
  }
  public log(text: string): void {
    // console.log(text); // TODO del;
  }
  // ** Proteced methods **

  /** Is it possible to open the panel. */
  protected isCanOpen(): boolean {
    return !this.disabled && !this.isPanelOpen && this.options.length > 0;
  }

  protected getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
  /** Define the "TranslateY" parameter to correctly open or close. */
  protected getTranslateY(triggerRect: DOMRect | null, panelHeight: number, screenHeight: number): string | null {
    let result: string | null = null;
    if (panelHeight > 0 && !!triggerRect && triggerRect.top > 0 && triggerRect.height > 0 && screenHeight > 0) {
      const value = triggerRect.top + triggerRect.height + panelHeight;
      const delta = String(NumberUtil.roundTo100((panelHeight - 0.6 * panelHeight) / 2)).concat('px');
      // console.log(`     delta=${delta}`); // TODO del;
      result = (value < screenHeight ? '-' : '') + delta;
    }
    return result;
  }

  // ** Private API **

  private updateValueDataAndIsFilledAndValidity(newValueData: unknown | unknown[] | null): void {
    this.valueData = newValueData;
    this.isFilled = !this.isEmpty() && this.selectedOptions.items.length > 0;
    // Calling the validation method for the new value.
    this.onChange(this.valueData);
  }

  private movingMarkedOption(isNext: boolean, markedOption: GlnOptionComponent | null): GlnOptionComponent | null {
    let result: GlnOptionComponent | null = null;
    if (this.options.length > 0) {
      let indexOld = -1;
      if (markedOption != null) {
        indexOld = this.options.indexOf(markedOption);
        markedOption.setMarked(false);
      }
      const maxIndex = this.options.length - 1;
      const index = isNext ? (indexOld < maxIndex ? indexOld + 1 : 0) : indexOld > 0 ? indexOld - 1 : maxIndex;
      result = this.options[index];
      result.setMarked(true);
    }
    return result;
  }
}

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
  public isNoCheckmark: string | null = null;
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

  /** The trigger on which the selection opens. */
  @ViewChild('trigger', { static: true })
  public trigger!: ElementRef<HTMLElement>;
  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;
  @ViewChild('mainElementRef', { static: true })
  public mainElementRef: ElementRef<HTMLElement> | null = null;

  @ContentChildren(GlnOptionComponent)
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  public currConfig: GlnFrameConfig | null = null;
  // #public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public errors: ValidationErrors | null = null;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public isFocused = false;
  public isFilled = false;
  // #public isNoAnimation: boolean | null = null; // Binding attribute "noAnimation".
  // ##public isOpenPanel = false;
  // #public isWriteValueInit: boolean | null = null;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public required: boolean | null = null; // Binding attribute "isRequired".
  public selectedOptions: GlnSelectedOptions = new GlnSelectedOptions();
  // #public valueInit: boolean | null = null; // Binding attribute "isValueInit".
  public noCheckmark: boolean | null = null; // Binding attribute "isNoCheckmark". // interfaceGlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent

  public hasPanelAnimation = false;
  public fixRight = false;
  public isPanelOpen = false;
  public overlayPanelClass: string | string[] = /*this._defaultOptions?.overlayPanelClass ||*/ '';
  public positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
  ];
  /** Strategy for handling scrolling when the selection panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** Saving the frame size of the trigger element. */
  public triggerFrameSize = 0; // BorderRadius = -1;
  /** Saving the font size of the trigger element. */
  public triggerFontSize = 0;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;

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
    const overlayScrollStrategyFactory = this.scrollStrategyFactory;
    this.scrollStrategy = overlayScrollStrategyFactory();

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
    if (changes.isNoCheckmark) {
      this.noCheckmark = BooleanUtil.init(this.isNoCheckmark);
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
    });
  }

  // ** interface GlnOptionParent - finish **

  // ** Public methods **

  public setHasPanelAnimation(): void {
    this.hasPanelAnimation = !this.isNoAnimation && !this.isPanelOpen && this.hasPanelAnimation ? false : this.hasPanelAnimation;
    // this.connectedOverlay.connectionPair;
  }
  /** Open or close the overlay panel. */
  public toggle(): void {
    this.isPanelOpen ? this.close() : this.open();
  }
  /** Open overlay panel. */
  public open(): void {
    if (this.isCanOpen()) {
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.isNoAnimation ? true : this.hasPanelAnimation;
      this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
      this.settingPosition(this.fixRight);
      this.triggerFontSize = Number((getComputedStyle(this.trigger.nativeElement).fontSize || '0').replace('px', ''));
      // this._keyManager.withHorizontalOrientation(null);
      // this._highlightCorrectOption();
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }

  /** Closes the overlay panel and focuses the main element. */
  public close(): void {
    if (this.isPanelOpen) {
      const overlayElement = this.connectedOverlay?.overlayRef?.overlayElement;
      // Define the "TranslateY" parameter.
      this.setTranslateY(overlayElement, !!this.isNoAnimation, this.triggerRect);
      this.isPanelOpen = false;
      // this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
      this.changeDetectorRef.markForCheck();
      this.onTouched();
      this.closed.emit();
    }
  }

  /** Callback when the overlay panel is attached. */
  public attach(): void {
    const overlayElement = this.connectedOverlay?.overlayRef?.overlayElement;
    if (!overlayElement) {
      return;
    }
    const overlayElementRef = HtmlElemUtil.getElementRef(overlayElement);
    HtmlElemUtil.setAttr(this.renderer, overlayElementRef, 'glnsp-overlay', '');
    if (this.triggerFrameSize > 0) {
      const borderRadius = NumberUtil.roundTo100(this.triggerFrameSize / 10);
      HtmlElemUtil.setProperty(overlayElementRef, '--glnspo-border-radius', NumberUtil.str(borderRadius)?.concat('px') || null);
    }
    // Define the "TranslateY" parameter.
    this.setTranslateY(overlayElement, !!this.isNoAnimation, this.triggerRect);
    if (this.triggerFontSize > 0) {
      overlayElement.style.fontSize = `${this.triggerFontSize}px`;
    }
  }

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId) && !!this.mainElementRef) {
      this.mainElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }
  /** Calls the touch callback only when the panel is closed.
   * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
   */
  public doBlur(): void {
    this.isFocused = false;
    if (!this.disabled && !this.isPanelOpen) {
      this.changeDetectorRef.markForCheck();
      this.onTouched();
      this.blured.emit();
    }
  }

  // public getFocusMainElem(event: any): void {
  //   console.log(`getFocusMainElem()`); //, ' target=', event.target, ' relatedTarget=', event.relatedTarget, ' event=', event); // TODO del;
  //   if (!this.disabled && !this.isFocused) {
  //     console.log(`getFocusMainElem() isFocused = true;`); //
  //     this.isFocused = true;
  //     this.focusState(this.renderer, this.hostRef, this.isFocused);
  //     this.focused.emit();
  //   }
  // }

  // public lossFocusMainElem(event: any): void {
  //   console.log(`lossFocusMainElem()`); //, ' target=', event.target, ' relatedTarget=', event.relatedTarget, ' event=', event); // TODO del;
  //   if (!this.disabled && this.isFocused) {
  //     if (this.isOpenPanel) {
  //       console.log(`lossFocusMainElem() this.focus();`, ' relatedTarget=', event.relatedTarget, ' event=', event); // TODO del;
  //       if (event.relatedTarget && event.relatedTarget.tagName === 'SELECT') {
  //         setTimeout(() => {
  //           console.log(`lossFocusMainElem(); elem.blur();`);
  //           event.relatedTarget.blur();
  //           this.focus();
  //         }, 0);
  //       } else {
  //         this.focus();
  //       }
  //     } else {
  //       console.log(`lossFocusMainElem() isFocused = false;`); // TODO del;
  //       this.isFocused = false;
  //       this.focusState(this.renderer, this.hostRef, this.isFocused);
  //       this.onTouched();
  //       this.blured.emit();
  //     }
  //   }
  // }

  public trackByOption(index: number, item: GlnOptionComponent): string {
    return item.id;
  }

  // Determine the value of the css variable "frame size".
  public frameChange(event: GlnFrameSizePaddingVerHorRes): void {
    this.triggerFrameSize = event.frameSizeValue || 0;
    // HtmlElemUtil.setProperty(this.hostRef, '--glns-size', NumberUtil.str(event.frameSizeValue)?.concat('px') || null);
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public clear(): void {
    if (!this.disabled && !this.isEmpty()) {
      this.selectedOptions.clear();
      // Select the first option with the value null.
      const itemNull = !this.multiple ? this.selectedOptions.findOptionByValue(null, this.options) : null;
      if (itemNull) {
        // Set the selected options to the new list of items.
        this.selectedOptions.setSelectionOptions([itemNull], this.options);
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

      if (!this.multiple) {
        this.close();
      }
    }
  }

  // ** Proteced methods **

  /** Is it possible to open the panel. */
  protected isCanOpen(): boolean {
    return !this.isPanelOpen && !this.disabled && this.options.length > 0;
  }

  protected getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }

  protected settingPosition(fixRight: boolean): void {
    const horizontalAlignment: HorizontalConnectionPos = !fixRight ? 'start' : 'end';
    const positionPanelDown: ConnectedPosition[] = [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'top' },
    ];
    const positionPanelUp: ConnectedPosition[] = [
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom' },
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'bottom' },
    ];
    this.positions = [...positionPanelDown, ...positionPanelUp];
  }

  protected setTranslateY(overlayElement: HTMLElement | null, isNoAnimation: boolean, triggerRect: DOMRect | null): void {
    const panelElement = overlayElement?.children[0]?.children[0] as HTMLElement;
    if (!isNoAnimation && !!panelElement && !!triggerRect) {
      const panelHeight = Number(getComputedStyle(panelElement).getPropertyValue('height').replace('px', '') || '0');
      let translateY: string | null = null;
      if (panelHeight > 0 && triggerRect.top > 0 && triggerRect.height > 0) {
        const value = NumberUtil.roundTo100(triggerRect.top) + NumberUtil.roundTo100(triggerRect.height) + panelHeight;
        const isOpensDown = value < ScreenUtil.getHeight();
        translateY = isOpensDown ? '-50%' : '50%';
      }
      HtmlElemUtil.setProperty(HtmlElemUtil.getElementRef(overlayElement), '--glnspo-translate-y', translateY);
    }
  }

  // ** Private API **

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  private updateValueDataAndIsFilledAndValidity(newValueData: unknown | unknown[] | null): void {
    this.valueData = newValueData;
    this.isFilled = !this.isEmpty() && this.selectedOptions.items.length > 0;
    // Calling the validation method for the new value.
    this.onChange(this.valueData);
  }
}

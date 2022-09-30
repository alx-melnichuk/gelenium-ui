import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  ControlContainer,
} from '@angular/forms';

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnSwitchChange } from './gln-switch-change.interface';
import { GlnSwitchConfig } from './gln-switch.interface';
import { GlnSwitchPosition, GlnSwitchPositionUtil } from './gln-switch-position.interface';
import { ScreenUtil } from '../_utils/screen.util';
import { HtmlConvertUtil } from '../_utils/html-convert.util';
import { GlnProperties, PropertiesType } from '../_interface/gln-properties';

export const CLS_SW_DISABLED = 'gln-disabled';
export const ATR_SW_DISABLED = 'dis';
export const ATR_SW_HIDE_ANIMATION_INIT = 'hdAnmInit';
export const PRP_SW_PARENT_FONT_SIZE = '--glnsw-pr-font-size';
export const PRP_SW_CONTAINER_PADDING = '--glnsw-container-pd';
export const PRP_SW_WRAP_PADDING = '--glnsw-wrap-pd';
export const PRP_SW_WRAP_SHIFT = '--glnsw-wrap-shift';
export const PRP_SW_TRACK_BORDER_RADIUS = '--glnsw-track-brd-rds';

let uniqueIdCounter = 0;

export const GLN_SWITCH_CONFIG = new InjectionToken<GlnSwitchConfig>('GLN_SWITCH_CONFIG');

@Component({
  selector: 'gln-switch',
  exportAs: 'glnSwitch',
  templateUrl: './gln-switch.component.html',
  styleUrls: ['./gln-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSwitchComponent },
  ],
})
export class GlnSwitchComponent implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator {
  @Input()
  public id = `glnsw-${uniqueIdCounter++}`; // Defined in GlnBaseControl.
  @Input()
  public config: GlnSwitchConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  @Input()
  public isDisabled: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end';
  @Input()
  public tabIndex: number = 0; // Defined in GlnBaseControl.

  @Output()
  readonly change: EventEmitter<GlnSwitchChange> = new EventEmitter();

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public checked: boolean | null = null; // Binding attribute "isChecked".
  public currConfig: GlnSwitchConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseControl.
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isWrapAndThumb: boolean = false;
  public idForInput = this.setIdForInput(this.id);
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple".
  public labelPosition: GlnSwitchPosition | null = null; // Binding attribute "position".
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".

  private isRemoveAttrHideAnimation: boolean = false;
  private properties: GlnProperties;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SWITCH_CONFIG) private rootConfig: GlnSwitchConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    this.properties = new GlnProperties(this.renderer, this.hostRef, this as unknown as PropertiesType);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['id']) {
      this.idForInput = this.setIdForInput(this.id);
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    // Checking and handle the 'isNoAnimation' parameter.
    this.properties.onChangesProperty(changes, 'isNoAnimation', this.currConfig as PropertiesType);
    // Checking and handle the 'isNoRipple' parameter.
    this.properties.onChangesProperty(changes, 'isNoRipple', this.currConfig as PropertiesType);
    // Checking and handle the 'isReadOnly' parameter.
    this.properties.onChangesProperty(changes, 'isReadOnly', this.currConfig as PropertiesType);
    // Checking and handle the 'isRequired' parameter.
    this.properties.onChangesProperty(changes, 'isRequired', this.currConfig as PropertiesType);

    if (changes['isRequired']) {
      this.prepareFormGroup(this.required);
    }
    // Checking and handle the 'position' parameter.
    if (changes['position'] || (changes['config'] && this.position == null)) {
      const positionInp = GlnSwitchPositionUtil.convert(this.position || null);
      this.labelPosition = positionInp || GlnSwitchPositionUtil.create(this.currConfig?.position || null);
      this.settingPosition(this.renderer, this.hostRef, this.labelPosition);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // Set the TagIndex value if the flag 'disabled' is not set.
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', !this.disabled ? '' + this.tabIndex : null);

    this.prepareCssParameters(this.hostRef);

    // If parameter 'isChecked' is defined, then set the initial value.
    const isChecked: boolean | null = BooleanUtil.init(this.isChecked);
    const isCheckedVal = isChecked != null ? isChecked : this.currConfig.isChecked || null;
    if (isCheckedVal != null && isCheckedVal !== this.formControl.value) {
      this.formControl.setValue(isCheckedVal, { emitEvent: false });
      this.settingChecked(this.renderer, this.hostRef, isCheckedVal);
    }
    // Checking and handle the 'isNoAnimation' parameter.
    this.properties.onInitProperty('isNoAnimation', this.currConfig as PropertiesType);
    // Checking and handle the 'isReadOnly' parameter.
    this.properties.onInitProperty('isReadOnly', this.currConfig as PropertiesType);
    // Checking and handle the 'isRequired' parameter.
    this.properties.onInitProperty('isRequired', this.currConfig as PropertiesType);
    if (this.required) {
      this.prepareFormGroup(this.required);
    }
    // Checking and handle the 'isNoRipple' parameter.
    this.properties.onInitProperty('isNoRipple', this.currConfig as PropertiesType);
    // Checking and handle the 'position' parameter.
    if (this.labelPosition == null) {
      this.labelPosition = GlnSwitchPositionUtil.create(this.currConfig?.position || null);
      this.settingPosition(this.renderer, this.hostRef, this.labelPosition);
    }
  }

  public ngAfterContentInit(): void {
    // This allows you to add an element to the DOM without the initial animation.
    this.isWrapAndThumb = true;
    // When using [(ngModel)] parentFormGroup will be null.
    this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    if (this.isRemoveAttrHideAnimation) {
      // Add an attribute that disables animation on initialization.
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_SW_HIDE_ANIMATION_INIT, '');
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(!!value, { emitEvent: false });
      this.settingChecked(this.renderer, this.hostRef, !!value);
      this.changeDetectorRef.markForCheck();
    }
    if (this.isRemoveAttrHideAnimation) {
      this.isRemoveAttrHideAnimation = false;
      Promise.resolve().then(() => {
        // Remove an attribute that disables animation on initialization.
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_SW_HIDE_ANIMATION_INIT, null);
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, CLS_SW_DISABLED, disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_SW_DISABLED, disabled ? '' : null);
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
  }

  // ** Validator - finish **

  // ** GlnNodeInternalValidator - start **

  public addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  public addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addAsyncValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  // ** GlnNodeInternalValidator - finish **

  // ** Public API **

  public doClickByLabel(event: MouseEvent): void {
    if (!this.disabled && !this.readOnly && this.touchRipple) {
      this.touchRipple.touchRipple(event, true);
    }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.disabled && !this.readOnly) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked(this.renderer, this.hostRef, newValue);
      this.onChange(newValue);
      this.change.emit({ checked: newValue, source: this });
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected API **

  // ** Private API **

  private setIdForInput(id: string): string {
    return `${id}-input`;
  }

  private settingChecked(renderer: Renderer2, elem: ElementRef<HTMLElement>, isChecked: boolean): void {
    this.checked = isChecked;
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', isChecked);
    HtmlElemUtil.setAttr(renderer, elem, 'chk', isChecked ? '' : null);
  }

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  private settingPosition(renderer: Renderer2, elem: ElementRef<HTMLElement>, position: GlnSwitchPosition | null): void {
    if (position) {
      const positionStr = position.toString();
      HtmlElemUtil.setClass(renderer, elem, 'glnsw-' + positionStr, true);
      HtmlElemUtil.setAttr(renderer, elem, 'pos-' + positionStr[0], '');
    }
  }

  private prepareCssParameters(hostRef: ElementRef<HTMLElement>): void {
    // Determine the font size of the parent element.
    const parentElem: Element | null = hostRef && hostRef.nativeElement ? hostRef.nativeElement.parentElement : null;
    const parentFontSize: number = parentElem ? Number(getComputedStyle(parentElem).getPropertyValue('font-size').replace('px', '')) : 0;
    if (parentFontSize > 0) {
      HtmlElemUtil.setProperty(hostRef, PRP_SW_PARENT_FONT_SIZE, NumberUtil.str(parentFontSize)?.concat('px'));
    }
    if (hostRef && hostRef.nativeElement) {
      const hostElement: Element = hostRef.nativeElement;
      // Determine the font size of the host element.
      const hostFontSizeVal: number = Number(getComputedStyle(hostElement).getPropertyValue('font-size').replace('px', ''));
      const hostFontSize: number = NumberUtil.roundTo100(hostFontSizeVal);
      // Determine the font size of the document element.
      const rootFontSizeVal: number = Number(getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', ''));
      const rootFontSize: number = NumberUtil.roundTo100(rootFontSizeVal);

      const screenHeight: number = ScreenUtil.getHeight();
      const screenWidth: number = ScreenUtil.getWidth();
      // Determine the height of the 'track' element. ('--glnsw-track-hg': 1em;)
      const trackHeightStr: string = getComputedStyle(hostElement).getPropertyValue('--glnsw-track-hg');
      const trackHeightVal: number = HtmlConvertUtil.toPx(trackHeightStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const trackHeight: number = NumberUtil.roundTo100(trackHeightVal > 0 ? trackHeightVal : 1 * hostFontSize);

      // Determine the border-radius of the 'track' element.
      const trackBorderRadius: number = NumberUtil.roundTo100(trackHeight / 2);
      HtmlElemUtil.setProperty(hostRef, PRP_SW_TRACK_BORDER_RADIUS, NumberUtil.str(trackBorderRadius)?.concat('px'));

      // Determine the width of the 'track' element. ('--glnsw-track-wd': 2.3em;)
      const trackWidthStr: string = getComputedStyle(hostElement).getPropertyValue('--glnsw-track-wd');
      const trackWidthVal: number = HtmlConvertUtil.toPx(trackWidthStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const trackWidth: number = NumberUtil.roundTo100(trackWidthVal > 0 ? trackWidthVal : 2.3 * hostFontSize);

      // Determine the height of the 'thumb' element. ('--glnsw-thumb-hg': 1.5em);
      const thumbHeightStr: string = getComputedStyle(hostElement).getPropertyValue('--glnsw-thumb-hg');
      const thumbHeightVal: number = HtmlConvertUtil.toPx(thumbHeightStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const thumbHeight: number = NumberUtil.roundTo100(thumbHeightVal > 0 ? thumbHeightVal : 1.5 * hostFontSize);

      // Determine the padding of the container element.
      const containerPadding = NumberUtil.roundTo100((3 * hostFontSize - trackHeight) / 2);
      HtmlElemUtil.setProperty(hostRef, PRP_SW_CONTAINER_PADDING, NumberUtil.str(containerPadding)?.concat('px'));

      // Determine the padding of the wrap element.
      const wrapPadding = NumberUtil.roundTo100((3 * hostFontSize - thumbHeight) / 2);
      HtmlElemUtil.setProperty(hostRef, PRP_SW_WRAP_PADDING, NumberUtil.str(wrapPadding)?.concat('px'));

      // Determine the shift of the wrap element.
      const containerLen = trackWidth + 2 * containerPadding;
      const wrapLen = thumbHeight + 2 * wrapPadding;
      const wrapShift = NumberUtil.roundTo100(containerLen - wrapLen);
      HtmlElemUtil.setProperty(hostRef, PRP_SW_WRAP_SHIFT, NumberUtil.str(wrapShift)?.concat('px'));
    }
  }
}

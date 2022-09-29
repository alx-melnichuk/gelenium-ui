import {
  AfterViewInit,
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
  NgZone,
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
import { GlnBaseProperties, GlnProperties } from '../_interface/gln-base-properties';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnSwitchChange } from './gln-switch-change.interface';
import { GlnSwitchConfig } from './gln-switch.interface';
import { GlnSwitchPosition, GlnSwitchPositionUtil } from './gln-switch-position.interface';
import { GlnHideAnimationOnInit } from '../_interface/gln-hide-animation-on-init';

export const CSS_PROP_PARENT_FONT_SIZE = '--glnsw-pr-font-size';
export const CSS_PROP_CONTAINER_PADDING = '--glnsw-cont-pd';
export const CSS_PROP_WRAP_PADDING = '--glnsw-wrap-pd';
export const CSS_PROP_WRAP_SHIFT = '--glnsw-wrap-shift';
export const CLS_SW_DISABLED = 'gln-disabled';
export const ATR_SW_DISABLED = 'dis';

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
export class GlnSwitchComponent
  extends GlnBaseProperties
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
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
  public idForInput = this.setIdForInput(this.id);
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple".
  public labelPosition: GlnSwitchPosition | null = null; // Binding attribute "position".
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".

  private hideAnimationOnInit: GlnHideAnimationOnInit | undefined;

  constructor(
    renderer: Renderer2,
    hostRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SWITCH_CONFIG) private rootConfig: GlnSwitchConfig | null
  ) {
    super(
      hostRef, // public hostRef: ElementRef<HTMLElement>,
      renderer // protected renderer: Renderer2,
    );
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
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
    super.onChangesProperty(changes, 'isNoAnimation', this.currConfig as GlnProperties);
    // Checking and handle the 'isNoRipple' parameter.
    super.onChangesProperty(changes, 'isNoRipple', this.currConfig as GlnProperties);
    // Checking and handle the 'isReadOnly' parameter.
    super.onChangesProperty(changes, 'isReadOnly', this.currConfig as GlnProperties);
    // Checking and handle the 'isRequired' parameter.
    super.onChangesProperty(changes, 'isRequired', this.currConfig as GlnProperties);
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

    this.hideAnimationOnInit = new GlnHideAnimationOnInit(this.renderer, this.hostRef, this.ngZone);
    // Add an attribute that disables animation on initialization.
    this.hideAnimationOnInit.ngOnInit();

    this.prepareCssParameters(this.hostRef);

    // If parameter 'isChecked' is defined, then set the initial value.
    const isChecked: boolean | null = BooleanUtil.init(this.isChecked);
    const isCheckedVal = isChecked != null ? isChecked : this.currConfig.isChecked || null;
    if (isCheckedVal != null && isCheckedVal !== this.formControl.value) {
      this.formControl.setValue(isCheckedVal, { emitEvent: false });
      this.settingChecked(this.renderer, this.hostRef, isCheckedVal);
    }
    // Checking and handle the 'isNoAnimation' parameter.
    super.onInitProperty('isNoAnimation', this.currConfig as GlnProperties);
    // Checking and handle the 'isReadOnly' parameter.
    super.onInitProperty('isReadOnly', this.currConfig as GlnProperties);
    // Checking and handle the 'isRequired' parameter.
    super.onInitProperty('isRequired', this.currConfig as GlnProperties);
    if (this.required) {
      this.prepareFormGroup(this.required);
    }
    // Checking and handle the 'isNoRipple' parameter.
    super.onInitProperty('isNoRipple', this.currConfig as GlnProperties);
    // Checking and handle the 'position' parameter.
    if (this.labelPosition == null) {
      this.labelPosition = GlnSwitchPositionUtil.create(this.currConfig?.position || null);
      this.settingPosition(this.renderer, this.hostRef, this.labelPosition);
    }
  }

  public ngAfterViewInit(): void {
    // Remove an attribute that disables animation on initialization.
    if (this.parentFormGroup) {
      this.hideAnimationOnInit?.ngAfterViewInitWithPromise(); // If using FormControl.
    } else {
      this.hideAnimationOnInit?.ngAfterViewInitWithNgZone(); // If using [(ngModel)].
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
    return `${this.id}-input`;
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
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_PARENT_FONT_SIZE, NumberUtil.str(parentFontSize)?.concat('px'));
    }
    const hostElement: Element | null = hostRef ? hostRef.nativeElement : null;
    // Determine the font size of the host element.
    const hostFontSizeVal: number = hostElement ? Number(getComputedStyle(hostElement).getPropertyValue('font-size').replace('px', '')) : 0;
    const hostFontSize: number = NumberUtil.roundTo100(hostFontSizeVal);
    // Define a container element.
    const containerElement: Element | null = hostElement ? hostElement.children[0] : null;
    if (containerElement && containerElement.children.length > 2) {
      // Define the 'track' element in the container.
      const trackElement: Element | null = containerElement.children[2];
      // Determine the height of the 'track' element.
      const trackHeightVal: number = trackElement ? Number(getComputedStyle(trackElement).getPropertyValue('height').replace('px', '')) : 0;
      const trackHeight: number = NumberUtil.roundTo100(trackHeightVal);
      let containerPadding = 0;
      if (hostFontSize > 0 && trackHeight > 0) {
        // Determine the padding of the container element.
        containerPadding = NumberUtil.roundTo100((3 * hostFontSize - trackHeight) / 2);
        HtmlElemUtil.setProperty(hostRef, CSS_PROP_CONTAINER_PADDING, NumberUtil.str(containerPadding)?.concat('px'));
      }
      // Define the 'wrap' element in the container.
      const wrapElement: Element | null = containerElement.children[1];
      const thumbElement: Element | null = wrapElement && wrapElement.children.length > 0 ? wrapElement.children[0] : null;
      // Determine the height of the 'thumb' element.
      const thumbHeightVal: number = thumbElement ? Number(getComputedStyle(thumbElement).getPropertyValue('height').replace('px', '')) : 0;
      const thumbHeight: number = NumberUtil.roundTo100(thumbHeightVal);
      // Determine the padding of the 'wrap' element.
      let wrapPadding = 0;
      if (hostFontSize > 0 && thumbHeight > 0) {
        wrapPadding = NumberUtil.roundTo100((3 * hostFontSize - thumbHeight) / 2);
        HtmlElemUtil.setProperty(hostRef, CSS_PROP_WRAP_PADDING, NumberUtil.str(wrapPadding)?.concat('px'));
      }
      // Determine the width of the 'track' element.
      const trackWidthVal: number = trackElement ? Number(getComputedStyle(trackElement).getPropertyValue('width').replace('px', '')) : 0;
      const trackWidth: number = NumberUtil.roundTo100(trackWidthVal);
      let wrapShift = 0;
      if (hostFontSize > 0 && containerPadding > 0 && trackWidth > 0 && thumbHeight > 0 && wrapPadding > 0) {
        const containerLen = trackWidth + 2 * containerPadding;
        const wrapLen = thumbHeight + 2 * wrapPadding;
        wrapShift = NumberUtil.roundTo100(containerLen - wrapLen);
      }
      if (wrapShift > 0) {
        HtmlElemUtil.setProperty(hostRef, CSS_PROP_WRAP_SHIFT, NumberUtil.str(wrapShift)?.concat('px'));
      }
    }
  }
}

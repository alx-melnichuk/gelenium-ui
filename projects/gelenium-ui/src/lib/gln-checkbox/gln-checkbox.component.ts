import { isPlatformBrowser } from '@angular/common';
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
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnCheckboxChange } from './gln-checkbox-change.interface';
import { GlnCheckboxConfig } from './gln-checkbox-config.interface';

const POSITION: { [key: string]: string } = { top: 'top', bottom: 'bottom', start: 'start', end: 'end' };
const SIZE: { [key: string]: number } = { little: 30, short: 36, small: 42, middle: 48, wide: 54, large: 60, huge: 66 };

const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';

let uniqueIdCounter = 0;

export const GLN_CHECKBOX_CONFIG = new InjectionToken<GlnCheckboxConfig>('GLN_CHECKBOX_CONFIG');

@Component({
  selector: 'gln-checkbox',
  exportAs: 'glnCheckbox',
  templateUrl: './gln-checkbox.component.html',
  styleUrls: ['./gln-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnCheckboxComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnCheckboxComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnCheckboxComponent },
  ],
})
export class GlnCheckboxComponent
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id = `glncb-${uniqueIdCounter++}`;
  @Input()
  public config: GlnCheckboxConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isIndeterm: string | boolean | null | undefined;
  @Input()
  public isNoHover: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end';
  @Input()
  public size: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge'
  @Input()
  public tabIndex: number = 0;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly change: EventEmitter<GlnCheckboxChange> = new EventEmitter();
  @Output()
  readonly indetermChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('inputElementRef', { static: true })
  public inputElementRef!: ElementRef<HTMLElement>;
  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public currConfig: GlnCheckboxConfig;
  public formControl: FormControl = new FormControl({ value: undefined, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ checkinfo: this.formControl });
  public isCheckedVal: boolean | null = null; // Binding attribute "isChecked".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isFocused = false;
  public isIndetermVal: boolean | null = null; // Binding attribute "isIndeterm".
  public isNoHoverVal: boolean | null = null; // Binding attribute "isNoHover".
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public positionVal: string | null = null; // Binding attribute "position".
  public sizeVal: number | null = null; // Binding attribute "size".

  private isRemoveAttrHideAnimation: boolean = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_CHECKBOX_CONFIG) private rootConfig: GlnCheckboxConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-checkbox');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isIndeterm']) {
      this.isIndetermVal = !!BooleanUtil.init(this.isIndeterm);
      this.settingIndeterm(this.isIndetermVal, this.renderer, this.hostRef);
      if (!changes['isIndeterm'].isFirstChange()) {
        this.indetermChange.emit(this.isIndetermVal);
      }
    }
    if (changes['isNoHover'] || (changes['config'] && this.isNoHover == null && this.currConfig.isNoHover != null)) {
      this.isNoHoverVal = !!(BooleanUtil.init(this.isNoHover) ?? this.currConfig.isNoHover);
      this.settingNoHover(this.isNoHoverVal, this.renderer, this.hostRef);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.isNoRippleVal = !!(BooleanUtil.init(this.isNoRipple) ?? (this.currConfig.isNoRipple || null));
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = !!(BooleanUtil.init(this.isReadOnly) ?? (this.currConfig.isReadOnly || null));
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = !!(BooleanUtil.init(this.isRequired) ?? (this.currConfig.isRequired || null));
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      // Remove class by old position value.
      this.settingByPosition(false, this.positionVal, this.renderer, this.hostRef);
      this.positionVal = this.convertPosition((this.position || this.currConfig.position || '').toString());
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      this.sizeVal = this.convertSize((this.size || this.currConfig.size || '').toString());
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const isChecked: boolean | null = BooleanUtil.init(this.isChecked);
    if (isChecked && !this.formControl.value) {
      this.formControl.setValue(true, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = true), this.renderer, this.hostRef);
    }
    if (this.isNoHoverVal == null) {
      this.isNoHoverVal = !!this.currConfig.isNoHover;
      this.settingNoHover(this.isNoHoverVal, this.renderer, this.hostRef);
    }
    if (this.isNoRippleVal == null) {
      this.isNoRippleVal = !!(this.currConfig.isNoRipple || null);
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!(this.currConfig.isReadOnly || null);
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.positionVal == null) {
      this.positionVal = this.convertPosition((this.currConfig.position || '').toString());
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }
    if (this.sizeVal == null) {
      this.sizeVal = this.convertSize((this.currConfig.size || '').toString());
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (this.isRequiredVal) {
      this.prepareFormGroup(this.isRequiredVal);
    }

    // Add an attribute that disables animation on initialization.
    this.renderer.setAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT, '');
  }

  public ngAfterContentInit(): void {
    // When using [(ngModel)] parentFormGroup will be null.
    this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    if (!this.isRemoveAttrHideAnimation) {
      // Remove an attribute that disables animation on initialization.
      this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
    }
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(value == null ? value : !!value, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = !!value), this.renderer, this.hostRef);
      this.changeDetectorRef.markForCheck();
    }
    if (this.isRemoveAttrHideAnimation) {
      this.isRemoveAttrHideAnimation = false;
      Promise.resolve().then(() => {
        // Remove an attribute that disables animation on initialization.
        this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
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
    if (this.isDisabledVal !== disabled) {
      this.isDisabledVal = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', disabled ? '' : null);
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
  }

  // ** interface Validator - finish **

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

  // ** Public methods **

  public doClickByLabel(event: MouseEvent): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal && !!this.touchRipple && !this.isNoRippleVal) {
      this.touchRipple.trigger(event, true);
    }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = newValue), this.renderer, this.hostRef);
      if (this.isIndetermVal) {
        this.settingIndeterm((this.isIndetermVal = false), this.renderer, this.hostRef);
        this.indetermChange.emit(this.isIndetermVal);
      }
      if (this.isRemoveAttrHideAnimation) {
        this.isRemoveAttrHideAnimation = false;
        // Remove an attribute that disables animation on initialization.
        this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
      }
      this.onChange(newValue);
      this.change.emit({ checked: newValue, source: this });
      if (!!this.touchRipple && !this.isNoRippleVal) {
        this.touchRipple.trigger(null, true);
      }
      this.changeDetectorRef.markForCheck();
    }
  }

  public doClickByInput(event: Event | null): void {
    // We stop propagation so that the change event does not pop up and pass its input object.
    event?.stopPropagation();
    this.toggle();
  }

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public getIndeterm(): boolean {
    return !!this.isIndetermVal;
  }

  public setIndeterm(value: boolean): void {
    if (this.isIndetermVal != value) {
      this.settingIndeterm((this.isIndetermVal = value), this.renderer, this.hostRef);
      this.indetermChange.emit(this.isIndetermVal);
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected methods **

  protected doFocus(): void {
    if (!this.isDisabledVal) {
      this.settingFocus((this.isFocused = true), this.renderer, this.hostRef);
      this.focused.emit();
    }
  }

  protected doBlur(): void {
    if (!this.isDisabledVal) {
      this.settingFocus((this.isFocused = false), this.renderer, this.hostRef);
      this.onTouched();
      this.blured.emit();
    }
  }

  // ** Private methods **

  // ** Private methods **

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
    this.formControl.updateValueAndValidity();
  }

  private convertSize(sizeStr: string): number {
    return NumberUtil.converInt(sizeStr, SIZE[sizeStr] || SIZE['small']);
  }
  private convertPosition(positionStr: string): string {
    return POSITION[positionStr] || POSITION['end'];
  }
  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    let iconSz: number | null = null;
    let iconPd: number | null = null;
    if (size > 0) {
      iconSz = Math.round(0.5714 * size);
      iconPd = Math.round(((size - iconSz) / 2) * 100) / 100;
    }
    HtmlElemUtil.setProperty(elem, '--glncb--icon-sz', iconSz?.toString().concat('px'));
    HtmlElemUtil.setProperty(elem, '--glncb--icon-pd', iconPd?.toString().concat('px'));
  }
  private settingByPosition(isAdd: boolean, positionStr: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    if (positionStr) {
      HtmlElemUtil.setClass(renderer, elem, 'glnch-' + positionStr, isAdd);
      HtmlElemUtil.setAttr(renderer, elem, 'pos-' + positionStr[0], isAdd ? '' : null);
    }
  }

  private settingChecked(checkedVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', !!checkedVal);
    HtmlElemUtil.setAttr(renderer, elem, 'che', !!checkedVal ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingIndeterm(isIndetermVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-indeterm', !!isIndetermVal);
    HtmlElemUtil.setAttr(renderer, elem, 'ind', isIndetermVal ? '' : null);
  }
  private settingNoHover(isNoHoverVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-hover', !!isNoHoverVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noHov', isNoHoverVal ? '' : null);
  }
  private settingNoRipple(isNoRippleVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!isNoRippleVal);
    HtmlElemUtil.setAttr(renderer, elem, 'norip', isNoRippleVal ? '' : null);
  }
  private settingReadOnly(isReadOnlyVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!isReadOnlyVal);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', isReadOnlyVal ? '' : null);
  }
  private settingRequired(isRequiredVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!isRequiredVal);
    HtmlElemUtil.setAttr(renderer, elem, 'req', isRequiredVal ? '' : null);
  }
}

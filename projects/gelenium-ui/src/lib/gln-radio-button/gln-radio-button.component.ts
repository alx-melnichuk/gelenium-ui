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
  OnDestroy,
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
import { GlnRadioGroup, GLN_RADIO_GROUP } from '../gln-radio-group/gln-radio-group.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnRadioButtonCheckedUtil } from './gln-radio-button-checked.util';
import { GlnRadioButtonConfig } from './gln-radio-button-config.interface';
import { GlnRadioButton, GLN_RADIO_BUTTON } from './gln-radio-button.interface';

const POSITION: { [key: string]: string } = { top: 'top', bottom: 'bottom', start: 'start', end: 'end' };
const SIZE: { [key: string]: number } = { little: 30, short: 36, small: 42, middle: 48, wide: 54, large: 60, huge: 66 };

export const GLN_RADIO_BUTTON_CONFIG = new InjectionToken<GlnRadioButtonConfig>('GLN_RADIO_BUTTON_CONFIG');

const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-button',
  exportAs: 'glnRadioButton',
  templateUrl: './gln-radio-button.component.html',
  styleUrls: ['./gln-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnRadioButtonComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnRadioButtonComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnRadioButtonComponent },
    { provide: GLN_RADIO_BUTTON, useExisting: GlnRadioButtonComponent },
  ],
})
export class GlnRadioButtonComponent
  implements OnChanges, OnInit, AfterContentInit, OnDestroy, GlnRadioButton, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id: string; // interface GlnRadioButton
  @Input()
  public config: GlnRadioButtonConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoHover: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public name: string; // interface GlnRadioButton
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end';
  @Input()
  public value: string | null | undefined; // interface GlnRadioButton
  @Input()
  public size: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge'
  @Input()
  public tabIndex: number = 0;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly change: EventEmitter<{ value: string | null | undefined; source: GlnRadioButton | null }> = new EventEmitter();

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;
  @ViewChild('inputElementRef', { static: true })
  public inputElementRef!: ElementRef<HTMLElement>;

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ radioinfo: this.formControl });

  public currConfig: GlnRadioButtonConfig;
  public isCheckedVal: boolean | null = null; // Binding attribute "isChecked".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isFocused: boolean = false;
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
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
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_RADIO_GROUP) public group: GlnRadioGroup,
    @Optional() @Inject(GLN_RADIO_BUTTON_CONFIG) private rootConfig: GlnRadioButtonConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-button');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
    const uniqueId: number = uniqueIdCounter++;
    this.id = `glnrb-${uniqueId}`;
    this.name = `glnrb-${uniqueId}`;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? this.group?.noAnimation ?? this.currConfig.isNoAnimation);
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (changes['isNoHover'] || (changes['config'] && this.isNoHover == null && this.currConfig.isNoHover != null)) {
      this.isNoHoverVal = !!(BooleanUtil.init(this.isNoHover) ?? this.group?.noHover ?? this.currConfig.isNoHover);
      this.settingNoHover(this.isNoHoverVal, this.renderer, this.hostRef);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.isNoRippleVal = !!(BooleanUtil.init(this.isNoRipple) ?? this.group?.noRipple ?? this.currConfig.isNoRipple);
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = !!(BooleanUtil.init(this.isReadOnly) ?? this.group?.readOnly ?? this.currConfig.isReadOnly);
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = !!(BooleanUtil.init(this.isRequired) ?? (this.currConfig.isRequired || null));
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      // Remove class by old position value.
      this.settingByPosition(false, this.positionVal, this.renderer, this.hostRef);
      this.positionVal = this.converPosition((this.position || this.currConfig.position || '').toString());
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      this.sizeVal = this.converSize((this.size || this.group?.size || this.currConfig.size || '').toString());
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.isDisabledVal === null && !!this.group?.disabled) {
      this.setDisabledState(!!this.group?.disabled);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!(this.group?.noAnimation ?? this.currConfig.isNoAnimation);
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (this.isNoHoverVal == null) {
      this.isNoHoverVal = !!(this.group?.noHover ?? this.currConfig.isNoHover);
      this.settingNoHover(this.isNoHoverVal, this.renderer, this.hostRef);
    }
    if (this.isNoRippleVal == null) {
      this.isNoRippleVal = !!(this.group?.noRipple ?? this.currConfig.isNoRipple);
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!(this.group?.readOnly ?? this.currConfig.isReadOnly);
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!(this.currConfig.isRequired || null);
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.positionVal == null) {
      this.positionVal = this.converPosition((this.group?.position || this.currConfig.position || '').toString());
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }
    if (this.sizeVal == null) {
      this.sizeVal = this.converSize((this.group?.size || this.currConfig.size || '').toString());
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (this.isRequiredVal) {
      this.prepareFormGroup(this.isRequiredVal);
    }

    const isChecked: boolean | null = BooleanUtil.init(this.isChecked);
    if (isChecked) {
      this.setChecked();
    } else {
      this.setUnchecked(isChecked);
    }

    if (!!this.group) {
      // If "name" is not specified, then all such elements will be
      // in the same group named "empty string".
      if (!!this.group.name) {
        this.name = this.group.name;
      }
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

  public ngOnDestroy(): void {
    GlnRadioButtonCheckedUtil.remove(this);
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    const newChecked: boolean | null = value != null ? value == this.value : null;
    if (newChecked) {
      this.setChecked();
    } else {
      this.setUnchecked(newChecked);
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
      this.settingDisabled(this.isDisabledVal, this.renderer, this.hostRef);
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

  // ** interface GlnRadioButton - start **

  public getChecked(): boolean | null {
    return this.isCheckedVal;
  }

  public setChecked(): void {
    if (this.isCheckedVal !== true) {
      // Find the previous selected item in the list of selected items.
      const previous: GlnRadioButton | undefined = GlnRadioButtonCheckedUtil.findByName(this.name || '');
      // In the previously selected item, set as "unchecked".
      if (!!previous) {
        previous.setUnchecked(false);
      } else if (!!this.group && !previous) {
        const radios: GlnRadioButton[] = this.group.getRadioList();
        for (let idx = 0; idx < radios.length; idx++) {
          const radio: GlnRadioButton = radios[idx];
          if (this != radio && radio.getChecked() == null) {
            radio.setUnchecked(false);
          }
        }
      }
      this.isCheckedVal = true;
      this.settingChecked(this.isCheckedVal, this.renderer, this.hostRef);
      this.formControl.setValue(this.isCheckedVal);

      // Add the current item to the list of selected items.
      GlnRadioButtonCheckedUtil.add(this);
      // Define a new selected element in GlnRadioGroup.
      this.group?.setSelectedRadio(this);

      this.changeDetectorRef.markForCheck();
    }
  }

  public setUnchecked(newChecked: boolean | null): void {
    if (this.isCheckedVal !== newChecked) {
      const oldIsCheckedVal = this.isCheckedVal;

      this.isCheckedVal = newChecked;
      this.settingChecked(this.isCheckedVal, this.renderer, this.hostRef);
      this.formControl.setValue(this.isCheckedVal);

      if (oldIsCheckedVal) {
        // Remove the current item from the list of selected items.
        GlnRadioButtonCheckedUtil.remove(this);
        // Remove the selected item in the GlnRadioGroup.
        this.group?.setSelectedRadio(null);
      }
      this.changeDetectorRef.markForCheck();
    }
  }

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public setProperties(properties: Record<string, unknown>): void {
    let isMarkForCheck: boolean = false;
    const keys: string[] = Object.keys(properties);
    for (let idx = 0; idx < keys.length; idx++) {
      if ('isDisabled' === keys[idx]) {
        this.setDisabledState(properties['isDisabled'] as boolean);
        isMarkForCheck = true;
      } else if ('isNoAnimation' === keys[idx]) {
        this.isNoAnimationVal = !!(BooleanUtil.init(properties['isNoAnimation'] as string) ?? this.currConfig.isNoAnimation);
        this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
      } else if ('isNoHover' === keys[idx]) {
        this.isNoHoverVal = !!(BooleanUtil.init(properties['isNoHover'] as string) ?? this.currConfig.isNoHover);
        this.settingNoHover(this.isNoHoverVal, this.renderer, this.hostRef);
      } else if ('isNoRipple' === keys[idx]) {
        this.isNoRippleVal = !!(BooleanUtil.init(properties['isNoRipple'] as string) ?? this.currConfig.isNoRipple);
        this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
      } else if ('isReadOnly' === keys[idx]) {
        this.isReadOnlyVal = !!(BooleanUtil.init(properties['isReadOnly'] as string) ?? this.currConfig.isReadOnly);
        this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
        isMarkForCheck = true;
      } else if ('name' === keys[idx] && !!properties['name']) {
        this.name = properties['name'] as string;
        isMarkForCheck = true;
      } else if ('position' === keys[idx]) {
        // Remove class by old position value.
        this.settingByPosition(false, this.positionVal, this.renderer, this.hostRef);
        this.positionVal = this.converPosition(((properties['position'] as string) || this.currConfig.position || '').toString());
        // Add class by new position value.
        this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
      } else if ('size' === keys[idx]) {
        this.sizeVal = this.converSize(((properties['size'] as string) || this.currConfig.size || '').toString());
        this.setCssSize(this.sizeVal, this.hostRef);
      }
    }
    if (isMarkForCheck) {
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** interface GlnRadioButton - finish **

  // ** Public methods **

  public doClickByInput(event: Event | null): void {
    // We stop propagation so that the change event does not pop up and pass its input object.
    event?.stopPropagation();
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      if (!this.isCheckedVal) {
        this.setChecked();

        this.onChange(this.value);
        this.change.emit({ value: this.value, source: this });
      }
      if (this.touchRipple && !this.isNoRippleVal) {
        this.touchRipple.trigger(null, true);
      }
    }
  }

  public doFocus(): void {
    if (!this.isDisabledVal) {
      this.isFocused = true;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.group?.setFocus(true);
      this.focused.emit();
    }
  }

  public doBlur(): void {
    if (!this.isDisabledVal) {
      this.isFocused = false;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.group?.setFocus(false);
      this.onTouched();
      this.blured.emit();
    }
  }

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

  private converSize(sizeStr: string): number {
    return NumberUtil.converInt(sizeStr, SIZE[sizeStr] || SIZE['small']);
  }
  private converPosition(positionStr: string): string {
    return POSITION[positionStr] || POSITION['end'];
  }
  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    let iconSz: number | null = null;
    let iconPd: number | null = null;
    if (size > 0) {
      iconSz = Math.round(0.5714 * size);
      iconPd = Math.round(((size - iconSz) / 2) * 100) / 100;
    }
    HtmlElemUtil.setProperty(elem, '--glnrb--icon-sz', iconSz?.toString().concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnrb--icon-pd', iconPd?.toString().concat('px'));
  }
  private settingByPosition(isAdd: boolean, positionStr: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    if (positionStr) {
      HtmlElemUtil.setClass(renderer, elem, 'glnrb-' + positionStr, isAdd);
      HtmlElemUtil.setAttr(renderer, elem, 'pos-' + positionStr[0], isAdd ? '' : null);
    }
  }

  private settingChecked(checkedVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', !!checkedVal);
    HtmlElemUtil.setAttr(renderer, elem, 'che', !!checkedVal ? '' : null);
  }
  private settingDisabled(isDisabledVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!isDisabledVal);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', isDisabledVal ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingNoAnimation(isNoAnimationVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noAni', isNoAnimationVal ? '' : null);
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

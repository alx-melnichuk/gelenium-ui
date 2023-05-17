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
import { GlnSwitchChange } from './gln-switch-change.interface';
import { GlnSwitchConfig } from './gln-switch-config.interface';
import { ScreenUtil } from '../_utils/screen.util';
import { HtmlConvertUtil } from '../_utils/html-convert.util';

const POSITION: { [key: string]: string } = { top: 'top', bottom: 'bottom', start: 'start', end: 'end' };

const CSS_CLS_DISABLED = 'gln-disabled';
const CSS_ATTR_DISABLED = 'dis';
const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';
const CSS_PROP_LABEL_FONT_SIZE = '--glnsw--label-fn-sz';
const CSS_PROP_CONTAINER_PADDING = '--glnsw--container-pd';
const CSS_PROP_WRAP_PADDING = '--glnsw--wrap-pd';
const CSS_PROP_WRAP_SHIFT = '--glnsw--wrap-shift';
const CSS_PROP_TRACK_BORDER_RADIUS = '--glnsw--track-brd-rds';
const CSS_PROP_THUMB_HEIGHT = '--glnsw-thumb-hg';
const CSS_PROP_TRACK_HEIGHT = '--glnsw-track-hg';
const CSS_PROP_TRACK_WIDTH = '--glnsw-track-wd';

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
  public id = `glnsw-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSwitchConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  @Input()
  public isDisabled: string | boolean | null | undefined;
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
  public tabIndex: number = 0;

  @Output()
  readonly change: EventEmitter<GlnSwitchChange> = new EventEmitter();

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public currConfig: GlnSwitchConfig;
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isCheckedVal: boolean | null = null; // Binding attribute "isChecked".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public isWrapAndThumb: boolean = false;
  public positionVal: string | null = null; // Binding attribute "position".

  private isRemoveAttrHideAnimation: boolean = false;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SWITCH_CONFIG) private rootConfig: GlnSwitchConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-switch');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
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
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      this.positionVal = POSITION[positionStr] || POSITION['end'];
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }

    if (changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // Defining internal CSS properties.
    this.prepareCssProperties(this.hostRef);

    if (!this.isDisabledVal) {
      // Set the TagIndex value if the flag 'disabled' is not set.
      this.renderer.setAttribute(this.hostRef.nativeElement, 'tabindex', '' + this.tabIndex);
    }
    const isChecked: boolean | null = BooleanUtil.init(this.isChecked) ?? (this.currConfig.isChecked || null);
    if (isChecked && !this.formControl.value) {
      this.formControl.setValue(true, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = true), this.renderer, this.hostRef);
    }

    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!(this.currConfig.isNoAnimation || null);
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
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
      this.isRequiredVal = !!(this.currConfig.isRequired || null);
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.positionVal == null) {
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      const positionVal: string = POSITION[positionStr] || POSITION['end'];
      // Add class by new position value.
      this.settingByPosition(true, (this.positionVal = positionVal), this.renderer, this.hostRef);
    }

    if (this.isRequiredVal) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngAfterContentInit(): void {
    // This allows you to add an element to the DOM without the initial animation.
    this.isWrapAndThumb = true;
    // When using [(ngModel)] parentFormGroup will be null.
    this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    if (this.isRemoveAttrHideAnimation) {
      // Add an attribute that disables animation on initialization.
      this.renderer.setAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT, '');
    }
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(!!value, { emitEvent: false });
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
      HtmlElemUtil.setClass(this.renderer, this.hostRef, CSS_CLS_DISABLED, disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_DISABLED, disabled ? '' : null);
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
    if (!this.isDisabledVal && !this.isReadOnlyVal && this.touchRipple && !this.isNoRippleVal) {
      this.touchRipple.trigger(event, true);
    }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = newValue), this.renderer, this.hostRef);
      if (this.isRemoveAttrHideAnimation) {
        this.isRemoveAttrHideAnimation = false;
        // Remove an attribute that disables animation on initialization.
        this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
      }
      this.onChange(newValue);
      this.change.emit({ checked: newValue, source: this });
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected methods **

  // ** Private methods **

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  private prepareCssProperties(hostRef: ElementRef<HTMLElement>): void {
    // Determine the font size of the parent element.
    if (hostRef && hostRef.nativeElement) {
      const hostElement: HTMLElement = hostRef.nativeElement;

      const parentElem: HTMLElement | null = hostRef && hostRef.nativeElement ? hostRef.nativeElement.parentElement : null;
      const parentRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(parentElem);
      const parentFontSize: number = HtmlElemUtil.propertyAsNumber(parentRef, 'font-size');
      if (parentFontSize > 0) {
        hostElement.style.setProperty(CSS_PROP_LABEL_FONT_SIZE, parentFontSize.toString().concat('px'));
      }

      // Determine the font size of the host element.
      const hostFontSizeVal: number = HtmlElemUtil.propertyAsNumber(hostRef, 'font-size');
      const hostFontSize: number = Math.round(hostFontSizeVal * 100) / 100;
      // Determine the font size of the document element.
      const rootFontSizeVal: number = Number(getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', ''));
      const rootFontSize: number = Math.round(rootFontSizeVal * 100) / 100;

      const screenHeight: number = ScreenUtil.getHeight();
      const screenWidth: number = ScreenUtil.getWidth();
      // Determine the height of the 'track' element. (1em;)
      const trackHeightStr: string = getComputedStyle(hostElement).getPropertyValue(CSS_PROP_TRACK_HEIGHT);
      const trackHeightVal: number = HtmlConvertUtil.toPx(trackHeightStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const trackHeightNum: number = trackHeightVal > 0 ? trackHeightVal : hostFontSize;
      const trackHeight: number = Math.round(trackHeightNum * 100) / 100;

      // Determine the border-radius of the 'track' element.
      const trackBorderRadius: number = Math.round((trackHeight / 2) * 100) / 100;
      hostElement.style.setProperty(CSS_PROP_TRACK_BORDER_RADIUS, trackBorderRadius.toString().concat('px'));

      // Determine the width of the 'track' element. (2.3em;)
      const trackWidthStr: string = getComputedStyle(hostElement).getPropertyValue(CSS_PROP_TRACK_WIDTH);
      const trackWidthVal: number = HtmlConvertUtil.toPx(trackWidthStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const trackWidthNum: number = trackWidthVal > 0 ? trackWidthVal : 2.3 * hostFontSize;
      const trackWidth: number = Math.round(trackWidthNum * 100) / 100;

      // Determine the height of the 'thumb' element. (1.5em);
      const thumbHeightStr: string = getComputedStyle(hostElement).getPropertyValue(CSS_PROP_THUMB_HEIGHT);
      const thumbHeightVal: number = HtmlConvertUtil.toPx(thumbHeightStr, hostFontSize, rootFontSize, screenHeight, screenWidth);
      const thumbHeightNum: number = thumbHeightVal > 0 ? thumbHeightVal : 1.5 * hostFontSize;
      const thumbHeight: number = Math.round(thumbHeightNum * 100) / 100;

      // Determine the padding of the container element.
      const containerPaddingNum = (3 * hostFontSize - trackHeight) / 2;
      const containerPadding = Math.round(containerPaddingNum * 100) / 100;
      hostElement.style.setProperty(CSS_PROP_CONTAINER_PADDING, containerPadding.toString().concat('px'));

      // Determine the padding of the wrap element.
      const wrapPaddingNum = (3 * hostFontSize - thumbHeight) / 2;
      const wrapPadding = Math.round(wrapPaddingNum * 100) / 100;
      hostElement.style.setProperty(CSS_PROP_WRAP_PADDING, wrapPadding.toString().concat('px'));

      // Determine the shift of the wrap element.
      const containerLen = trackWidth + 2 * containerPadding;
      const wrapLen = thumbHeight + 2 * wrapPadding;
      const wrapShift = Math.round((containerLen - wrapLen) * 100) / 100;
      hostElement.style.setProperty(CSS_PROP_WRAP_SHIFT, wrapShift.toString().concat('px'));
    }
  }

  private settingChecked(isChecked: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', !!isChecked);
    HtmlElemUtil.setAttr(renderer, elem, 'chk', isChecked ? '' : null);
  }
  private settingByPosition(isAdd: boolean, positionStr: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    if (positionStr) {
      HtmlElemUtil.setClass(renderer, elem, 'glnsw-' + positionStr, isAdd);
      HtmlElemUtil.setAttr(renderer, elem, 'pos-' + positionStr[0], isAdd ? '' : null);
    }
  }
  private settingNoAnimation(isNoAnimationVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noani', isNoAnimationVal ? '' : null);
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

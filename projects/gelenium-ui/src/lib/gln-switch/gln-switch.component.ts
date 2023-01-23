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
import { GlnSwitchConfig } from './gln-switch.interface';
import { ScreenUtil } from '../_utils/screen.util';
import { HtmlConvertUtil } from '../_utils/html-convert.util';

const POSITION: { [key: string]: string } = { top: 'top', bottom: 'bottom', start: 'start', end: 'end' };

const CSS_CLS_DISABLED = 'gln-disabled';
const CSS_ATTR_DISABLED = 'dis';
const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';
const CSS_PROP_LABEL_FONT_SIZE = '--glnsw--label-font-size';
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

  public checked: boolean | null = null; // Binding attribute "isChecked".
  public currConfig: GlnSwitchConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isWrapAndThumb: boolean = false;
  public idForInput = this.setIdForInput(this.id);
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
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
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimationVal == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
      this.settingNoAnimation(this.isNoAnimationVal);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRippleVal == null && this.currConfig.isNoRipple != null)) {
      this.isNoRippleVal = !!(BooleanUtil.init(this.isNoRipple) ?? (this.currConfig.isNoRipple || null));
      this.settingNoRipple(this.isNoRippleVal);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnlyVal == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = !!(BooleanUtil.init(this.isReadOnly) ?? (this.currConfig.isReadOnly || null));
      this.settingReadOnly(this.isReadOnlyVal);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequiredVal == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = !!(BooleanUtil.init(this.isRequired) ?? (this.currConfig.isRequired || null));
      this.settingRequired(this.isRequiredVal);
    }
    if (changes['position'] || (changes['config'] && this.positionVal == null && this.currConfig.position != null)) {
      this.settingClassAndAttrByPosition(this.positionVal, false);
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      this.positionVal = POSITION[positionStr] || POSITION['end'];
      this.settingClassAndAttrByPosition(this.positionVal, true);
    }

    if (changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // Set the TagIndex value if the flag 'disabled' is not set.
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', !this.disabled ? '' + this.tabIndex : null);

    this.prepareCssProperties(this.hostRef);

    const isChecked: boolean | null = BooleanUtil.init(this.isChecked) ?? (this.currConfig.isChecked || null);
    if (isChecked && !this.formControl.value) {
      this.formControl.setValue(true, { emitEvent: false });
      this.settingChecked(true);
    }

    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!(this.currConfig.isNoAnimation || null);
      this.settingNoAnimation(this.isNoAnimationVal);
    }
    if (this.isNoRippleVal == null) {
      this.isNoRippleVal = !!(this.currConfig.isNoRipple || null);
      this.settingNoRipple(this.isNoRippleVal);
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!(this.currConfig.isReadOnly || null);
      this.settingReadOnly(this.isReadOnlyVal);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!(this.currConfig.isRequired || null);
      this.settingRequired(this.isRequiredVal);
    }
    if (this.positionVal == null) {
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      this.positionVal = POSITION[positionStr] || POSITION['end'];
      this.settingClassAndAttrByPosition(this.positionVal, true);
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
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HIDE_ANIMATION_INIT, '');
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
      this.settingChecked(!!value);
      this.changeDetectorRef.markForCheck();
    }
    if (this.isRemoveAttrHideAnimation) {
      this.isRemoveAttrHideAnimation = false;
      Promise.resolve().then(() => {
        // Remove an attribute that disables animation on initialization.
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HIDE_ANIMATION_INIT, null);
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
    if (!this.disabled && !this.isReadOnlyVal && this.touchRipple) {
      this.touchRipple.touchRipple(event, true);
    }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.disabled && !this.isReadOnlyVal) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked(newValue);
      if (this.isRemoveAttrHideAnimation) {
        this.isRemoveAttrHideAnimation = false;
        // Remove an attribute that disables animation on initialization.
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HIDE_ANIMATION_INIT, null);
      }
      this.onChange(newValue);
      this.change.emit({ checked: newValue, source: this });
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected methods **

  // ** Private methods **

  private setIdForInput(id: string): string {
    return `${id}-input`;
  }

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
    const parentElem: HTMLElement | null = hostRef && hostRef.nativeElement ? hostRef.nativeElement.parentElement : null;
    const parentRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(parentElem);
    const parentFontSize: number = HtmlElemUtil.propertyAsNumber(parentRef, 'font-size');
    if (parentFontSize > 0) {
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_LABEL_FONT_SIZE, parentFontSize.toString().concat('px'));
    }
    if (hostRef && hostRef.nativeElement) {
      const hostElement: Element = hostRef.nativeElement;
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
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_TRACK_BORDER_RADIUS, trackBorderRadius.toString().concat('px'));

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
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_CONTAINER_PADDING, containerPadding.toString().concat('px'));

      // Determine the padding of the wrap element.
      const wrapPaddingNum = (3 * hostFontSize - thumbHeight) / 2;
      const wrapPadding = Math.round(wrapPaddingNum * 100) / 100;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_WRAP_PADDING, wrapPadding.toString().concat('px'));

      // Determine the shift of the wrap element.
      const containerLen = trackWidth + 2 * containerPadding;
      const wrapLen = thumbHeight + 2 * wrapPadding;
      const wrapShift = Math.round((containerLen - wrapLen) * 100) / 100;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_WRAP_SHIFT, wrapShift.toString().concat('px'));
    }
  }

  private settingChecked(isChecked: boolean): void {
    this.checked = isChecked;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-checked', isChecked);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'chk', isChecked ? '' : null);
  }
  private settingClassAndAttrByPosition(positionStr: string | null, isAdd: boolean): void {
    if (positionStr) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnsw-' + positionStr, isAdd);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'pos-' + positionStr[0], isAdd ? '' : null);
    }
  }
  private settingNoAnimation(isNoAnimationVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', isNoAnimationVal ? '' : null);
  }
  private settingNoRipple(isNoRippleVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-ripple', !!isNoRippleVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'norip', isNoRippleVal ? '' : null);
  }
  private settingReadOnly(isReadOnlyVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-read-only', !!isReadOnlyVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'rea', isReadOnlyVal ? '' : null);
  }
  private settingRequired(isRequiredVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-required', !!isRequiredVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'req', isRequiredVal ? '' : null);
  }
}

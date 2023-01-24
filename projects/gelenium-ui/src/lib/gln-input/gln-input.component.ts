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

import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameComponent } from '../gln-frame/gln-frame.component';
import { GlnInputType, GlnInputTypeUtil } from '../gln-input/gln-input.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnInputConfig } from './gln-input-config.interface';

let uniqueIdCounter = 0;

export const GLN_INPUT_CONFIG = new InjectionToken<GlnInputConfig>('GLN_INPUT_CONFIG');

@Component({
  selector: 'gln-input',
  exportAs: 'glnInput',
  templateUrl: './gln-input.component.html',
  styleUrls: ['./gln-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnInputComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnInputComponent },
  ],
})
export class GlnInputComponent implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator {
  @Input()
  public id = `glnin-${uniqueIdCounter++}`;
  @Input()
  public autoComplete = '';
  @Input()
  public config: GlnInputConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public helperText: string | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isPlaceholder: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public max: number | null | undefined;
  @Input()
  public maxLength: number | null | undefined;
  @Input()
  public min: number | null | undefined;
  @Input()
  public minLength: number | null | undefined;
  @Input()
  public ornamLfAlign: string | null | undefined; // OrnamAlignType
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlignType
  @Input()
  public pattern: string | RegExp = '';
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public step: number | null | undefined;
  @Input()
  public tabIndex: number = 0;
  @Input()
  public type: string = GlnInputType.text.valueOf();
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild(GlnFrameComponent, { static: true })
  public frameComp!: GlnFrameComponent;
  @ViewChild('inputElementRef', { static: true })
  public inputElementRef!: ElementRef<HTMLElement>;

  public currConfig: GlnInputConfig;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isAttrHideAnimation: boolean | undefined;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isErrorVal: boolean | null = null; // Binding attribute "isError".
  public isFocused = false;
  public isFilled = false;
  public isPlaceholderVal: boolean | null = null; // Binding attribute "isPlaceholder".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public typeVal: GlnInputType = GlnInputType.text;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_INPUT_CONFIG) private rootConfig: GlnInputConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-input', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isError'] || (changes['config'] && this.isError == null && this.currConfig.isError != null)) {
      this.isErrorVal = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (changes['ornamLfAlign'] || (changes['config'] && this.ornamLfAlign == null && this.currConfig.ornamLfAlign != null)) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamLfAlign || this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (changes['ornamRgAlign'] || (changes['config'] && this.ornamRgAlign == null && this.currConfig.ornamRgAlign != null)) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamRgAlign || this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
    if (changes['isPlaceholder'] || (changes['config'] && this.isPlaceholder == null && this.currConfig.isPlaceholder != null)) {
      this.isPlaceholderVal = BooleanUtil.init(this.isPlaceholder) ?? !!this.currConfig.isPlaceholder;
    }
    if (changes['type']) {
      this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
    }
    if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
      this.prepareFormGroup(this.isRequiredVal, this.minLength, this.maxLength);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.isErrorVal == null) {
      this.isErrorVal = !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (this.isPlaceholderVal == null) {
      this.isPlaceholderVal = !!this.currConfig.isPlaceholder;
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.ornamLfAlignVal == null) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (this.ornamRgAlignVal == null) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
  }

  public ngAfterContentInit(): void {
    // When using [(ngModel)] parentFormGroup will be null.
    if (!this.parentFormGroup) {
      // Add an attribute that disables animation on initialization.
      this.isAttrHideAnimation = true;
    }
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    if (isFilledOld !== this.isFilled) {
      this.changeDetectorRef.markForCheck();
    }
    if (this.isAttrHideAnimation) {
      // Remove an attribute that disables animation on initialization.
      this.isAttrHideAnimation = false;
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

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.isDisabledVal) {
      this.isFocused = true;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.focused.emit();
    }
  }

  public doBlur(): void {
    if (!this.isDisabledVal) {
      this.isFocused = false;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.isFilled = !!this.formControl.value;
      this.onTouched();
      this.blured.emit();
    }
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
    }
  }

  // ** Private methods **

  private prepareFormGroup(isRequired: boolean | null, minLength: number | null | undefined, maxLength: number | null | undefined): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    if (!!minLength && minLength > 0) {
      newValidator.push(Validators.minLength(minLength));
    }
    if (!!maxLength && maxLength > 0) {
      newValidator.push(Validators.maxLength(maxLength));
    }
    this.formControl.setValidators(newValidator);
  }

  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingFocus(focus: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
  private settingOrnamLfAlign(ornamLfAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }
}

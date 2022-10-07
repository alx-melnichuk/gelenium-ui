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
import { GlnFrameExterior } from '../gln-frame/gln-frame-exterior.interface';
import { GlnFrameSize } from '../gln-frame/gln-frame-size.interface';
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
  public frameSize: string | null | undefined; // GlnFrameSizeType
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
  public isNoLabel: string | boolean | null | undefined;
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
  public ornamLfAlign: string | null | undefined; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlign
  @Input()
  public pattern: string | RegExp = '';
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
  @ViewChild('inputElement')
  public inputElementRef: ElementRef<HTMLElement> | null = null;

  public get exteriorVal(): GlnFrameExterior | null {
    return this.frameComp.exteriorVal;
  }
  public get frameSizeVal(): GlnFrameSize | null {
    return this.frameComp.frameSizeVal;
  }
  public get frameSizeValue(): number {
    return this.frameComp.frameSizeValue;
  }
  public get labelShrink(): boolean | null {
    return this.frameComp.labelShrink;
  }
  public get noAnimation(): boolean | null {
    return this.frameComp.noAnimation;
  }

  public currConfig: GlnInputConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public error: boolean | null = null; // Binding attribute "isError".
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isAttrHideAnimation: boolean | undefined;
  public isFocused = false;
  public isFilled = false;
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public placeholder: boolean | null = null; // Binding attribute "isPlaceholder".
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".
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
      this.error = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.error, this.renderer, this.hostRef);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.readOnly = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.readOnly, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.required = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
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
      this.placeholder = BooleanUtil.init(this.isPlaceholder) ?? !!this.currConfig.isPlaceholder;
    }
    if (changes['type']) {
      this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
    }
    if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
      this.prepareFormGroup(this.required, this.minLength, this.maxLength);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.error == null) {
      this.error = !!this.currConfig.isError;
      this.settingError(this.error, this.renderer, this.hostRef);
    }
    if (this.placeholder == null) {
      this.placeholder = !!this.currConfig.isPlaceholder;
    }
    if (this.readOnly == null) {
      this.readOnly = !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.readOnly, this.renderer, this.hostRef);
    }
    if (this.required == null) {
      this.required = !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
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

  // ** ControlValueAccessor - start **

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
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', disabled ? '' : null);
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

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.isFocused = true;
    this.settingFocus(this.isFocused, this.renderer, this.hostRef);
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.settingFocus(this.isFocused, this.renderer, this.hostRef);
    this.isFilled = !!this.formControl.value;
    this.onTouched();
    this.blured.emit();
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
    }
  }

  // ** Private API **

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

  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
  private settingOrnamLfAlign(ornamLfAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }
}

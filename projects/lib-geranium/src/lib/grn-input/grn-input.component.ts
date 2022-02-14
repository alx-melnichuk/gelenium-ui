import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
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

import { GrnNodeInternalValidator, GRN_NODE_INTERNAL_VALIDATOR } from '../directives/grn-regex/grn-node-internal-validator.interface';
import { GRN_FRAME_INPUT_CONFIG } from '../grn-frame-input/grn-frame-input.component';
import { FrameSize, FrameSizeUtil } from '../_interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../_interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../_interfaces/input-exterior.interface';
import { OrnamAlign, OrnamAlignUtil } from '../_interfaces/ornam-align.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { InputLabelUtil } from '../_utils/input-label.util';
import { NumberUtil } from '../_utils/number.util';

import { InputType, InputTypeUtil } from './grn-input.interface';

let identifier = 0;

@Component({
  selector: 'grn-input',
  exportAs: 'grnInput',
  templateUrl: './grn-input.component.html',
  styleUrls: ['./grn-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GrnInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GrnInputComponent), multi: true },
    { provide: GRN_NODE_INTERNAL_VALIDATOR, useExisting: GrnInputComponent },
  ],
})
export class GrnInputComponent implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GrnNodeInternalValidator {
  @Input()
  public id = 'grn_input_' + ++identifier;
  @Input()
  public type: string = InputType.text.valueOf();
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: string | null = null; // InputExteriorType
  @Input()
  public frameSize: string | null = null; // FrameSizeType
  @Input()
  public lbShrink: string | null = null;
  @Input()
  public hiddenLabel: string | null = null;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public isError: string | null = null;
  @Input()
  public isRequired: string | null = null;
  @Input()
  public helperText: string | null = null;
  @Input()
  public isReadOnly: string | null = null;
  @Input()
  public pattern = '';
  @Input()
  public autoComplete = '';
  @Input()
  public wdFull: string | null = null;
  @Input()
  public step: number | null = null;
  @Input()
  public min: number | null = null;
  @Input()
  public max: number | null = null;
  @Input()
  public minLength: number | null = null;
  @Input()
  public maxLength: number | null = null;
  @Input()
  public ornamLfAlign: string | null = null; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null = null; // OrnamAlign

  @Output()
  readonly inputData: EventEmitter<Event> = new EventEmitter();
  @Output()
  readonly changeData: EventEmitter<Event> = new EventEmitter();
  @Output()
  readonly keydownData: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output()
  readonly keypressData: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output()
  readonly keyupData: EventEmitter<KeyboardEvent> = new EventEmitter();

  @ViewChild('inputElement')
  public inputElementRef: ElementRef<HTMLElement> | null = null;
  @ViewChild('grnOrnamentLf', { static: true })
  public grnOrnamentLf: ElementRef<HTMLElement> | undefined;
  @ViewChild('grnOrnamentRg', { static: true })
  public grnOrnamentRg: ElementRef<HTMLElement> | undefined;

  public get isOutlined(): boolean {
    return InputExteriorUtil.isOutlined(this.innExterior);
  }
  public get isUnderline(): boolean {
    return InputExteriorUtil.isUnderline(this.innExterior);
  }
  public get isStandard(): boolean {
    return InputExteriorUtil.isStandard(this.innExterior);
  }

  public currConfig: GrnFrameInputConfig = {};
  public innExterior: InputExterior | null = null;
  public exterior2: InputExterior | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;
  public isLabelShrink2: boolean | null = null; // Binding attribute "lbShrink".
  public isHiddenLabel2: boolean | null = null; // Binding attribute "hiddenLabel".
  public labelPadding: number | null = null;

  public typeVal: InputType = InputType.text;
  public isReadOnly2: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequired2: boolean | null = null; // Binding attribute "isRequired".
  public isDisabled2: boolean | null = null; // Binding attribute "isDisabled".
  public isError2: boolean | null = null; // Binding attribute "isError".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;
  public ornamLfAlign2: OrnamAlign = OrnamAlign.default;
  public ornamRgAlign2: OrnamAlign = OrnamAlign.default;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.initConfig(this.rootConfig || {});
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-input', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-control', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isModifyLabelPadding = false;
    if (changes.config) {
      this.currConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = InputExteriorUtil.convert(this.exterior);
      this.innExterior = InputExteriorUtil.create(this.exterior2 || this.currConfig.exterior || null);
      isModifyLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      this.innFrameSizeValue = this.createFrameSize(this.frameSize2 || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      this.labelPadding = InputLabelUtil.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd || null);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
    }
    if (changes.ornamLfAlign || (changes.config && !this.ornamLfAlign)) {
      this.ornamLfAlign2 = OrnamAlignUtil.convert(this.ornamLfAlign) || this.currConfig.ornamLfAlign || OrnamAlign.default;
      this.settingOrnamentLeft(this.grnOrnamentLf, this.ornamLfAlign2);
    }
    if (changes.ornamRgAlign || (changes.config && !this.ornamRgAlign)) {
      this.ornamRgAlign2 = OrnamAlignUtil.convert(this.ornamRgAlign) || this.currConfig.ornamRgAlign || OrnamAlign.default;
      this.settingOrnamentRight(this.grnOrnamentRg, this.ornamRgAlign2);
    }
    if (changes.lbShrink) {
      // this.isLabelShrink2 = this.lbShrink === '' || this.lbShrink === 'true' ? true : this.lbShrink === 'false' ? false : null;
      this.isLabelShrink2 = BooleanUtil.init(this.lbShrink);
    }
    if (changes.hiddenLabel) {
      // this.isHiddenLabel2 = this.hiddenLabel === '' || this.hiddenLabel === 'true' ? true : this.hiddenLabel === 'false' ? false : null;
      this.isHiddenLabel2 = BooleanUtil.init(this.hiddenLabel);
    }
    if (changes.type) {
      this.typeVal = InputTypeUtil.create(this.type) || InputType.text;
    }
    if (changes.isDisabled) {
      this.isDisabled2 = BooleanUtil.init(this.isDisabled);
      this.setDisabled(this.isDisabled2);
    }
    if (changes.isError) {
      this.isError2 = BooleanUtil.init(this.isError);
    }
    if (changes.isRequired) {
      this.isRequired2 = BooleanUtil.init(this.isRequired);
    }
    if (changes.isReadOnly) {
      this.isReadOnly2 = BooleanUtil.init(this.isReadOnly);
    }

    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.isRequired2, this.minLength, this.maxLength);
    }
  }

  ngOnInit(): void {
    let isModifyLabelPadding = false;
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
      isModifyLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      this.labelPadding = InputLabelUtil.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd || null);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
    }
  }

  ngAfterViewInit(): void {
    if (this.ornamLfAlign2) {
      // Determine new parameter values that depend on: grnOrnamentLf, ornamLfAlign2.
      this.settingOrnamentLeft(this.grnOrnamentLf, this.ornamLfAlign2);
    }
    if (this.ornamRgAlign2) {
      // Determine new parameter values that depend on: grnOrnamentRg, ornamRgAlign2.
      this.settingOrnamentRight(this.grnOrnamentRg, this.ornamRgAlign2);
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    if (isFilledOld !== this.isFilled) {
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

  public setDisabled(isDisabled: boolean | null): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return !control ? null : this.formControl.errors;
  }

  // ** Validator - finish **

  // ** GrnNodeInternalValidator - start **

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

  // ** GrnNodeInternalValidator - finish **

  // ** Public API **

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.isFocused = true;
  }

  public doBlur(): void {
    this.isFocused = false;
    this.isFilled = !!this.formControl.value;
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.inputData.emit(event);
      this.onChange(this.formControl.value);
    }
  }

  public doChange(event: Event): void {
    this.changeData.emit(event);
  }

  public doKeydown(event: KeyboardEvent): void {
    this.keydownData.emit(event);
  }

  public doKeypress(event: KeyboardEvent): void {
    this.keypressData.emit(event);
  }

  public doKeyup(event: KeyboardEvent): void {
    this.keyupData.emit(event);
  }

  // ** Private API **

  private prepareFormGroup(isRequired: boolean | null, minLength: number | null, maxLength: number | null): void {
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

  private initConfig(config: GrnFrameInputConfig): GrnFrameInputConfig {
    this.ornamLfAlign2 = OrnamAlignUtil.create(config?.ornamLfAlign || this.ornamLfAlign2, null);
    this.ornamRgAlign2 = OrnamAlignUtil.create(config?.ornamRgAlign || this.ornamRgAlign2, null);
    return config;
  }

  private createFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.create(frameSizeInp);
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }

  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--pd-lf', NumberUtil.str(labelPadding)?.concat('px'));
  }

  private settingOrnamentLeft(ornamentLf: ElementRef<HTMLElement> | undefined, ornamLfAlign: OrnamAlign): void {
    HtmlElemUtil.setAttr(this.renderer, ornamentLf, 'orn-lf', ornamLfAlign.toString());
  }

  private settingOrnamentRight(ornamentRg: ElementRef<HTMLElement> | undefined, ornamRgAlign: OrnamAlign): void {
    HtmlElemUtil.setAttr(this.renderer, ornamentRg, 'orn-rg', ornamRgAlign.toString());
  }
}

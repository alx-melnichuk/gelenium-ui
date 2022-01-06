import { isPlatformBrowser } from '@angular/common';
import {
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
import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { OrnamAlign, OrnamAlignUtil } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { LabelPaddingUtil } from '../utils/label-padding.util';

let identifier = 0;

@Component({
  selector: 'grn-textarea',
  exportAs: 'grnTextarea',
  templateUrl: './grn-textarea.component.html',
  styleUrls: ['./grn-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GrnTextareaComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GrnTextareaComponent), multi: true },
    { provide: GRN_NODE_INTERNAL_VALIDATOR, useExisting: GrnTextareaComponent },
  ],
})
export class GrnTextareaComponent implements OnChanges, OnInit, ControlValueAccessor, Validator, GrnNodeInternalValidator {
  @Input()
  public id = 'grn_textarea_' + ++identifier;
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: string | null = null; // ExteriorType
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
  public autoComplete = '';
  @Input()
  public wdFull: string | null = null;
  @Input()
  public minLength: number | null = null;
  @Input()
  public maxLength: number | null = null;
  @Input()
  public minRows: number | null = null;
  @Input()
  public cntRows: number | null = null;
  @Input()
  public maxRows: number | null = null;
  @Input()
  public cntCols: number | null = null;

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

  @ViewChild('textareaElement')
  public textareaElementRef: ElementRef | null = null;

  public get isOutlined(): boolean {
    return ExteriorUtil.isOutlined(this.innExterior);
  }
  public get isUnderline(): boolean {
    return ExteriorUtil.isUnderline(this.innExterior);
  }
  public get isStandard(): boolean {
    return ExteriorUtil.isStandard(this.innExterior);
  }

  public currConfig: GrnFrameInputConfig = {};
  public exterior2: Exterior | null = null;
  public innExterior: Exterior | null = null;
  public frameSize2: FrameSize | null = null;
  public innFrameSizeValue = 0;
  public isLabelShrink2: boolean | null = null; // Binding attribute "lbShrink".
  public isHiddenLabel2: boolean | null = null; // Binding attribute "hiddenLabel".
  public labelPadding = 0;

  public isReadOnly2 = false; // Binding attribute "isReadOnly".
  public isRequired2 = false; // Binding attribute "isRequired".
  public isDisabled2 = false; // Binding attribute "isDisabled".
  public isError2 = false; // Binding attribute "isError".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;
  public ornamLfAlign: OrnamAlign = OrnamAlign.default;
  public ornamRgAlign: OrnamAlign = OrnamAlign.default;
  public currentRows = 1;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.initConfig(this.rootConfig || {});
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-textarea', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-control', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isLabelPadding = false;
    if (changes.config) {
      console.log('%Text.OnChanges config=', this.config);
      this.currConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      console.log('%Text.OnChanges exterior=', this.exterior);
      this.exterior2 = ExteriorUtil.convert(this.exterior);
      this.innExterior = this.updateExterior(this.exterior2 || this.currConfig.exterior || null);
      isLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      console.log('%Text.OnChanges frameSize=', this.frameSize);
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      const configFrameSizeValue = this.currConfig.frameSizeValue;
      this.innFrameSizeValue = this.updateFrameSizeValue(this.frameSize2 || this.currConfig.frameSize || null, configFrameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      const labelPd = this.currConfig?.labelPd || 0;
      this.labelPadding = labelPd > 0 ? labelPd : LabelPaddingUtil.hor(this.innFrameSizeValue, this.innExterior);
      this.setPropertyLabelPaddingHor(this.labelPadding);
    }
    if (changes.lbShrink) {
      this.isLabelShrink2 = this.lbShrink === '' || this.lbShrink === 'true' ? true : this.lbShrink === 'false' ? false : null;
    }
    if (changes.hiddenLabel) {
      this.isHiddenLabel2 = this.hiddenLabel !== null;
    }
    if (changes.isDisabled) {
      this.isDisabled2 = this.isDisabled !== null;
      this.setDisabledState(this.isDisabled2);
    }
    if (changes.isError) {
      this.isError2 = this.isError !== null;
    }
    if (changes.isRequired) {
      this.isRequired2 = this.isRequired !== null;
    }
    if (changes.isReadOnly) {
      this.isReadOnly2 = this.isReadOnly !== null;
    }

    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.isRequired2, this.minLength, this.maxLength);
    }
    if (changes.minRows || changes.maxRows) {
      this.updateCurrentRows('', this.cntRows, this.minRows, this.maxRows);
    }
    if (changes.cntRows) {
      this.currentRows = this.cntRows != null && this.cntRows > 0 ? this.cntRows : this.currentRows;
    }
  }

  ngOnInit(): void {
    let isLabelPadding = false;
    if (this.innExterior == null) {
      console.log('%Text.OnInit exterior=', this.exterior);
      this.innExterior = this.updateExterior(this.currConfig.exterior || null);
      isLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      console.log('%Text.OnInit frameSize=', this.frameSize);
      const configFrameSizeValue = this.currConfig.frameSizeValue;
      this.innFrameSizeValue = this.updateFrameSizeValue(this.currConfig.frameSize || null, configFrameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      const labelPd = this.currConfig?.labelPd || 0;
      const labelPadding = labelPd > 0 ? labelPd : LabelPaddingUtil.hor(this.innFrameSizeValue, this.innExterior);
      this.setPropertyLabelPaddingHor(labelPadding);
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
    const cntLinesOld = this.getNumberLines(this.formControl.value);
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    const cntLines = this.getNumberLines(this.formControl.value);
    if (cntLinesOld != cntLines) {
      this.updateCurrentRows(this.formControl.value, this.cntRows, this.minRows, this.maxRows);
    }
    if (isFilledOld !== this.isFilled || cntLinesOld != cntLines) {
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

  public setDisabledState(isDisabled: boolean): void {
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
    if (isPlatformBrowser(this.platformId) && !!this.textareaElementRef) {
      (this.textareaElementRef.nativeElement as HTMLInputElement).focus();
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
      this.updateCurrentRows(this.formControl.value, this.cntRows, this.minRows, this.maxRows);
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

  public doClickFrame(): void {
    this.focus();
  }

  // ** Private API **

  private prepareFormGroup(isRequired: boolean, minLength: number | null, maxLength: number | null): void {
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
    this.ornamLfAlign = OrnamAlignUtil.create(config?.ornamLfAlign || this.ornamLfAlign, null);
    this.ornamRgAlign = OrnamAlignUtil.create(config?.ornamRgAlign || this.ornamRgAlign, null);
    return config;
  }

  private updateExterior(exterior: Exterior | null): Exterior {
    const result: Exterior = ExteriorUtil.create(exterior);
    console.log(`%Text.updateExterior() exterior="${exterior}" innExterior=${result}`); // TODO del;
    return result;
  }

  private updateFrameSizeValue(frameSize: FrameSize | null, frameSizeValue?: number): number {
    let result = FrameSizeUtil.getValue(FrameSizeUtil.create(frameSize)) || 0;
    if (frameSize === null && frameSizeValue && frameSizeValue > 0) {
      result = frameSizeValue;
    }
    console.log(`%Text.updateFrameSize() frameSize="${frameSize}" innFrameSizeValue=${result}`); // TODO del;
    return result;
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    const labelPaddingPx = labelPadding != null ? labelPadding + 'px' : labelPadding;
    HtmlElemUtil.setProperty(this.hostRef, '--pd-lf', labelPaddingPx);
  }

  private getNumberLines(value: string): number {
    return (value || '').split('\n').length;
  }

  private updateCurrentRows(value: string, cntRows: number | null, minRows: number | null, maxRows: number | null): void {
    if (!cntRows) {
      let result = this.getNumberLines(value);
      if (!!minRows && minRows > 0 && minRows > result) {
        result = minRows;
      }
      if (!!maxRows && maxRows > 0 && result > maxRows) {
        result = maxRows;
      }
      this.currentRows = result > 0 ? result : 1;
    }
  }
}

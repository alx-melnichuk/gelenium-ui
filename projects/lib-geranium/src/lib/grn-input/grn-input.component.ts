import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  PLATFORM_ID,
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
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { OrnamAlign, OrnamAlignUtil } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { LabelPaddingUtil } from '../utils/label-padding.util';

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
export class GrnInputComponent implements OnChanges, ControlValueAccessor, Validator, GrnNodeInternalValidator {
  @Input()
  public id = 'grn_input_' + ++identifier;
  @Input()
  public type: string = InputType.text.valueOf();
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
  public helperText: string | null = null;
  @Input()
  public isRequired: string | null = null;
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
  public inputElementRef: ElementRef | null = null;
  @HostBinding('class')
  public get getClassesRoot(): string[] {
    return ['GrnControl', 'GrnInputField'];
  }

  public typeVal: InputType = InputType.text;
  public exteriorVal: Exterior = ExteriorUtil.create(null, null);
  public isReadOnlyVal = false; // Binding attribute "isReadOnly".
  public isRequiredVal = false; // Binding attribute "isRequired".
  public isDisabledVal = false; // Binding attribute "isDisabled".
  public isLabelShrink: boolean | null = null; // Binding attribute "lbShrink".
  public frameSizeVal: FrameSize = FrameSizeUtil.create(null, null);
  public isHiddenLabel: boolean | null = null; // Binding attribute "hiddenLabel".
  public isErrorVal = false; // Binding attribute "isError".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;

  public ornamLfAlign: OrnamAlign = OrnamAlign.default;
  public ornamRgAlign: OrnamAlign = OrnamAlign.default;
  public actualConfig: GrnFrameInputConfig;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>
  ) {
    this.actualConfig = this.initConfig(this.rootConfig || {});
    const labelPadding = this.getLabelPadding(this.exteriorVal, this.frameSizeVal, this.actualConfig) || 0;
    this.setPropertyLabelPaddingHor(labelPadding);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.actualConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.type) {
      this.typeVal = InputTypeUtil.create(this.type) || InputType.text;
    }
    if (changes.exterior) {
      this.exteriorVal = ExteriorUtil.create(ExteriorUtil.convert(this.exterior), this.actualConfig?.exterior || null);
    }
    if (changes.frameSize) {
      this.frameSizeVal = FrameSizeUtil.create(FrameSizeUtil.convert(this.frameSize), this.actualConfig?.frameSize || null);
    }
    if (changes.exterior || changes.frameSize) {
      const labelPadding = this.getLabelPadding(this.exteriorVal, this.frameSizeVal, this.actualConfig) || 0;
      this.setPropertyLabelPaddingHor(labelPadding);
    }
    if (changes.lbShrink) {
      this.isLabelShrink = this.lbShrink === '' || this.lbShrink === 'true' ? true : this.lbShrink === 'false' ? false : null;
    }
    if (changes.hiddenLabel) {
      this.isHiddenLabel = this.hiddenLabel !== null;
    }
    if (changes.isDisabled) {
      this.isDisabledVal = this.isDisabled !== null;
      this.setDisabledState(this.isDisabledVal);
    }
    if (changes.isError) {
      this.isErrorVal = this.isError !== null;
    }
    if (changes.isRequired) {
      this.isRequiredVal = this.isRequired !== null;
    }
    if (changes.isReadOnly) {
      this.isReadOnlyVal = this.isReadOnly !== null;
    }

    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.isRequiredVal, this.minLength, this.maxLength);
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

  private prepareFormGroup(isRequiredVal: boolean, minLength: number | null, maxLength: number | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequiredVal) {
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

  private getLabelPadding(exteriorVal: Exterior, frameSizeVal: FrameSize, actualConfig: GrnFrameInputConfig): number | null {
    const frameSizePx = FrameSizeUtil.getValue(frameSizeVal) || 0;
    return LabelPaddingUtil.hor(frameSizePx, exteriorVal, actualConfig) || 0;
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    const labelPaddingPx = labelPadding != null ? labelPadding + 'px' : labelPadding;
    HtmlElemUtil.setProperty(this.hostRef, '--pd-lf', labelPaddingPx);
  }
}

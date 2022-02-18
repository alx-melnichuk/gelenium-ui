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
import { GrnSizePaddingVerHorRes } from '../_interfaces/grn-size-prepare-data.interface';
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
  public autoComplete = '';
  @Input()
  public wdFull: string | null = null;
  @Input()
  public pattern = '';
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
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild('inputElement')
  public inputElementRef: ElementRef<HTMLElement> | null = null;

  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.middle) || 0;
  public currConfig: GrnFrameInputConfig = {};
  public exterior2: InputExterior | null = null;
  public frameSize2: FrameSize | null = null;
  public isLabelShrink2: boolean | null = null; // Binding attribute "lbShrink".
  public isHiddenLabel2: boolean | null = null; // Binding attribute "hiddenLabel".
  public typeVal: InputType = InputType.text;
  public isDisabled2: boolean | null = null; // Binding attribute "isDisabled".
  public isError2: boolean | null = null; // Binding attribute "isError".
  public isRequired2: boolean | null = null; // Binding attribute "isRequired".
  public isReadOnly2: boolean | null = null; // Binding attribute "isReadOnly".
  public ornamLfAlign2: OrnamAlign = OrnamAlign.default;
  public ornamRgAlign2: OrnamAlign = OrnamAlign.default;

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;

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
    if (changes.type) {
      this.typeVal = InputTypeUtil.create(this.type) || InputType.text;
    }
    if (changes.config) {
      this.currConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = InputExteriorUtil.convert(this.exterior);
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
    }
    if (changes.lbShrink) {
      this.isLabelShrink2 = BooleanUtil.init(this.lbShrink);
    }
    if (changes.hiddenLabel) {
      this.isHiddenLabel2 = BooleanUtil.init(this.hiddenLabel);
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
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.isFilled = !!this.formControl.value;
    this.blured.emit();
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
    }
  }

  // ** Formation of additional parameters. **

  public doSizeChange(paddingVerHor: GrnSizePaddingVerHorRes): void {
    // paddingHor
    const left = paddingVerHor.left;
    const right = paddingVerHor.right;

    const pdLfRgWd = Math.round(1.66 * (left + right) * 100) / 100;
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-wd', NumberUtil.str(pdLfRgWd)?.concat('px'));

    HtmlElemUtil.setProperty(this.hostRef, '--he-pd-lf', NumberUtil.str(left || null)?.concat('px'));

    // paddingVer
    const frameSizeValue = paddingVerHor.frameSizeValue;
    const lineHeight = paddingVerHor.lineHeight;
    const exterior = InputExteriorUtil.convert(paddingVerHor.exterior);

    const translateVer = InputLabelUtil.translateVer(exterior, frameSizeValue, lineHeight);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-trn-y', NumberUtil.str(translateVer.translateY)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-trn-y', NumberUtil.str(translateVer.translateY2)?.concat('px'));
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
}

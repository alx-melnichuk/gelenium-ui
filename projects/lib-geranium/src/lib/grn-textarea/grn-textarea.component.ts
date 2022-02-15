import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
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
import {
  GrnSizeBorderRadius,
  GrnSizePaddingHor,
  GrnSizePaddingHorRes,
  GrnSizePaddingVer,
  GrnSizePaddingVerRes,
} from '../directives/grn-size/grn-size.directive';
import { GRN_FRAME_INPUT_CONFIG } from '../grn-frame-input/grn-frame-input.component';
import { GrnFrameProperties } from '../_classes/grn-frame-properties';
import { FrameSize, FrameSizeUtil } from '../_interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../_interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../_interfaces/input-exterior.interface';
import { OrnamAlign, OrnamAlignUtil } from '../_interfaces/ornam-align.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

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
export class GrnTextareaComponent
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GrnNodeInternalValidator
{
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

  @ViewChild('textareaElement')
  public textareaElementRef: ElementRef | null = null;
  @ViewChild('grnOrnamentLf', { static: true })
  public grnOrnamentLf: ElementRef<HTMLElement> | undefined;
  @ViewChild('grnOrnamentRg', { static: true })
  public grnOrnamentRg: ElementRef<HTMLElement> | undefined;

  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.middle) || 0;
  public currConfig: GrnFrameInputConfig = {};
  public exterior2: InputExterior | null = null;
  public innExterior: InputExterior | null = null;
  public frameSize2: FrameSize | null = null;
  public isLabelShrink2: boolean | null = null; // Binding attribute "lbShrink".
  public isHiddenLabel2: boolean | null = null; // Binding attribute "hiddenLabel".
  public isDisabled2: boolean | null = null; // Binding attribute "isDisabled".
  public isError2: boolean | null = null; // Binding attribute "isError".
  public isRequired2: boolean | null = null; // Binding attribute "isRequired".
  public isReadOnly2: boolean | null = null; // Binding attribute "isReadOnly".
  public ornamLfAlign2: OrnamAlign = OrnamAlign.default;
  public ornamRgAlign2: OrnamAlign = OrnamAlign.default;

  public ornamentLfWidth = 0;
  public ornamentRgWidth = 0;

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;
  public currentRows = 1;

  private frameProperties: GrnFrameProperties = new GrnFrameProperties(this.hostRef);

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
    if (changes.config) {
      this.currConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = InputExteriorUtil.convert(this.exterior);
      this.innExterior = InputExteriorUtil.create(this.exterior2 || this.currConfig.exterior || null);
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
    if (changes.ornamLfAlign || (changes.config && !this.ornamLfAlign)) {
      this.ornamLfAlign2 = OrnamAlignUtil.convert(this.ornamLfAlign) || this.currConfig.ornamLfAlign || OrnamAlign.default;
      this.settingOrnamentLeft(this.grnOrnamentLf, this.ornamLfAlign2);
    }
    if (changes.ornamRgAlign || (changes.config && !this.ornamRgAlign)) {
      this.ornamRgAlign2 = OrnamAlignUtil.convert(this.ornamRgAlign) || this.currConfig.ornamRgAlign || OrnamAlign.default;
      this.settingOrnamentRight(this.grnOrnamentRg, this.ornamRgAlign2);
    }

    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.isRequired2, this.minLength, this.maxLength);
    }
    if (changes.minRows || changes.maxRows) {
      this.currentRows = this.getCurrentRows('', this.cntRows, this.minRows, this.maxRows);
    }
    if (changes.cntRows) {
      this.currentRows = this.cntRows != null && this.cntRows > 0 ? this.cntRows : this.currentRows;
    }
  }

  ngOnInit(): void {
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
    }
  }

  ngAfterContentInit(): void {
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || 0;
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
    const cntLinesOld = this.getNumberLines(this.formControl.value);
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    const cntLines = this.getNumberLines(this.formControl.value);
    if (cntLinesOld != cntLines) {
      this.currentRows = this.getCurrentRows(this.formControl.value, this.cntRows, this.minRows, this.maxRows);
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
      this.currentRows = this.getCurrentRows(this.formControl.value, this.cntRows, this.minRows, this.maxRows);
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

  // ** Methods for interacting with GrnSizeDirective. **

  public getSizeBorderRadius: GrnSizeBorderRadius = (frameSizeValue: number, lineHeight: number): string => {
    return this.frameProperties.valueSizeBorderRadius(frameSizeValue, lineHeight, this.innExterior);
  };
  public getSizePaddingHor: GrnSizePaddingHor = (frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes => {
    return this.frameProperties.valueSizePaddingHor(
      frameSizeValue,
      lineHeight,
      this.innExterior,
      this.currConfig.labelPd || null,
      this.ornamentLfWidth,
      this.ornamentRgWidth
    );
  };
  public getSizePaddingVer: GrnSizePaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes => {
    return this.frameProperties.valueSizePaddingVer(frameSizeValue, lineHeight, this.innExterior);
  };

  // ** - **

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

  private getCurrentRows(value: string, cntRows: number | null, minRows: number | null, maxRows: number | null): number {
    let result = 1;
    if (!cntRows) {
      result = this.getNumberLines(value);
      if (!!minRows && minRows > 0 && minRows > result) {
        result = minRows;
      }
      if (!!maxRows && maxRows > 0 && result > maxRows) {
        result = maxRows;
      }
    }
    return result || 1;
  }

  private getNumberLines(value: string): number {
    return (value || '').split('\n').length;
  }

  private initConfig(config: GrnFrameInputConfig): GrnFrameInputConfig {
    this.ornamLfAlign2 = OrnamAlignUtil.create(config?.ornamLfAlign || this.ornamLfAlign2, null);
    this.ornamRgAlign2 = OrnamAlignUtil.create(config?.ornamRgAlign || this.ornamRgAlign2, null);
    return config;
  }

  private settingOrnamentLeft(ornamentLf: ElementRef<HTMLElement> | undefined, ornamLfAlign: OrnamAlign): void {
    HtmlElemUtil.setAttr(this.renderer, ornamentLf, 'orn-lf', ornamLfAlign.toString());
  }

  private settingOrnamentRight(ornamentRg: ElementRef<HTMLElement> | undefined, ornamRgAlign: OrnamAlign): void {
    HtmlElemUtil.setAttr(this.renderer, ornamentRg, 'orn-rg', ornamRgAlign.toString());
  }
}

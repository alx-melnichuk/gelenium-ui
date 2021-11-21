import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges,
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
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeType, FrameSizeUtil } from '../interfaces/frame-size.interface';

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
  ],
})
export class GrnTextareaComponent implements OnChanges, ControlValueAccessor, Validator {
  @Input()
  public id = 'grn_textarea_' + ++identifier;
  @Input()
  public label = '';
  @Input()
  public exterOutlined: string | null = null;
  @Input()
  public exterUnderline: string | null = null;
  @Input()
  public exterStandard: string | null = null;
  @Input()
  public isReadOnly: string | null = null;
  @Input()
  public isRequired: string | null = null;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public lbShrink: string | null = null;
  @Input()
  public frameSize: FrameSizeType | null = null;
  @Input()
  public hiddenLabel: string | null = null;
  @Input()
  public isError: string | null = null;
  @Input()
  public autoComplete = '';
  @Input()
  public helperText: string | null = null;
  @Input()
  public minLength: string | null = null;
  @Input()
  public maxLength: string | null = null;
  @Input()
  public minRows: string | null = null;
  @Input()
  public cntRows: string | null = null;
  @Input()
  public maxRows: string | null = null;

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
  @HostBinding('class')
  public get getClassesRoot(): string[] {
    return ['GrnControl', 'GrnTextareaField'];
  }
  // @HostBinding('style')
  // public get getStyle(): string | null {
  //   // const value = this.numberLines > 0 ? this.numberLines : null;
  //   return ''; // value != null ? '--gt-number-lines: ' + value + ';' : '';
  // }

  public exterior: Exterior = Exterior.standard;
  public isReadOnlyVal = false; // Binding attribute "isReadOnly".
  public isRequiredVal = false; // Binding attribute "isRequired".
  public isDisabledVal = false; // Binding attribute "isDisabled".
  public isLabelShrink = false; // Binding attribute "lbShrink".
  public isOrnament = false;
  public frameSizeVal: FrameSize | null = FrameSize.wide;
  public hiddenLabelVal = false; // Binding attribute "hiddenLabel".
  public isErrorVal = false; // Binding attribute "isError".

  public get isOutlinedExterior(): boolean {
    return ExteriorUtil.isOutlined(this.exterior);
  }
  public get isUnderlineExterior(): boolean {
    return ExteriorUtil.isUnderline(this.exterior);
  }
  public get isStandardExterior(): boolean {
    return ExteriorUtil.isStandard(this.exterior);
  }

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;
  public isHelperTextFilled = false;

  public currentRows = 1;
  public minRowsVal = 0;
  public cntRowsVal = 0;
  public maxRowsVal = 0;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exterOutlined || changes.exterUnderline || changes.exterStandard) {
      this.exterior = ExteriorUtil.setExterior(this.exterOutlined, this.exterUnderline, this.exterStandard);
    }
    this.isReadOnlyVal = changes.isReadOnly ? this.isReadOnly !== null : this.isReadOnlyVal;
    this.isRequiredVal = changes.isRequired ? this.isRequired !== null : this.isRequiredVal;

    if (changes.isDisabled) {
      this.isDisabledVal = this.isDisabled !== null;
      this.setDisabledState(this.isDisabledVal);
    }
    this.isLabelShrink = changes.lbShrink ? this.lbShrink !== null : this.isLabelShrink;

    if (changes.frameSize) {
      this.frameSizeVal = FrameSizeUtil.create(this.frameSize || FrameSize.wide.valueOf());
    }
    this.hiddenLabelVal = changes.hiddenLabel ? this.hiddenLabel !== null : this.hiddenLabelVal;
    this.isErrorVal = changes.isError ? this.isError !== null : this.isErrorVal;
    this.isHelperTextFilled = changes.helperText ? !!this.helperText : this.isHelperTextFilled;

    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.isRequiredVal, this.parseNumber(this.minLength || '', -1), this.parseNumber(this.maxLength || '', -1));
    }

    if (changes.minRows) {
      this.minRowsVal = this.parseNumber(this.minRows || '', 0);
    }
    if (changes.cntRows) {
      this.cntRowsVal = this.parseNumber(this.cntRows || '', 0);
      this.currentRows = this.cntRowsVal > 0 ? this.cntRowsVal : this.currentRows;
    }
    if (changes.maxRows) {
      this.maxRowsVal = this.parseNumber(this.maxRows || '', 0);
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = !!this.formControl.value;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
  }

  // ** Validator - finish **

  // ** Public API **

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.textareaElementRef) {
      this.textareaElementRef.nativeElement.focus();
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
    this.inputData.emit(event);
    this.onChange(this.formControl.value);
    if (this.cntRowsVal === 0) {
      this.updateHeight(this.getNumberLines(this.formControl.value), this.minRowsVal, this.maxRowsVal);
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

  public getClassForHelperText(isError: boolean, isDisabled: boolean): string {
    let result = 'plt-clr-default';
    if (isError) {
      result = 'plt-clr-error';
    } else if (isDisabled) {
      result = 'plt-clr-disabled';
    }
    return result;
  }

  // ** Private API **

  private prepareFormGroup(isRequiredVal: boolean, minLength: number, maxLength: number): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequiredVal) {
      newValidator.push(Validators.required);
    }
    if (minLength > 0) {
      newValidator.push(Validators.minLength(minLength));
    }
    if (maxLength > 0) {
      newValidator.push(Validators.maxLength(maxLength));
    }
    this.formControl.setValidators(newValidator);
  }

  private parseNumber(value: string, defaultValue: number): number {
    let result = defaultValue;
    if (value) {
      const valueFloat: number = parseFloat(value);
      if (!isNaN(valueFloat) && isFinite(valueFloat)) {
        result = valueFloat;
      }
    }
    return result;
  }

  private getNumberLines(value: string): number {
    return (value || '').split('\n').length;
  }

  private updateHeight(numberLines: number, minRowsVal: number, maxRowsVal: number): void {
    let currentRows = numberLines;
    if (minRowsVal > 0 && minRowsVal > currentRows) {
      currentRows = minRowsVal;
    }
    if (maxRowsVal > 0 && currentRows > maxRowsVal) {
      currentRows = maxRowsVal;
    }
    this.currentRows = currentRows > 0 ? currentRows : 1;
  }
}

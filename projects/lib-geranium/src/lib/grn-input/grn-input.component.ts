import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';

import { InputType, InputTypeUtil } from './grn-input.interface';
import { GrnOrnamentEndDirective } from './grn-ornament-end.directive';
import { GrnOrnamentDirective } from './grn-ornament.directive';

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
  ],
})
export class GrnInputComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input()
  public id = 'grn_input_' + ++identifier;
  @Input()
  public type: string = InputType.text.valueOf();
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
  public szShort: string | null = null;
  @Input()
  public szSmall: string | null = null;
  @Input()
  public szMiddle: string | null = null;
  @Input()
  public szNormal: string | null = null;
  @Input()
  public szLarge: string | null = null;
  @Input()
  public szHuge: string | null = null;
  @Input()
  public hiddenLabel: string | null = null;
  @Input()
  public isError: string | null = null;
  @Input()
  public pattern = '';
  @Input()
  public onlyByRegex = '';
  @Input()
  public autoComplete = '';
  @Input()
  public helperText: string | null = null;
  @Input()
  public step: string | null = null;
  @Input()
  public min: string | null = null;
  @Input()
  public max: string | null = null;
  @Input()
  public minLength: string | null = null;
  @Input()
  public maxLength: string | null = null;

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
  @ContentChild(GrnOrnamentDirective, { static: true })
  public grnOrnament: GrnOrnamentDirective | undefined;
  @ContentChild(GrnOrnamentEndDirective, { static: true })
  public grnOrnamentEnd: GrnOrnamentEndDirective | undefined;
  @HostBinding('class')
  public get getClassesRoot(): string[] {
    return ['GrnControl', 'GrnInputField'];
  }

  public typeVal: InputType = InputType.text;
  public exterior: Exterior = Exterior.standard;
  public isReadOnlyVal = false; // Binding attribute "isReadOnly".
  public isRequiredVal = false; // Binding attribute "isRequired".
  public isDisabledVal = false; // Binding attribute "isDisabled".
  public isLabelShrink = false; // Binding attribute "lbShrink".
  public isOrnament = false;
  public frameSize: FrameSize | null = null;
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.typeVal = (InputTypeUtil.create(this.type) as InputType) || InputType.text;
    }
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

    if (changes.szShort || changes.szSmall || changes.szMiddle || changes.szNormal || changes.szLarge || changes.szHuge) {
      this.frameSize = FrameSizeUtil.setFrameSize(this.szShort, this.szSmall, this.szMiddle, this.szNormal, this.szLarge, this.szHuge);
    }

    this.hiddenLabelVal = changes.hiddenLabel ? this.hiddenLabel !== null : this.hiddenLabelVal;
    this.isErrorVal = changes.isError ? this.isError !== null : this.isErrorVal;
    this.isHelperTextFilled = changes.helperText ? !!this.helperText : this.isHelperTextFilled;

    const minLength = changes.minLength ? (this.minLength as string) : '';
    const maxLength = changes.maxLength ? (this.maxLength as string) : '';
    if (changes.isRequired || !!minLength || !!maxLength) {
      this.prepareFormGroup(this.isRequiredVal, this.parseNumber(minLength, -1), this.parseNumber(maxLength, -1));
    }
  }

  ngOnInit(): void {
    this.isOrnament = this.grnOrnament || this.grnOrnamentEnd ? true : false;
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
    this.inputData.emit(event);
    this.onChange(this.formControl.value);
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
}

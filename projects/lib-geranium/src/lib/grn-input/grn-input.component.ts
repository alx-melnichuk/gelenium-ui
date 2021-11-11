import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
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
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe.decorator';
import { FrameSize } from '../grn-frame-input/grn-frame-input.interface';

import { ExteriorValue, ExteriorValueUtil, InputType, InputTypeUtil } from './grn-input.interface';
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
@AutoUnsubscribe()
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

  @ViewChild('inputElement')
  public inputElement: ElementRef | null = null;

  @ContentChild(GrnOrnamentDirective, { static: true })
  public grnOrnament: GrnOrnamentDirective | undefined;

  @ContentChild(GrnOrnamentEndDirective, { static: true })
  public grnOrnamentEnd: GrnOrnamentEndDirective | undefined;

  @HostBinding('class')
  public get getClassesRoot(): string[] {
    return ['Grn-control', 'GrnFormControl-root', 'GrnTextField-root'];
  }

  public typeVal: InputType = InputType.text;
  public exteriorValue: ExteriorValue = ExteriorValue.standard;
  public isReadOnlyVal = false; // Binding attribute "isReadOnly".
  public isRequiredVal = false; // Binding attribute "isRequired".
  public isDisabledVal = false; // Binding attribute "isDisabled".
  public isLabelShrink = false; // Binding attribute "lbShrink".
  public isOrnament = false;
  public frameSize: FrameSize | null = null;
  public hiddenLabelVal = false; // Binding attribute "hiddenLabel".
  public isErrorVal = false; // Binding attribute "isError".

  public get isOutlinedExterior(): boolean {
    return ExteriorValueUtil.isOutlined(this.exteriorValue);
  }
  public get isUnderlineExterior(): boolean {
    return ExteriorValueUtil.isUnderline(this.exteriorValue);
  }
  public get isStandardExterior(): boolean {
    return ExteriorValueUtil.isStandard(this.exteriorValue);
  }

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;
  public isHelperTextFilled = false;

  private valueChangesSub: Subscription;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.valueChangesSub = this.formControl.valueChanges.subscribe((value: any) => this.onChange(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.typeVal = (InputTypeUtil.create(this.type) as InputType) || InputType.text;
    }
    if (changes.exterOutlined || changes.exterUnderline || changes.exterStandard) {
      this.exteriorValue = this.setExteriorValue(this.exterOutlined, this.exterUnderline, this.exterStandard);
    }
    this.isReadOnlyVal = changes.isReadOnly ? this.isReadOnly !== null : this.isReadOnlyVal;
    this.isRequiredVal = changes.isRequired ? this.isRequired !== null : this.isRequiredVal;

    if (changes.isDisabled) {
      this.isDisabledVal = this.isDisabled !== null;
      this.setDisabledState(this.isDisabledVal);
    }
    this.isLabelShrink = changes.lbShrink ? this.lbShrink !== null : this.isLabelShrink;

    if (changes.szShort || changes.szSmall || changes.szMiddle || changes.szNormal || changes.szLarge || changes.szHuge) {
      this.frameSize = this.createFrameSize(this.szShort, this.szSmall, this.szMiddle, this.szNormal, this.szLarge, this.szHuge);
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
    if (isPlatformBrowser(this.platformId) && !!this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  public doFocusInputElement(): void {
    this.isFocused = true;
  }

  public doBlurInputElement(): void {
    this.isFocused = false;
    this.isFilled = !!this.formControl.value;
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

  private setExteriorValue(exterOutlined: string | null, exterUnderline: string | null, exterStandard: string | null): ExteriorValue {
    let result = ExteriorValue.standard;
    result = exterOutlined !== null ? ExteriorValue.outlined : result;
    result = exterUnderline !== null ? ExteriorValue.underline : result;
    result = exterStandard !== null ? ExteriorValue.standard : result;
    return result;
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

  private createFrameSize(
    szShort: string | null,
    szSmall: string | null,
    szMiddle: string | null,
    szNormal: string | null,
    szLarge: string | null,
    szHuge: string | null
  ): FrameSize | null {
    let result: FrameSize | null = null;
    if (szShort !== null) {
      result = FrameSize.sizeShort;
    }
    if (szSmall !== null) {
      result = FrameSize.sizeSmall;
    }
    if (szMiddle !== null) {
      result = FrameSize.sizeMiddle;
    }
    if (szNormal !== null) {
      result = FrameSize.sizeWide;
    }
    if (szLarge !== null) {
      result = FrameSize.sizeLarge;
    }
    if (szHuge !== null) {
      result = FrameSize.sizeHuge;
    }
    return result;
  }
}

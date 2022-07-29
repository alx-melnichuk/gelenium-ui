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
  InjectionToken,
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

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnBasisFrame } from '../_classes/gln-basis-frame.class';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnInputType, GlnInputTypeUtil } from '../gln-input/gln-input.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

export const GLN_INPUT_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_INPUT_CONFIG');

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
export class GlnInputComponent
  extends GlnBasisFrame
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  // @Input()
  // public id = `glni-${uniqueIdCounter++}`; // Is in GlnBasisControl.
  @Input()
  public autoComplete = '';
  @Input()
  public config: GlnFrameConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null | undefined; // GlnFrameSizeType
  @Input()
  public helperText: string | null | undefined;
  // @Input()
  // public isDisabled: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isError: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isHoverColor: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isLabelShrink: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isNoAnimation: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isNoLabel: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isReadOnly: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isRequired: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isValueInit: string | boolean | null | undefined; // Is in GlnBasisControl.
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
  public tabIndex = 0;
  @Input()
  public type: string = GlnInputType.text.valueOf();
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  // @Output()
  // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // From GlnBasisByFrame

  @ViewChild('inputElement')
  public inputElementRef: ElementRef<HTMLElement> | null = null;

  public currConfig: GlnFrameConfig | null = null;
  // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
  public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  // public hoverColor: boolean | null = null; // Binding attribute "isHoverColor". // Is in GlnBasisControl.
  public isFocused = false;
  public isFilled = false;
  // public isWriteValueInit: boolean | null = null;                            // Is in GlnBasisControl.
  // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
  // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
  // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
  // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
  // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
  public typeVal: GlnInputType = GlnInputType.text;
  // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_INPUT_CONFIG) private rootConfig: GlnFrameConfig | null,
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2
  ) {
    super(uniqueIdCounter++, 'glni', hostRef, renderer, changeDetectorRef);
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-input', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    // In the GlnBasisControl.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    // - this.error = BooleanUtil.init(this.isError);
    // - this.hoverColor = BooleanUtil.init(this.isHoverColor);
    // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
    // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    // - this.noLabel = BooleanUtil.init(this.isNoLabel);
    // - this.readOnly = BooleanUtil.init(this.isReadOnly);
    // - this.required = BooleanUtil.init(this.isRequired);
    // - this.valueInit = BooleanUtil.init(this.isValueInit);
    super.ngOnChanges(changes);
    if (changes.type) {
      this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
    }
    if (changes.config && this.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isRequired || changes.minLength || changes.maxLength) {
      this.prepareFormGroup(this.required, this.minLength, this.maxLength);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public override ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public override writeValue(value: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    if (isFilledOld !== this.isFilled) {
      this.changeDetectorRef.markForCheck();
    }
    super.writeValue(value);
  }

  public override setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      isDisabled ? this.formGroup.disable() : this.formGroup.enable();
      super.setDisabledState(isDisabled);
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return !control ? null : this.formControl.errors;
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

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.isFocused = true;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
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

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }
}

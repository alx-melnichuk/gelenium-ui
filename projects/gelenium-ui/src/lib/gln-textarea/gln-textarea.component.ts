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
  NgZone,
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
import { GlnFrameConfigOld } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

export const GLN_TEXTAREA_CONFIG = new InjectionToken<GlnFrameConfigOld>('GLN_TEXTAREA_CONFIG');

@Component({
  selector: 'gln-textarea',
  exportAs: 'glnTextarea',
  templateUrl: './gln-textarea.component.html',
  styleUrls: ['./gln-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnTextareaComponent },
  ],
})
export class GlnTextareaComponent
  extends GlnBasisFrame
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  // @Input()
  // public id = `glntx-${uniqueIdCounter++}`; // Is in GlnBasisControl.
  @Input()
  public autoComplete = '';
  @Input()
  public cntCols: number | null | undefined;
  @Input()
  public cntRows: number | null | undefined;
  @Input()
  public config: GlnFrameConfigOld | null | undefined;
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
  // public isLabelShrink: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isNoAnimation: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isNoLabel: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isReadOnly: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isRequired: string | boolean | null | undefined;// Is in GlnBasisControl.
  // @Input()
  // public isValueInit: string | boolean | null | undefined; // Is in GlnBasisControl.
  @Input()
  public label: string | null | undefined;
  @Input()
  public maxLength: number | null | undefined;
  @Input()
  public maxRows: number | null | undefined;
  @Input()
  public minLength: number | null | undefined;
  @Input()
  public minRows: number | null | undefined;
  @Input()
  public ornamLfAlign: string | null | undefined; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlign
  @Input()
  public tabIndex = 0;
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  // @Output()
  // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // From GlnBasisByFrame

  @ViewChild('textareaElement')
  public textareaElementRef: ElementRef | null = null;

  public currConfig: GlnFrameConfigOld | null = null;
  public currentRows = 1;
  // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
  // public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public isFocused = false;
  public isFilled = false;
  // public isWriteValueInit: boolean | null = null;                            // Is in GlnBasisControl.
  // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
  // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
  // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
  // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
  // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
  // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_TEXTAREA_CONFIG) private rootConfig: GlnFrameConfigOld | null,
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    super(uniqueIdCounter++, 'glntx', hostRef, renderer, changeDetectorRef, ngZone);
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-textarea', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    // In the GlnBasisControl.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    // - this.error = BooleanUtil.init(this.isError);
    // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
    // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    // - this.noLabel = BooleanUtil.init(this.isNoLabel);
    // - this.readOnly = BooleanUtil.init(this.isReadOnly);
    // - this.required = BooleanUtil.init(this.isRequired);
    // - this.valueInit = BooleanUtil.init(this.isValueInit);
    super.ngOnChanges(changes);
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
      this.prepareFormGroup(this.required, this.minLength || null, this.maxLength || null);
    }
    if (changes['cntRows'] || changes['minRows'] || changes['maxRows']) {
      this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
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
    const cntLinesOld = this.getNumberLines(this.formControl.value);
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    const cntLines = this.getNumberLines(this.formControl.value);
    if (cntLinesOld != cntLines) {
      this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
    }
    if (isFilledOld !== this.isFilled || cntLinesOld != cntLines) {
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
    if (isPlatformBrowser(this.platformId) && !!this.textareaElementRef) {
      (this.textareaElementRef.nativeElement as HTMLInputElement).focus();
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
      this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
    }
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

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  private getCurrentRows(numberOfLines: number, minRows: number | null | undefined, maxRows: number | null | undefined): number {
    let result = numberOfLines > 0 ? numberOfLines : 1;
    if (!!minRows && minRows > 0 && minRows > result) {
      result = minRows;
    }
    if (!!maxRows && maxRows > 0 && result > maxRows) {
      result = maxRows;
    }
    return result;
  }

  private getNumberLines(value: string): number {
    return (value || '').split('\n').length;
  }
}

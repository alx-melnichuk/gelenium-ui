import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
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
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnInputType, GlnInputTypeUtil } from '../gln-input/gln-input.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnBaseControl, GLN_BC_FL_NO_TAB_INDEX, GLN_BC_FL_NO_UPDATE_ID } from '../_interface/gln-base-control';
import { GlnProperties } from '../_interface/gln-base-properties';
import { GlnInputConfig } from './gln-input-config.interface';
import { BooleanUtil } from '../_utils/boolean.util';

export const GLN_IN_CL_LABEL_SHRINK = 'glnin-shrink';
export const GLN_IN_CL_NO_LABEL = 'glnin-no-label';

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
  extends GlnBaseControl
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public override id = `glnin-${uniqueIdCounter++}`; // Defined in GlnBaseControl.
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
  @Input()
  public override isDisabled: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoLabel: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public isValueInit: string | boolean | null | undefined; // #
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
  public override tabIndex = 0; // Defined in GlnBaseControl.
  @Input()
  public type: string = GlnInputType.text.valueOf();
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild('inputElement')
  public inputElementRef: ElementRef<HTMLElement> | null = null;

  public currConfig: GlnFrameConfig;
  public override disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseControl. // +
  public error: boolean | null = null; // Binding attribute "isError". // +
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public isFocused = false;
  public isFilled = false;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // +
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // +
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // +
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // +
  public required: boolean | null = null; // Binding attribute "isRequired". // +
  public typeVal: GlnInputType = GlnInputType.text;

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    ngZone: NgZone,

    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_INPUT_CONFIG) private rootConfig: GlnFrameConfig | null
  ) {
    super(
      hostRef, // public hostRef: ElementRef<HTMLElement>,
      renderer, // protected renderer: Renderer2,
      ngZone // protected ngZone: NgZone
    );
    this.flags = GLN_BC_FL_NO_UPDATE_ID + GLN_BC_FL_NO_TAB_INDEX;
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-input', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    // In the GlnBaseControl.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    super.ngOnChanges(changes);

    // #public autoComplete = '';
    // #public config: GlnFrameConfig | null | undefined;
    // #public exterior: string | null | undefined; // GlnFrameExteriorType
    // #public frameSize: string | null | undefined; // GlnFrameSizeType
    // #public helperText: string | null | undefined;

    // Checking and handle the 'isError' parameter.
    super.onChangesProperty(changes, 'isError', this.currConfig as GlnProperties);
    // Checking and handle the 'isLabelShrink' parameter.
    super.onChangesProperty(changes, 'isLabelShrink', this.currConfig as GlnProperties, GLN_IN_CL_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    super.onChangesProperty(changes, 'isNoAnimation', this.currConfig as GlnProperties);
    // Checking and handle the 'isNoLabel' parameter.
    super.onChangesProperty(changes, 'isNoLabel', this.currConfig as GlnProperties, GLN_IN_CL_NO_LABEL);
    // Checking and handle the 'isReadOnly' parameter.
    super.onChangesProperty(changes, 'isReadOnly', this.currConfig as GlnProperties);
    // Checking and handle the 'isRequired' parameter.
    super.onChangesProperty(changes, 'isRequired', this.currConfig as GlnProperties);

    // #public label: string | null | undefined;
    // #public max: number | null | undefined;
    // #public maxLength: number | null | undefined;
    // #public min: number | null | undefined;
    // #public minLength: number | null | undefined;
    // #public ornamLfAlign: string | null | undefined; // OrnamAlign
    // #public ornamRgAlign: string | null | undefined; // OrnamAlign
    // #public pattern: string | RegExp = '';
    // #public step: number | null | undefined;
    // #public override tabIndex = 0; // Defined in GlnBaseControl.
    // #public type: string = GlnInputType.text.valueOf();
    // #public wdFull: string | null | undefined;

    if (changes['type']) {
      this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
    }
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
      this.prepareFormGroup(this.required, this.minLength, this.maxLength);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    // Checking and handle the 'isError' parameter.
    super.onInitProperty('isError', this.currConfig as GlnProperties);
    // Checking and handle the 'isLabelShrink' parameter.
    super.onInitProperty('isLabelShrink', this.currConfig as GlnProperties, GLN_IN_CL_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    super.onInitProperty('isNoAnimation', this.currConfig as GlnProperties);
    // Checking and handle the 'isNoLabel' parameter.
    super.onInitProperty('isNoLabel', this.currConfig as GlnProperties, GLN_IN_CL_NO_LABEL);
    // Checking and handle the 'isReadOnly' parameter.
    super.onInitProperty('isReadOnly', this.currConfig as GlnProperties);
    // Checking and handle the 'isRequired' parameter.
    super.onInitProperty('isRequired', this.currConfig as GlnProperties);
  }

  public override ngAfterViewInit(): void {
    super.ngAfterViewInit();
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

  // ** Protcted API **

  protected override getConfig(): GlnFrameConfig {
    return this.currConfig;
  }

  protected override getFormControl(): FormControl | null {
    return this.formControl;
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

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
  Host,
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
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlContainer,
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

import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameExterior, GlnFrameExteriorUtil } from '../gln-frame/gln-frame-exterior.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnFrameComponent } from '../gln-frame/gln-frame.component';
import { GlnInputType, GlnInputTypeUtil } from '../gln-input/gln-input.interface';
import { GlnHideAnimationOnInit } from '../_interface/gln-hide-animation-on-init';
import { GlnProperties, PropertiesType } from '../_interface/gln-properties';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

export const CLS_IN_DISABLED = 'gln-disabled';
export const ATR_IN_DISABLED = 'dis';
export const ATR_IN_HIDE_ANIMATION_INIT = 'hdAnmInit';
export const CLS_IN_LABEL_SHRINK = 'glnin-shrink';
export const ATR_IN_LABEL_SHRINK = 'shr';
export const CLS_IN_NO_LABEL = 'glnin-no-label';
export const ATR_IN_ORN_LF = 'orn-lft';
export const ATR_IN_ORN_RG = 'orn-rgh';
export const ATR_IN_EXTERIOR_OL = 'ext-ol';
export const ATR_IN_EXTERIOR_UL = 'ext-ul';
export const ATR_IN_EXTERIOR_ST = 'ext-st';

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
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id = `glnin-${uniqueIdCounter++}`; // Defined in GlnBaseControl.
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
  public isDisabled: string | boolean | null | undefined; // Defined in GlnBaseControl.
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
  public tabIndex: number = 0; // Defined in GlnBaseControl.
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

  @ViewChild(GlnFrameComponent, { static: true })
  public frame!: GlnFrameComponent;

  public currConfig: GlnFrameConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseControl.
  public exteriorVal: GlnFrameExterior | null = null; // Binding attribute "exterior".
  public error: boolean | null = null; // Binding attribute "isError".
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public isFocused = false;
  public isFilled = false;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public typeVal: GlnInputType = GlnInputType.text;

  private hideAnimationOnInit: GlnHideAnimationOnInit | undefined;
  private isRemoveAttrHideAnimation: boolean = false;
  private properties: GlnProperties;

  constructor(
    private ngZone: NgZone,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_INPUT_CONFIG) private rootConfig: GlnFrameConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-input', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    this.properties = new GlnProperties(this.renderer, this.hostRef, this as unknown as PropertiesType);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    // Checking and handle the 'exterior' parameter.
    if (changes['exterior'] || (changes['config'] && this.exteriorVal == null && this.currConfig.exterior)) {
      this.exteriorVal = GlnFrameExteriorUtil.convert(this.exterior || null) || this.currConfig.exterior || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_OL, GlnFrameExteriorUtil.isOutlined(this.exteriorVal) ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_UL, GlnFrameExteriorUtil.isUnderline(this.exteriorVal) ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_ST, GlnFrameExteriorUtil.isStandard(this.exteriorVal) ? '' : null);
    }
    const currConfig: PropertiesType = this.currConfig as PropertiesType;
    // Checking and handle the 'isError' parameter.
    this.properties.onChangesProperty(changes, 'isError', currConfig);
    // Checking and handle the 'isLabelShrink' parameter.
    this.properties.onChangesProperty(changes, 'isLabelShrink', currConfig, CLS_IN_LABEL_SHRINK, ATR_IN_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    this.properties.onChangesProperty(changes, 'isNoAnimation', currConfig);
    // Checking and handle the 'isNoLabel' parameter.
    this.properties.onChangesProperty(changes, 'isNoLabel', currConfig, CLS_IN_NO_LABEL);
    // Checking and handle the 'isReadOnly' parameter.
    this.properties.onChangesProperty(changes, 'isReadOnly', currConfig);
    // Checking and handle the 'isRequired' parameter.
    this.properties.onChangesProperty(changes, 'isRequired', currConfig);
    // Checking and handle the 'ornamLfAlign' parameter.
    if (changes['ornamLfAlign'] || (changes['config'] && this.ornamLfAlignVal == null && this.currConfig.ornamLfAlign)) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.convert(this.ornamLfAlign || null) || this.currConfig.ornamLfAlign || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_ORN_LF, this.ornamLfAlignVal?.toString());
    }
    // Checking and handle the 'ornamRgAlign' parameter.
    if (changes['ornamRgAlign'] || (changes['config'] && this.ornamRgAlignVal == null && this.currConfig.ornamRgAlign)) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.convert(this.ornamRgAlign || null) || this.currConfig.ornamRgAlign || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_ORN_RG, this.ornamRgAlignVal?.toString());
    }
    if (changes['type']) {
      this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
    }
    if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
      this.prepareFormGroup(this.required, this.minLength, this.maxLength);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // If using [(ngModel)].
    if (!this.parentFormGroup) {
      this.hideAnimationOnInit = new GlnHideAnimationOnInit(this.renderer, this.frame.hostRef, this.ngZone);
      // Add an attribute that disables animation on initialization.
      this.hideAnimationOnInit.ngOnInit();
    }

    // Checking and handle the 'exterior' parameter.
    if (this.exteriorVal == null && this.currConfig.exterior) {
      this.exteriorVal = this.currConfig.exterior || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_OL, GlnFrameExteriorUtil.isOutlined(this.exteriorVal) ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_UL, GlnFrameExteriorUtil.isUnderline(this.exteriorVal) ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_EXTERIOR_ST, GlnFrameExteriorUtil.isStandard(this.exteriorVal) ? '' : null);
    }
    const currConfig: PropertiesType = this.currConfig as PropertiesType;
    // Checking and handle the 'isError' parameter.
    this.properties.onInitProperty('isError', currConfig);
    // Checking and handle the 'isLabelShrink' parameter.
    this.properties.onInitProperty('isLabelShrink', currConfig, CLS_IN_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    this.properties.onInitProperty('isNoAnimation', currConfig);
    // Checking and handle the 'isNoLabel' parameter.
    this.properties.onInitProperty('isNoLabel', currConfig, CLS_IN_NO_LABEL);
    // Checking and handle the 'isReadOnly' parameter.
    this.properties.onInitProperty('isReadOnly', currConfig);
    // Checking and handle the 'isRequired' parameter.
    this.properties.onInitProperty('isRequired', currConfig);

    // Checking and handle the 'ornamLfAlign' parameter.
    if (this.ornamLfAlignVal == null && this.currConfig.ornamLfAlign) {
      this.ornamLfAlignVal = this.currConfig.ornamLfAlign || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_ORN_LF, this.ornamLfAlignVal?.toString());
    }
    // Checking and handle the 'ornamRgAlign' parameter.
    if (this.ornamRgAlignVal == null && this.currConfig.ornamRgAlign) {
      this.ornamRgAlignVal = this.currConfig.ornamRgAlign || null;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_ORN_RG, this.ornamRgAlignVal?.toString());
    }
  }

  public ngAfterContentInit(): void {
    // // When using [(ngModel)] parentFormGroup will be null.
    // this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    // if (this.isRemoveAttrHideAnimation) {
    //   // Add an attribute that disables animation on initialization.
    //   HtmlElemUtil.setAttr(this.renderer, this.frame.hostRef, ATR_IN_HIDE_ANIMATION_INIT, '');
    // }
  }

  public ngAfterViewInit(): void {
    // If using [(ngModel)].
    // Remove an attribute that disables animation on initialization.
    this.hideAnimationOnInit?.ngAfterViewInitWithNgZone();
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    if (isFilledOld !== this.isFilled) {
      this.changeDetectorRef.markForCheck();
    }
    // if (this.isRemoveAttrHideAnimation) {
    //   this.isRemoveAttrHideAnimation = false;
    //   Promise.resolve().then(() => {
    //     // Remove an attribute that disables animation on initialization.
    //     HtmlElemUtil.setAttr(this.renderer, this.frame.hostRef, ATR_IN_HIDE_ANIMATION_INIT, null);
    //   });
    // }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, CLS_IN_DISABLED, disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_IN_DISABLED, disabled ? '' : null);
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
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

  // ** Protcted API **

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

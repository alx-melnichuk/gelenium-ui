import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
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
  AsyncValidatorFn,
} from '@angular/forms';

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

// export const GLN_INPUT_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_INPUT_CONFIG');

@Component({
  selector: 'gln-switch',
  exportAs: 'glnSwitch',
  templateUrl: './gln-switch.component.html',
  styleUrls: ['./gln-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSwitchComponent },
  ],
})
export class GlnSwitchComponent implements OnChanges, OnInit, ControlValueAccessor, Validator, GlnNodeInternalValidator {
  @Input()
  public id = `glnsw-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;

  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;

  @Input()
  public label: string | null | undefined;

  @Input()
  public tabIndex = 0;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild('wrapElement', { read: ElementRef, static: true })
  public wrapElementRef!: ElementRef<HTMLElement>;

  public disabled: boolean | null = null; // Binding attribute "isDisabled".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });

  public inputId = `${this.id}-input`;
  public isFocused = false;

  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".

  @HostListener('click')
  public doClick(): void {
    if (!this.disabled) {
      this.setStateChecked(this.setValueToControlAndChange(!this.formControl.value), this.hostRef);
    }
  }

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    // @Optional() @Inject(GLN_INPUT_CONFIG) private rootConfig: GlnFrameConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2 // private ngZone: NgZone
  ) {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabledState(!!disabled);
    }
    if (changes['isReadOnly']) {
      this.readOnly = BooleanUtil.init(this.isReadOnly);
    }
    if (changes['isRequired']) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    this.formControl.setValue(!!value, { emitEvent: false });
    this.setStateChecked(!!value, this.hostRef);
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
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
      if (isDisabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!isDisabled && this.formControl.disabled) {
        this.formControl.enable();
      }
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);

      this.changeDetectorRef.markForCheck();
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

  // public markForCheck(): void {
  //   this.changeDetectorRef.markForCheck();
  // }

  // public getBoolean(value: string | boolean | null | undefined): boolean | null {
  //   return BooleanUtil.init(value);
  // }

  public doChangeInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.setStateChecked(this.setValueToControlAndChange(!this.formControl.value), this.hostRef);
    }
  }

  // ** Private API **

  private setValueToControlAndChange(newValue: boolean): boolean {
    this.formControl.setValue(newValue);
    this.onChange(newValue);
    return newValue;
  }

  private setStateChecked(checked: boolean, elementRef: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(this.renderer, elementRef, 'gln-checked', checked);
  }
}

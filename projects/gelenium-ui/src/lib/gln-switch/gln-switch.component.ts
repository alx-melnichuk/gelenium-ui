import {
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
  Renderer2,
  SimpleChanges,
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
import { GlnBaseControlValueConfig } from '../_classes/gln-base-control-value-config.interface';
import { GlnBaseControlValue } from '../_classes/gln-base-control-value.class';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnSwitchConfig } from './gln-switch.interface';

const CSS_PROP_PARENT_FONT_SIZE = '--glnsw-pr-font-size';

let uniqueIdCounter = 0;

export const GLN_SWITCH_CONFIG = new InjectionToken<GlnSwitchConfig>('GLN_SWITCH_CONFIG');

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
export class GlnSwitchComponent
  extends GlnBaseControlValue
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  // @Input()
  // public id = `glnsw-${uniqueIdCounter++}`; // Defined in GlnBaseValueInit.
  @Input()
  public config: GlnSwitchConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  // @Input()
  // public isDisabled: string | boolean | null | undefined; // Defined in GlnBaseValueInit.
  // @Input()
  // public isNoAnimation: string | boolean | null | undefined; // Defined in GlnBaseValueInit.
  // @Input()
  // public isReadOnly: string | boolean | null | undefined; // Defined in GlnBaseValueInit.
  // @Input()
  // public isRequired: string | boolean | null | undefined;
  // @Input()
  // public tabIndex = 0; // Defined in GlnBaseValueInit.

  @Output()
  readonly change: EventEmitter<boolean> = new EventEmitter();

  public checked: boolean | null = null; // Binding attribute "isChecked".
  public currConfig: GlnSwitchConfig;
  // protected disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseValueInit.
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public idForInput = this.setIdForInput(this.id);
  // protected noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Defined in GlnBaseValueInit.
  // protected readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Defined in GlnBaseValueInit.
  // protected required: boolean | null = null; // Binding attribute "isRequired". // Defined in GlnBaseValueInit.

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SWITCH_CONFIG) private rootConfig: GlnSwitchConfig | null
  ) {
    super(
      `glnsw-${uniqueIdCounter++}`, // id: string,
      hostRef, // public hostRef: ElementRef<HTMLElement>,
      renderer, // protected renderer: Renderer2,
      ngZone // protected ngZone: NgZone
    );
    this.currConfig = this.rootConfig || this.createConfig();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    // In the GlnBaseValueInit.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    // - this.readOnly = BooleanUtil.init(this.isReadOnly);
    // - this.required = BooleanUtil.init(this.isRequired);
    super.ngOnChanges(changes);

    if (changes['id']) {
      this.idForInput = this.setIdForInput(this.id);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    // Add an attribute that disables animation on initialization.
    super.setAttrByIsHookInit(true);

    // Determine the font size of the parent element.
    const parentFontSize = this.getFontSize(HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement));
    if (parentFontSize > 0) {
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_PARENT_FONT_SIZE, NumberUtil.str(parentFontSize)?.concat('px'));
    }
    // If parameter AA is defined, then set the initial value.
    const isChecked = this.isChecked != null ? BooleanUtil.init(this.isChecked) : this.currConfig.isChecked;
    if (isChecked != null && isChecked !== this.formControl.value) {
      this.formControl.setValue(isChecked, { emitEvent: false });
      this.settingChecked(isChecked, this.hostRef, this.renderer);
    }
  }

  public ngAfterViewInit(): void {
    super.runWhenNgZoneIsStable(() => {
      // Remove an attribute that disables animation on initialization.
      super.setAttrByIsHookInit(false);
    });
  }

  // ** ControlValueAccessor - start **

  public override writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(!!value, { emitEvent: false });
      this.settingChecked(!!value, this.hostRef, this.renderer);
      this.changeDetectorRef.markForCheck();
    }
  }

  public override setDisabledState(disabled: boolean): void {
    if (this.disabled !== disabled) {
      super.setDisabledState(disabled);
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

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.disabled && !this.readOnly) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked(newValue, this.hostRef, this.renderer);
      this.onChange(newValue);
      this.change.emit(newValue);
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected API **

  protected createConfig(): GlnSwitchConfig {
    return {};
  }

  protected override getControlValueConfig(): GlnBaseControlValueConfig {
    return { ...this.currConfig };
  }

  // ** Private API **

  private setIdForInput(id: string): string {
    return `${this.id}-input`;
  }

  private getFontSize(elem: ElementRef<HTMLElement> | null): number {
    let result = 0;
    if (elem && elem.nativeElement) {
      // Get the line height from the style set.
      const fontSizePx = getComputedStyle(elem.nativeElement).getPropertyValue('font-size');
      result = Number(fontSizePx.replace('px', ''));
    }
    return result;
  }

  private settingChecked(isChecked: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    this.checked = isChecked;
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', isChecked);
    HtmlElemUtil.setAttr(renderer, elem, 'chk', isChecked ? '' : null);
  }
}

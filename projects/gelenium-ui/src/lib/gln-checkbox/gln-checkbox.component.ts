import {
  AfterContentInit,
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
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  SkipSelf,
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
import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnCheckboxChange } from './gln-checkbox-change.interface';

import { GlnCheckboxConfig } from './gln-checkbox-config.interface';

const POSITION: { [key: string]: string } = { top: 'top', bottom: 'bottom', start: 'start', end: 'end' };

const CSS_CLS_DISABLED = 'gln-disabled';
const CSS_ATTR_DISABLED = 'dis';
const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';

let uniqueIdCounter = 0;

export const GLN_CHECKBOX_CONFIG = new InjectionToken<GlnCheckboxConfig>('GLN_CHECKBOX_CONFIG');

@Component({
  selector: 'gln-checkbox',
  exportAs: 'glnCheckbox',
  templateUrl: './gln-checkbox.component.html',
  styleUrls: ['./gln-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnCheckboxComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnCheckboxComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnCheckboxComponent },
  ],
})
export class GlnCheckboxComponent
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id = `glncb-${uniqueIdCounter++}`;
  @Input()
  public config: GlnCheckboxConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isIndeterm: string | boolean | null | undefined;
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end';
  @Input()
  public tabIndex: number = 0;

  @Output()
  readonly change: EventEmitter<GlnCheckboxChange> = new EventEmitter();

  public currConfig: GlnCheckboxConfig;
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public idForInput = this.setIdForInput(this.id);
  public isCheckedVal: boolean | null = null; // Binding attribute "isChecked".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isIndetermVal: boolean | null = null; // Binding attribute "isIndeterm".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public positionVal: string | null = null; // Binding attribute "position".

  private isRemoveAttrHideAnimation: boolean = false;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_CHECKBOX_CONFIG) private rootConfig: GlnCheckboxConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-checkbox');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['id']) {
      this.idForInput = this.setIdForInput(this.id);
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      console.log(`OnChanges() isDisabledVal=${this.isDisabledVal}; setDisabledState(); settingTabIndex();`); // #
      this.setDisabledState(this.isDisabledVal);
      this.settingTabIndex(!this.isDisabledVal ? '' + this.tabIndex : '-1', this.renderer, this.hostRef);
    }
    if (changes['isIndeterm']) {
      this.isIndetermVal = !!BooleanUtil.init(this.isIndeterm);
      console.log(`OnChanges() isIndetermVal=${this.isIndetermVal}; setDisabledState(); settingTabIndex();`); // #
      this.settingIndeterm(this.isIndetermVal, this.renderer, this.hostRef);
    }
    if (changes['position'] || (changes['config'] && this.positionVal == null && this.currConfig.position != null)) {
      // Remove class by old position value.
      this.settingByPosition(false, this.positionVal, this.renderer, this.hostRef);
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      this.positionVal = POSITION[positionStr] || POSITION['end'];
      // Add class by new position value.
      this.settingByPosition(true, this.positionVal, this.renderer, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    // this.prepareCssProperties(this.hostRef);

    if (this.isDisabledVal == null) {
      console.log(`OnInit() isDisabledVal:${this.isDisabledVal}; settingTabIndex();`); // #
      this.settingTabIndex(!this.isDisabledVal ? '' + this.tabIndex : '-1', this.renderer, this.hostRef);
    }

    const isChecked: boolean | null = BooleanUtil.init(this.isChecked) ?? (this.currConfig.isChecked || null);
    if (isChecked && !this.formControl.value) {
      this.formControl.setValue(true, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = true), this.renderer, this.hostRef);
    }
    if (this.positionVal == null) {
      const positionStr: string = (this.position || this.currConfig.position || '').toString();
      const positionVal: string = POSITION[positionStr] || POSITION['end'];
      // Add class by new position value.
      this.settingByPosition(true, (this.positionVal = positionVal), this.renderer, this.hostRef);
    }
  }

  public ngAfterContentInit(): void {
    // When using [(ngModel)] parentFormGroup will be null.
    this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    if (this.isRemoveAttrHideAnimation) {
      // Add an attribute that disables animation on initialization.
      this.renderer.setAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT, '');
    }
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(!!value, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = !!value), this.renderer, this.hostRef);
      this.changeDetectorRef.markForCheck();
    }
    if (this.isRemoveAttrHideAnimation) {
      this.isRemoveAttrHideAnimation = false;
      Promise.resolve().then(() => {
        // Remove an attribute that disables animation on initialization.
        this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
      });
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

  public setDisabledState(disabled: boolean): void {
    if (this.isDisabledVal !== disabled) {
      this.isDisabledVal = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, CSS_CLS_DISABLED, disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_DISABLED, disabled ? '' : null);
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
      this.settingTabIndex(this.isDisabledVal ? '' + this.tabIndex : '-1', this.renderer, this.hostRef);
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
  }

  // ** interface Validator - finish **

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

  // ** Public methods **

  public doClickByLabel(event: MouseEvent): void {
    // if (!this.isDisabledVal && !this.isReadOnlyVal && this.touchRipple) {
    //   this.touchRipple.trigger(event, true);
    // }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      const newValue = !this.formControl.value;
      console.log(`toggle(newValue=${newValue});`); // #
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked((this.isCheckedVal = newValue), this.renderer, this.hostRef);
      if (this.isRemoveAttrHideAnimation) {
        this.isRemoveAttrHideAnimation = false;
        // Remove an attribute that disables animation on initialization.
        this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
      }
      this.onChange(newValue);
      this.change.emit({ checked: newValue, source: this });
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Private methods **

  private setIdForInput(id: string): string {
    return `${id}-input`;
  }

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  // private prepareCssProperties(hostRef: ElementRef<HTMLElement>): void {

  private settingByPosition(isAdd: boolean, positionStr: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    if (positionStr) {
      HtmlElemUtil.setClass(renderer, elem, 'glnsw-' + positionStr, isAdd);
      HtmlElemUtil.setAttr(renderer, elem, 'pos-' + positionStr[0], isAdd ? '' : null);
    }
  }

  private settingChecked(isChecked: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', !!isChecked);
    HtmlElemUtil.setAttr(renderer, elem, 'chk', isChecked ? '' : null);
  }
  private settingIndeterm(isIndeterm: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-indeterm', !!isIndeterm);
    HtmlElemUtil.setAttr(renderer, elem, 'ind', isIndeterm ? '' : null);
  }
  private settingTabIndex(tabIndex: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'tabindex', tabIndex);
  }
}

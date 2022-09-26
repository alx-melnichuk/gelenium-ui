import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { GlnNodeInternalValidator } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnBaseControlConfig } from './gln-base-control-config.interface';
import { GlnBaseProperties } from './gln-base-properties';

export const CSS_CLASS_DISABLED = 'gln-disabled';
export const CSS_ATTR_DISABLED = 'dis';

export const CSS_ATTR_ID = 'id';
export const CSS_ATTR_TAB_INDEX = 'tabindex';
export const CSS_ATTR_HOOK_INIT = 'hkInit';
export const FLAG_NO_UPDATE_ID = 1;
export const FLAG_NO_TAB_INDEX = 2;
export const FLAG_NO_HOOK_INIT = 4;

@Directive()
export abstract class GlnBaseControl
  extends GlnBaseProperties
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id: string = '';
  @Input()
  public isDisabled: string | boolean | null | undefined; // Defined in GlnBaseProperties.
  @Input()
  public tabIndex: number = 0;

  protected disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseProperties.
  protected flags: number = 0;

  constructor(
    hostRef: ElementRef<HTMLElement>, // public hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2, // protected renderer: Renderer2
    protected ngZone: NgZone
  ) {
    super(hostRef, renderer);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
  }

  public ngOnInit(): void {
    if (!(this.flags & FLAG_NO_UPDATE_ID)) {
      // Update ID value if it is missing.
      this.updateIdWhenMissing(this.renderer, this.hostRef, this.id);
    }
    if (!(this.flags & FLAG_NO_TAB_INDEX)) {
      // Set the TagIndex value if the flag 'disabled' is not set.
      this.setAttrTabindexByDisabled(this.renderer, this.hostRef, this.tabIndex, !!this.disabled);
    }
    if (!(this.flags & FLAG_NO_HOOK_INIT)) {
      // Add an attribute that disables animation on initialization.
      this.setAttrByIsHookInit(true);
    }
  }

  public ngAfterViewInit(): void {
    if (!(this.flags & FLAG_NO_HOOK_INIT)) {
      this.runWhenNgZoneIsStable(() => {
        // Remove an attribute that disables animation on initialization.
        this.setAttrByIsHookInit(false);
      });
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public writeValue(value: any): void {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_DISABLED, CSS_ATTR_DISABLED, isDisabled);
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    const formControl = this.getFormControl() as AbstractControl;
    return !formControl ? null : formControl.errors;
  }

  // ** Validator - finish **

  // ** GlnNodeInternalValidator - start **

  public addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    const formControl = this.getFormControl();
    if (validators != null && formControl) {
      formControl.addValidators(validators);
      formControl.updateValueAndValidity();
    }
  }

  public addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void {
    const formControl = this.getFormControl();
    if (validators != null && formControl) {
      formControl.addAsyncValidators(validators);
      formControl.updateValueAndValidity();
    }
  }

  // ** GlnNodeInternalValidator - finish **

  // ** Public API **

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  // ** Protected API **

  protected getConfig(): GlnBaseControlConfig {
    return {};
  }

  protected getFormControl(): FormControl | null {
    return null;
  }
  /** Update ID value if it is missing. */
  protected updateIdWhenMissing(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, id: string): void {
    HtmlElemUtil.updateIfMissing(renderer, elem, CSS_ATTR_ID, id);
  }
  /** Set the TagIndex value if the flag 'disabled' is not set. */
  protected setAttrTabindexByDisabled(rnd: Renderer2, elem: ElementRef<HTMLElement> | null, tabIndex: number, disabled: boolean): void {
    HtmlElemUtil.setAttr(rnd, elem, CSS_ATTR_TAB_INDEX, !disabled ? '' + tabIndex : null);
  }
  /** Add or Remove an attribute that disables animation on initialization. */
  protected setAttrByIsHookInit(isHookInit: boolean): void {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HOOK_INIT, isHookInit ? '' : null);
  }
  /** Execute the method when ngZone becomes stable. */
  protected runWhenNgZoneIsStable(callBack = (): void => {}): void {
    // The ngZone will become stable when there are no more render tasks.
    // This means that our component has already been rendered.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      callBack();
    });
  }
}

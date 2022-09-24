import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { take } from 'rxjs/operators';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnBaseControlValueConfig } from './gln-base-control-value-config.interface';

export const CSS_ATTR_HOOK_INIT = 'hkInit';

@Directive()
export abstract class GlnBaseControlValue implements OnChanges, OnInit, ControlValueAccessor {
  @Input()
  public id = '';
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public tabIndex = 0;

  protected disabled: boolean | null = null; // Binding attribute "isDisabled".
  protected noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  protected readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  protected required: boolean | null = null; // Binding attribute "isRequired".

  constructor(id: string, public hostRef: ElementRef<HTMLElement>, protected renderer: Renderer2, protected ngZone: NgZone) {
    this.id = id;
    if (!id) {
      console.warn('The "id" parameter is not defined.');
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const controlValueConfig: GlnBaseControlValueConfig = this.getControlValueConfig();
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null)) {
      const noAnimation = BooleanUtil.init(this.isNoAnimation) || controlValueConfig.isNoAnimation;
      this.settingNoAnimation(!!noAnimation, this.hostRef, this.renderer);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null)) {
      const isReadOnly = BooleanUtil.init(this.isReadOnly) || controlValueConfig.isReadOnly;
      this.settingReadOnly(!!isReadOnly, this.hostRef, this.renderer);
    }
    if (changes['isRequired'] || (changes['config'] && this.isReadOnly == null)) {
      const isRequired = BooleanUtil.init(this.isRequired) || controlValueConfig.isRequired;
      this.settingRequired(!!isRequired, this.hostRef, this.renderer);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', !this.disabled ? '' + this.tabIndex : null);

    const controlValueConfig: GlnBaseControlValueConfig = this.getControlValueConfig();
    if (this.noAnimation == null) {
      this.settingNoAnimation(!!controlValueConfig.isNoAnimation, this.hostRef, this.renderer);
    }
    if (this.readOnly == null) {
      this.settingReadOnly(!!controlValueConfig.isReadOnly, this.hostRef, this.renderer);
    }
    if (this.required == null) {
      this.settingRequired(!!controlValueConfig.isRequired, this.hostRef, this.renderer);
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
    this.settingDisabled(isDisabled, this.hostRef, this.renderer);
  }

  // ** ControlValueAccessor - finish **

  // ** Public API **

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  // ** Protected API **

  // Add or Remove an attribute that disables animation on initialization.
  protected setAttrByIsHookInit(isHookInit: boolean): void {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HOOK_INIT, isHookInit ? '' : null);
  }

  // Execute the method when ngZone becomes stable.
  protected runWhenNgZoneIsStable(callBack = (): void => {}): void {
    // The ngZone will become stable when there are no more render tasks.
    // This means that our component has already been rendered.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      callBack();
    });
  }

  protected getControlValueConfig(): GlnBaseControlValueConfig {
    return {};
  }

  protected settingDisabled(isDisabled: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', isDisabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', isDisabled ? '' : null);
  }

  protected settingNoAnimation(isNoAnimation: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    this.noAnimation = isNoAnimation;
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', isNoAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noAnm', isNoAnimation ? '' : null);
  }

  protected settingReadOnly(isReadOnly: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    this.readOnly = isReadOnly;
    HtmlElemUtil.setClass(renderer, elem, 'gln-readonly', isReadOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', isReadOnly ? '' : null);
  }

  protected settingRequired(isRequired: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    this.required = isRequired;
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', isRequired);
    HtmlElemUtil.setAttr(renderer, elem, 'req', isRequired ? '' : null);
  }
}

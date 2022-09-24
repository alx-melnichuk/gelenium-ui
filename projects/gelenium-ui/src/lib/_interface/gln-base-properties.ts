import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { GlnBasePropertiesConfig } from './gln-base-properties-config.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

export const CSS_CLASS_DISABLED = 'gln-disabled';
export const CSS_ATTR_DISABLED = 'dis';
export const CSS_CLASS_NO_ANIMATION = 'gln-no-animation';
export const CSS_ATTR_NO_ANIMATION = 'noAnm';
export const CSS_CLASS_READONLY = 'gln-readonly';
export const CSS_ATTR_READONLY = 'rea';
export const CSS_CLASS_REQUIRED = 'gln-required';
export const CSS_ATTR_REQUIRED = 'req';

@Directive()
export abstract class GlnBaseProperties implements OnChanges, OnInit {
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;

  protected disabled: boolean | null = null; // Binding attribute "isDisabled".
  protected noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  protected readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  protected required: boolean | null = null; // Binding attribute "isRequired".

  constructor(public hostRef: ElementRef<HTMLElement>, protected renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const config: GlnBasePropertiesConfig = this.getConfig();

    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null)) {
      const noAnimation = BooleanUtil.init(this.isNoAnimation) || config.isNoAnimation;
      this.noAnimation = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_NO_ANIMATION, CSS_ATTR_NO_ANIMATION, !!noAnimation);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null)) {
      const isReadOnly = BooleanUtil.init(this.isReadOnly) || config.isReadOnly;
      this.readOnly = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_READONLY, CSS_ATTR_READONLY, !!isReadOnly);
    }
    if (changes['isRequired'] || (changes['config'] && this.isReadOnly == null)) {
      const isRequired = BooleanUtil.init(this.isRequired) || config.isRequired;
      this.required = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_REQUIRED, CSS_ATTR_REQUIRED, !!isRequired);
    }
  }

  public ngOnInit(): void {
    const config: GlnBasePropertiesConfig = this.getConfig();

    if (this.noAnimation == null) {
      const noAnimation = config.isNoAnimation;
      this.noAnimation = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_NO_ANIMATION, CSS_ATTR_NO_ANIMATION, !!noAnimation);
    }
    if (this.readOnly == null) {
      const isReadOnly = config.isReadOnly;
      this.readOnly = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_READONLY, CSS_ATTR_READONLY, !!isReadOnly);
    }
    if (this.required == null) {
      const isRequired = config.isRequired;
      this.required = this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_REQUIRED, CSS_ATTR_REQUIRED, !!isRequired);
    }
  }

  // ** Public API **

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setClassAndAttr(this.renderer, this.hostRef, CSS_CLASS_DISABLED, CSS_ATTR_DISABLED, isDisabled);
  }

  // ** Protected API **

  protected getConfig(): GlnBasePropertiesConfig {
    return {};
  }

  protected setClassAndAttr(rnd: Renderer2, el: ElementRef<HTMLElement> | null, name: string, attr: string, isFlag: boolean): boolean {
    HtmlElemUtil.setClass(rnd, el, name, isFlag);
    HtmlElemUtil.setAttr(rnd, el, attr, isFlag ? '' : null);
    return isFlag;
  }
}

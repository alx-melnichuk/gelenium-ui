import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

export type GlnProperties = {
  [key: string]: string | boolean | null | undefined;
};

@Directive()
export abstract class GlnBaseProperties {
  constructor(public hostRef: ElementRef<HTMLElement>, protected renderer: Renderer2) {}

  // ** Protected API **

  protected setClassAndAttr(rnd: Renderer2, el: ElementRef<HTMLElement> | null, name: string, attr: string, isFlag: boolean): boolean {
    HtmlElemUtil.setClass(rnd, el, name, isFlag);
    HtmlElemUtil.setAttr(rnd, el, attr, isFlag ? '' : null);
    return isFlag;
  }

  protected onChangesProperty(changes: SimpleChanges, name: string, config: GlnProperties, className?: string, attrName?: string): void {
    if (name) {
      const that: GlnProperties = this as unknown as GlnProperties;

      if (changes[name] || (changes['config'] && that[name] == null)) {
        const isFlag = BooleanUtil.init(that[name]) || config[name];
        const propertyInn = this.getPropertyByPropertyName(name);
        this.updatePropertyAndSettingClassAttr(propertyInn, !!isFlag, className, attrName);
      }
    }
  }

  protected onInitProperty(name: string, config: GlnProperties, className?: string, attrName?: string): void {
    if (name) {
      const that: GlnProperties = this as unknown as GlnProperties;
      const propertyInn = this.getPropertyByPropertyName(name);
      if (that[propertyInn] == null) {
        const isFlag = config[name];
        this.updatePropertyAndSettingClassAttr(propertyInn, !!isFlag, className, attrName);
      }
    }
  }

  protected getPropertyByPropertyName(propertyName: string): string {
    const text = propertyName.startsWith('is') ? propertyName.slice(2) : propertyName;
    const property = text[0] === text[0].toUpperCase() ? text[0].toLowerCase() + text.slice(1) : text;
    return property;
  }

  protected updatePropertyAndSettingClassAttr(property: string, isFlag: boolean, className?: string, attrName?: string): void {
    const that: GlnProperties = this as unknown as GlnProperties;
    that[property] = isFlag;
    const text: string = this.toKebabCase(property);
    const classNameValue = className || 'gln-' + text;
    const len = text.startsWith('no') ? 5 : 3;
    const attrNameValue = attrName || text.replace('-', '').slice(0, len);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, classNameValue, isFlag);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, attrNameValue, isFlag ? '' : null);
  }

  protected toKebabCase(value: string): string {
    let result: string = '';
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (element === element.toUpperCase()) {
        result += (index > 0 ? '-' : '') + element.toLowerCase();
      } else {
        result += element;
      }
    }
    return result || value;
  }
}

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
    // Get the internal property name from the input property name.
    const propertyInn = this.getPropertyByPropertyName(name);
    if (propertyInn) {
      const that: GlnProperties = this as unknown as GlnProperties;
      if (changes[name] || (changes['config'] && that[name] == null)) {
        const value: boolean | null = BooleanUtil.init(that[name]);
        const isFlag: boolean = !!(value != null ? value : config[name]);
        // Set the new value of the internal property.
        that[propertyInn] = isFlag;
        // Add/remove the required class and attribute by flag value.
        this.setClassAndAttrByProperty(propertyInn, isFlag, className, attrName);
      }
    }
  }

  protected onInitProperty(name: string, config: GlnProperties, className?: string, attrName?: string): void {
    // Get the internal property name from the input property name.
    const propertyInn = this.getPropertyByPropertyName(name);
    if (propertyInn) {
      const that: GlnProperties = this as unknown as GlnProperties;
      if (that[propertyInn] == null) {
        const isFlag: boolean = !!config[name];
        // Set the new value of the internal property.
        that[propertyInn] = isFlag;
        // Add/remove the required class and attribute by flag value.
        this.setClassAndAttrByProperty(propertyInn, isFlag, className, attrName);
      }
    }
  }

  protected getPropertyByPropertyName(propertyName: string): string {
    let result: string = propertyName;
    if (result && result.length > 1) {
      result = result.startsWith('is') ? result.slice(2) : result;
    }
    if (result && result.length > 0) {
      result = result[0] === result[0].toUpperCase() ? result[0].toLowerCase() + result.slice(1) : result;
    }
    return result;
  }
  // Get class name by property name.
  protected getClassNameByproperty(property: string, isConvertToKebabCase?: boolean): string {
    return 'gln-' + (isConvertToKebabCase ? this.toKebabCase(property) : property);
  }
  // Get attribute name by property name.
  protected getAttrNameByproperty(property: string, isConvertToKebabCase?: boolean): string {
    const text: string = isConvertToKebabCase ? this.toKebabCase(property) : property;
    const len = text.startsWith('no') ? 5 : 3;
    return text.replace('-', '').slice(0, len);
  }
  // Add/remove the required class and attribute by flag value.
  protected setClassAndAttrByProperty(property: string, isFlag: boolean, className?: string, attrName?: string): void {
    const propertyKebabCase = this.toKebabCase(property);
    // Get class name by property name.
    const classNameValue = className || this.getClassNameByproperty(propertyKebabCase);
    // Add/remove the required class by flag value.
    HtmlElemUtil.setClass(this.renderer, this.hostRef, classNameValue, isFlag);
    // Get attribute name by property name.
    const attrNameValue = attrName || this.getAttrNameByproperty(propertyKebabCase);
    // Add/remove required attribute by flag value.
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

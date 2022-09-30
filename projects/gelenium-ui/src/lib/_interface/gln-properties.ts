import { ElementRef, Injectable, Renderer2, SimpleChanges } from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

export type PropertiesType = {
  [key: string]: string | boolean | null | undefined;
};

export class GlnProperties {
  constructor(private renderer: Renderer2, private hostRef: ElementRef<HTMLElement>, private owner: PropertiesType) {}

  // ** Public API **

  public onChangesProperty(changes: SimpleChanges, name: string, config: PropertiesType, className?: string, attrName?: string): void {
    // Get the internal property name from the input property name.
    const propertyInn = this.getPropertyByPropertyName(name);
    if ((propertyInn && changes[name]) || (changes['config'] && this.owner && this.owner[name] == null)) {
      const value: boolean | null = BooleanUtil.init(this.owner[name]);
      const isFlag: boolean = !!(value != null ? value : config[name]);
      // Set the new value of the internal property.
      this.owner[propertyInn] = isFlag;

      // Get class name by property name.
      const classNameValue = className || this.getClassNameByProperty(this.toKebabCase(propertyInn));
      // Add/remove the required class by flag value.
      HtmlElemUtil.setClass(this.renderer, this.hostRef, classNameValue, isFlag);

      // Get attribute name by property name.
      const attrNameValue = attrName || this.getAttrNameByProperty(this.toKebabCase(propertyInn));
      // Add/remove required attribute by flag value.
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, attrNameValue, isFlag ? '' : null);
    }
  }

  public onInitProperty(name: string, config: PropertiesType, className?: string, attrName?: string): void {
    // Get the internal property name from the input property name.
    const propertyInn = this.getPropertyByPropertyName(name);
    if (propertyInn && this.owner && this.owner[propertyInn] == null) {
      const isFlag: boolean = !!config[name];
      // Set the new value of the internal property.
      this.owner[propertyInn] = isFlag;

      // Get class name by property name.
      const classNameValue = className || this.getClassNameByProperty(this.toKebabCase(propertyInn));
      // Add/remove the required class by flag value.
      HtmlElemUtil.setClass(this.renderer, this.hostRef, classNameValue, isFlag);

      // Get attribute name by property name.
      const attrNameValue = attrName || this.getAttrNameByProperty(this.toKebabCase(propertyInn));
      // Add/remove required attribute by flag value.
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, attrNameValue, isFlag ? '' : null);
    }
  }

  public toKebabCase(value: string): string {
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

  public getPropertyByPropertyName(propertyName: string): string {
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
  public getClassNameByProperty(property: string, isConvertToKebabCase?: boolean): string {
    return 'gln-' + (isConvertToKebabCase ? this.toKebabCase(property) : property);
  }
  // Get attribute name by property name.
  public getAttrNameByProperty(property: string, isConvertToKebabCase?: boolean): string {
    const text: string = isConvertToKebabCase ? this.toKebabCase(property) : property;
    const len = text.startsWith('no') ? 5 : 3;
    return text.replace('-', '').slice(0, len);
  }
}

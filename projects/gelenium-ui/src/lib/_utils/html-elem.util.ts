import { ElementRef, Renderer2 } from '@angular/core';

export class HtmlElemUtil {
  public static setProperty(element: ElementRef<HTMLElement> | null, name: string, value: string | null | undefined): void {
    if (name && element && element.nativeElement) {
      (element.nativeElement as HTMLElement).style.setProperty(name, value || null);
    }
  }
  public static setClass(renderer: Renderer2, element: ElementRef<HTMLElement> | null, className: string, isAdd: boolean): void {
    if (className && renderer && element && element.nativeElement) {
      if (isAdd) {
        renderer.addClass(element.nativeElement, className);
      } else {
        renderer.removeClass(element.nativeElement, className);
      }
    }
  }
  public static setAttr(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, name: string, value: string | null | undefined): void {
    if (name && renderer && elem && elem.nativeElement) {
      if (value != null) {
        renderer.setAttribute(elem.nativeElement, name, value);
      } else {
        renderer.removeAttribute(elem.nativeElement, name);
      }
    }
  }
  public static updateIfMissing(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, name: string, value: string): void {
    if (name && value && renderer && elem && !elem.nativeElement.getAttribute(name)) {
      HtmlElemUtil.setAttr(renderer, elem, name, value);
    }
  }
  public static getChildByAttribute(elem: ElementRef<HTMLElement> | null, attributeList: string[]): Element | null {
    let result: Element | null = null;
    const element: Element | null = elem?.nativeElement || null;
    const len = attributeList.length;
    if (element?.children && element?.children.length > 0 && len > 0) {
      const count = element.children.length;
      let idx = 0;
      while (idx < count && !result) {
        const item: Element = element.children[idx++];
        if (!item) continue;
        let n = 0;
        while (n < len && !result) {
          result = item.hasAttribute(attributeList[n++]) ? item : null;
        }
      }
    }
    return result;
  }
  public static getElementRef(element: HTMLElement | null): ElementRef<HTMLElement> | null {
    return element ? new ElementRef<HTMLElement>(element) : null;
  }
  public static propertyAsNumber(elem: ElementRef<HTMLElement> | null, name: string, defaultValue: number = 0): number {
    return !!elem && !!name ? Number(getComputedStyle(elem.nativeElement).getPropertyValue(name).replace('px', '')) : defaultValue;
  }
  public static getRect(elem: ElementRef<HTMLElement> | null): DOMRect | null {
    return elem?.nativeElement.getBoundingClientRect() || null;
  }
}

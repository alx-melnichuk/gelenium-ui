import { ElementRef, Renderer2 } from '@angular/core';

export class ElementUtil {
  public static getFirstChild(element: HTMLElement | null): Element | null {
    return element?.children.item(0) || null;
  }
  public static getChildByAttribute(element: Element | null, attributeList: string[]): Element | null {
    let result: Element | null = null;
    const count = element?.children.length || 0;
    const len = attributeList.length;
    if (element?.children && count > 0 && len > 0) {
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
  public static setProperty(element: HTMLElement | null, name: string, value: string | null | undefined): void {
    if (element && name) {
      (element as HTMLElement).style.setProperty(name, value || null);
    }
  }
  public static setClass(renderer: Renderer2, element: HTMLElement | null, className: string, isAdd: boolean): void {
    if (renderer && element && className) {
      if (isAdd) {
        renderer.addClass(element, className);
      } else {
        renderer.removeClass(element, className);
      }
    }
  }
  public static setAttr(rendr: Renderer2, element: HTMLElement | null, name: string, value: string | null): void {
    if (rendr && element && name) {
      if (value != null) {
        rendr.setAttribute(element, name, value);
      } else {
        rendr.removeAttribute(element, name);
      }
    }
  }
  public static elem(element: ElementRef<HTMLElement> | null): HTMLElement {
    return element?.nativeElement as HTMLElement;
  }
}

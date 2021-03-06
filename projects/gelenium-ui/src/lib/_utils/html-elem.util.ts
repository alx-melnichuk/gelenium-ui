import { ElementRef, Renderer2 } from '@angular/core';

export class HtmlElemUtil {
  public static setProperty(element: ElementRef<HTMLElement> | null, name: string, value: string | null): void {
    if (element && element.nativeElement && name) {
      (element.nativeElement as HTMLElement).style.setProperty(name, value || null);
    }
  }
  public static setClass(renderer: Renderer2, element: ElementRef<HTMLElement> | null, className: string, isAdd: boolean): void {
    if (renderer && element && element.nativeElement && className) {
      if (isAdd) {
        renderer.addClass(element.nativeElement, className);
      } else {
        renderer.removeClass(element.nativeElement, className);
      }
    }
  }
  public static setAttr(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, name: string, value: string | null): void {
    if (renderer && elem && elem.nativeElement && name) {
      if (value != null) {
        renderer.setAttribute(elem.nativeElement, name, value);
      } else {
        renderer.removeAttribute(elem.nativeElement, name);
      }
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
}

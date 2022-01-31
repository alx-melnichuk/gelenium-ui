import { ElementRef, Renderer2 } from '@angular/core';

export class HtmlElemUtil {
  public static setProperty(element: ElementRef | undefined, propertyName: string, propertyValue: string | null | undefined): void {
    if (element && element.nativeElement && propertyName) {
      (element.nativeElement as HTMLElement).style.setProperty(propertyName, propertyValue || null);
    }
  }
  public static setClass(renderer: Renderer2, element: ElementRef | undefined, className: string, isAdd: boolean): void {
    if (renderer && element && element.nativeElement && className) {
      if (isAdd) {
        renderer.addClass(element.nativeElement, className);
      } else {
        renderer.removeClass(element.nativeElement, className);
      }
    }
  }
  public static setAttr(renderer: Renderer2, element: ElementRef | undefined, attrName: string, attrVal: string | null | undefined): void {
    if (renderer && element && element.nativeElement && attrName) {
      if (attrVal != null) {
        renderer.setAttribute(element.nativeElement, attrName, attrVal);
      } else {
        renderer.removeAttribute(element.nativeElement, attrName);
      }
    }
  }
}

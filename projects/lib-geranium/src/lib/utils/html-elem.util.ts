import { ElementRef, Renderer2 } from '@angular/core';

export class HtmlElemUtil {
  public static setProperty(element: ElementRef | undefined, propertyName: string, propertyValue: string | null): void {
    if (element && element.nativeElement && propertyName) {
      (element.nativeElement as HTMLElement).style.setProperty(propertyName, propertyValue);
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
  public static setAttr(renderer: Renderer2, element: ElementRef | undefined, attrName: string, attrValue: string | null): void {
    if (renderer && element && element.nativeElement && attrName) {
      if (attrValue != null) {
        renderer.setAttribute(element.nativeElement, attrName, attrValue);
      } else {
        renderer.removeAttribute(element.nativeElement, attrName);
      }
    }
  }
}

import { ElementRef, Renderer2 } from '@angular/core';

export class HtmlElemUtil {
  public static setProperty(element: ElementRef<HTMLElement> | undefined, name: string, value: string | null | undefined): void {
    if (element && element.nativeElement && name) {
      (element.nativeElement as HTMLElement).style.setProperty(name, value || null);
    }
  }
  public static setClass(renderer: Renderer2, element: ElementRef<HTMLElement> | undefined, className: string, isAdd: boolean): void {
    if (renderer && element && element.nativeElement && className) {
      if (isAdd) {
        renderer.addClass(element.nativeElement, className);
      } else {
        renderer.removeClass(element.nativeElement, className);
      }
    }
  }
  public static setAttr(rendr: Renderer2, elem: ElementRef<HTMLElement> | undefined, name: string, value: string | null | undefined): void {
    if (rendr && elem && elem.nativeElement && name) {
      if (value != null) {
        rendr.setAttribute(elem.nativeElement, name, value);
      } else {
        rendr.removeAttribute(elem.nativeElement, name);
      }
    }
  }
}

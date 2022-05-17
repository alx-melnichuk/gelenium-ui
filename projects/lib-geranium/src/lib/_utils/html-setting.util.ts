import { ElementRef, Renderer2 } from '@angular/core';
import { HtmlElemUtil } from './html-elem.util';

export class HtmlSettingUtil {
  public static error(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setAttr(renderer, elem, 'err', value ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-error', value);
  }
  public static disabled(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setAttr(renderer, elem, 'dis', value ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-disabled', value);
  }
  public static readonly(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setAttr(renderer, elem, 'rea', value ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-readonly', value);
  }
  public static required(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setAttr(renderer, elem, 'req', value ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-required', value);
  }
  public static selected(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setAttr(renderer, elem, 'sel', value ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-selected', value);
  }
}

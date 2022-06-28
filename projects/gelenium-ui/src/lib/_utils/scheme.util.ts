import { ElementRef } from '@angular/core';

import { HtmlElemUtil } from './html-elem.util';

export class SchemeUtil {
  private static loaded = false;

  public static loadingCheck(): boolean {
    if (!SchemeUtil.loaded) {
      // document.documentElement => html
      const element = document.querySelector(':root ');
      if (element) {
        const elementRef: ElementRef<HTMLElement> = new ElementRef(element as HTMLElement);
        SchemeUtil.loaded = SchemeUtil.loading(elementRef);
      }
    }
    return SchemeUtil.loaded;
  }

  public static loading(elementRef: ElementRef<HTMLElement>): boolean {
    let result = false;
    if (elementRef) {
      // --default background-color: hsl(0deg 0% 100%); #fff;
      HtmlElemUtil.setProperty(elementRef, '--gln-default-bg-h', '0');
      HtmlElemUtil.setProperty(elementRef, '--gln-default-bg-s', '0%');
      HtmlElemUtil.setProperty(elementRef, '--gln-default-bg-l', '100%');
      HtmlElemUtil.setProperty(
        elementRef,
        '--gln-default-bg-cl',
        'hsl(var(--gln-default-bg-h),var(--gln-default-bg-s),var(--gln-default-bg-l))'
      );
      // --default: hsl(20, 2%, 5%);
      HtmlElemUtil.setProperty(elementRef, '--gln-default-h', '20');
      HtmlElemUtil.setProperty(elementRef, '--gln-default-s', '2%');
      HtmlElemUtil.setProperty(elementRef, '--gln-default-l', '5%');
      HtmlElemUtil.setProperty(elementRef, '--gln-default-cl', 'hsl(var(--gln-default-h),var(--gln-default-s),var(--gln-default-l))');
      // --primary: hsl(210, 79%, 46%);
      HtmlElemUtil.setProperty(elementRef, '--gln-primary-h', '210');
      HtmlElemUtil.setProperty(elementRef, '--gln-primary-s', '79%');
      HtmlElemUtil.setProperty(elementRef, '--gln-primary-l', '46%');
      HtmlElemUtil.setProperty(elementRef, '--gln-primary-cl', 'hsl(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l))');
      // --success: #198754
      // --info: #0dcaf0
      // --warning: #ffc107
      // --danger: hsl(0, 65%, 51%);
      HtmlElemUtil.setProperty(elementRef, '--gln-danger-h', '0');
      HtmlElemUtil.setProperty(elementRef, '--gln-danger-s', '65%');
      HtmlElemUtil.setProperty(elementRef, '--gln-danger-l', '51%');
      HtmlElemUtil.setProperty(elementRef, '--gln-danger-cl', 'hsl(var(--gln-danger-h),var(--gln-danger-s),var(--gln-danger-l))');

      result = true;
    }
    return result;
  }
}

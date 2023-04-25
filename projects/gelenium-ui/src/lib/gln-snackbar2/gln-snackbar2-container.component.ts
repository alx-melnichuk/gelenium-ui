import { ScreenUtil } from './../_utils/screen.util';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2, ViewEncapsulation } from '@angular/core';

import { HtmlElemUtil } from '../_utils/html-elem.util';

const CSS_PROP_WRAP_MR_TP = '--glnsbcw--mr-tp';
const CSS_PROP_WRAP_MR_BT = '--glnsbcw--mr-bt';
const CSS_PROP_WRAP_MR_LF = '--glnsbcw--mr-lf';
const CSS_PROP_WRAP_MR_RG = '--glnsbcw--mr-rg';

@Component({
  selector: 'gln-snackbar2-container',
  exportAs: 'glnSnackbar2Container',
  template: ``,
  styleUrls: ['./gln-snackbar2-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GlnSnackbar2ContainerComponent {
  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-snackbar2-container');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'presentation');
  }

  public createWrapElement(id: string, className: string, attrName: string): HTMLElement {
    const containerWrapElement: HTMLElement = this.document.createElement('div');
    containerWrapElement.id = `glnsbc-wrap-${id}`;
    if (!!className) {
      containerWrapElement.classList.add(className);
    }
    if (!!attrName) {
      containerWrapElement.setAttribute(attrName, '');
    }
    containerWrapElement.style.width = 'inherit';
    this.hostRef.nativeElement.appendChild(containerWrapElement);

    return containerWrapElement;
  }

  public setProperties(element: HTMLElement, horizontal?: string, vertical?: string, transition?: string, slideDirection?: string): void {
    // if ('down' === slideDirection) {
    //   HtmlElemUtil.setProperty(this.hostRef, 'flex-direction', 'column-reverse');
    // }

    this.setCssTranslate(element, transition, slideDirection);

    this.setCssMargin(horizontal, vertical);
  }

  // ** Private methods **

  private setCssTranslate(element: HTMLElement, transition?: string, slideDirection?: string): void {
    let translateX: number = 0;
    let translateY: number = 0;
    let translateYStr: string = '';
    // const containerRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
    const wrapRect: DOMRect = element.getBoundingClientRect();
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--rect-bt', wrapRect.bottom.toString().concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--rect-lf', wrapRect.left.toString().concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--rect-rg', wrapRect.right.toString().concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--rect-tp', wrapRect.top.toString().concat('px'));

    if ('slide' === transition) {
      if ('down' === slideDirection) {
        translateY = -(wrapRect.top + wrapRect.height + 1);
      } else if ('left' === slideDirection) {
        const windowWidth: number = ScreenUtil.getWidth();
        translateX = windowWidth - wrapRect.left + 1;
      } else if ('right' === slideDirection) {
        translateX = -(wrapRect.left + wrapRect.width + 1);
      } else {
        // 'up' === slideDirection
        const windowHeight: number = ScreenUtil.getHeight();
        translateY = windowHeight - wrapRect.top + 1;
        translateYStr = 'calc(100vw - var(--glnsbcw--rect-tp) + 1)';
      }
    } else if ('fade' === transition) {
      //
    } else {
      // 'grow' === transition
    }

    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--trans-x', translateX.toString().concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--trans-y', translateY.toString().concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--glnsbcw--trans-y2', translateYStr);
  }

  private setCssMargin(horizontal?: string, vertical?: string): void {
    let marginTop: string | null = null;
    let marginBottom: string | null = null;
    let marginLeft: string | null = null;
    let marginRight: string | null = null;

    if ('left' === horizontal) {
      marginRight = '1em';
    } else if ('right' === horizontal) {
      marginLeft = '1em';
    } else {
      // result.translateX = 0;
    }

    if ('top' === vertical) {
      marginBottom = '1em';
    } else if ('bottom' === vertical) {
      marginTop = '1em';
    } else {
      // result.translateY = -1; // ?
    }

    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_TP, marginTop);
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_BT, marginBottom);
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_LF, marginLeft);
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_RG, marginRight);
  }
}

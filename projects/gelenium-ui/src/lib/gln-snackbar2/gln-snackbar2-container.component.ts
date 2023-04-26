import { ScreenUtil } from './../_utils/screen.util';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewEncapsulation,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';

import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnSnackbar2Config } from './gln-snackbar2-config.interface';

const CSS_PROP_WRAP_MR_TP = '--glnsbcw--mr-tp';
const CSS_PROP_WRAP_MR_BT = '--glnsbcw--mr-bt';
const CSS_PROP_WRAP_TRN_FRM = '--glnsbcw--trn-frm';

/*export interface GlnSnackbar2Container {
  addWrapElement(id: number, className: string, attrName: string): HTMLElement;
  removeElement(id: number): void;
}*/

@Component({
  selector: 'gln-snackbar2-container',
  exportAs: 'glnSnackbar2Container',
  template: ``,
  styleUrls: ['./gln-snackbar2-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GlnSnackbar2ContainerComponent implements AfterContentInit /*, GlnSnackbar2Container*/ {
  private horizontal: string;
  private vertical: string;
  private transition: string;
  private slideDirection: string;
  private firstElement: HTMLElement | null = null;
  // private wrapElementMap: Map<number, HTMLElement> = new Map();

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    config: GlnSnackbar2Config,
    @Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-snackbar2-container');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'presentation');

    this.horizontal = config.horizontal || '';
    this.vertical = config.vertical || '';
    this.transition = config.transition || 'grow';
    this.slideDirection = config.slideDirection || '';

    this.setCssMarginVertical(this.vertical);
    this.setCssTtansition(this.transition);
  }

  public ngAfterContentInit(): void {
    // console.log(`#AfterContentInit()`); // #
    // if (this.firstElement !== null) {
    //   this.setCssTranslate(this.firstElement, this.transition, this.slideDirection);
    // }
  }

  public addWrapElement(id: number, className: string, attrNameList: string[]): HTMLElement {
    const containerWrapElement: HTMLElement = this.document.createElement('div');
    containerWrapElement.id = `glnsbc-wrap-${id}`;
    if (!!className) {
      containerWrapElement.classList.add(className);
    }
    for (let idx = 0; idx < attrNameList.length; idx++) {
      if (!!attrNameList[idx]) {
        containerWrapElement.setAttribute(attrNameList[idx], '');
      }
    }
    containerWrapElement.style.width = 'inherit';

    this.hostRef.nativeElement.appendChild(containerWrapElement);

    // this.wrapElementMap.set(id, containerWrapElement);
    this.changeDetectorRef.markForCheck();

    return containerWrapElement;
  }

  public removeElement(id: number): void {
    // const wrapElement: HTMLElement | undefined = this.wrapElementMap.get(id);
    // this.wrapElementMap.delete(id);
  }

  /*public setProperties(element: HTMLElement, horizontal?: string, vertical?: string, transition?: string, slideDirection?: string): void {
    // if ('down' === slideDirection) {
    //   HtmlElemUtil.setProperty(this.hostRef, 'flex-direction', 'column-reverse');
    // }

    this.setCssTranslate(element, transition, slideDirection);
  }*/

  // ** Private methods **

  private setCssMarginVertical(vertical?: string): void {
    let marginTop: string | null = null;
    let marginBottom: string | null = null;

    if ('top' === vertical) {
      marginBottom = '1em';
    } else if ('bottom' === vertical) {
      marginTop = '1em';
    } else {
      // result.translateY = -1; // ?
    }

    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_TP, marginTop);
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_MR_BT, marginBottom);
  }

  private setCssTtansition(transition: string): void {
    let transform: string | null = null;
    if ('fade' === transition) {
      transform = null;
    } else if ('slide' === transition) {
      transform = null;
    } else if ('grow' === transition) {
      transform = 'scale(0.3)';
    }
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WRAP_TRN_FRM, !!transform ? transform : null);
    // --glnsbcw--trn-frm: scale(0.3);
  }

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
}

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

    this.horizontal = config.horizontal || GlnSnackbar2Config.defaultHorizontal;
    this.vertical = config.vertical || GlnSnackbar2Config.defaultVertical;

    this.renderer.setAttribute(this.hostRef.nativeElement, 'hor-' + this.horizontal, '');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'ver-' + this.vertical, '');
    // #this.setCssMarginVertical(this.vertical);
  }

  public ngAfterContentInit(): void {
    // console.log(`#AfterContentInit()`); // #
  }

  public addWrapElement(id: number, transition?: string): HTMLElement {
    const containerWrapElement: HTMLElement = this.document.createElement('div');
    containerWrapElement.id = `glnsbc-wrap-${id}`;
    containerWrapElement.classList.add('gln-container-wrap');

    const transition2: string = transition || GlnSnackbar2Config.defaultTransition;
    const attrNameList: string[] = ['animated', 'is-show', transition2];
    const transitionList: string[] = transition2.split('-');
    if (transitionList.length > 0) {
      attrNameList.push(transitionList[0]);
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

  // ** Private methods **
}

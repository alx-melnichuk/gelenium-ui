import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { GlnSnackbar2Config } from './gln-snackbar2-config.interface';

@Component({
  selector: 'gln-snackbar2-container',
  exportAs: 'glnSnackbar2Container',
  template: ``,
  styleUrls: ['./gln-snackbar2-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GlnSnackbar2ContainerComponent {
  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    config: GlnSnackbar2Config,
    @Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-snackbar2-container');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'presentation');

    const horizontal: string = config.horizontal || GlnSnackbar2Config.defaultHorizontal;
    const vertical: string = config.vertical || GlnSnackbar2Config.defaultVertical;

    this.renderer.setAttribute(this.hostRef.nativeElement, 'hor-' + horizontal, '');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'ver-' + vertical, '');
  }

  public createWrapElement(id: number, wrapperClass: string[], transition?: string): HTMLElement {
    const containerWrapElement: HTMLElement = this.document.createElement('div');
    containerWrapElement.id = `glnsbc-wrapper-${id}`;
    containerWrapElement.classList.add('gln-container-wrapper');

    for (let idx = 0; idx < wrapperClass.length; idx++) {
      if (!!wrapperClass[idx]) {
        containerWrapElement.classList.add(wrapperClass[idx]);
      }
    }
    const transition2: string = transition || GlnSnackbar2Config.defaultTransition;
    containerWrapElement.setAttribute(transition2, '');

    const transitionList: string[] = transition2.split('-');
    if (transitionList.length > 0) {
      containerWrapElement.setAttribute(transitionList[0], '');
    }

    containerWrapElement.style.width = 'inherit';

    this.hostRef.nativeElement.appendChild(containerWrapElement);

    this.changeDetectorRef.markForCheck();

    return containerWrapElement;
  }

  // ** Private methods **
}

import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2, ViewEncapsulation } from '@angular/core';

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
}

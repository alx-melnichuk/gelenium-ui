import { ElementRef } from '@angular/core';
import { GlnAutocompletePanelDirective } from './gln-autocomplete-panel.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnAutocompletePanelDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnAutocompletePanelDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  /*it('should create an instance', () => {
    const directive = new GlnAutocompletePanelDirective(elementRef);
    const originRectHeight = 50;
    (directive as any).prepareCssBorderRadius(originRectHeight);
    directive.borderRadius == NumberUtil.roundTo100(originRectHeight / 10);

    const originRectHeight = -50;
    (directive as any).prepareCssBorderRadius(originRectHeight);
    directive.borderRadius == null;
    expect(directive).toBeTruthy();
  });*/
});

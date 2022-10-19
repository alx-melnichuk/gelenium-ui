import { ElementRef } from '@angular/core';
import { GlnAutocompletePanelDirective } from './gln-autocomplete-panel.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnAutocompletePanelDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnAutocompletePanelDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

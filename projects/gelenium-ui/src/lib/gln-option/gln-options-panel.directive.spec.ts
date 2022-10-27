import { ElementRef } from '@angular/core';
import { GlnOptionsPanelDirective } from './gln-options-panel.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnOptionsPanelDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOptionsPanelDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

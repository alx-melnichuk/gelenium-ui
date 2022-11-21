import { ElementRef } from '@angular/core';
import { GlnOptionListPanelDirective } from './gln-option-list-panel.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnOptionListPanelDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOptionListPanelDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

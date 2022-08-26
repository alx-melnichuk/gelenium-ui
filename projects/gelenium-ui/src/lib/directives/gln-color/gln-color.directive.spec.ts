import { ElementRef } from '@angular/core';

import { GlnColorDirective } from './gln-color.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnColorDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnColorDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

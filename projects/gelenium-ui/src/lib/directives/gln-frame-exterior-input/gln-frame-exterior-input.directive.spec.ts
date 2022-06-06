import { ElementRef } from '@angular/core';

import { GlnFrameExteriorInputDirective } from './gln-frame-exterior-input.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnFrameExteriorInputDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnFrameExteriorInputDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

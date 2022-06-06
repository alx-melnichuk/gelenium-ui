import { ElementRef } from '@angular/core';

import { GlnAutoFocuseOwnerDirective } from './gln-auto-focuse-owner.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnAutoFocuseOwnerDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnAutoFocuseOwnerDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

import { ElementRef, Renderer2 } from '@angular/core';

import { GlnAutoFocuseDirective } from './gln-auto-focuse.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);
const renderer: Renderer2 = {} as Renderer2;

describe('GlnAutoFocuseDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnAutoFocuseDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});

import { ElementRef, Renderer2 } from '@angular/core';

import { GlnFrameExteriorButtonDirective } from './gln-frame-exterior-button.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);
const renderer: Renderer2 = {} as Renderer2;

describe('GlnFrameExteriorButtonDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnFrameExteriorButtonDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});

import { ElementRef, Renderer2 } from '@angular/core';
import { GlnFrameOrnamentDirective } from './gln-frame-ornament.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);
const renderer: Renderer2 = {} as Renderer2;

describe('GlnFrameOrnamentDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnFrameOrnamentDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});

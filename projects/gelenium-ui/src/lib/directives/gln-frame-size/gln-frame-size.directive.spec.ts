import { ElementRef } from '@angular/core';
import { GlnFrameSizeDirective } from './gln-frame-size.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnFrameSizeDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnFrameSizeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

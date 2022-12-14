import { ElementRef } from '@angular/core';
import { GlnOptionsScrollDirective } from './gln-options-scroll.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnOptionsScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOptionsScrollDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

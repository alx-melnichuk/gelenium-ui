import { ElementRef } from '@angular/core';
import { GlnOptionListScrollDirective } from './gln-option-list-scroll.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

describe('GlnOptionListScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOptionListScrollDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

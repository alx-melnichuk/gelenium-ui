import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

import { GlnOptionListTriggerDirective } from './gln-option-list-trigger.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

const platformId: Object = {};
const renderer: Renderer2 = {} as Renderer2;
const control: NgControl | null = null;

describe('GlnOptionListTriggerDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOptionListTriggerDirective(platformId, renderer, elementRef, control);
    expect(directive).toBeTruthy();
  });
});

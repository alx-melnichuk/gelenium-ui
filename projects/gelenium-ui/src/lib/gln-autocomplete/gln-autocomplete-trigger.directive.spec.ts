import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';

const testElement: HTMLElement = document.createElement('div');
const elementRef = new ElementRef<HTMLElement>(testElement);

const platformId: Object = {};
const renderer: Renderer2 = {} as Renderer2;
const control: NgControl | null = null;

describe('GlnAutocompleteTriggerDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnAutocompleteTriggerDirective(platformId, renderer, elementRef, control);
    expect(directive).toBeTruthy();
  });
});

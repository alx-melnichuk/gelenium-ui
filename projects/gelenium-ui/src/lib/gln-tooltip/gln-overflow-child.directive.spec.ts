import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { GlnOverflowChildDirective } from './gln-overflow-child.directive';

const testElement: HTMLElement = document.createElement('div');
const hostRef = new ElementRef<HTMLElement>(testElement);

const changeDetectorRef: ChangeDetectorRef = {} as ChangeDetectorRef;

describe('GlnOverflowChildDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOverflowChildDirective(hostRef, changeDetectorRef);
    expect(directive).toBeTruthy();
  });
});

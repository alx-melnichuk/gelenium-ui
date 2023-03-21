import { ElementRef } from '@angular/core';

import { GlnOrnamentOwner } from './gln-ornament-owner.interface';
import { GlnOrnamentRightDirective } from './gln-ornament-right.directive';

const testElement: HTMLElement = document.createElement('div');
const hostRef = new ElementRef<HTMLElement>(testElement);

const ornamentOwner: GlnOrnamentOwner = {
  changeOrnament(isRemove: boolean, elementRef: ElementRef<HTMLElement>, isRight: boolean): void {},
};

describe('GlnOrnamentRightDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOrnamentRightDirective(hostRef, null);
    expect(directive).toBeTruthy();
  });

  it('method should be called changeOrnament(false, hostRef, true)', () => {
    const directive = new GlnOrnamentRightDirective(hostRef, ornamentOwner);
    spyOn(ornamentOwner, 'changeOrnament');
    directive.ngAfterContentInit();
    expect(ornamentOwner.changeOrnament).toHaveBeenCalledWith(false, hostRef, true);
  });

  it('method should be called changeOrnament(true, hostRef, true)', () => {
    const directive = new GlnOrnamentRightDirective(hostRef, ornamentOwner);
    spyOn(ornamentOwner, 'changeOrnament');
    directive.ngOnDestroy();
    expect(ornamentOwner.changeOrnament).toHaveBeenCalledWith(true, hostRef, true);
  });
});

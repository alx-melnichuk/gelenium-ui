import { ElementRef } from '@angular/core';
import { GlnOrnamentLeftDirective } from './gln-ornament-left.directive';
import { GlnOrnamentOwner } from './gln-ornament.interface';

const testElement: HTMLElement = document.createElement('div');
const hostRef = new ElementRef<HTMLElement>(testElement);

const ornamentOwner: GlnOrnamentOwner = {
  changeOrnament(isRemove: boolean, elementRef: ElementRef<HTMLElement>, isRight: boolean): void {},
};

describe('GlnOrnamentLeftDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnOrnamentLeftDirective(hostRef, null);
    expect(directive).toBeTruthy();
  });

  it('method should be called changeOrnament(false, hostRef, false)', () => {
    const directive = new GlnOrnamentLeftDirective(hostRef, ornamentOwner);
    spyOn(ornamentOwner, 'changeOrnament');
    directive.ngAfterContentInit();
    expect(ornamentOwner.changeOrnament).toHaveBeenCalledWith(false, hostRef, false);
  });

  it('method should be called changeOrnament(true, hostRef, false)', () => {
    const directive = new GlnOrnamentLeftDirective(hostRef, ornamentOwner);
    spyOn(ornamentOwner, 'changeOrnament');
    directive.ngOnDestroy();
    expect(ornamentOwner.changeOrnament).toHaveBeenCalledWith(true, hostRef, false);
  });
});

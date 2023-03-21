import { AfterContentInit, Directive, ElementRef, Inject, Optional, OnDestroy } from '@angular/core';

import { GlnOrnamentOwner, GLN_ORNAMENT_OWNER } from './gln-ornament-owner.interface';
import { GlnOrnament } from './gln-ornament.interface';

export const CSS_ATTR_ORN_RG = 'gln-orn-rg';
export const CSS_PROP_ORN_PD_RG = '--glnfro-pd-rg';

let uniqueIdCounter = 0;

@Directive({
  selector: '[gln-orn-rg]',
  exportAs: 'glnOrnamentRight',
})
export class GlnOrnamentRightDirective implements AfterContentInit, OnDestroy, GlnOrnament {
  public id = `glnorrg-${uniqueIdCounter++}`;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_ORNAMENT_OWNER) public ornamentOwner: GlnOrnamentOwner | null
  ) {}

  public ngAfterContentInit(): void {
    this.ornamentOwner?.changeOrnament(false, this.hostRef, true);
  }

  public ngOnDestroy(): void {
    this.ornamentOwner?.changeOrnament(true, this.hostRef, true);
  }
}

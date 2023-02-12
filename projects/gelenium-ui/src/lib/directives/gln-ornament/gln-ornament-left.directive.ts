import { AfterContentInit, Directive, ElementRef, Inject, OnDestroy, Optional } from '@angular/core';

import { GlnOrnament, GlnOrnamentOwner, GLN_ORNAMENT_OWNER } from './gln-ornament.interface';

export const CSS_ATTR_ORN_LF = 'gln-orn-lf';
export const CSS_PROP_ORN_PD_LF = '--glnfro-pd-lf';

let uniqueIdCounter = 0;

@Directive({
  selector: '[gln-orn-lf]',
  exportAs: 'glnOrnamentLeft',
})
export class GlnOrnamentLeftDirective implements AfterContentInit, OnDestroy, GlnOrnament {
  readonly id = `glnorlf-${uniqueIdCounter++}`;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_ORNAMENT_OWNER) public ornamentOwner: GlnOrnamentOwner | null
  ) {}

  public ngAfterContentInit(): void {
    this.ornamentOwner?.changeOrnament(false, this.hostRef, false);
  }

  public ngOnDestroy(): void {
    this.ornamentOwner?.changeOrnament(true, this.hostRef, false);
  }
}

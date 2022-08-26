import { AfterContentInit, AfterViewInit, ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';

import { GlnAutoFocuseDirective } from './gln-auto-focuse.directive';

@Directive({
  selector: '[glnAutoFocuseOwner]',
  exportAs: 'glnAutoFocuseOwner',
})
export class GlnAutoFocuseOwnerDirective implements AfterContentInit, AfterViewInit {
  @ContentChildren(GlnAutoFocuseDirective, { descendants: true })
  public list!: QueryList<GlnAutoFocuseDirective>;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngAfterContentInit(): void {
    const elem: GlnAutoFocuseDirective[] = this.list.toArray();
    for (let i = 0; i < elem.length; i++) {
      elem[i]?.setIsHasOwner(true);
    }
  }

  public ngAfterViewInit(): void {
    const elem: GlnAutoFocuseDirective[] = this.list.toArray();
    let elemAutoFocuse: GlnAutoFocuseDirective | null = null;
    for (let i = 0; i < elem.length && !elemAutoFocuse; i++) {
      if (elem[i] && elem[i].isAutoFocuse) {
        elemAutoFocuse = elem[i];
      }
    }
    if (elemAutoFocuse !== null) {
      Promise.resolve().then(() => {
        elemAutoFocuse?.focuseElement();
      });
    }
  }
}

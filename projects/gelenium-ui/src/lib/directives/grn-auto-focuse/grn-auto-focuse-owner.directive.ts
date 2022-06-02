import { AfterContentInit, AfterViewInit, ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';

import { GrnAutoFocuseDirective } from './grn-auto-focuse.directive';

@Directive({
  selector: '[grnAutoFocuseOwner]',
  exportAs: 'grnAutoFocuseOwner',
})
export class GrnAutoFocuseOwnerDirective implements AfterContentInit, AfterViewInit {
  @ContentChildren(GrnAutoFocuseDirective, { descendants: true })
  public list!: QueryList<GrnAutoFocuseDirective>;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    const elem: GrnAutoFocuseDirective[] = this.list.toArray();
    for (let i = 0; i < elem.length; i++) {
      elem[i]?.setIsHasOwner(true);
    }
  }

  ngAfterViewInit(): void {
    const elem: GrnAutoFocuseDirective[] = this.list.toArray();
    let elemAutoFocuse: GrnAutoFocuseDirective | null = null;
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

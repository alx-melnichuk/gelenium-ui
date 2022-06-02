import { Directive, ElementRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'a',
})
export class GrnLinkDirective {
  constructor(public templateRef: ElementRef<HTMLElement>) {}
}

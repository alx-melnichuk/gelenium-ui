import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[grnOrnament]',
})
export class GrnOrnamentDirective {
  constructor(private elementRef: ElementRef) {}
}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[grnOrnamentEnd],grnOrnamentEnd',
})
export class GrnOrnamentEndDirective {
  constructor(public elementRef: ElementRef) {}
}

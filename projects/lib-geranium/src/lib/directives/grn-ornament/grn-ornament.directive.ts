import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[grnOrnament],grnOrnament',
})
export class GrnOrnamentDirective {
  constructor(public elementRef: ElementRef) {}
}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[grnOrnamentEnd]',
})
export class GrnOrnamentEndDirective {
  constructor(private elementRef: ElementRef) {}
}

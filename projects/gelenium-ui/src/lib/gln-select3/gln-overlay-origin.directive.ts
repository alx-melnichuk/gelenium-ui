import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[glnOverlayOrigin]',
  exportAs: 'glnOverlayOrigin',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class GlnOverlayOrigin extends CdkOverlayOrigin {
  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }
}

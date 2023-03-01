import { AfterContentInit, ChangeDetectorRef, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[glnOverflowChild]',
  exportAs: 'glnOverflowChild',
})
export class GlnOverflowChildDirective implements AfterContentInit {
  public value: boolean = false;

  constructor(public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterContentInit(): void {
    this.value = this.getChildHasOverflow(this.hostRef.nativeElement);
    Promise.resolve().then(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  // ** Public methods **

  public getChildHasOverflow(element: HTMLElement = this.hostRef.nativeElement): boolean {
    const child: HTMLElement | null = (element?.children[0] as HTMLElement) || null;
    return element != null && child != null ? child.offsetWidth > element.offsetWidth : false;
  }
}

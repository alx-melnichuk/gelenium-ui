import { AfterContentInit, ChangeDetectorRef, Directive, ElementRef } from '@angular/core';

/**
 * <button class="ttft-btn"
 *   style="max-width: 106px; padding: 0 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
 *   glnTooltip="Action demo"
 *   [glnttDisabled]="!overflowChildZ0.getChildHasOverflow()"
 *   glnOverflowChild
 *   #overflowChildZ0="glnOverflowChild">
 *   <span>Action demo</span>
 * </button>
 */

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

  public getChildHasOverflow(element: HTMLElement | null = this.hostRef.nativeElement): boolean {
    const pdLeft: number = !!element ? Number(getComputedStyle(element).getPropertyValue('padding-left').replace('px', '')) : 0;
    const pdRight: number = !!element ? Number(getComputedStyle(element).getPropertyValue('padding-right').replace('px', '')) : 0;
    const child: HTMLElement | null = (element?.children[0] as HTMLElement) || null;
    return element != null && child != null ? element.offsetWidth - pdLeft - pdRight < child.offsetWidth : false;
  }
}

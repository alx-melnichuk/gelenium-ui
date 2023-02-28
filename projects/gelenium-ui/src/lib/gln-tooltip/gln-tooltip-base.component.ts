import { ChangeDetectorRef, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive()
export abstract class GlnTooltipBaseComponent {
  public text: string | null = null;
  public className: string | string[] = '';
  public isVisibility: boolean | null = null;
  public isArrow: boolean | null = null;

  constructor(protected hostRef: ElementRef<HTMLElement>, protected changeDetectorRef: ChangeDetectorRef) {}

  // ** Public methods **

  public show(): void {
    this.isVisibility = true;
    this.changeDetectorRef.markForCheck();
  }

  public hide(): void {
    this.isVisibility = false;
    this.changeDetectorRef.markForCheck();
  }

  public isVisible(): boolean {
    return !!this.isVisibility;
  }

  public getHostRef(): ElementRef<HTMLElement> {
    return this.hostRef;
  }
  /** Used to draw the original text before positioning the tooltip.
   * This solves the issue in components with ChangeDetectionStrategy.OnPush. */
  public markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }

  public setArrow(isArrow: boolean | null): void {
    if (this.isArrow !== isArrow) {
      this.isArrow !== isArrow;
      this.changeDetectorRef.markForCheck();
    }
  }

  public getListClassNames(className: string | string[]): string {
    const buffer: string[] = [];
    if (typeof className === 'string') {
      buffer.push(className);
    } else if (Array.isArray(className)) {
      buffer.push(...className);
    }
    const result: string[] = [];
    for (let idx = 0; idx < buffer.length; idx++) {
      if (buffer[idx]) {
        result.push(buffer[idx]);
      }
    }
    return result.join(' ');
  }
}

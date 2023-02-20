import { ChangeDetectorRef, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive()
export abstract class GlnTooltipBaseComponent {
  public text: string = '';
  public isVisibility: boolean | null = null;

  constructor(protected hostRef: ElementRef<HTMLElement>, protected changeDetectorRef: ChangeDetectorRef) {}

  // @HostListener('animationend', ['$event'])
  // @HostListener('animationcancel', ['$event'])
  // public doAnimationFinish(event: AnimationEvent): void {
  //   console.log(`doAnimationFinish(isVisibility=${this.isVisibility});`, event); // # mouseenter
  // }
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
}

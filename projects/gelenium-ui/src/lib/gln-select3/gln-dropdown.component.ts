import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'gln-dropdown',
  template: ` <ng-template #elemTemplateRef><ng-content></ng-content></ng-template>`,
})
export class GlnDropdownComponent implements OnInit, AfterViewInit {
  @Input()
  public reference: HTMLElement | undefined;

  // @ViewChild(CdkPortal, { static: true })
  // public contentTemplate!: CdkPortal;
  @ViewChild('elemTemplateRef', { static: true })
  public elemTemplateRef!: TemplateRef<HTMLElement>;

  public showing = false;

  private overlayRef: OverlayRef | undefined;
  private templatePortal: TemplatePortal<HTMLElement> | undefined;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  public ngOnInit(): void {
    console.log('OnInit(); elemTemplateRef-', !!this.elemTemplateRef); // TODO del;
  }

  public ngAfterViewInit(): void {
    console.log('AfterViewInit();'); // TODO del;
  }

  @HostListener('window:resize')
  public onWinResize(): void {
    this.syncWidth();
  }

  public show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.templatePortal = new TemplatePortal(this.elemTemplateRef, this.viewContainerRef);
    this.overlayRef.attach(this.templatePortal);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  public hide(): void {
    this.overlayRef?.detach();
    this.showing = false;
  }

  protected getOverlayConfig(): OverlayConfig {
    const referenceElem = this.reference as Element;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(referenceElem)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference?.getBoundingClientRect() || { width: 100 };
    this.overlayRef.updateSize({ width: refRect.width });
  }

  // private createTemplatePortal(templateRef: TemplateRef<HTMLElement>): TemplatePortal {
  //   const templatePortal = new TemplatePortal(
  //     templateRef,
  //     this.viewContainerRef,
  //     {
  //                          $implicit: "I am passing in the data",
  //     }

  // }
}

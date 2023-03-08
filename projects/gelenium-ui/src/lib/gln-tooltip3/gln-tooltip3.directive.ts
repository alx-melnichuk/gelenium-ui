import { ComponentPortal, DomPortalHost, DomPortalOutlet, Portal, PortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { GlnLayerComponent } from '../gln-layer/gln-layer.component';
import { GlnLayerHandler } from '../gln-layer/gln-layer.handler';

import { GlnTooltip3BlockComponent } from './gln-tooltip3-block.component';

export class DomPortalOutletExt extends DomPortalOutlet {
  // private _attachedHost;
  /** Attach this portal to a host. */
  override attach(portal: Portal<any>): any {
    console.log(`super.attach(host);`); // #
    return super.attach(portal);
  }
  /** Detach this portal from its host */
  override detach(): void {
    super.detach();
    console.log(`super.detach();`); // #
  }
}

@Directive({
  selector: '[glnTooltip3]',
  exportAs: 'glnTooltip3',
})
export class GlnTooltip3Directive implements OnChanges, OnInit {
  @Input('glnttContent')
  public content: Record<string, unknown> | null = null;
  @Input('glnTooltip3')
  public message: string | TemplateRef<unknown> | null | undefined;
  @Input('glnttPosition')
  public position: string | null | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';

  public positionVal: string | null = null; // Binding attribute "position"

  private isDisabledVal: boolean | null = null;
  private layerHandler: GlnLayerHandler<any>;

  private portalBlockOutlet: DomPortalOutlet | null = null;
  private portalLayerOutlet: DomPortalOutlet | null = null;
  private portalLayer: ComponentPortal<GlnLayerComponent> | null = null;
  private portalBlock: ComponentPortal<GlnTooltip3BlockComponent> | null = null;
  private layerInstanceRef: ComponentRef<GlnLayerComponent> | null = null;
  private blockInstanceRef: ComponentRef<GlnTooltip3BlockComponent> | null = null;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>
  ) {
    this.layerHandler = new GlnLayerHandler<GlnTooltip3BlockComponent>(
      this.applicationRef,
      GlnTooltip3BlockComponent,
      this.componentFactoryResolver,
      this.injector,
      this.renderer,
      this.viewContainerRef
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] /* || (changes['config'] && this.position == null && this.currConfig.position != null)*/) {
      this.positionVal = this.position /*|| this.currConfig.position*/ || null;
    }
  }

  public ngOnInit(): void {
    if (this.positionVal === null) {
      this.positionVal = /*this.currConfig.position ||*/ null;
    }
  }
  // ** Public methods **

  /** Show tooltip after delay in ms. */
  public show(): void {
    console.log(`show();`);
    const originalElement: HTMLElement | null = this.hostRef.nativeElement;
    if (this.isDisabledVal || !this.message || !!this.blockInstanceRef || !originalElement) {
      return;
    }

    // const portalWrapper = document.createElement('div');
    // portalWrapper.setAttribute('class', 'portal-wrapper');
    // renderer.removeClass(this._document.body, 'modal-open');
    // popuper
    // layer
    // parentElement.appendChild(portalWrapper);
    // https://github.com/angular/components/blob/main/src/cdk/portal/dom-portal-outlet.ts

    /*
    this.portalLayerOutlet = new DomPortalOutlet(parentElement, this.componentFactoryResolver, this.applicationRef, this.injector);

    this.portalLayer = new ComponentPortal(GlnLayerComponent, this.viewContainerRef, this.injector);

    this.instanceLayerRef = this.portalLayerOutlet.attach(this.portalLayer);

    const elementLayer: Element = this.instanceLayerRef.location.nativeElement;

    // Create a portalHost from a DOM element
    this.portalBlockOutlet = new DomPortalOutlet(elementLayer, this.componentFactoryResolver, this.applicationRef, this.injector);

    this.portalBlock = new ComponentPortal(GlnTooltip3BlockComponent, this.viewContainerRef, this.injector);

    this.instanceBlockRef = this.portalBlockOutlet.attach(this.portalBlock);
    */

    this.blockInstanceRef = this.layerHandler.open(originalElement, this.positionVal);
    if (!!this.blockInstanceRef) {
      this.blockInstanceRef.setInput('text', this.message);

      this.blockInstanceRef.changeDetectorRef.detectChanges();

      this.blockInstanceRef.changeDetectorRef.markForCheck();
    }
    /*
    // Locate the component factory for the HeaderComponent
    this.portalBlock = new ComponentPortal(GlnTooltip3BlockComponent, this.viewContainerRef, this.injector);

    // const component = this.viewContainerRef.createComponent(GlnTooltip3BlockComponent, { injector: this.injector } );
    // component.hostView
    // Attach portal to host
    console.log(`portalHost.attach(this.portal);`); // #
    this.instanceBlockRef = this.portalHost.attach(this.portal);
    this.instanceBlockRef.setInput('text', this.message);
    this.instanceBlockRef.changeDetectorRef.detectChanges();
    this.instanceBlockRef.changeDetectorRef.markForCheck();
    */
  }

  public hide(): void {
    console.log(`this.hide();#1`); // #
    if (this.isDisabledVal || !this.blockInstanceRef) {
      return;
    }
    this.layerHandler.close();
    // Remove the reference to the component instance.
    this.blockInstanceRef = null;
  }

  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }
  /** If the tooltip is currently visible, returns true. */
  public isVisible(): boolean {
    return !!this.blockInstanceRef;
  }
}
/*
  const containerEl = this.containerEl;
  this.anchorPortal = new ComponentPortal(AnchorComponent);
  const portalOutlet = new DomPortalOutlet(
    document.body,
    this.cfr,
    this.appRef,
    this.injector,
  );
  const anchorComponentRef = this.anchorPortal.attach(portalOutlet);
  const anchorEl = anchorComponentRef.injector.get(ElementRef)
    .nativeElement as HTMLElement;

  requestAnimationFrame(() =>
    this.adaptAnchorPosition(containerEl, anchorEl),
  );
*/

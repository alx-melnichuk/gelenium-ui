import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnLayerComponent } from './gln-layer.component';

export const LAYER_POSITION: { [key: string]: string } = {
  'bottom': 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  'top': 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  'right': 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  'left': 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
};

export class GlnLayerHandler<T> {
  private componentRef: ComponentRef<T> | null = null;
  private portalLayerOutlet: DomPortalOutlet | null = null;
  private portalBlockOutlet: DomPortalOutlet | null = null;
  private portalLayer: ComponentPortal<GlnLayerComponent> | null = null;
  private portalBlock: ComponentPortal<T> | null = null;
  private instanceLayerRef: ComponentRef<GlnLayerComponent> | null = null;
  private instanceBlockRef: ComponentRef<T> | null = null;

  constructor(
    private applicationRef: ApplicationRef,
    private componentType: Type<any>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
    console.log(`GlnLayerHandler();`); // #
  }

  public open(originalElement: HTMLElement | null, position: string | null): ComponentRef<T> | null {
    if (!!originalElement && !!originalElement.parentElement) {
      const offsetWidth: number = originalElement.offsetWidth;

      this.portalLayerOutlet = new DomPortalOutlet(
        originalElement.parentElement,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      this.portalLayer = new ComponentPortal(GlnLayerComponent, this.viewContainerRef, this.injector);

      this.instanceLayerRef = this.portalLayerOutlet.attach(this.portalLayer);

      const elementLayerRef: ElementRef<any> = this.instanceLayerRef.location;
      HtmlElemUtil.setProperty(elementLayerRef, 'width', offsetWidth.toString().concat('px'));

      const elementLayer: Element = this.instanceLayerRef.location.nativeElement;

      // Create a portalHost from a DOM element.
      this.portalBlockOutlet = new DomPortalOutlet(elementLayer, this.componentFactoryResolver, this.applicationRef, this.injector);

      console.log(`GlnLayerHandler.open() portalBlockOutlet.attach();`); // #
      this.portalBlock = new ComponentPortal(this.componentType, this.viewContainerRef, this.injector);

      this.instanceBlockRef = this.portalBlockOutlet.attach(this.portalBlock);

      this.setLayerPosition(position);
    }
    return this.instanceBlockRef;
  }

  public close(): void {
    if (!!this.portalLayerOutlet && this.portalLayerOutlet.hasAttached()) {
      console.log(`GlnLayerHandler.open() portalLayerOutlet.detach();`); // #
      if (!!this.portalBlockOutlet && this.portalBlockOutlet.hasAttached()) {
        this.portalBlockOutlet.detach();
      }
      this.portalLayerOutlet.detach();
    }
    // Remove the reference to the component instance.
    this.instanceLayerRef = null;
  }

  /** Get the correct "position" value. */
  public getValidPosition(position: string | null): string {
    return LAYER_POSITION[position || ''] || LAYER_POSITION['bottom'];
  }

  public setLayerPosition(position: string | null): void {
    if (!!this.instanceLayerRef && !!this.instanceBlockRef) {
      const elementLayerRef: ElementRef<HTMLElement> = this.instanceLayerRef.location;
      const validPosition: string = this.getValidPosition(position);

      HtmlElemUtil.setAttr(this.renderer, elementLayerRef, 'glnly-position', validPosition);

      const layerJustifyContent: string = this.getLayerJustifyContent(validPosition);
      HtmlElemUtil.setProperty(elementLayerRef, 'justify-content', layerJustifyContent);

      const elementBlockRef: ElementRef<any> = this.instanceBlockRef.location;

      const blockMargin: string = this.getBlockMargin(validPosition);
      HtmlElemUtil.setProperty(elementBlockRef, blockMargin, 'var(--glnly--indent)');
    }
  }

  private getLayerJustifyContent(position: string): string {
    let result: string = '';
    if (position === 'bottom') {
      result = 'center';
    } else if (position === 'bottom-start') {
      result = ' flex-start';
    } else if (position === 'bottom-end') {
      result = 'flex-end';
    } else if (position === 'top') {
      result = 'center';
    } else if (position === 'top-start') {
      result = ' flex-start';
    } else if (position === 'top-end') {
      result = 'flex-end';
    } else if (position === 'right') {
      result = '';
    } else if (position === 'right-start') {
      result = '';
    } else if (position === 'right-end') {
      result = '';
    } else if (position === '') {
      result = '';
    }
    // '': 'right',
    // : 'right-start',
    // : 'right-end',
    // 'left': 'left',
    // 'left-start': 'left-start',
    // 'left-end': 'left-end',

    return result;
  }
  private getBlockMargin(position: string): string {
    let result: string = '';
    if (position.startsWith('bottom')) {
      result = 'margin-top';
    } else if (position.startsWith('top')) {
      result = 'margin-bottom';
    } else if (position.startsWith('right')) {
      result = 'margin-left';
    } else if (position.startsWith('left')) {
      result = 'margin-right';
    }

    return result;
  }
}

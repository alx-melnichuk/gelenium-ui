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
  private layerInstanceRef: ComponentRef<GlnLayerComponent> | null = null;
  private blockInstanceRef: ComponentRef<T> | null = null;
  private originalElement: HTMLElement | null = null;

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
      this.originalElement = originalElement;

      this.portalLayerOutlet = new DomPortalOutlet(
        originalElement.parentElement,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      this.portalLayer = new ComponentPortal(GlnLayerComponent, this.viewContainerRef, this.injector);

      this.layerInstanceRef = this.portalLayerOutlet.attach(this.portalLayer);

      const layerElementRef: ElementRef<any> = this.layerInstanceRef.location;
      // HtmlElemUtil.setProperty(layerElementRef, 'width', offsetWidth.toString().concat('px'));

      const layerElement: Element = this.layerInstanceRef.location.nativeElement;

      // Create a portalHost from a DOM element.
      this.portalBlockOutlet = new DomPortalOutlet(layerElement, this.componentFactoryResolver, this.applicationRef, this.injector);

      console.log(`GlnLayerHandler.open() portalBlockOutlet.attach();`); // #
      this.portalBlock = new ComponentPortal(this.componentType, this.viewContainerRef, this.injector);

      this.blockInstanceRef = this.portalBlockOutlet.attach(this.portalBlock);

      const blockElementRef: ElementRef<any> = this.blockInstanceRef.location;
      HtmlElemUtil.setAttr(this.renderer, blockElementRef, 'glnly-indent', '');

      this.setLayerPosition(position);
    }
    return this.blockInstanceRef;
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
    this.layerInstanceRef = null;
  }

  /** Get the correct "position" value. */
  public getValidPosition(position: string | null): string {
    return LAYER_POSITION[position || ''] || LAYER_POSITION['bottom'];
  }

  public setLayerPosition(position: string | null): void {
    const layerElementRef: ElementRef<HTMLElement> | null = this.layerInstanceRef?.location || null;
    if (!!this.originalElement && !!layerElementRef) {
      const positionVld: string = this.getValidPosition(position);

      const originalHeight: number = this.originalElement.offsetHeight;
      const originalWidth: number = this.originalElement.offsetWidth;

      const isLayerRight: boolean = this.isLayerRightOfOriginalElement(this.originalElement, layerElementRef.nativeElement);

      const layerProperties: Record<string, string> = this.getLayerProperties(positionVld, isLayerRight, originalHeight, originalWidth);

      const keyList: string[] = Object.keys(layerProperties);
      for (let idx = 0; idx < keyList.length; idx++) {
        HtmlElemUtil.setProperty(layerElementRef, keyList[idx], layerProperties[keyList[idx]]);
      }

      HtmlElemUtil.setAttr(this.renderer, layerElementRef, 'glnly-position', positionVld);
    }
  }

  private isLayerRightOfOriginalElement(originalElement: HTMLElement | null, layerElement: HTMLElement | null): boolean {
    let result: boolean = false;
    if (!!originalElement && !!layerElement) {
      const originalRect: DOMRect = originalElement.getBoundingClientRect();
      const layerRect: DOMRect = layerElement.getBoundingClientRect();
      result = originalRect.left < layerRect.left && originalRect.right === layerRect.left;
    }
    return result;
  }
  private getLayerProperties(position: string | null, isLayerRight: boolean, orgHeight: number, orgWidth: number): Record<string, string> {
    const layerProperties: Record<string, string> = {};
    if (!!position) {
      layerProperties['height'] = '0px';
      layerProperties['width'] = '0px';

      const deltaTop: number = !isLayerRight ? 0 : orgHeight;
      const deltaRight: number = !isLayerRight ? 0 : orgWidth;

      const justify: string = position.endsWith('-start') ? 'flex-start' : position.endsWith('-end') ? 'flex-end' : 'center';
      layerProperties['justify-content'] = justify;

      const positionBottom: boolean = position.startsWith('bottom');
      const positionLeft: boolean = position.startsWith('left');

      if (positionBottom || position.startsWith('top')) {
        layerProperties['align-items'] = positionBottom ? 'flex-start' : 'flex-end';
        layerProperties['top'] = deltaTop - (positionBottom ? 0 : orgHeight) + 'px';
        if ('flex-start' === justify) {
          layerProperties['right'] = deltaRight + 'px';
        } else if ('flex-end' === justify) {
          layerProperties['right'] = deltaRight - orgWidth + 'px';
        } else if ('center' === justify) {
          layerProperties['right'] = deltaRight - Math.round((orgWidth / 2) * 100) / 100 + 'px';
        }
      } else if (positionLeft || position.startsWith('right')) {
        layerProperties['flex-direction'] = 'column'; // Displays the block on the left.
        layerProperties['align-items'] = positionLeft ? 'flex-end' : 'flex-start';

        layerProperties['right'] = deltaRight - (positionLeft ? 0 : orgWidth) + 'px';
        if ('flex-start' === justify) {
          layerProperties['top'] = deltaTop - orgHeight + 'px';
        } else if ('flex-end' === justify) {
          layerProperties['top'] = deltaTop + 'px';
        } else if ('center' === justify) {
          layerProperties['top'] = deltaTop - Math.round((orgHeight / 2) * 100) / 100 + 'px';
        }
      }
    }
    return layerProperties;
  }
}

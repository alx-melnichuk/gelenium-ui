import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';
const CSS_ATTR_NO_ANM = 'noAnm';

const PANEL_CLASS = 'gln-tooltip-panel';

export function GLN_TOOLTIP_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

@Directive()
export abstract class GlnTooltipBaseDirective<T extends GlnTooltipBaseComponent> implements OnDestroy {
  public message: string | null | undefined;

  protected abstract readonly tooltipComponent: ComponentType<T>;

  public hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public panelClassVal: string[] = []; // Binding attribute "panelClass"
  public positionList: ConnectedPosition[] = []; // Binding attribute "position"
  public showDelayVal: number | null = null; // Binding attribute "showDelay".

  protected overlayRef: OverlayRef | null = null;
  protected portal: ComponentPortal<T> | null = null;
  /** Scroll handling strategy when the tooltip is open. */
  protected scrollStrategy: ScrollStrategy;
  protected tooltipInstance: T | null = null;

  constructor(
    protected overlay: Overlay,
    protected overlayPositionBuilder: OverlayPositionBuilder,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>
  ) {
    this.scrollStrategy =
      // this.scrollStrategyFactory != null ? this.scrollStrategyFactory() :
      // GLN_TOOLTIP_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(this.overlay);
      this.overlay.scrollStrategies.block(); // close();
  }

  public ngOnDestroy(): void {
    // const nativeElement = this._elementRef.nativeElement;

    // clearTimeout(this._touchstartTimeout);

    if (this.overlayRef != null) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    this.tooltipInstance = null;
    this.portal = null;
  }

  // ** Public methods **

  /** Show tooltip after delay in ms. */
  public show(delay: number = this.showDelayVal || 0): Promise<void> {
    console.log(`show();`);
    if (this.isDisabledVal || !this.message || !!this.tooltipInstance) {
      // || (this._isTooltipVisible() && !this._tooltipInstance!._showTimeoutId && !this._tooltipInstance!._hideTimeoutId)
      return Promise.resolve();
    }

    if (this.overlayRef == null) {
      const positionStrategy: PositionStrategy = this.createPositionStrategy(this.hostRef);
      const scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.reposition();
      const panelClass: string[] = [PANEL_CLASS].concat(this.panelClassVal) || [];
      // this.overlayRef = this.createOverlay(positionStrategy, scrollStrategy, [PANEL_CLASS].concat(this.panelClassVal || []));
      this.overlayRef = this.overlay.create(this.createOverlayConfig(positionStrategy, scrollStrategy, panelClass));
    }
    this.overlayDetach();
    // const overlayRef = this.createOverlay();
    // this._detach();
    // this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    // this._tooltipInstance = overlayRef.attach(this._portal).instance;
    // this._tooltipInstance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    // this._setTooltipClass(this._tooltipClass);
    // this._updateTooltipMessage();
    // this._tooltipInstance!.show(delay);

    if (this.portal == null) {
      // Create a portal for tooltips.
      this.portal = new ComponentPortal(this.tooltipComponent, this.viewContainerRef);
    }
    // #const tooltipPortal = new ComponentPortal(GlnTooltipComponent);
    // #const tooltipRef: ComponentRef<GlnTooltipComponent> = this.overlayRef.attach(tooltipPortal);

    // Attach the tooltip portal to the overlay and get an instance of it.
    this.tooltipInstance = this.overlayRef.attach(this.portal).instance;
    // Pass content to the tooltip component instance.
    this.tooltipInstance.text = this.message || '';

    return this.executeCallBackOnDelay(delay, () => {
      const instanceRef: ElementRef<HTMLElement> = this.tooltipInstance!.getHostRef();
      // Add the necessary attributes for the tooltip before displaying.
      HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_SHOW, '');
      if (this.isNoAnimationVal) {
        HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_NO_ANM, '');
      }
      // Set isVisibility = true;
      this.tooltipInstance!.show();
    });
  }

  /** Hides the tooltip after a delay in ms. */
  public hide(delay: number = this.hideDelayVal || 0): Promise<void> {
    if (this.isDisabledVal || !this.tooltipInstance) {
      return Promise.resolve();
    }
    return this.executeCallBackOnDelay(delay, () => {
      const instanceRef: ElementRef<HTMLElement> = this.tooltipInstance!.getHostRef();
      // Add the necessary attributes for the tooltip before hiding.
      HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_SHOW, null);
      HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_HIDE, '');
      // Set isVisibility = false;
      this.tooltipInstance!.hide();
      if (!this.isNoAnimationVal) {
        // Add an animation completion listener.
        // A value of "true" indicates that the listener should be called at most once after being added.
        instanceRef.nativeElement.addEventListener('animationend', this.overlayDetach, { once: true });
        instanceRef.nativeElement.addEventListener('animationcancel', this.overlayDetach, { once: true });
      } else {
        // If there is no animation, then remove the tooltip component instance.
        this.overlayDetach();
      }
    });
  }

  /** If the tooltip is currently visible, returns true. */
  public isVisible(): boolean {
    return !!this.tooltipInstance?.isVisible();
  }

  public overlayDetach = (): void => {
    console.log(`overlayDetach();`); // #
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.tooltipInstance = null;
  };

  // ** Private methods **

  private executeCallBackOnDelay(delay: number, callBack: () => void): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: () => void) => {
      if (delay > 0) {
        setTimeout(() => {
          callBack();
          resolve();
        }, delay);
      } else {
        callBack();
        resolve();
      }
    });
  }
  private createPositionStrategy(hostRef: ElementRef<HTMLElement>): PositionStrategy {
    return (
      this.overlayPositionBuilder
        // Create position attached to the elementRef
        .flexibleConnectedTo(hostRef)
        // Describe how to connect overlay to the elementRef
        // Means, attach overlay's center bottom point to the
        // top center point of the elementRef.
        .withPositions([
          // { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' } // top center
          // { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },   // top start-left
          { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }, // top end-right
          // { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' }, // bottom center
        ])
    );
  }
  private createOverlayConfig(positionStrategy: PositionStrategy, scrollStrategy: ScrollStrategy, panelClass: string[]): OverlayConfig {
    return {
      // class OverlayConfig
      // Strategy with which to position the overlay.
      positionStrategy,
      // Strategy to be used when handling scroll events while the overlay is open.
      scrollStrategy,
      // Custom class to add to the overlay pane.
      panelClass,
      // // Whether the overlay has a backdrop.
      // hasBackdrop?: boolean;
      // // Custom class to add to the backdrop
      // backdropClass?: string | string[];
      // /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
      // width?: number | string;
      // /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
      // height?: number | string;
      // /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
      // minWidth?: number | string;
      // /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
      // minHeight?: number | string;
      // /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
      // maxWidth?: number | string;
      // /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
      // maxHeight?: number | string;
      // Direction of the text in the overlay panel. If a `Directionality` instance
      // is passed in, the overlay will handle changes to its value automatically.
      // direction,
      // Whether the overlay should be disposed of when the user goes backwards/forwards in history.
      // Note that this usually doesn't include clicking on links (unless the user is using
      // the `HashLocationStrategy`).
      disposeOnNavigation: true,
    };
  }
  private createOverlay(
    positionStrategy?: PositionStrategy | undefined,
    scrollStrategy?: ScrollStrategy | undefined,
    panelClass?: string | string[] | undefined
    // direction?: Directionality | undefined
  ): OverlayRef {
    if (false) {
      /*
      const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);

      // Create connected position strategy that listens for scroll events to reposition.
      const strategy = this._overlay.position()
                          .flexibleConnectedTo(this._elementRef)
                          .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
                          .withFlexibleDimensions(false)
                          .withViewportMargin(this._viewportMargin)
                          .withScrollableContainers(scrollableAncestors);

      strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(change => {
        this._updateCurrentPositionClass(change.connectionPair);

        if (this._tooltipInstance) {
          if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
            // After position changes occur and the overlay is clipped by
            // a parent scrollable then close the tooltip.
            this._ngZone.run(() => this.hide(0));
          }
        }
      });
      this.overlayRef = this.overlay.create({
        // direction: this._dir,
        positionStrategy: strategy,
        // panelClass: `${this._cssClassPrefix}-${PANEL_CLASS}`,
        scrollStrategy: this._scrollStrategy()
      }); */
    }
    const result: OverlayRef = this.overlay.create({
      // class OverlayConfig
      // Strategy with which to position the overlay.
      positionStrategy,
      // Strategy to be used when handling scroll events while the overlay is open.
      scrollStrategy,
      // Custom class to add to the overlay pane.
      panelClass,
      // // Whether the overlay has a backdrop.
      // hasBackdrop?: boolean;
      // // Custom class to add to the backdrop
      // backdropClass?: string | string[];
      // /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
      // width?: number | string;
      // /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
      // height?: number | string;
      // /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
      // minWidth?: number | string;
      // /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
      // minHeight?: number | string;
      // /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
      // maxWidth?: number | string;
      // /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
      // maxHeight?: number | string;
      // Direction of the text in the overlay panel. If a `Directionality` instance
      // is passed in, the overlay will handle changes to its value automatically.
      // direction,
      // Whether the overlay should be disposed of when the user goes backwards/forwards in history.
      // Note that this usually doesn't include clicking on links (unless the user is using
      // the `HashLocationStrategy`).
      disposeOnNavigation: true,
    });

    // this._updatePosition(this._overlayRef);

    // this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    // this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());

    return result;
  }
}

/*
export class TooltipDirective {
  overlayRef: OverlayRef;
  
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private overlay: Overlay) {}
  
  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent) {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: $event.x, y: $event.y })
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }]);
      
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
    
    this.overlayRef.attach(this.templateRef);
  }*/

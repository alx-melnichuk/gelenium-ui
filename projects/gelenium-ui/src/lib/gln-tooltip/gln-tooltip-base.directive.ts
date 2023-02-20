import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';
const CSS_ATTR_NO_ANM = 'noAnm';

const PANEL_CLASS = 'gln-tooltip-panel';

@Directive()
export abstract class GlnTooltipBaseDirective<T extends GlnTooltipBaseComponent> implements OnDestroy {
  public message: string | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public panelClass: string | string[] = '';
  @Input('')
  public position: string | null | undefined; // 'left' | 'right' | 'above' | 'below' | 'before' | 'after'

  protected abstract readonly tooltipComponent: ComponentType<T>;

  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public panelClassVal: string[] = []; // Binding attribute "panelClass"
  public positionList: ConnectedPosition[] = []; // Binding attribute "position"

  protected overlayRef: OverlayRef | null = null;
  protected portal: ComponentPortal<T> | null = null;
  protected tooltipInstance: T | null = null;

  constructor(
    protected overlay: Overlay,
    protected overlayPositionBuilder: OverlayPositionBuilder,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>
  ) {}

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
  public show(delay: number): void {
    console.log(`show();`);
    if (this.isDisabledVal || !this.message || !!this.tooltipInstance) {
      // || (this._isTooltipVisible() && !this._tooltipInstance!._showTimeoutId && !this._tooltipInstance!._hideTimeoutId)
      return;
    }
    const positionStrategy: PositionStrategy = this.createPositionStrategy();
    const scrollStrategy: ScrollStrategy | undefined = undefined;

    if (this.overlayRef == null) {
      const panelClass: string[] = [PANEL_CLASS].concat(this.panelClassVal) || [];
      // this.overlayRef = this.createOverlay(positionStrategy, scrollStrategy, [PANEL_CLASS].concat(this.panelClassVal || []));
      this.overlayRef = this.overlay.create({
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
    }
    this.overlayDetach();
    // const overlayRef = this.createOverlay();
    // this._detach();
    // this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    // this._tooltipInstance = overlayRef.attach(this._portal).instance;
    // this._tooltipInstance.afterHidden()
    //   .pipe(takeUntil(this._destroyed))
    //   .subscribe(() => this._detach());
    // this._setTooltipClass(this._tooltipClass);
    // this._updateTooltipMessage();
    // this._tooltipInstance!.show(delay);

    if (this.portal == null) {
      // Create tooltip portal
      this.portal = new ComponentPortal(this.tooltipComponent, this.viewContainerRef);
    }
    // const tooltipPortal = new ComponentPortal(GlnTooltipComponent);
    // Attach tooltip portal to overlay
    // const tooltipRef: ComponentRef<GlnTooltipComponent> = this.overlayRef.attach(tooltipPortal);
    this.tooltipInstance = this.overlayRef.attach(this.portal).instance;
    // Pass content to tooltip component instance
    this.tooltipInstance.text = this.message || '';

    this.tooltipInstance!.show();
    const instanceHostRef: ElementRef<HTMLElement> = this.tooltipInstance.getHostRef();
    HtmlElemUtil.setAttr(this.renderer, instanceHostRef, CSS_ATTR_IS_SHOW, '');
    if (this.isNoAnimationVal) {
      HtmlElemUtil.setAttr(this.renderer, instanceHostRef, CSS_ATTR_NO_ANM, '');
    }
  }
  // A value of "true" indicates that the listener should be called at most once after being added.

  /** Hides the tooltip after a delay in ms. */
  public hide(delay: number): void {
    console.log(`hide();`);
    if (this.tooltipInstance != null) {
      this.tooltipInstance.hide();
      const instanceHostRef: ElementRef<HTMLElement> = this.tooltipInstance.getHostRef();
      HtmlElemUtil.setAttr(this.renderer, instanceHostRef, CSS_ATTR_IS_SHOW, null);
      HtmlElemUtil.setAttr(this.renderer, instanceHostRef, CSS_ATTR_IS_HIDE, '');
      if (!this.isNoAnimationVal) {
        console.log(`hide(); addEventListener('animationend');`); // #
        instanceHostRef.nativeElement.addEventListener('animationend', this.overlayDetach, { once: true });
        instanceHostRef.nativeElement.addEventListener('animationcancel', this.overlayDetach, { once: true });
      } else {
        this.overlayDetach();
      }
    }
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

  private createPositionStrategy(): PositionStrategy {
    return (
      this.overlayPositionBuilder
        // Create position attached to the elementRef
        .flexibleConnectedTo(this.hostRef)
        // Describe how to connect overlay to the elementRef
        // Means, attach overlay's center bottom point to the
        // top center point of the elementRef.
        .withPositions([{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' }])
    );
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

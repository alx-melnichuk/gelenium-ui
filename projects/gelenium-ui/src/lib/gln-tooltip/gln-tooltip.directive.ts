import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';

import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnTooltipConfig } from './gln-tooltip-config.interface';
import { GlnTooltipBaseComponent, GlnTooltipComponent } from './gln-tooltip.component';

@Directive()
export abstract class GlnTooltipBaseDirective<T extends GlnTooltipBaseComponent> implements OnDestroy {
  public message: string | null | undefined;

  protected abstract readonly tooltipComponent: ComponentType<T>;

  constructor() {}

  public ngOnDestroy(): void {}

  public show(delay: number): void {}

  public hide(delay: number): void {}

  public isVisible(): boolean {
    return false;
  }
}

const PANEL_CLASS = 'gln-tooltip-panel';

export const TOOLTIP_POSITION: { [key: string]: string } = {
  left: 'left',
  right: 'right',
  above: 'above',
  below: 'below',
  before: 'before',
  after: 'after',
};

export const GLN_TOOLTIP_CONFIG = new InjectionToken<GlnTooltipConfig>('GLN_TOOLTIP_CONFIG');

let uniqueIdCounter = 0;

@Directive({
  selector: '[glnTooltip]',
  exportAs: 'glnTooltip',
})
export class GlnTooltipDirective extends GlnTooltipBaseDirective<GlnTooltipComponent> implements OnChanges, OnInit, OnDestroy {
  @Input()
  public id = `glntt-${uniqueIdCounter++}`;
  @Input()
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnTooltipDisabled')
  public isDisabled: string | boolean | null | undefined; // #!

  @Input('glnTooltip')
  public override message: string | null | undefined;

  @Input()
  public panelClass: string | string[] = '';
  @Input('glnTooltipPosition')
  public position: string | null | undefined; // 'left' | 'right' | 'above' | 'below' | 'before' | 'after'

  public currConfig: GlnTooltipConfig;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public panelClassVal: string[] = []; // Binding attribute "panelClass"
  public positionList: ConnectedPosition[] = [];

  protected readonly tooltipComponent = GlnTooltipComponent;

  private overlayRef: OverlayRef | null = null;
  private portal: ComponentPortal<GlnTooltipComponent> | null = null;
  private tooltipInstance: GlnTooltipComponent | null = null;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_TOOLTIP_CONFIG) private rootConfig: GlnTooltipConfig | null
  ) {
    super();
    this.currConfig = this.rootConfig || {};
    // this.scrollStrategy =
    //   this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-tooltip', true);
  }

  @HostListener('mouseenter', ['$event'])
  public doMouseenter(event: MouseEvent): void {
    console.log(`doMouseenter();`); // #
    this.show();
  }
  @HostListener('mouseout')
  public doMouseout(event: MouseEvent): void {
    console.log(`doMouseout();`); // #
    this.hide();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      this.settingDisabled(this.isDisabledVal, this.renderer, this.hostRef);
    }
    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      const panelClass: string | string[] = this.panelClass || this.currConfig.panelClass || [];
      this.panelClassVal = Array.isArray(panelClass) ? panelClass : [panelClass];
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionList = this.getPositionList(this.position || this.currConfig.position);
    }
  }

  public ngOnInit(): void {
    if (this.panelClassVal == null) {
      const panelClass: string | string[] = this.currConfig.panelClass || [];
      this.panelClassVal = Array.isArray(panelClass) ? panelClass : [panelClass];
    }
    if (this.positionList.length === 0) {
      this.positionList = this.getPositionList(this.currConfig.position);
    }
  }

  public override ngOnDestroy(): void {
    // const nativeElement = this._elementRef.nativeElement;

    // clearTimeout(this._touchstartTimeout);

    if (this.overlayRef != null) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.tooltipInstance = null;
      this.portal = null;
    }

    // // Clean up the event listeners set in the constructor
    // nativeElement.removeEventListener('keydown', this._handleKeydown);
    // this._passiveListeners.forEach(([event, listener]) => {
    //   nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    // });
    // this._passiveListeners.length = 0;

    // this._destroyed.next();
    // this._destroyed.complete();

    // this._ariaDescriber.removeDescription(nativeElement, this.message, 'tooltip');
    // this._focusMonitor.stopMonitoring(nativeElement);
  }

  // ** Public methods **

  /** Show tooltip after delay in ms, default is 0 ms delay. */
  public override show(delay: number = 0): void {
    if (
      this.isDisabledVal ||
      !this.message
      // || (this._isTooltipVisible() && !this._tooltipInstance!._showTimeoutId && !this._tooltipInstance!._hideTimeoutId)
    ) {
      return;
    }
    const positionStrategy: PositionStrategy = this.createPositionStrategy();
    const scrollStrategy: ScrollStrategy | undefined = undefined;

    if (this.overlayRef == null) {
      this.overlayRef = this.createOverlay(positionStrategy, scrollStrategy, [PANEL_CLASS].concat(this.panelClassVal || []));
    }
    // const overlayRef = this.createOverlay();
    // this._detach();
    // this._portal = this._portal ||
    //    new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    // this._tooltipInstance = overlayRef.attach(this._portal).instance;
    // this._tooltipInstance.afterHidden()
    //   .pipe(takeUntil(this._destroyed))
    //   .subscribe(() => this._detach());
    // this._setTooltipClass(this._tooltipClass);
    // this._updateTooltipMessage();
    // this._tooltipInstance!.show(delay);

    this.portal = this.portal || new ComponentPortal(this.tooltipComponent, this.viewContainerRef);
    // Create tooltip portal
    // const tooltipPortal = new ComponentPortal(GlnTooltipComponent);
    // Attach tooltip portal to overlay
    // const tooltipRef: ComponentRef<GlnTooltipComponent> = this.overlayRef.attach(tooltipPortal);
    this.tooltipInstance = this.overlayRef.attach(this.portal).instance;
    // Pass content to tooltip component instance
    this.tooltipInstance.text = this.message || '';

    this.tooltipInstance!.show(delay);
  }

  /** Hides the tooltip after a delay in ms, the default is a delay of 0 ms. */
  public override hide(delay: number = 0): void {
    if (!this.isDisabledVal && this.overlayRef != null) {
      this.overlayRef.detach();
    }
    if (this.tooltipInstance != null) {
      this.tooltipInstance.hide(delay);
    }
  }

  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }

  /** If the tooltip is currently visible, returns true. */
  public override isVisible(): boolean {
    return !!this.tooltipInstance?.isVisible();
  }

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
  /*private getPosition(value: string | null): HorizontalConnectionPos {
    return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start') as HorizontalConnectionPos;
  }*/

  private getPositionList(position: string | undefined | null): ConnectedPosition[] {
    // const horizontalAlignment: HorizontalConnectionPos = this.getPosition(position || null);
    return [
      // { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      // { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom' },
    ];
  }

  private settingDisabled(isDisabled: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!isDisabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', isDisabled ? '' : null);
  }
}

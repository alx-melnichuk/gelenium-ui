import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';
const CSS_ATTR_NO_ANM = 'noAnm';

const CSS_CLASS_PANEL = 'gln-tooltip-panel';
const PASSIVE_OPTIONS = normalizePassiveListenerOptions({ passive: true });

type EventListenerType = readonly [string, EventListenerOrEventListenerObject];

export function GLN_TOOLTIP_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

export const TOOLTIP_POSITION: { [key: string]: string } = {
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

@Directive()
export abstract class GlnTooltipBaseDirective<T extends GlnTooltipBaseComponent> implements AfterViewInit, OnDestroy {
  public hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public isArrowVal: boolean | null = null; // Binding attribute "isArrow".
  // Binding attribute "isDisabled".
  public get isDisabledVal(): boolean | null {
    return this.innIsDisabledVal;
  }
  public set isDisabledVal(value: boolean | null) {
    if (value !== this.innIsDisabledVal) {
      this.innIsDisabledVal = value;
      this.hide(0);
      this.clearListenersForAllEvents();
      this.addListenersForStartEvents();
    }
  }
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoHoverableVal: boolean | null = null; // Binding attribute "isNoMousable".
  public isNoTouchableVal: boolean | null = null; // Binding attribute "isTouchable".
  // Binding attribute "message"
  public get messageVal(): string | null {
    return this.innMessageVal;
  }
  public set messageVal(value: string | null) {
    if (value !== this.innMessageVal) {
      this.innMessageVal = value;
      if (this.isVisible()) {
        this.hide(0);
      } else {
        this.setTooltipMessage(this.tooltipInstance, this.innMessageVal);
      }
    }
  }
  public panelClassVal: string[] = []; // Binding attribute "panelClass"
  // Binding attribute "position"
  public get positionVal(): string | null {
    return this.innPositionVal;
  }
  public set positionVal(value: string | null) {
    if (value !== this.innPositionVal) {
      this.innPositionVal = value;
      this.setTooltipPosition(this.innPositionVal, this.overlayRef);
    }
  }
  public showDelayVal: number | null = null; // Binding attribute "showDelay".

  protected abstract readonly tooltipComponent: ComponentType<T>;
  protected overlayRef: OverlayRef | null = null;
  protected portal: ComponentPortal<T> | null = null;
  protected scrollStrategy: ScrollStrategy;
  protected tooltipInstance: T | null = null;

  private readonly eventsListeners: EventListenerType[] = [];
  private innIsDisabledVal: boolean | null = null;
  private innPositionVal: string | null = null;
  private innMessageVal: string | null = null;
  private isAddListenersForEndEventsInit: boolean = false;
  private panelClassPosition: string = '';

  constructor(
    protected document: Document,
    protected overlay: Overlay,
    protected platform: Platform,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>
  ) {
    this.scrollStrategy =
      // this.scrollStrategyFactory != null ? this.scrollStrategyFactory() :
      // GLN_TOOLTIP_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(this.overlay);
      this.overlay.scrollStrategies.block(); // close();
  }

  public ngAfterViewInit(): void {
    console.log(`ngAfterViewInit()`); // #
    // this.addStartEventListeners(!!this.isNoHoverableVal, !!this.isNoTouchableVal, this.isSupportsMouseEvents());
    this.addListenersForStartEvents();
  }

  public ngOnDestroy(): void {
    console.log(`ngOnDestroy()`); // #
    // const nativeElement = this._elementRef.nativeElement;
    // clearTimeout(this._touchstartTimeout);

    this.handlerToAnimationFinish();
    // this.tooltipInstance = null;

    if (this.overlayRef != null) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.portal = null;

    this.clearListenersForAllEvents();
  }

  // ** Public methods **

  /** Show tooltip after delay in ms. */
  public show(delay: number = this.showDelayVal || 0): Promise<void> {
    console.log(`show();`);
    if (this.isDisabledVal || !this.messageVal || !!this.tooltipInstance) {
      // || (this._isTooltipVisible() && !this._tooltipInstance!._showTimeoutId && !this._tooltipInstance!._hideTimeoutId)
      return Promise.resolve();
    }

    if (this.overlayRef == null) {
      this.overlayRef = this.createOverlay();
    }
    this.overlayDetach();

    if (this.portal == null) {
      // Create a portal for tooltips.
      this.portal = new ComponentPortal(this.tooltipComponent, this.viewContainerRef);
    }
    // Attach the tooltip portal to the overlay and get an instance of it.
    this.tooltipInstance = this.overlayRef.attach(this.portal).instance;
    // Pass the tooltip text to the component instance.
    this.setTooltipMessage(this.tooltipInstance, this.messageVal);
    this.setTooltipClass(this.tooltipInstance, 'tooltip-demo');
    // Updates the position of the tooltip.
    this.setTooltipPosition(this.positionVal, this.overlayRef);

    const offsetWidth: number = this.hostRef.nativeElement.offsetWidth;
    const offsetHeight: number = this.hostRef.nativeElement.offsetHeight;

    const instanceRef: ElementRef<HTMLElement> = this.tooltipInstance.getHostRef();
    const fontSize: number = Number(getComputedStyle(instanceRef.nativeElement).getPropertyValue('font-size').replace('px', ''));

    const bottomTranslateX: number = Math.round(offsetWidth / 2 - fontSize / 2);

    return this.executeCallBackOnDelay(delay, () => {
      const tooltipInstance: T | null = this.tooltipInstance;
      if (tooltipInstance != null) {
        tooltipInstance.setArrow(this.isArrowVal);
        const instanceRef: ElementRef<HTMLElement> = tooltipInstance.getHostRef();
        // Add the necessary attributes for the tooltip before displaying.
        HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_SHOW, '');
        if (this.isNoAnimationVal) {
          HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_NO_ANM, '');
        }
        HtmlElemUtil.setProperty(instanceRef, '--glnttd--bt-tr-x', bottomTranslateX.toString().concat('px'));
        // Set isVisibility = true;
        tooltipInstance.show();
      }
    });
  }
  /** Hides the tooltip after a delay in ms. */
  public hide(delay: number = this.hideDelayVal || 0): Promise<void> {
    console.log(`this.hide();#1`); // #
    if (this.isDisabledVal || !this.tooltipInstance) {
      return Promise.resolve();
    }
    return this.executeCallBackOnDelay(delay, () => {
      const tooltipInstance: T | null = this.tooltipInstance;
      if (tooltipInstance != null) {
        const instanceRef: ElementRef<HTMLElement> = tooltipInstance.getHostRef();
        // Add the necessary attributes for the tooltip before hiding.
        HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_HIDE, '');
        HtmlElemUtil.setAttr(this.renderer, instanceRef, CSS_ATTR_IS_SHOW, null);
        // Set isVisibility = false;
        tooltipInstance.hide();
        if (!this.isNoAnimationVal) {
          // Add an animation completion listener.
          instanceRef.nativeElement.addEventListener('animationend', this.handlerToAnimationFinish);
          instanceRef.nativeElement.addEventListener('animationcancel', this.handlerToAnimationFinish);
        } else {
          // If there is no animation, then remove the tooltip component instance.
          this.overlayDetach();
        }
      }
    });
  }
  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }
  /** If the tooltip is currently visible, returns true. */
  public isVisible(): boolean {
    return !!this.tooltipInstance?.isVisible();
  }

  public overlayDetach(): void {
    console.log(`overlayDetach();`); // #
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.tooltipInstance = null;
  }

  // ** Protected methods **

  protected createOverlay(): OverlayRef {
    const positionStrategy: PositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.hostRef)
      .withFlexibleDimensions(false)
      .withPositions([this.getConnectedPosition(this.getValidPosition(this.positionVal))]);

    const result: OverlayRef = this.overlay.create({
      // Strategy with which to position the overlay.
      positionStrategy,
      // Strategy to be used when handling scroll events while the overlay is open.
      scrollStrategy: this.overlay.scrollStrategies.close(),
      // Custom class to add to the overlay pane.
      panelClass: [CSS_CLASS_PANEL].concat(this.panelClassVal) || [],
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
    });
    // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
    // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
    // This will correctly use the z-index for child elements.
    result.hostElement.style.zIndex = 'unset';
    return result;
  }

  /** Handling the completion of the tooltip hide animation. */
  protected handlerToAnimationFinish = (): void => {
    const instanceRef: ElementRef<HTMLElement> | undefined = this.tooltipInstance?.getHostRef();
    if (instanceRef != undefined) {
      instanceRef.nativeElement.removeEventListener('animationend', this.handlerToAnimationFinish);
      instanceRef.nativeElement.removeEventListener('animationcancel', this.handlerToAnimationFinish);
    }
    this.overlayDetach();
  };
  /** Set event handling for mouse or touch (start event). */
  protected addListenersForStartEvents(): void {
    console.log(`addListenersForStartEvents()`); // #
    if (!this.isDisabledVal) {
      const isHoverable: boolean = !this.isNoHoverableVal && this.isSupportsMouseEvents();
      const isTouchable: boolean = !this.isNoHoverableVal && !this.isSupportsMouseEvents();
      const eventName: string = isHoverable ? 'mouseenter' : isTouchable ? 'touchstart' : '';
      if (!!eventName) {
        this.eventsListeners.push([
          eventName,
          () => {
            this.addListenersForEndEvents();
            this.show();
          },
        ]);
        this.addEventListeners(this.eventsListeners, this.hostRef.nativeElement);
      }
    }
  }
  /** Set event handling for mouse or touch (end event). */
  protected addListenersForEndEvents(): void {
    if (this.isAddListenersForEndEventsInit) {
      return;
    }
    this.isAddListenersForEndEventsInit = true;

    const isHoverable: boolean = !this.isNoHoverableVal && this.isSupportsMouseEvents();
    const isTouchable: boolean = !this.isNoHoverableVal && !this.isSupportsMouseEvents();
    const listenersForEndEvents: EventListenerType[] = [];
    if (isHoverable) {
      listenersForEndEvents.push(['mouseleave', () => this.hide()]);
      listenersForEndEvents.push(['wheel', (event) => this.handlerMouseWheel(event as WheelEvent)]);
    } else if (isTouchable) {
      listenersForEndEvents.push(['touchend', () => this.handlerTouchEnd()]);
      listenersForEndEvents.push(['touchcancel', () => this.handlerTouchCancel()]);
    }
    this.addEventListeners(listenersForEndEvents, this.hostRef.nativeElement);
    this.eventsListeners.push(...listenersForEndEvents);
  }
  /** Clear the handling of all mouse or touch events (start and end events). */
  protected clearListenersForAllEvents(): void {
    console.log(`clearListenersForAllEvents()`); // #
    for (let idx = 0; idx < this.eventsListeners.length; idx++) {
      const [event, listener] = this.eventsListeners[idx];
      this.hostRef.nativeElement.removeEventListener(event, listener, PASSIVE_OPTIONS);
    }
    this.eventsListeners.length = 0;
    this.isAddListenersForEndEventsInit = false;
  }
  /** Add event handling to the list. */
  protected addEventListeners(listenerList: EventListenerType[], element: HTMLElement): void {
    for (let idx = 0; idx < listenerList.length; idx++) {
      const [event, listener] = listenerList[idx];
      console.log(`addEventListeners(); addEventListener('${event}')`); // #
      element.addEventListener(event, listener, PASSIVE_OPTIONS);
    }
  }

  protected isSupportsMouseEvents(): boolean {
    return !this.platform.IOS && !this.platform.ANDROID;
  }
  /** Get the correct "position" value. */
  protected getValidPosition(position: string | null): string {
    return TOOLTIP_POSITION[position || ''] || TOOLTIP_POSITION['bottom'];
  }

  // - - - - Handling mouse events. - - - -

  protected handlerMouseWheel(event: WheelEvent): void {
    console.log(`handlerMouseWheel();`); // #
    if (this.isVisible()) {
      const elementPointer = this.document.elementFromPoint(event.clientX + event.deltaX, event.clientY + event.deltaY);
      const element = this.hostRef.nativeElement;
      // On non-touch devices, the `mouseleave` event will not fire if the user scrolls
      // the page using the wheel without moving the cursor.
      // To solve this problem, we handle the `wheel` event and compare the coordinates
      // of the mouse cursor and our element.
      if (elementPointer !== element && !element.contains(elementPointer)) {
        this.hide(0);
      }
    }
  }

  // - - - - Handling touch events. - - - -

  protected handlerTouchEnd = (): void => {
    console.log(`handlerTouchEnd();`); // #
    this.hide();
  };
  protected handlerTouchCancel = (): void => {
    console.log(`handlerTouChcancel();`); // #
    this.hide();
  };

  // - - - - Set tooltip properties. - - - -

  protected setTooltipMessage(tooltipInstance: T | null, tooltipMessage: string | null): void {
    if (tooltipInstance != null) {
      tooltipInstance.text = tooltipMessage;
      tooltipInstance.markForCheck();
    }
  }
  protected setTooltipClass(tooltipInstance: T | null, tooltipClassName: string | string[]): void {
    if (tooltipInstance != null) {
      tooltipInstance.className = tooltipClassName;
      tooltipInstance.markForCheck();
    }
  }
  // Updates the position of the tooltip.
  protected setTooltipPosition(positionInp: string | null, overlayRef: OverlayRef | null): void {
    if (overlayRef != null) {
      const positionStrategy = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
      const position: string = this.getValidPosition(positionInp);
      const connectedPosition: ConnectedPosition = this.getConnectedPosition(position);
      positionStrategy.withPositions([connectedPosition]);

      this.renderer.setAttribute(overlayRef.overlayElement, 'glntt-position', position);
      const panelClassPosition: string = 'gln-' + position;
      if (panelClassPosition !== this.panelClassPosition) {
        // Remove a CSS class or an array of classes from the overlay pane.
        overlayRef.removePanelClass(this.panelClassPosition);
        // Add a CSS class or an array of classes to the overlay pane.
        overlayRef.addPanelClass((this.panelClassPosition = panelClassPosition));
      }
      positionStrategy.apply();
    }
  }

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
  private getConnectedPosition(position: string | null): ConnectedPosition {
    let originX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let originY: VerticalConnectionPos = 'bottom'; // 'top' | 'center' | 'bottom'
    let overlayX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let overlayY: VerticalConnectionPos = 'top'; // 'top' | 'center' | 'bottom'

    const tokenList: string[] = (position || '').split('-');
    const token1: string = tokenList[0];
    const token2: string | undefined = tokenList[1];

    if ('top' === token1 || 'bottom' === token1) {
      originY = 'top' === token1 ? 'top' : 'bottom';
      overlayY = 'top' === token1 ? 'bottom' : 'top';
      originX = overlayX = 'start' === token2 ? 'start' : 'end' === token2 ? 'end' : 'center';
    } else if ('left' === token1 || 'right' === token1) {
      originX = 'left' === token1 ? 'start' : 'end';
      overlayX = 'left' === token1 ? 'end' : 'start';
      originY = overlayY = 'start' === token2 ? 'top' : 'end' === token2 ? 'bottom' : 'center';
    }
    return { originX, originY, overlayX, overlayY };
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

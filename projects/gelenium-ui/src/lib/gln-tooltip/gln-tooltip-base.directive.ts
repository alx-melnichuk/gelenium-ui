import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, ComponentRef, Directive, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { EventListenerType, EventListenerUtil } from '../_utils/event-listener.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ParentScrollUtil } from '../_utils/parent-scroll.util';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';
const CSS_ATTR_NO_ANM = 'noAnm';
const CSS_ATTR_NO_TRN = 'noTrn';

const CSS_CLASS_PANEL = 'gln-tooltip-panel';

const SHOW_DELAY_FOR_MOUSE = 100;
const HIDE_DELAY_FOR_MOUSE = 0;
const SHOW_DELAY_FOR_TOUCH = 800;
const HIDE_DELAY_FOR_TOUCH = 1500;

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
  public content: Record<string, unknown> | null = null;
  public classesVal: string[] = []; // Binding attribute "classes"
  public hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public hideTouchDelayVal: number | null = null; // Binding attribute "hideTouchDelay".
  public isArrowVal: boolean | null = null; // Binding attribute "isArrow".
  // Binding attribute "isDisabled".
  public get isDisabledVal(): boolean | null {
    return this.innIsDisabledVal;
  }
  public set isDisabledVal(value: boolean | null) {
    if (value !== this.innIsDisabledVal) {
      this.innIsDisabledVal = value;
      if (this.isPhaseAfterViewInit) {
        this.startHide(0, true);
        this.definingEventListeners();
      }
    }
  }
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoHoverableVal: boolean | null = null; // Binding attribute "isNoMousable".
  public isNoHideOnScrollVal: boolean | null = null; // Binding attribute "isNoHideOnScroll".
  public isNoTouchableVal: boolean | null = null; // Binding attribute "isNoTouchable".
  public isNoTransformVal: boolean | null = null; // Binding attribute "isNoTransit".
  public maxHeightVal: number | string | null = null; // Binding "config.maxHeight".
  public maxWidthVal: number | string | null = null; // Binding "config.maxWidth".
  public minHeightVal: number | string | null = null; // Binding "config.minHeight".
  public minWidthVal: number | string | null = null; // Binding "config.minWidth".
  public messageVal: string | TemplateRef<unknown> | null | undefined = null; // Binding attribute "message".
  public overlayClassesVal: string[] = [];
  public positionVal: string | null = null; // Binding attribute "position"
  public showDelayVal: number | null = null; // Binding attribute "showDelay".
  public showTouchDelayVal: number | null = null; // Binding attribute "showTouchDelay".

  protected abstract readonly tooltipCompType: ComponentType<T>;
  protected overlayRef: OverlayRef | null = null;
  protected portal: ComponentPortal<T> | null = null;
  /** A strategy for handling scrolling when the overlay panel is open. */
  protected scrollStrategy: ScrollStrategy;
  protected tooltipInstRef: ComponentRef<T> | null = null;

  // Event listeners to start displaying an additional element.
  private readonly listenersToStart: EventListenerType[] = [];
  // Event listeners to finish displaying the additional element.
  private readonly listenersForEnd: EventListenerType[] = [];
  // Event listeners for the parent element's scroll (to complete the displaying of the additional element).
  private readonly listenersForScrollEnd: EventListenerType[] = [];
  private innIsDisabledVal: boolean | null = null;
  private isPhaseAfterViewInit: boolean = false;
  private positionClassCurr: string = '';
  private timeoutForShow: number | undefined = undefined;
  private timeoutForHide: number | undefined = undefined;

  constructor(
    protected document: Document,
    protected overlay: Overlay,
    protected platform: Platform,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>,
    protected scrollStrategyFactory: (() => ScrollStrategy) | null
  ) {
    this.scrollStrategy = this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : this.overlay.scrollStrategies.noop();
  }

  public ngAfterViewInit(): void {
    console.log(`ngAfterViewInit()`); // #
    this.isPhaseAfterViewInit = true;
    this.definingEventListeners();
  }

  public ngOnDestroy(): void {
    console.log(`ngOnDestroy()`); // #
    EventListenerUtil.removeListeners(this.listenersToStart);
    this.listenersToStart.length = 0;
    EventListenerUtil.removeListeners(this.listenersForEnd);
    this.listenersForEnd.length = 0;
    EventListenerUtil.removeListeners(this.listenersForScrollEnd);
    this.listenersForScrollEnd.length = 0;

    window.clearTimeout(this.timeoutForShow);
    window.clearTimeout(this.timeoutForHide);

    this.removeAnimationEventListener(this.tooltipInstRef?.location || null);

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.tooltipInstRef = null;
    }

    this.portal = null;
  }

  // ** Public methods **

  /** Show tooltip without delay. */
  public show(): Promise<void> {
    return this.startShow(0);
  }
  /** Hides the tooltip without delay. */
  public hide(options?: { noAnimation?: boolean }): Promise<void> {
    return this.startHide(0, options?.noAnimation || !!this.isNoAnimationVal);
  }
  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }
  /** If the tooltip is currently visible, returns true. */
  public isVisible(): boolean {
    return !!this.tooltipInstRef;
  }

  // ** Protected methods **

  /** Show tooltip after delay in ms. */
  protected startShow(delay: number): Promise<void> {
    if (this.isDisabledVal || !this.isPhaseAfterViewInit) {
      return Promise.resolve();
    }
    // # console.log(`startShow(); - start`); // #
    if (!this.tooltipInstRef || !!this.timeoutForHide) {
      // # console.log(`startShow(); !tooltipInstRef || !!timeoutForHide  addListeners();`); // #
      // Adding event listeners to finish displaying the additional element.
      EventListenerUtil.addListeners(this.listenersForEnd);
      if (!this.isNoHideOnScrollVal) {
        // Get a list of parents on which the scroll is located (if there are none, then the document).
        const scrollParentList: Element[] = ParentScrollUtil.getParentListWithScroll(this.hostRef.nativeElement.parentElement);
        for (let idx = 0; idx < scrollParentList.length; idx++) {
          this.listenersForScrollEnd.push([scrollParentList[idx], 'scroll', () => this.startHide(0, true)]);
        }
        // Adding event listeners for the parent element's scroll (to complete the displaying of the additional element).
        EventListenerUtil.addListeners(this.listenersForScrollEnd);
      }
    }
    if (!!this.tooltipInstRef || !!this.timeoutForHide) {
      if (!!this.timeoutForHide) {
        // # console.log(`startShow(); !!timeoutForHide  clearTimeout(timeoutForHide);`); // #
        console.log(``); // #
        window.clearTimeout(this.timeoutForHide);
        this.timeoutForHide = undefined;
      }
      // # console.log(`startShow(); !!tooltipInstRef || !!timeoutForHide  return;`); // #
      return Promise.resolve();
    }
    return new Promise<void>((resolve: () => void, reject: () => void) => {
      this.timeoutForShow = window.setTimeout(
        () => {
          this.timeoutForShow = undefined;
          this.performShow();
          // # console.log(`startShow(); - end`); // #
          console.log(``); // #
          resolve();
        },
        delay > 0 && !this.isNoAnimationVal ? delay : 0
      );
    });
  }
  /** Hides the tooltip after a delay in ms. */
  protected startHide(delay: number, isNoAnimation: boolean): Promise<void> {
    if (this.isDisabledVal || !this.isPhaseAfterViewInit) {
      return Promise.resolve();
    }
    // # console.log(`startHide(); - start`); // #
    if (!!this.tooltipInstRef || !!this.timeoutForShow) {
      // # console.log(`startHide(); !!tooltipInstRef || !!timeoutForShow  removeListeners();`); // #
      // Removing event listeners to finish displaying the additional element.
      EventListenerUtil.removeListeners(this.listenersForEnd);
      // Removing event listeners for the parent element's scroll (to complete the displaying of the additional element).
      EventListenerUtil.removeListeners(this.listenersForScrollEnd);
      this.listenersForScrollEnd.length = 0;
    }
    if (!this.tooltipInstRef || !!this.timeoutForShow) {
      if (!!this.timeoutForShow) {
        // # console.log(`startHide(); !!timeoutForShow  clearTimeout(timeoutForShow);`); // #
        console.log(``); // #
        window.clearTimeout(this.timeoutForShow);
        this.timeoutForShow = undefined;
      }
      // # console.log(`startHide(); !tooltipInstRef || !!timeoutForShow  return;`); // #
      return Promise.resolve();
    }
    // # console.log(`startHide(); timeoutForHide = setTimeout();`); // #
    return new Promise<void>((resolve: () => void, reject: () => void) => {
      this.timeoutForHide = window.setTimeout(
        () => {
          this.timeoutForHide = undefined;
          // # console.log(`startHide(); performHide(isNoAnimation:${isNoAnimation});`); // #
          this.performHide(isNoAnimation);
          // # console.log(`startHide(); - end`); // #
          console.log(``); // #
          resolve();
        },
        delay > 0 && !isNoAnimation ? delay : 0
      );
    });
  }
  protected performShow(): void {
    if (this.isDisabledVal || !this.isPhaseAfterViewInit) {
      return;
    }
    // # console.log(`performShow(); - start`); // #
    if (this.overlayRef == null) {
      // # console.log(`performShow(); overlay.create();`); // #
      this.overlayRef = this.overlay.create(this.createOverlayConfig());
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      this.overlayRef.hostElement.style.zIndex = 'unset';
    }
    if (this.portal == null) {
      // # console.log(`performShow(); portal = new ComponentPortal()`); // #
      this.portal = new ComponentPortal(this.tooltipCompType, this.viewContainerRef);
    }

    // # console.log(`performShow(); tooltipInstRef = overlayRef.attach(portal);`); // #
    // Attach the tooltip portal to the overlay.
    this.tooltipInstRef = this.overlayRef.attach(this.portal);

    // Tooltip updates.
    const validPosition: string = this.getValidPosition(this.positionVal);
    this.setTooltipMessage(this.tooltipInstRef, this.messageVal, this.content);
    this.setTooltipClasses(this.classesVal, this.renderer, this.tooltipInstRef);
    this.setOverlayPosition(validPosition, this.overlayRef, this.renderer);

    const instanceRef: ElementRef<HTMLElement> = this.tooltipInstRef.location;
    if (this.isNoAnimationVal) {
      this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_NO_ANM, '');
    }
    if (this.isNoTransformVal) {
      this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_NO_TRN, '');
    }
    // Add the necessary attributes for the tooltip before displaying.
    this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_IS_SHOW, '');
    this.setPropertiesForInstance(this.hostRef, instanceRef);
    this.setInstanceProperties(validPosition, instanceRef, this.renderer);
    // Set isVisibility = true on the component instance;
    this.tooltipInstRef.instance.show();
    this.tooltipInstRef.changeDetectorRef.markForCheck();
    // # console.log(`performShow(); - end`); // #
  }

  protected performHide(isNoAnimation: boolean): void {
    if (this.isDisabledVal || !this.isPhaseAfterViewInit) {
      return;
    }
    // # console.log(`performHide(); - start`); // #
    if (!!this.tooltipInstRef) {
      // # console.log(`performHide(); tooltipInstRef.instance.hide();`); // #
      // Set isVisibility = false on the component instance;
      this.tooltipInstRef.instance.hide();
      this.tooltipInstRef.changeDetectorRef.markForCheck();
      if (!isNoAnimation) {
        // Add an animation completion listener.
        this.addAnimationEventListener(this.tooltipInstRef.location);
        // Add the necessary attributes for the tooltip before hiding.
        this.renderer.setAttribute(this.tooltipInstRef.location.nativeElement, CSS_ATTR_IS_HIDE, '');
        this.renderer.removeAttribute(this.tooltipInstRef.location.nativeElement, CSS_ATTR_IS_SHOW);
      } else {
        // If there is no animation, then remove the tooltip component instance.
        this.overlayDetach();
      }
    }
    // # console.log(`performHide(); - end`); // #
  }
  /** When detaching the overlay, remove: the reference to the component instance and the subscription to this event. */
  protected overlayDetach(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    // Remove the reference to the component.
    this.tooltipInstRef = null;
  }
  protected createPositionStrategy(overlay: Overlay, positions: ConnectedPosition[]): PositionStrategy {
    return overlay.position().flexibleConnectedTo(this.hostRef).withFlexibleDimensions(false).withPositions(positions);
  }
  protected createOverlayConfig(): OverlayConfig {
    return {
      // Strategy with which to position the overlay.
      positionStrategy: this.createPositionStrategy(this.overlay, [this.getConnectedPosition(this.getValidPosition(this.positionVal))]),
      // Strategy to be used when handling scroll events while the overlay is open.
      // #scrollStrategy: this.overlay.scrollStrategies.close(),
      scrollStrategy: this.scrollStrategy, // work
      // Custom class to add to the overlay pane.
      panelClass: [CSS_CLASS_PANEL].concat(this.overlayClassesVal),
      // // Whether the overlay has a backdrop.
      // hasBackdrop?: boolean;
      // // Custom class to add to the backdrop
      // backdropClass?: string | string[];
      // /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
      // width?: number | string;
      // /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
      // height?: number | string;
      // The min-width of the overlay panel. If a number is provided, pixel units are assumed.
      minWidth: this.minWidthVal != null && this.minWidthVal >= 0 ? this.minWidthVal : undefined,
      // The min-height of the overlay panel. If a number is provided, pixel units are assumed.
      minHeight: this.minHeightVal != null && this.minHeightVal >= 0 ? this.minHeightVal : undefined,
      // The max-width of the overlay panel. If a number is provided, pixel units are assumed.
      maxWidth: this.maxWidthVal != null && this.maxWidthVal >= 0 ? this.maxWidthVal : undefined,
      // The max-height of the overlay panel. If a number is provided, pixel units are assumed.
      maxHeight: this.maxHeightVal != null && this.maxHeightVal >= 0 ? this.maxHeightVal : undefined,
    };
  }
  /** Handling the completion of the tooltip hide animation. */
  protected handlerToAnimationFinish = (): void => {
    this.removeAnimationEventListener(this.tooltipInstRef?.location || null);
    this.overlayDetach();
  };
  /** Defining event listeners for moving the cursor to the element's borders and out of the element's border. */
  protected definingEventListeners(): void {
    if (!this.isPhaseAfterViewInit) {
      return;
    }
    // Removing event listeners to start displaying an additional element.
    EventListenerUtil.removeListeners(this.listenersToStart);
    this.listenersToStart.length = 0;
    // Removing event listeners to finish displaying the additional element.
    EventListenerUtil.removeListeners(this.listenersForEnd);
    this.listenersForEnd.length = 0;

    if (!this.isDisabledVal) {
      const element: HTMLElement = this.hostRef.nativeElement;
      const isNoAnimat: boolean = !!this.isNoAnimationVal;
      if (!this.isNoHoverableVal && this.isSupportsMouseEvents()) {
        // Defining event listeners to move the cursor within the element's border.
        this.listenersToStart.push([element, 'mouseenter', () => this.startShow(this.showDelayVal || SHOW_DELAY_FOR_MOUSE)]);
        // Defining event listeners to move the cursor outside the element's border.
        this.listenersForEnd.push([element, 'mouseleave', () => this.startHide(this.hideDelayVal || HIDE_DELAY_FOR_MOUSE, isNoAnimat)]);
      } else if (!this.isNoTouchableVal && !this.isSupportsMouseEvents()) {
        // Defining event listeners the touch within the element's border.
        this.listenersToStart.push([element, 'touchstart', () => this.startShow(this.showTouchDelayVal || SHOW_DELAY_FOR_TOUCH)]);
        // Defining event listeners the touch outside the element's border.
        this.listenersForEnd.push([element, 'touchend', () => this.startHide(this.hideTouchDelayVal || HIDE_DELAY_FOR_TOUCH, isNoAnimat)]);
        this.listenersForEnd.push([element, 'touchcancel', () => this.startHide(0, true)]);
      }
      // Adding event listeners to start displaying an additional element.
      EventListenerUtil.addListeners(this.listenersToStart);
    }
  }

  protected isSupportsMouseEvents(): boolean {
    return !this.platform.IOS && !this.platform.ANDROID;
  }
  /** Get the correct "position" value. */
  protected getValidPosition(position: string | null): string {
    return TOOLTIP_POSITION[position || ''] || TOOLTIP_POSITION['bottom'];
  }

  // - - - - Set tooltip properties. - - - -

  protected setTooltipMessage(
    instRef: ComponentRef<T> | null,
    message: string | TemplateRef<unknown> | null | undefined,
    content: Record<string, unknown> | null
  ): void {
    if (instRef != null && message != null) {
      const typeName: string = typeof message;
      const messageStr: string | null = typeName === 'string' ? (message as string) : null;
      const messageTmplRef: TemplateRef<unknown> | null = typeName === 'object' ? (message as TemplateRef<unknown>) : null;
      if (!!messageStr) {
        instRef.instance.text = messageStr;
        instRef.changeDetectorRef.markForCheck();
      } else if (messageTmplRef != null) {
        instRef.instance.templateRef = messageTmplRef;
        instRef.instance.content = content;
        instRef.changeDetectorRef.markForCheck();
      }
    }
  }
  /** Add style classes to the tooltip element. */
  protected setTooltipClasses(classes: string[], renderer: Renderer2, instRef: ComponentRef<T> | null): void {
    if (instRef != null && classes.length > 0) {
      for (let idx = 0; idx < classes.length; idx++) {
        this.renderer.addClass(instRef.location.nativeElement, classes[idx]);
      }
      instRef.changeDetectorRef.markForCheck();
    }
  }
  /** Updates the position of the tooltip. */
  protected setOverlayPosition(validPosition: string, overlayRef: OverlayRef | null, renderer: Renderer2 | null): void {
    if (!!validPosition && overlayRef != null && !!renderer) {
      const positionStrategy = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
      const connectedPosition: ConnectedPosition = this.getConnectedPosition(validPosition);
      positionStrategy.withPositions([connectedPosition]);

      renderer.setAttribute(overlayRef.overlayElement, 'glntt-position', validPosition);
      const positionClass: string = 'gln-' + validPosition;
      if (positionClass !== this.positionClassCurr) {
        // Remove a CSS class or an array of classes from the overlay pane.
        overlayRef.removePanelClass(this.positionClassCurr);
        // Add a CSS class or an array of classes to the overlay pane.
        overlayRef.addPanelClass((this.positionClassCurr = positionClass));
      }
      positionStrategy.apply();
    }
  }
  protected setInstanceProperties(validPosition: string, instanceRef: ElementRef<HTMLElement> | null, renderer: Renderer2 | null): void {
    if (!!validPosition && !!instanceRef && !!renderer) {
      const tokenList: string[] = (validPosition || '').split('-');
      const token1: string = tokenList[0];
      renderer.setAttribute(instanceRef.nativeElement, 'pos', token1);
    }
  }
  protected setPropertiesForInstance(hostRef: ElementRef<HTMLElement> | null, instanceRef: ElementRef<HTMLElement> | null): void {
    if (hostRef != null && instanceRef != null) {
      const offsetWidth: number = hostRef.nativeElement.offsetWidth;
      const offsetHeight: number = hostRef.nativeElement.offsetHeight;

      const fontSize: number = Number(getComputedStyle(instanceRef.nativeElement).getPropertyValue('font-size').replace('px', ''));
      const bottomTranslateX: number = Math.round(offsetWidth / 2 - fontSize / 2);

      HtmlElemUtil.setProperty(instanceRef, '--glnttd--bt-tr-x', bottomTranslateX.toString().concat('px'));
    }
  }

  // ** Private methods **

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
  /** Add an animation completion listener. */
  private addAnimationEventListener(instanceRef: ElementRef<HTMLElement> | null): void {
    if (!!instanceRef) {
      instanceRef.nativeElement.addEventListener('animationend', this.handlerToAnimationFinish);
      instanceRef.nativeElement.addEventListener('animationcancel', this.handlerToAnimationFinish);
    }
  }
  /** Remove an animation completion listener. */
  private removeAnimationEventListener(instanceRef: ElementRef<HTMLElement> | null): void {
    if (!!instanceRef) {
      instanceRef.nativeElement.removeEventListener('animationend', this.handlerToAnimationFinish);
      instanceRef.nativeElement.removeEventListener('animationcancel', this.handlerToAnimationFinish);
    }
  }
}

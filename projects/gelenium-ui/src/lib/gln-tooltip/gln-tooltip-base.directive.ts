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
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, ComponentRef, Directive, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { EventListenerType, EventListenerUtil } from '../_utils/event-listener.util';
import { ParentScrollUtil } from '../_utils/parent-scroll.util';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';
const CSS_ATTR_NO_ANM = 'noAnm';
const CSS_ATTR_NO_TRN = 'noTrn';

const CSS_CLASS_PANEL = 'gln-tooltip-panel';

const ANIMATION_END = 'animationend';
const ANIMATION_CANCEL = 'animationcancel';

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
  // Binding attribute "position"
  public get positionVal(): string | null {
    return this.innPositionVal;
  }
  public set positionVal(value: string | null) {
    if (value !== this.innPositionVal) {
      this.innPositionVal = value;
      if (this.isPhaseAfterViewInit) {
        this.startHide(0, true);
      }
    }
  }
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
  private innPositionVal: string | null = null;
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
  public toggle(): Promise<void> {
    return this.isVisible() ? this.hide() : this.show();
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
    if (!this.tooltipInstRef || !!this.timeoutForHide) {
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
        window.clearTimeout(this.timeoutForHide);
        this.timeoutForHide = undefined;
      }
      return Promise.resolve();
    }
    return new Promise<void>((resolve: () => void, reject: () => void) => {
      this.timeoutForShow = window.setTimeout(
        () => {
          this.timeoutForShow = undefined;
          this.performShow();
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
    if (!!this.tooltipInstRef || !!this.timeoutForShow) {
      // Removing event listeners to finish displaying the additional element.
      EventListenerUtil.removeListeners(this.listenersForEnd);
      // Removing event listeners for the parent element's scroll (to complete the displaying of the additional element).
      EventListenerUtil.removeListeners(this.listenersForScrollEnd);
      this.listenersForScrollEnd.length = 0;
    }
    if (!this.tooltipInstRef || !!this.timeoutForShow) {
      if (!!this.timeoutForShow) {
        window.clearTimeout(this.timeoutForShow);
        this.timeoutForShow = undefined;
      }
      return Promise.resolve();
    }
    return new Promise<void>((resolve: () => void, reject: () => void) => {
      this.timeoutForHide = window.setTimeout(
        () => {
          this.timeoutForHide = undefined;
          this.performHide(isNoAnimation);
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
    if (this.overlayRef == null) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.createPositionStrategy(this.overlay, [this.getConnectedPosition(this.getValidPosition(this.positionVal))]),
        scrollStrategy: this.scrollStrategy,
        panelClass: [CSS_CLASS_PANEL].concat(this.overlayClassesVal),
        minWidth: this.minWidthVal != null && this.minWidthVal >= 0 ? this.minWidthVal : undefined,
        minHeight: this.minHeightVal != null && this.minHeightVal >= 0 ? this.minHeightVal : undefined,
        maxWidth: this.maxWidthVal != null && this.maxWidthVal > 0 ? this.maxWidthVal : undefined,
        maxHeight: this.maxHeightVal != null && this.maxHeightVal > 0 ? this.maxHeightVal : undefined,
      });
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      this.overlayRef.hostElement.style.zIndex = 'unset';
    }
    if (this.portal == null) {
      this.portal = new ComponentPortal(this.tooltipCompType, this.viewContainerRef);
    }

    // Attach the tooltip portal to the overlay.
    this.tooltipInstRef = this.overlayRef.attach(this.portal);

    // Tooltip updates.
    this.setInstanceMessage(this.tooltipInstRef, this.messageVal, this.content);

    const validPosition: string = this.getValidPosition(this.positionVal);
    const { position, alignment } = this.getPositionParts(validPosition);

    const instanceRef: ElementRef<HTMLElement> = this.tooltipInstRef.location;
    if (this.isArrowVal) {
      this.tooltipInstRef.instance.setOption({ isArrow: true, pos: position, alg: alignment });
      const heightHalf: number = Math.round((this.hostRef.nativeElement.offsetHeight / 2) * 100) / 100;
      instanceRef.nativeElement.style.setProperty('--glnttr--own-hg-half', heightHalf.toString().concat('px'));
    }
    for (let idx = 0; idx < this.classesVal.length; idx++) {
      this.renderer.addClass(instanceRef.nativeElement, this.classesVal[idx]);
    }

    this.setOverlayPosition(validPosition, this.overlayRef, this.renderer);

    if (this.isNoAnimationVal) {
      this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_NO_ANM, '');
    }
    if (this.isNoTransformVal) {
      this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_NO_TRN, '');
    }

    this.renderer.setAttribute(instanceRef.nativeElement, 'pos', position);
    this.renderer.setAttribute(instanceRef.nativeElement, 'alg', alignment);

    // Add the necessary attributes for the tooltip before displaying.
    this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_IS_SHOW, '');

    // Set isVisibility = true on the component instance;
    this.tooltipInstRef.instance.show();

    this.tooltipInstRef.changeDetectorRef.markForCheck();
  }

  protected performHide(isNoAnimation: boolean): void {
    if (this.isDisabledVal || !this.isPhaseAfterViewInit) {
      return;
    }
    if (!!this.tooltipInstRef) {
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
    return overlay.position().flexibleConnectedTo(this.hostRef).withFlexibleDimensions(false).withPositions(positions).withPush(false);
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
        this.listenersToStart.push([element, 'mouseenter', () => this.startShow(this.showDelayVal || 0)]);
        // Defining event listeners to move the cursor outside the element's border.
        this.listenersForEnd.push([element, 'mouseleave', () => this.startHide(this.hideDelayVal || 0, isNoAnimat)]);
      } else if (!this.isNoTouchableVal && !this.isSupportsMouseEvents()) {
        // Defining event listeners the touch within the element's border.
        this.listenersToStart.push([element, 'touchstart', () => this.startShow(this.showTouchDelayVal || 0)]);
        // Defining event listeners the touch outside the element's border.
        this.listenersForEnd.push([element, 'touchend', () => this.startHide(this.hideTouchDelayVal || 0, isNoAnimat)]);
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

  protected setInstanceMessage(
    instRef: ComponentRef<T> | null,
    message: string | TemplateRef<unknown> | null | undefined,
    content: Record<string, unknown> | null
  ): void {
    if (!!instRef && message != null) {
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

  // ** Private methods **

  private getPositionParts(positionIn: string | null): { position: string; alignment: string } {
    const tokenList: string[] = (positionIn || '').split('-');
    const position: string = tokenList[0] || 'bottom';
    const alignment: string = tokenList[1] || 'center';
    return { position, alignment };
  }
  private getConnectedPosition(positionIn: string | null): ConnectedPosition {
    let originX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let originY: VerticalConnectionPos = 'bottom'; // 'top' | 'center' | 'bottom'
    let overlayX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let overlayY: VerticalConnectionPos = 'top'; // 'top' | 'center' | 'bottom'

    const { position, alignment } = this.getPositionParts(positionIn);

    if ('top' === position || 'bottom' === position) {
      originY = 'top' === position ? 'top' : 'bottom';
      overlayY = 'top' === position ? 'bottom' : 'top';
      originX = overlayX = 'start' === alignment ? 'start' : 'end' === alignment ? 'end' : 'center';
    } else if ('left' === position || 'right' === position) {
      originX = 'left' === position ? 'start' : 'end';
      overlayX = 'left' === position ? 'end' : 'start';
      originY = overlayY = 'start' === alignment ? 'top' : 'end' === alignment ? 'bottom' : 'center';
    }
    return { originX, originY, overlayX, overlayY };
  }
  /** Add an animation completion listener. */
  private addAnimationEventListener(instanceRef: ElementRef<HTMLElement> | null): void {
    if (!!instanceRef) {
      instanceRef.nativeElement.addEventListener(ANIMATION_END, this.handlerToAnimationFinish);
      instanceRef.nativeElement.addEventListener(ANIMATION_CANCEL, this.handlerToAnimationFinish);
    }
  }
  /** Remove an animation completion listener. */
  private removeAnimationEventListener(instanceRef: ElementRef<HTMLElement> | null): void {
    if (!!instanceRef) {
      instanceRef.nativeElement.removeEventListener(ANIMATION_END, this.handlerToAnimationFinish);
      instanceRef.nativeElement.removeEventListener(ANIMATION_CANCEL, this.handlerToAnimationFinish);
    }
  }
}

import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, DomPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Injector,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlnSnackBarConfig } from '../gln-snackbar/gln-snackbar-config';

/**
 * Internal interface for a snack bar container.
 * @docs-private
 */
export interface GlnSnackBarContainer {
  // addDomPortalOutlet(): DomPortalOutlet;
  // removeDomPortalOutlet(value: DomPortalOutlet): void;

  snackBarConfig: GlnSnackBarConfig;
  readonly _onAnnounce: Subject<any>;
  readonly _onExit: Subject<any>;
  readonly _onEnter: Subject<any>;
  enter: () => void;
  exit: () => Observable<void>;
  attachTemplatePortal: <C>(portal: TemplatePortal<C>) => EmbeddedViewRef<C>;
  attachComponentPortal: <T>(portal: ComponentPortal<T>) => ComponentRef<T>;
}

@Component({
  selector: 'gln-snackbar-container',
  templateUrl: './gln-snackbar-container.component.html',
  styleUrls: ['./gln-snackbar-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GlnSnackbarContainerComponent extends BasePortalOutlet implements OnDestroy, GlnSnackBarContainer {
  /** The number of milliseconds to wait before announcing the snack bar's content. */
  private readonly _announceDelay: number = 150;

  /** The timeout for announcing the snack bar's content. */
  private _announceTimeoutId: number | undefined;

  /** Whether the component has been destroyed. */
  private _destroyed = false;

  /** The portal outlet inside of this container into which the snack bar content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

  /** Subject for notifying that the snack bar has announced to screen readers. */
  readonly _onAnnounce: Subject<void> = new Subject();

  /** Subject for notifying that the snack bar has exited from view. */
  readonly _onExit: Subject<void> = new Subject();

  /** Subject for notifying that the snack bar has finished entering the view. */
  readonly _onEnter: Subject<void> = new Subject();

  /** The state of the snack bar animations. */
  _animationState = 'void';

  // /** aria-live value for the live region. */
  // _live: AriaLivePoliteness;

  /**
   * Role of the live region. This is only for Firefox as there is a known issue where Firefox +
   * JAWS does not read out aria-live message.
   */
  _role?: 'status' | 'alert';

  private portalOutletList: DomPortalOutlet[] = [];
  private divElementList: HTMLElement[] = [];
  private appRef: ApplicationRef | null = null;

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private _platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    /** The snack bar configuration. */
    public snackBarConfig: GlnSnackBarConfig
  ) {
    super();

    // // Use aria-live rather than a live role like 'alert' or 'status'
    // // because NVDA and JAWS have show inconsistent behavior with live roles.
    // if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
    //   this._live = 'assertive';
    // } else if (snackBarConfig.politeness === 'off') {
    //   this._live = 'off';
    // } else {
    //   this._live = 'polite';
    // }

    // // Only set role for Firefox. Set role based on aria-live because setting role="alert" implies
    // // aria-live="assertive" which may cause issues if aria-live is set to "polite" above.
    // if (this._platform.FIREFOX) {
    //   if (this._live === 'polite') {
    //     this._role = 'status';
    //   }
    //   if (this._live === 'assertive') {
    //     this._role = 'alert';
    //   }
    // }

    this.renderer.addClass(this._elementRef.nativeElement, 'gln-snackbar-container');
    this.renderer.setAttribute(this._elementRef.nativeElement, 'role', 'presentation');
  }

  /*public addDomPortalOutlet(): DomPortalOutlet {
    const anchorNode: HTMLElement = this.document.createElement('div');
    anchorNode.classList.add('gln-snackbar-wrap');
    this._elementRef.nativeElement.appendChild(anchorNode);
    const index: number = this.divElementList.push(anchorNode);
    // We have to resolve the ApplicationRef later in order to allow people
    // to use overlay-based providers during app initialization.
    if (!this.appRef) {
      this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
    }
    const result: DomPortalOutlet = new DomPortalOutlet(
      anchorNode,
      this.componentFactoryResolver,
      this.appRef,
      this.injector,
      this.document
    );
    return (this.portalOutletList[index] = result);
  }*/

  /*public removeDomPortalOutlet(value: DomPortalOutlet): void {
    const index1: number = this.portalOutletList.indexOf(value);
    if (index1 !== -1) {
      const portalOutlet: DomPortalOutlet = this.portalOutletList[index1];
      this.portalOutletList.splice(index1, 1);
      portalOutlet.detach();
    }
    const index2: number = this.divElementList.indexOf(value.outletElement as HTMLDivElement);
    if (index2 !== -1) {
      const divElement: HTMLElement = this.divElementList[index2];
      this._elementRef.nativeElement.removeChild(divElement);
    }
  }*/

  /** Attach a component portal as content to this snack bar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._assertNotAttached();
    this._applySnackBarClasses();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this snack bar container. */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._assertNotAttached();
    this._applySnackBarClasses();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /**
   * Attaches a DOM portal to the snack bar container.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  override attachDomPortal = (portal: DomPortal) => {
    this._assertNotAttached();
    this._applySnackBarClasses();
    return this._portalOutlet.attachDomPortal(portal);
  };

  /** Handle end of animations, updating the state of the snackbar. */
  onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event as any;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      this._completeExit();
    }

    if (toState === 'visible') {
      // Note: we shouldn't use `this` inside the zone callback,
      // because it can cause a memory leak.
      const onEnter = this._onEnter;

      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  /** Begin animation of snack bar entrance into view. */
  enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
      this._screenReaderAnnounce();
    }
  }

  /** Begin animation of the snack bar exiting from view. */
  exit(): Observable<void> {
    // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
    // where multiple snack bars are opened in quick succession (e.g. two consecutive calls to
    // `MatSnackBar.open`).
    this._animationState = 'hidden';

    // Mark this element with an 'exit' attribute to indicate that the snackbar has
    // been dismissed and will soon be removed from the DOM. This is used by the snackbar
    // test harness.
    this._elementRef.nativeElement.setAttribute('mat-exit', '');

    // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
    // long enough to visually read it either, so clear the timeout for announcing.
    clearTimeout(this._announceTimeoutId);

    return this._onExit;
  }

  /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
  ngOnDestroy() {
    this._destroyed = true;
    this._completeExit();
  }

  /**
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  private _completeExit() {
    this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

  /** Applies the various positioning and user-configured CSS classes to the snack bar. */
  private _applySnackBarClasses() {
    const element: HTMLElement = this._elementRef.nativeElement;
    const panelClasses = this.snackBarConfig.panelClass;
    if (panelClasses) {
      if (Array.isArray(panelClasses)) {
        for (let idx = 0; idx < panelClasses.length; idx++) {
          element.classList.add(panelClasses[idx]);
        }
      } else {
        element.classList.add(panelClasses);
      }
    }

    if (this.snackBarConfig.horizontalPosition === 'center') {
      element.classList.add('mat-snack-bar-center');
    }

    if (this.snackBarConfig.verticalPosition === 'top') {
      element.classList.add('mat-snack-bar-top');
    }
  }

  /** Asserts that no content is already attached to the container. */
  private _assertNotAttached() {
    if (this._portalOutlet.hasAttached() /*&& (typeof ngDevMode === 'undefined' || ngDevMode)*/) {
      throw Error('Attempting to attach snack bar content after content is already attached');
    }
  }

  /**
   * Starts a timeout to move the snack bar content to the live region so screen readers will
   * announce it.
   */
  private _screenReaderAnnounce() {
    if (!this._announceTimeoutId) {
      this._ngZone.runOutsideAngular(() => {
        this._announceTimeoutId = window.setTimeout(() => {
          const inertElement = this._elementRef.nativeElement.querySelector('[aria-hidden]');
          const liveElement = this._elementRef.nativeElement.querySelector('[aria-live]');

          if (inertElement && liveElement) {
            // If an element in the snack bar content is focused before being moved
            // track it and restore focus after moving to the live region.
            let focusedElement: HTMLElement | null = null;
            if (
              this._platform.isBrowser &&
              document.activeElement instanceof HTMLElement &&
              inertElement.contains(document.activeElement)
            ) {
              focusedElement = document.activeElement;
            }

            inertElement.removeAttribute('aria-hidden');
            liveElement.appendChild(inertElement);
            focusedElement?.focus();

            this._onAnnounce.next();
            this._onAnnounce.complete();
          }
        }, this._announceDelay);
      });
    }
  }
}

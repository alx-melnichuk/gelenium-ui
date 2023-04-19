import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentType, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { BasePortalOutlet, ComponentPortal, DomPortalOutlet, PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  Type,
} from '@angular/core';
import { GlnSnackBarContainer, GlnSnackbarContainerComponent } from '../gln-snackbar-container/gln-snackbar-container.component';
import { GlnSnackbarTextComponent, TextOnlySnackBar } from '../gln-snackbar-text/gln-snackbar-text.component';
import { GlnSnackBarRef } from './gln-snackbar-ref';

import { GlnSnackbarModule } from './gln-snackbar.module';
import { GlnSnackBarConfig, GLN_SNACKBAR_DATA } from './gln-snackbar-config';
import { DOCUMENT } from '@angular/common';

export const GLN_SNACKBAR_DEFAULT_OPTIONS = new InjectionToken<GlnSnackBarConfig>('GLN_SNACKBAR_DEFAULT_OPTIONS', {
  providedIn: 'root',
  factory: GLN_SNACKBAR_DEFAULT_OPTIONS_FACTORY,
});

/** @docs-private */
export function GLN_SNACKBAR_DEFAULT_OPTIONS_FACTORY(): GlnSnackBarConfig {
  return new GlnSnackBarConfig();
}

const CSS_CLASS_PANEL = 'gln-snackbar-panel';

@Injectable({
  providedIn: GlnSnackbarModule,
})
export class GlnSnackbarService implements OnDestroy {
  /**
   * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
   * If there is a parent snack-bar service, all operations should delegate to that parent
   * via `_openedSnackBarRef`.
   */
  private _snackBarRefAtThisLevel: GlnSnackBarRef<any> | null = null;

  /** The component that should be rendered as the snack bar's simple component. */
  protected simpleSnackBarComponent: Type<TextOnlySnackBar> = GlnSnackbarTextComponent;

  /** The container component that attaches the provided template or component. */
  protected readonly snackBarContainerCompType: Type<GlnSnackBarContainer> = GlnSnackbarContainerComponent;
  // #protected readonly tooltipCompType: ComponentType<T>;

  // /** The CSS class to apply for handset mode. */
  // protected handsetCssClass = 'mat-snack-bar-handset';

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef(): GlnSnackBarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackBarRef(value: GlnSnackBarRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  protected snackBarContainer: GlnSnackBarContainer | null = null;

  private appRef: ApplicationRef | null = null;
  private overlayRefMap: Map<string, OverlayRef> = new Map();

  constructor(
    private _overlay: Overlay,
    // private _live: LiveAnnouncer,
    private _injector: Injector,
    // private _breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Optional() @SkipSelf() private _parentSnackBar: GlnSnackbarService,
    @Inject(GLN_SNACKBAR_DEFAULT_OPTIONS) private _defaultConfig: GlnSnackBarConfig
  ) {
    console.log(`GlnSnackbarService();`); // #
  }

  public ngOnDestroy(): void {
    for (const overlayRef of this.overlayRefMap.values()) {
      overlayRef.dispose();
    }
    this.overlayRefMap.clear();
    // if (this.overlayRef) {
    // this.overlayRef.dispose();
    // this.tooltipInstRef = null;
    // }
    // Only dismiss the snack bar at the current level on destroy.
    // if (this._snackBarRefAtThisLevel) {
    //   this._snackBarRefAtThisLevel.dismiss();
    // }
  }

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackBarConfig): GlnSnackBarRef<T> {
    // return this._attach(component, config) as MatSnackBarRef<T>;
    return this.openContent<T>(this.getOverlayRef(this._overlay, config), component, config) as GlnSnackBarRef<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackBarConfig): GlnSnackBarRef<EmbeddedViewRef<any>> {
    // return this._attach(template, config);
    return this.openContent(this.getOverlayRef(this._overlay, config), template, config) as GlnSnackBarRef<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackBarConfig): GlnSnackBarRef<TextOnlySnackBar> {
    const dataConfig = { ...this._defaultConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    dataConfig.data = { message, action };

    // Since the snack bar has `role="alert"`, we don't
    // want to announce the same message twice.
    if (dataConfig.announcementMessage === message) {
      dataConfig.announcementMessage = undefined;
    }

    return this.openFromComponent(this.simpleSnackBarComponent, dataConfig);
  }

  // ** Private methods **

  private createPanelPortalOutlet(panel: HTMLElement): DomPortalOutlet {
    const containerWrap: HTMLElement = this.document.createElement('div');
    // containerWrap.id = `cdk-overlay-${nextUniqueId++}`;
    containerWrap.classList.add('gln-container-wrap');
    panel.appendChild(containerWrap);

    // We have to resolve the ApplicationRef later in order to allow people
    // to use overlay-based providers during app initialization.
    if (!this.appRef) {
      this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
    }
    return new DomPortalOutlet(containerWrap, this.componentFactoryResolver, this.appRef, this.injector, this.document);
  }

  private attachSnackBarContainer(portalOutlet: PortalOutlet, config: GlnSnackBarConfig): GlnSnackBarContainer {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: GlnSnackBarConfig, useValue: config }],
    });
    const containerPortal = new ComponentPortal(this.snackBarContainerCompType, config.viewContainerRef /*undefined */, injector);

    const containerRef: ComponentRef<GlnSnackBarContainer> = portalOutlet.attach(containerPortal);
    containerRef.instance.snackBarConfig = config;
    (containerRef.location.nativeElement as HTMLElement).setAttribute('role', 'demo');
    return containerRef.instance;
  }
  /**
   * Places a new component (or template) as the content of the snackbar container.
   */
  private openContent<T>(
    overlayRef: OverlayRef,
    content: ComponentType<T> | TemplateRef<T>,
    config?: GlnSnackBarConfig
  ): GlnSnackBarRef<T | EmbeddedViewRef<any>> {
    //
    const currConfig = { ...new GlnSnackBarConfig(), ...this._defaultConfig, ...config };

    const panelPortalOutlet: DomPortalOutlet = this.createPanelPortalOutlet(overlayRef.overlayElement);

    const container: GlnSnackBarContainer = this.attachSnackBarContainer(panelPortalOutlet, currConfig);
    // const container: GlnSnackBarContainer = this.attachSnackBarContainer(overlayRef, currConfig);

    const snackBarRef = new GlnSnackBarRef<T | EmbeddedViewRef<any>>(container, overlayRef);

    /*
    const panelPortalOutlet: DomPortalOutlet = this.createPanelPortalOutlet(overlayRef.overlayElement);

    const container: GlnSnackBarContainer = this.attachSnackBarContainer(panelPortalOutlet, currConfig);

    const snackBarRef = new GlnSnackBarRef<T | EmbeddedViewRef<any>>(container, overlayRef);

    // const container: GlnSnackBarContainer = this.getSnackBarContainer(overlayRef);
    // Create an instance of MatSnackBarRef.
    // const snackBarRef = new GlnSnackBarRef<T | EmbeddedViewRef<any>>(container, overlayRef);
    */
    let htmlElement: HTMLElement | null = null;

    // const containerPortalOutlet: DomPortalOutlet = container.addDomPortalOutlet();

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: currConfig.data, snackBarRef } as any);
      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the SnackBarContainer.
      // #??snackBarRef.instance = container.attachTemplatePortal(portal);
      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this.createInjector(currConfig, snackBarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the SnackBarContainer.
      // #??const contentRef: ComponentRef<T> = container.attachComponentPortal<T>(portal);
      const contentRef: ComponentRef<T> = container.attachComponentPortal(portal);

      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackBarRef.instance = contentRef.instance;
    }

    if (!!htmlElement) {
      htmlElement.setAttribute('role', 'alert');
    }
    // // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
    // // appropriate. This class is applied to the overlay element because the overlay must expand to
    // // fill the width of the screen for full width snackbars.
    // this._breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(takeUntil(overlayRef.detachments())).subscribe(state => {
    //   const classList = overlayRef.overlayElement.classList;
    //   state.matches ? classList.add(this.handsetCssClass) : classList.remove(this.handsetCssClass);
    // });

    overlayRef.overlayElement.classList.add(CSS_CLASS_PANEL);

    // if (config.announcementMessage) {
    //   // Wait until the snack bar contents have been announced then deliver this message.
    //   container._onAnnounce.subscribe(() => {
    //     this._live.announce(config.announcementMessage!, config.politeness);
    //   });
    // }

    // this._animateSnackBar(snackBarRef, config);
    this._openedSnackBarRef = snackBarRef;
    return this._openedSnackBarRef;
  }

  private getOverlayRef(overlay: Overlay, config?: GlnSnackBarConfig): OverlayRef {
    const currConfig: GlnSnackBarConfig = { ...new GlnSnackBarConfig(), ...this._defaultConfig, ...config };

    const keyPosition: string = currConfig.horizontalPosition + '_' + currConfig.verticalPosition;
    let overlayRef: OverlayRef | undefined = this.overlayRefMap.get(keyPosition);
    if (overlayRef === undefined) {
      // Ceate an "overlay" layer.
      overlayRef = this.createOverlay(overlay, currConfig);
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      overlayRef.hostElement.style.zIndex = 'unset';
      this.overlayRefMap.set(keyPosition, overlayRef);
    }
    return overlayRef;
  }
  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snack bar config.
   */
  private createOverlay(overlay: Overlay, config: GlnSnackBarConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    let positionStrategy = overlay.position().global();
    // Set horizontal position.
    const isRtl = config.direction === 'rtl';
    const isLeft =
      config.horizontalPosition === 'left' ||
      (config.horizontalPosition === 'start' && !isRtl) ||
      (config.horizontalPosition === 'end' && isRtl);
    const isRight = !isLeft && config.horizontalPosition !== 'center';
    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }

    overlayConfig.positionStrategy = positionStrategy;
    const overlayRef: OverlayRef = overlay.create(overlayConfig);

    overlayRef.hostElement.classList.add('cdk-global-overlay-wrapper');

    this.positionApply(overlayRef.overlayElement, overlayConfig);

    overlayRef.overlayElement.style.flexDirection = 'column';

    return overlayRef;
  }
  /**
   * Creates an injector to be used inside of a snack bar component.
   * @param config Config that was used to create the snack bar.
   * @param snackBarRef Reference to the snack bar.
   */
  private createInjector<T>(config: GlnSnackBarConfig, snackBarRef: GlnSnackBarRef<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this._injector,
      providers: [
        { provide: GlnSnackBarRef, useValue: snackBarRef },
        { provide: GLN_SNACKBAR_DATA, useValue: config.data },
      ],
    });
  }
  private positionApply(overlayElement: HTMLElement, overlayConfig: OverlayConfig): void {
    const positionStrategy: any | undefined = overlayConfig.positionStrategy;
    const { width, height, maxWidth, maxHeight } = overlayConfig;
    const shouldBeFlushHorizontally = (width === '100%' || width === '100vw') && (!maxWidth || maxWidth === '100%' || maxWidth === '100vw');
    const shouldBeFlushVertically =
      (height === '100%' || height === '100vh') && (!maxHeight || maxHeight === '100%' || maxHeight === '100vh');

    // const styles = this._overlayRef.overlayElement.style;
    // const parentStyles = this._overlayRef.hostElement.style;
    // styles.position = this._cssPosition;
    // styles.marginLeft = shouldBeFlushHorizontally ? '0' : this._leftOffset;
    // styles.marginTop = shouldBeFlushVertically ? '0' : this._topOffset;
    // styles.marginBottom = this._bottomOffset;
    // styles.marginRight = this._rightOffset;
    if (!!overlayElement.parentElement) {
      const parentStyles = overlayElement.parentElement.style;

      if (!!positionStrategy) {
        if (shouldBeFlushHorizontally) {
          parentStyles.justifyContent = 'flex-start';
        } else if (positionStrategy._xPosition === 'center') {
          parentStyles.justifyContent = 'center';
        } else if (overlayConfig.direction === 'rtl') {
          if (positionStrategy._xPosition === 'flex-start') {
            parentStyles.justifyContent = 'flex-end';
          } else if (positionStrategy._xPosition === 'flex-end') {
            parentStyles.justifyContent = 'flex-start';
          }
        } else {
          parentStyles.justifyContent = positionStrategy._xPosition;
        }

        parentStyles.alignItems = shouldBeFlushVertically ? 'flex-start' : positionStrategy._alignItems;
      }
    }
  }
}

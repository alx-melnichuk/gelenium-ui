import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
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
import { GlnSnackbarContainerComponent, _SnackBarContainer } from '../gln-snackbar-container/gln-snackbar-container.component';
import { GlnSnackbarTextComponent, TextOnlySnackBar } from '../gln-snackbar-text/gln-snackbar-text.component';
import { MatSnackBarRef } from './gln-snackbar-ref';

import { GlnSnackbarModule } from './gln-snackbar.module';
import { MatSnackBarConfig, MAT_SNACKBAR1_DATA } from './snack-bar-config';

export const MAT_SNACKBAR1_DEFAULT_OPTIONS = new InjectionToken<MatSnackBarConfig>('MAT_SNACKBAR1_DEFAULT_OPTIONS', {
  providedIn: 'root',
  factory: MAT_SNACKBAR1_DEFAULT_OPTIONS_FACTORY,
});

/** @docs-private */
export function MAT_SNACKBAR1_DEFAULT_OPTIONS_FACTORY(): MatSnackBarConfig {
  return new MatSnackBarConfig();
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
  private _snackBarRefAtThisLevel: MatSnackBarRef<any> | null = null;

  /** The component that should be rendered as the snack bar's simple component. */
  protected simpleSnackBarComponent: Type<TextOnlySnackBar> = GlnSnackbarTextComponent;

  /** The container component that attaches the provided template or component. */
  protected readonly snackBarContainerCompType: Type<_SnackBarContainer> = GlnSnackbarContainerComponent;
  // #protected readonly tooltipCompType: ComponentType<T>;

  // /** The CSS class to apply for handset mode. */
  // protected handsetCssClass = 'mat-snack-bar-handset';

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef(): MatSnackBarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackBarRef(value: MatSnackBarRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  protected overlayRef: OverlayRef | null = null;

  constructor(
    private _overlay: Overlay,
    // private _live: LiveAnnouncer,
    private _injector: Injector,
    // private _breakpointObserver: BreakpointObserver,
    @Optional() @SkipSelf() private _parentSnackBar: GlnSnackbarService,
    @Inject(MAT_SNACKBAR1_DEFAULT_OPTIONS) private _defaultConfig: MatSnackBarConfig
  ) {
    console.log(`GlnSnackbarService();`); // #
  }

  public ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      // this.tooltipInstRef = null;
    }

    // Only dismiss the snack bar at the current level on destroy.
    // if (this._snackBarRefAtThisLevel) {
    //   this._snackBarRefAtThisLevel.dismiss();
    // }
  }

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromComponent<T>(component: ComponentType<T>, config?: MatSnackBarConfig): MatSnackBarRef<T> {
    // return this._attach(component, config) as MatSnackBarRef<T>;
    return this.openContent<T>(component, config) as MatSnackBarRef<T>;
  }

  /**
   * Creates and dispatches a snack bar with a custom template for the content, removing any
   * currently opened snack bars.
   *
   * @param template Template to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromTemplate(template: TemplateRef<any>, config?: MatSnackBarConfig): MatSnackBarRef<EmbeddedViewRef<any>> {
    // return this._attach(template, config);
    return this.openContent(template, config) as MatSnackBarRef<EmbeddedViewRef<any>>;
  }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  public open(message: string, action: string = '', config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    const _config = { ...this._defaultConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    _config.data = { message, action };

    // Since the snack bar has `role="alert"`, we don't
    // want to announce the same message twice.
    if (_config.announcementMessage === message) {
      _config.announcementMessage = undefined;
    }

    return this.openFromComponent(this.simpleSnackBarComponent, _config);
  }

  // ** Private methods **

  /**
   * Attaches the snackbar container component to the overlay.
   */
  // private _attachSnackBarContainer(overlayRef: OverlayRef, config: MatSnackBarConfig, attr: string, attrVal: string): _SnackBarContainer {

  // }

  private openContent<T>(content: ComponentType<T> | TemplateRef<T>, config?: MatSnackBarConfig): MatSnackBarRef<T | EmbeddedViewRef<any>> {
    const currConfig = { ...new MatSnackBarConfig(), ...this._defaultConfig, ...config };

    if (this.overlayRef == null) {
      // Ceate an "overlay" layer.
      this.overlayRef = this._createOverlay(currConfig);
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      this.overlayRef.hostElement.style.zIndex = 'unset';
    }

    const userInjector = currConfig.viewContainerRef && currConfig.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: MatSnackBarConfig, useValue: config }],
    });
    const containerPortal = new ComponentPortal(this.snackBarContainerCompType, currConfig.viewContainerRef, injector);

    // Attach the component portal to the overlayRef.
    const containerRef: ComponentRef<_SnackBarContainer> = this.overlayRef.attach(containerPortal);

    containerRef.instance.snackBarConfig = currConfig;

    (containerRef.location.nativeElement as HTMLElement).setAttribute('role', 'presentation');

    const container: _SnackBarContainer = containerRef.instance;

    // Create an instance of MatSnackBarRef.
    const snackBarRef = new MatSnackBarRef<T | EmbeddedViewRef<any>>(container, this.overlayRef);
    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: currConfig.data, snackBarRef } as any);

      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the SnackBarContainer.
      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(currConfig, snackBarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the SnackBarContainer.
      const contentRef: ComponentRef<T> = container.attachComponentPortal<T>(portal);

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

    this.overlayRef.overlayElement.classList.add(CSS_CLASS_PANEL);

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
  /**
   * Places a new component (or template) as the content of the snackbar container.
   */
  private _attach<T>(
    overlayRef: OverlayRef,
    content: ComponentType<T> | TemplateRef<T>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<T | EmbeddedViewRef<any>> {
    const currConfig = { ...new MatSnackBarConfig(), ...this._defaultConfig, ...config };
    // #// Ceate an "overlay" layer.
    // #const overlayRef = this._createOverlay(config);

    // Attach a SnackBarContainer to this "overlay" layer.
    // const container: _SnackBarContainer = this._attachSnackBarContainer(overlayRef, config, 'role', 'presentation');

    // ==V

    const userInjector = currConfig && currConfig.viewContainerRef && currConfig.viewContainerRef.injector;

    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: MatSnackBarConfig, useValue: currConfig }],
    });
    // Create a component portal.
    const containerPortal = new ComponentPortal(this.snackBarContainerCompType, currConfig.viewContainerRef, injector);

    // Attach the component portal to the overlayRef.
    const containerRef: ComponentRef<_SnackBarContainer> = overlayRef.attach(containerPortal);

    containerRef.instance.snackBarConfig = currConfig;

    (containerRef.location.nativeElement as HTMLElement).setAttribute('role', 'presentation');
    //return containerRef.instance;
    const container: _SnackBarContainer = containerRef.instance;
    // ==A

    // Create an instance of MatSnackBarRef.
    const snackBarRef = new MatSnackBarRef<T | EmbeddedViewRef<any>>(container, overlayRef);
    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: currConfig.data, snackBarRef } as any);

      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the SnackBarContainer.
      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(currConfig, snackBarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the SnackBarContainer.
      const contentRef: ComponentRef<T> = container.attachComponentPortal<T>(portal);

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

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snack bar config.
   */
  private _createOverlay(config: MatSnackBarConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    let positionStrategy = this._overlay.position().global();
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
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an injector to be used inside of a snack bar component.
   * @param config Config that was used to create the snack bar.
   * @param snackBarRef Reference to the snack bar.
   */
  private _createInjector<T>(config: MatSnackBarConfig, snackBarRef: MatSnackBarRef<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this._injector,
      providers: [
        { provide: MatSnackBarRef, useValue: snackBarRef },
        { provide: MAT_SNACKBAR1_DATA, useValue: config.data },
      ],
    });
  }
}

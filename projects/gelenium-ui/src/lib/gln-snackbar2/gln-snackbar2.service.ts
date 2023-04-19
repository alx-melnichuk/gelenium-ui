import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
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
  TemplateRef,
  Type,
} from '@angular/core';
import { GlnSnackbar2Ref } from './gln-snackbar2-ref';

import { GlnSnackbar2Config, GLN_SNACKBAR2_DATA } from './gln-snackbar2-config.interface';
import { GlnSnackbar2Module } from './gln-snackbar2.module';
import { GlnSnackbar2Alert, GlnSnackbar2AlertComponent } from './gln-snackbar2-alert.component';

export const GLN_SNACKBAR2_CONFIG = new InjectionToken<GlnSnackbar2Config>('GLN_SNACKBAR2_CONFIG');

@Injectable({
  providedIn: GlnSnackbar2Module,
})
export class GlnSnackbar2Service implements OnDestroy {
  /** The component that should be rendered as the snack bar's simple component. */
  protected snackbar2AlertComponent: Type<GlnSnackbar2Alert> = GlnSnackbar2AlertComponent;

  private overlayRef: OverlayRef | null = null;
  private appRef: ApplicationRef | null = null;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Optional() @Inject(GLN_SNACKBAR2_CONFIG) private rootConfig: GlnSnackbar2Config | null
  ) {
    console.log(`GlnSnackbar2Service();`); // #
  }

  public ngOnDestroy(): void {}

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<T> {
    return this.openContent<T>(this.getOverlayRef(this.overlay, config), component, config) as GlnSnackbar2Ref<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<EmbeddedViewRef<any>> {
    return this.openContent(this.getOverlayRef(this.overlay, config), template, config) as GlnSnackbar2Ref<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackbar2Config): GlnSnackbar2Ref<GlnSnackbar2Alert> {
    const dataConfig = { ...this.rootConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    dataConfig.data = { message, action };

    return this.openFromComponent(this.snackbar2AlertComponent, dataConfig);
  }

  private getOverlayRef(overlay: Overlay, config?: GlnSnackbar2Config): OverlayRef {
    if (this.overlayRef === null) {
      const currConfig: GlnSnackbar2Config = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };
      // Ceate an "overlay" layer.
      this.overlayRef = this.createOverlay(overlay, currConfig);
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      this.overlayRef.hostElement.style.zIndex = 'unset';
    }
    return this.overlayRef;
  }
  private createContainerPortal(panel: HTMLElement): DomPortalOutlet {
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
  private createInjector<T>(injector: Injector, config: GlnSnackbar2Config, snackbarRef: GlnSnackbar2Ref<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || injector,
      providers: [
        { provide: GlnSnackbar2Ref, useValue: snackbarRef },
        { provide: GLN_SNACKBAR2_DATA, useValue: config.data },
      ],
    });
  }

  /**
   * Places a new component (or template) as the content of the snackbar container.
   */
  private openContent<T>(overlayRef: OverlayRef, content: ComponentType<T> | TemplateRef<T>, config?: GlnSnackbar2Config): any {
    //GlnSnackBarRef<T | EmbeddedViewRef<any>>
    const currConfig = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };

    const containerPortal: DomPortalOutlet = this.createContainerPortal(overlayRef.overlayElement);

    const snackbarRef = new GlnSnackbar2Ref(containerPortal);

    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: currConfig.data, snackbarRef } as any);
      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the "containerPortal".
      snackbarRef.instance = containerPortal.attachTemplatePortal(portal);
    } else {
      const injector = this.createInjector(this.injector, currConfig, snackbarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the "containerPortal".
      const contentRef: ComponentRef<T> = containerPortal.attachComponentPortal(portal);
      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackbarRef.instance = contentRef.instance;
    }
    // if (!!htmlElement) {
    //   htmlElement.setAttribute('role', 'alert');
    // }
    overlayRef.overlayElement.classList.add('gln-snackbar-panel');
    return snackbarRef;
  }

  private createOverlay(overlay: Overlay, config: GlnSnackbar2Config): OverlayRef {
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

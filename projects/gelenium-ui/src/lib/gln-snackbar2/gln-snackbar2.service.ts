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
import { GlnSnackbar2ContainerComponent } from './gln-snackbar2-container.component';

const CSS_CLASS_PANEL = 'gln-snackbar-panel';
let uniqueIdCounter = 0;

export const GLN_SNACKBAR2_CONFIG = new InjectionToken<GlnSnackbar2Config>('GLN_SNACKBAR2_CONFIG');

@Injectable({
  providedIn: GlnSnackbar2Module,
})
export class GlnSnackbar2Service implements OnDestroy {
  /** The component that should be rendered as the snack bar's simple component. */
  protected snackbar2AlertComponent: Type<GlnSnackbar2Alert> = GlnSnackbar2AlertComponent;

  private appRef: ApplicationRef | null = null;
  private overlayRef: OverlayRef | null = null;
  private containerRef: ComponentRef<GlnSnackbar2ContainerComponent> | null = null;

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

  // ** Public methods **

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<T> {
    const overlayRef: OverlayRef = this.getOverlayRef(this.overlay, config);
    return this.openContent<T>(this.getContainerRef(this.injector, overlayRef), component, config) as GlnSnackbar2Ref<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<EmbeddedViewRef<any>> {
    const overlayRef: OverlayRef = this.getOverlayRef(this.overlay, config);
    return this.openContent(this.getContainerRef(this.injector, overlayRef), template, config) as GlnSnackbar2Ref<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackbar2Config): GlnSnackbar2Ref<GlnSnackbar2Alert> {
    const dataConfig = { ...this.rootConfig, ...config };
    dataConfig.data = { message, action };

    return this.openFromComponent(this.snackbar2AlertComponent, dataConfig);
  }

  // ** Private methods **

  private getOverlayRef(overlay: Overlay, config?: GlnSnackbar2Config): OverlayRef {
    if (this.overlayRef === null) {
      const currConfig: GlnSnackbar2Config = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };
      // Create an "Overlay" layer.
      this.overlayRef = this.createOverlay(overlay, currConfig);
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      this.overlayRef.hostElement.style.zIndex = 'unset';
      this.overlayRef.overlayElement.classList.add(CSS_CLASS_PANEL);
    }
    return this.overlayRef;
  }

  private getContainerRef(injector: Injector, overlayRef: OverlayRef): ComponentRef<GlnSnackbar2ContainerComponent> {
    if (this.containerRef === null) {
      // Create the "container" element.
      const containerComponent = new ComponentPortal(GlnSnackbar2ContainerComponent, undefined, injector);
      this.containerRef = overlayRef.attach(containerComponent);
    }
    return this.containerRef;
  }

  /** Places a new component (or template) as content for the snackbar wrapper. */
  private openContent<T>(
    containerRef: ComponentRef<GlnSnackbar2ContainerComponent>,
    content: ComponentType<T> | TemplateRef<T>,
    config?: GlnSnackbar2Config
  ): GlnSnackbar2Ref<T | EmbeddedViewRef<any>> {
    //GlnSnackBarRef<T | EmbeddedViewRef<any>>  { message: string; action: string }
    const currConfig = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };

    const id: number = uniqueIdCounter++;

    const wrapPortal: DomPortalOutlet = this.createWrapPortal(containerRef.location.nativeElement, id.toString());

    const snackbarRef = new GlnSnackbar2Ref<T | EmbeddedViewRef<any>>(id, wrapPortal);

    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: currConfig.data, snackbarRef } as any);
      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the "containerPortal".
      snackbarRef.instance = wrapPortal.attachTemplatePortal(portal);
    } else {
      const injector: Injector = this.createInjector(this.injector, currConfig, snackbarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the "containerPortal".
      const contentRef: ComponentRef<T> = wrapPortal.attachComponentPortal(portal);
      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackbarRef.instance = contentRef.instance;
    }
    htmlElement?.setAttribute('role', 'alert');

    return snackbarRef;
  }

  private createWrapPortal(panel: HTMLElement, id: string): DomPortalOutlet {
    const containerWrap: HTMLElement = this.document.createElement('div');
    containerWrap.id = `glnsbc-wrap-${id}`;
    containerWrap.classList.add('gln-container-wrap');
    containerWrap.style.width = 'inherit';
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

  private createOverlay(overlay: Overlay, config: GlnSnackbar2Config): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    const positionStrategy = overlay.position().global();
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
    } else if (config.verticalPosition === 'bottom') {
      positionStrategy.bottom('0');
    } else {
      positionStrategy.centerVertically('0');
    }
    overlayConfig.positionStrategy = positionStrategy;

    return overlay.create(overlayConfig);
  }
}

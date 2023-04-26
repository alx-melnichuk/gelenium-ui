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
  NgZone,
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

type GlnOverlayMetadata = {
  key: string;
  overlayRef: OverlayRef;
  containerRef: ComponentRef<GlnSnackbar2ContainerComponent>;
  containerElement: HTMLElement;
  amount: number;
};

@Injectable({
  providedIn: GlnSnackbar2Module,
})
export class GlnSnackbar2Service implements OnDestroy {
  /** The component that should be rendered as the snack bar's simple component. */
  protected snackbar2AlertComponent: Type<GlnSnackbar2Alert> = GlnSnackbar2AlertComponent;

  private appRef: ApplicationRef | null = null;
  private overlayMetadataMap: Map<string, GlnOverlayMetadata> = new Map();

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Optional() @Inject(GLN_SNACKBAR2_CONFIG) private rootConfig: GlnSnackbar2Config | null
  ) {
    console.log(`GlnSnackbar2Service();`); // #
  }

  public ngOnDestroy(): void {
    const overlayMetadataList: GlnOverlayMetadata[] = [...this.overlayMetadataMap.values()];
    for (let idx = 0; idx < overlayMetadataList.length; idx++) {
      overlayMetadataList[idx].overlayRef.detach();
    }
    this.overlayMetadataMap.clear();
  }

  // ** Public methods **

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<T> {
    const overlayMetadata: GlnOverlayMetadata = this.getOverlayMetadata(this.overlay, this.injector, config);
    return this.openContent<T>(overlayMetadata, component, config) as GlnSnackbar2Ref<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbar2Config): GlnSnackbar2Ref<EmbeddedViewRef<any>> {
    const overlayMetadata: GlnOverlayMetadata = this.getOverlayMetadata(this.overlay, this.injector, config);
    return this.openContent(overlayMetadata, template, config) as GlnSnackbar2Ref<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackbar2Config): GlnSnackbar2Ref<GlnSnackbar2Alert> {
    const dataConfig = { ...this.rootConfig, ...config };
    dataConfig.data = { ...{ message, action }, ...dataConfig.data };
    return this.openFromComponent(this.snackbar2AlertComponent, dataConfig);
  }

  // ** Private methods **

  private getKeySnackbar(snackbarConfig: GlnSnackbar2Config): string {
    const panelClass: string | string[] = snackbarConfig.panelClass || [];
    const classList: string[] = !Array.isArray(panelClass) ? [panelClass] : panelClass;
    let classListRes: string = '';
    for (let idx = 0; idx < classList.length; idx++) {
      classListRes = classListRes + classList[idx] + ',';
    }
    return (snackbarConfig.horizontal || '_') + '-' + classListRes + '-' + (snackbarConfig.vertical || '_');
  }

  private getOverlayMetadata(overlay: Overlay, injector: Injector, config?: GlnSnackbar2Config): GlnOverlayMetadata {
    const currConfig: GlnSnackbar2Config = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };
    const key: string = this.getKeySnackbar(currConfig);
    let overlayMetadata: GlnOverlayMetadata | undefined = this.overlayMetadataMap.get(key);
    if (overlayMetadata === undefined) {
      // Create an "Overlay" layer.
      const overlayRef = this.createOverlay(overlay, currConfig);
      // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
      // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
      // This will correctly use the z-index for child elements.
      overlayRef.hostElement.style.zIndex = 'unset';
      overlayRef.overlayElement.classList.add(CSS_CLASS_PANEL);

      const currConfig2: GlnSnackbar2Config = { ...currConfig };
      currConfig2.data = null;
      const injectorWithConfig: Injector = Injector.create({
        parent: injector,
        providers: [{ provide: GlnSnackbar2Config, useValue: currConfig2 }],
      });

      const containerComponent = new ComponentPortal(GlnSnackbar2ContainerComponent, undefined, injectorWithConfig);
      const containerRef: ComponentRef<GlnSnackbar2ContainerComponent> = overlayRef.attach(containerComponent);
      const containerElement: HTMLElement = containerRef.location.nativeElement;

      overlayMetadata = { key, overlayRef, containerRef, containerElement, amount: 0 };
      this.overlayMetadataMap.set(key, overlayMetadata);
    }
    return overlayMetadata;
  }

  private createOverlay(overlay: Overlay, config: GlnSnackbar2Config): OverlayRef {
    const overlayConfig = new OverlayConfig();
    // #overlayConfig.direction = config.direction;

    const positionStrategy = overlay.position().global();
    // #export type GlnSnackbarHorizontal = 'left' | 'center' | 'right';
    // #export type GlnSnackbarVertical = 'top' | 'center' | 'bottom';
    // Set horizontal position.
    if ('left' === config.horizontal) {
      positionStrategy.left('0');
    } else if ('right' === config.horizontal) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if ('top' === config.vertical) {
      positionStrategy.top('0');
    } else if ('bottom' === config.vertical) {
      positionStrategy.bottom('0');
    } else {
      positionStrategy.centerVertically('0');
    }
    overlayConfig.positionStrategy = positionStrategy;

    return overlay.create(overlayConfig);
  }

  /** Places a new component (or template) as content for the snackbar wrapper. */
  private openContent<T>(
    overlayMetadata: GlnOverlayMetadata,
    content: ComponentType<T> | TemplateRef<T>,
    config?: GlnSnackbar2Config
  ): GlnSnackbar2Ref<T | EmbeddedViewRef<any>> {
    if (0 === overlayMetadata.amount) {
      // Position overlay by configuration.
      overlayMetadata.overlayRef.getConfig().positionStrategy?.apply();
    }

    const config2: GlnSnackbar2Config = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };

    const id: number = uniqueIdCounter++;

    const snackbar2Container: GlnSnackbar2ContainerComponent = overlayMetadata.containerRef.instance;
    // const wrapElement: HTMLElement = this.createWrapElement(overlayMetadata.containerElement, id.toString());
    const transition = config2.transition || 'grow';
    // Create a new wrapper element for "snackbar"
    const wrapElement: HTMLElement = snackbar2Container.addWrapElement(id, 'gln-container-wrap', [transition, 'is-show']);

    const wrapPortal: DomPortalOutlet = this.createWrapPortal(wrapElement);

    const snackbarRef = new GlnSnackbar2Ref<T | EmbeddedViewRef<any>>(id, config2.duration, wrapElement, wrapPortal, this.ngZone);

    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: config2.data, snackbarRef } as any);
      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the "containerPortal".
      snackbarRef.instance = wrapPortal.attachTemplatePortal(portal);
    } else {
      const injector: Injector = this.createInjector(this.injector, config2, snackbarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the "containerPortal".
      const contentRef: ComponentRef<T> = wrapPortal.attachComponentPortal(portal);
      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackbarRef.instance = contentRef.instance;
    }
    htmlElement?.setAttribute('role', 'alert');

    overlayMetadata.amount++;
    snackbarRef.setDetachRefFn(() => {
      const key: string = this.getKeySnackbar(config2);
      this.detachSnackbarRef(overlayMetadata);
    });

    // if (1 === overlayMetadata.amount) {
    //   snackbar2Container.setProperties(wrapElement, config2.horizontal, config2.vertical, config2.transition, config2.slideDirection);
    // }

    // TODO To return, create a new object with the required interface.
    return snackbarRef;
  }

  private createWrapPortal(containerWrap: HTMLElement): DomPortalOutlet {
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

  private detachSnackbarRef(overlayMetadata: GlnOverlayMetadata): void {
    console.log(`detachSnackbarRef();`); // #
    overlayMetadata.amount--;
    if (overlayMetadata.amount == 0) {
      overlayMetadata.overlayRef.detach();
      this.overlayMetadataMap.delete(overlayMetadata.key);
    }
  }
}

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
import { GlnSnackbar2Ref, GlnSnackbar2Reference } from './gln-snackbar2-ref';
import { GlnSnackbar2Config, GLN_SNACKBAR2_DATA } from './gln-snackbar2-config.interface';
import { GlnSnackbar2Module } from './gln-snackbar2.module';
import { GlnSnackbar2Alert, GlnSnackbar2AlertComponent } from './gln-snackbar2-alert.component';
import { GlnSnackbar2ContainerComponent } from './gln-snackbar2-container.component';
import { ArrayUtil } from '../_utils/array.util';

const CSS_CLASS_PANEL = 'gln-snackbar-panel';
let uniqueIdCounter = 0;

export const GLN_SNACKBAR2_CONFIG = new InjectionToken<GlnSnackbar2Config>('GLN_SNACKBAR2_CONFIG');

type GlnOverlayMetadata = {
  key: string;
  overlayRef: OverlayRef;
  containerComp: GlnSnackbar2ContainerComponent;
  maxCount: number;
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

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbar2Config): GlnSnackbar2Reference<T> {
    const overlayMetadata: GlnOverlayMetadata = this.getOverlayMetadata(this.overlay, this.injector, config);
    return this.openContent<T>(overlayMetadata, component, config) as GlnSnackbar2Reference<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbar2Config): GlnSnackbar2Reference<EmbeddedViewRef<any>> {
    const overlayMetadata: GlnOverlayMetadata = this.getOverlayMetadata(this.overlay, this.injector, config);
    return this.openContent(overlayMetadata, template, config) as GlnSnackbar2Reference<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackbar2Config): GlnSnackbar2Reference<GlnSnackbar2Alert> {
    const dataConfig = { ...this.rootConfig, ...config };
    dataConfig.data = { ...{ message, action }, ...dataConfig.data };
    return this.openFromComponent(this.snackbar2AlertComponent, dataConfig);
  }

  // ** Private methods **

  private getKeySnackbar(snackbarConfig: GlnSnackbar2Config): string {
    const panelClass: string[] = ArrayUtil.getList<string>(snackbarConfig.panelClass);
    let classListRes: string = '';
    for (let idx = 0; idx < panelClass.length; idx++) {
      classListRes = classListRes + panelClass[idx] + ',';
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
      const panelClass: string[] = ArrayUtil.getList<string>(currConfig.panelClass);
      for (let idx = 0; idx < panelClass.length; idx++) {
        if (!!panelClass[idx]) {
          overlayRef.overlayElement.classList.add(panelClass[idx]);
        }
      }
      const currConfig2: GlnSnackbar2Config = { ...currConfig };
      currConfig2.data = null;
      const injectorWithConfig: Injector = Injector.create({
        parent: injector,
        providers: [{ provide: GlnSnackbar2Config, useValue: currConfig2 }],
      });

      const containerComponent = new ComponentPortal(GlnSnackbar2ContainerComponent, undefined, injectorWithConfig);
      const containerRef: ComponentRef<GlnSnackbar2ContainerComponent> = overlayRef.attach(containerComponent);

      const maxCount: number = currConfig2.maxCountItems || 0;

      overlayMetadata = { key, overlayRef, containerComp: containerRef.instance, maxCount };
      this.overlayMetadataMap.set(key, overlayMetadata);

      const overlayMetadataRes: GlnOverlayMetadata = overlayMetadata;
      overlayMetadata.containerComp.setRemoveWrapperFn(() => {
        if (containerRef.instance.wrapperMapSize() == 0) {
          console.log(`@@setRemoveWrapperFn() overlayRef.detach();`); // #
          overlayMetadataRes.overlayRef.detach();
          this.overlayMetadataMap.delete(overlayMetadataRes.key);
        }
      });
    }
    return overlayMetadata;
  }

  private createOverlay(overlay: Overlay, config: GlnSnackbar2Config): OverlayRef {
    const overlayConfig = new OverlayConfig();
    const positionStrategy = overlay.position().global();
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
    const config2: GlnSnackbar2Config = { ...new GlnSnackbar2Config(), ...this.rootConfig, ...config };
    const snackbarContainer: GlnSnackbar2ContainerComponent = overlayMetadata.containerComp;

    if (0 === snackbarContainer.wrapperMapSize()) {
      // Position overlay by configuration.
      overlayMetadata.overlayRef.getConfig().positionStrategy?.apply();
    }
    const id: number = uniqueIdCounter++;
    const wrapperClasses: string[] = ArrayUtil.getList<string>(config2.wrapperClass);
    const transition: string = config2.transition || GlnSnackbar2Config.defaultTransition;
    // Create a new wrapper element for the current overlay.
    const wrapperElement: HTMLElement = snackbarContainer.createWrapper(id, wrapperClasses, transition);
    const wrapperPortal: DomPortalOutlet = this.createWrapPortal(wrapperElement);

    const snackbarRef = new GlnSnackbar2Reference<T | EmbeddedViewRef<any>>(id, config2.duration);
    // Add a wrapper element to the list for the current overlay.
    snackbarContainer.appendWrapper(id, wrapperPortal);
    // Show this wrapper element of the current overlay.
    snackbarContainer.showWrapper(id);

    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      // Create a template portal.
      const portal: TemplatePortal<any> = new TemplatePortal(content, null!, { $implicit: config2.data, snackbarRef } as any);
      htmlElement = portal.templateRef.elementRef.nativeElement;
      // Attach the template portal to the "containerPortal".
      snackbarRef.instance = wrapperPortal.attachTemplatePortal(portal);
    } else {
      const injector: Injector = this.createInjector(this.injector, config2, snackbarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the "containerPortal".
      const contentRef: ComponentRef<T> = wrapperPortal.attachComponentPortal(portal);
      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackbarRef.instance = contentRef.instance;
    }
    htmlElement?.setAttribute('role', 'alert');

    snackbarRef.setHideWrapperFn(() => {
      console.log(`@@containerComp.hideWrapper(${id});`); // #
      snackbarContainer.hideWrapper(id);
    });
    snackbarRef.setRemoveWrapperFn(() => {
      console.log(`@@containerComp.removeWrapper(${id});`); // #
      snackbarContainer.removeWrapper(id);
    });

    if (overlayMetadata.maxCount > 0) {
      while (overlayMetadata.maxCount < snackbarContainer.wrapperMapSize()) {
        const firstId: number | undefined = snackbarContainer.getItemByIndex(0);
        if (firstId !== undefined) {
          // Remove the wrapper element from the list for the current overlay.
          snackbarContainer.removeWrapper(firstId);
        }
      }
    }

    const snackbar2Reference: GlnSnackbar2Ref<T> = {
      instance: snackbarRef.instance,
      result: snackbarRef.result,
      close: snackbarRef.close,
      dismiss: snackbarRef.dismiss,
    };
    return snackbar2Reference;
  }

  private createWrapPortal(containerWrap: HTMLElement): DomPortalOutlet {
    // We have to resolve the ApplicationRef later in order to allow people
    // to use overlay-based providers during app initialization.
    if (!this.appRef) {
      this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
    }
    return new DomPortalOutlet(containerWrap, this.componentFactoryResolver, this.appRef, this.injector, this.document);
  }

  private createInjector<T>(injector: Injector, config: GlnSnackbar2Config, snackbarRef: GlnSnackbar2Reference<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    return Injector.create({
      parent: userInjector || injector,
      providers: [
        { provide: GlnSnackbar2Reference, useValue: snackbarRef },
        { provide: GLN_SNACKBAR2_DATA, useValue: config.data },
      ],
    });
  }
}

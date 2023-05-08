import { ComponentType, GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ArrayUtil } from '../_utils/array.util';
import { GlnSnackbarAlertComponent } from './gln-snackbar-alert.component';
import { GlnSnackbarConfig, GLN_SNACKBAR_DATA } from './gln-snackbar-config.interface';
import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';
import { GlnSnackbarRef, GlnSnackbarReference } from './gln-snackbar-reference';

type GlnSnackbarMeta = {
  key: string;
  overlayRef: OverlayRef;
  containerComp: GlnSnackbarContainerComponent;
  maxCount: number;
};

const CSS_CLASS_PANEL = 'gln-snackbar-panel';
let uniqueIdCounter = 0;

export class GlnSnackbarUtil {
  public static injector: Injector;

  private static appRef: ApplicationRef | undefined;
  private static snackbarMetaMap: Map<string, GlnSnackbarMeta> = new Map();
  private static rootConfig: GlnSnackbarConfig = new GlnSnackbarConfig();

  public static clear(): void {
    const overlayMetadataList: GlnSnackbarMeta[] = [...this.snackbarMetaMap.values()];
    for (let idx = 0; idx < overlayMetadataList.length; idx++) {
      overlayMetadataList[idx].overlayRef.detach();
    }
    this.snackbarMetaMap.clear();
  }

  public static getConfig(): GlnSnackbarConfig {
    return { ...this.rootConfig };
  }
  public static setConfig(config: GlnSnackbarConfig): void {
    this.rootConfig = { ...new GlnSnackbarConfig(), ...config };
  }

  public static openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbarConfig): GlnSnackbarRef<T> {
    const config2: GlnSnackbarConfig = { ...new GlnSnackbarConfig(), ...this.rootConfig, ...config };
    const snackbarMeta: GlnSnackbarMeta = GlnSnackbarUtil.getSnackbarMeta(config2) ?? GlnSnackbarUtil.createSnackbarMeta(config2);
    return GlnSnackbarUtil.openContent<T>(snackbarMeta, component, config2) as GlnSnackbarRef<T>;
  }

  public static openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbarConfig): GlnSnackbarRef<EmbeddedViewRef<any>> {
    const config2: GlnSnackbarConfig = { ...new GlnSnackbarConfig(), ...this.rootConfig, ...config };
    const snackbarMeta: GlnSnackbarMeta = GlnSnackbarUtil.getSnackbarMeta(config2) ?? GlnSnackbarUtil.createSnackbarMeta(config2);
    return GlnSnackbarUtil.openContent(snackbarMeta, template, config2) as GlnSnackbarRef<EmbeddedViewRef<any>>;
  }

  public static open(message: string, action: string = '', config?: GlnSnackbarConfig): GlnSnackbarRef<GlnSnackbarAlertComponent> {
    const dataConfig = { ...config };
    dataConfig.data = { ...{ message, action }, ...dataConfig.data };
    return this.openFromComponent(GlnSnackbarAlertComponent, dataConfig);
  }

  public static settingCssColor(msgType: string | undefined, elementRef: ElementRef<HTMLElement>): void {
    let colorName = '';
    const msgTypeValue: string = (msgType || '').replace('error', 'danger');
    if (['danger', 'success', 'info', 'warning'].indexOf(msgTypeValue) > -1) {
      colorName = msgTypeValue;
      elementRef.nativeElement.style.setProperty('--glncl-default-h', `var(--glncl-${colorName}-h, var(--gln-${colorName}-h))`);
      elementRef.nativeElement.style.setProperty('--glncl-default-s', `var(--glncl-${colorName}-s, var(--gln-${colorName}-s))`);
      elementRef.nativeElement.style.setProperty('--glncl-default-l', `var(--glncl-${colorName}-l, var(--gln-${colorName}-l))`);
    }
  }

  // ** Private methods **

  private static getOverlay(): Overlay {
    return GlnSnackbarUtil.injector.get(Overlay);
  }
  private static getApplicationRef(): any {
    // We have to resolve the ApplicationRef later in order to allow people
    // to use overlay-based providers during app initialization.
    if (!this.appRef) {
      this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
    }
    return this.appRef;
  }
  private static getKeySnackbar(snackbarConfig: GlnSnackbarConfig): string {
    let classListRes: string = '';
    const overlayClasses: string[] = ArrayUtil.getList<string>(snackbarConfig.overlayClasses);
    for (let idx = 0; idx < overlayClasses.length; idx++) {
      classListRes = classListRes + overlayClasses[idx] + ',';
    }
    return (snackbarConfig.horizontal || '_') + '-' + classListRes + '-' + (snackbarConfig.vertical || '_');
  }

  private static createPositionStrategy(config: GlnSnackbarConfig): PositionStrategy {
    const positionStrategy: GlobalPositionStrategy = GlnSnackbarUtil.getOverlay().position().global();
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
    return positionStrategy;
  }

  private static createOverlayRef(positionStrategy: PositionStrategy, config: GlnSnackbarConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = positionStrategy;

    const overlayRef: OverlayRef = GlnSnackbarUtil.getOverlay().create(overlayConfig);
    // https://github.com/angular/components/issues/1432  Ability to manually control overlay's z-index.
    // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
    // This will correctly use the z-index for child elements.
    overlayRef.hostElement.style.zIndex = 'unset';
    overlayRef.overlayElement.classList.add(CSS_CLASS_PANEL);
    const overlayClasses: string[] = ArrayUtil.getList<string>(config.overlayClasses);
    for (let idx = 0; idx < overlayClasses.length; idx++) {
      if (!!overlayClasses[idx]) {
        overlayRef.overlayElement.classList.add(overlayClasses[idx]);
      }
    }
    return overlayRef;
  }

  private static createSnackbarContainer(overlayRef: OverlayRef, config: GlnSnackbarConfig): GlnSnackbarContainerComponent {
    const injectorWithConfig: Injector = Injector.create({
      parent: GlnSnackbarUtil.injector,
      providers: [{ provide: GlnSnackbarConfig, useValue: config }],
    });
    const containerComponentPortal = new ComponentPortal(GlnSnackbarContainerComponent, undefined, injectorWithConfig);
    const containerRef: ComponentRef<GlnSnackbarContainerComponent> = overlayRef.attach(containerComponentPortal);
    return containerRef.instance;
  }

  private static getSnackbarMeta(config: GlnSnackbarConfig): GlnSnackbarMeta | undefined {
    const key: string = this.getKeySnackbar(config);
    return this.snackbarMetaMap.get(key);
  }

  private static createSnackbarMeta(config: GlnSnackbarConfig): GlnSnackbarMeta {
    // Creating a positioning strategy.
    const positionStrategy: PositionStrategy = GlnSnackbarUtil.createPositionStrategy(config);
    // Create an "Overlay" layer.
    const overlayRef = GlnSnackbarUtil.createOverlayRef(positionStrategy, config);
    // Create a container component.
    const containerComp: GlnSnackbarContainerComponent = GlnSnackbarUtil.createSnackbarContainer(overlayRef, config);
    // Add a callback when dropping a wrapper element.
    containerComp.setRemoveWrapperFn(() => {
      if (0 == containerComp.wrapperMapSize()) {
        snackbarMeta.overlayRef.detach();
        this.snackbarMetaMap.delete(snackbarMeta.key);
      }
    });
    const key: string = this.getKeySnackbar(config);
    const maxCount: number = config.maxCount || GlnSnackbarConfig.defaultMaxCount;
    // Creating the GlnSnackbarMeta element.
    const snackbarMeta: GlnSnackbarMeta = { key, overlayRef, containerComp, maxCount };
    // Add the GlnSnackbarMeta element to the map set.
    this.snackbarMetaMap.set(key, snackbarMeta);
    return snackbarMeta;
  }

  private static createWrapPortal(containerWrap: HTMLElement): DomPortalOutlet {
    const appRef: ApplicationRef = GlnSnackbarUtil.getApplicationRef();
    const injector: Injector = appRef.injector || GlnSnackbarUtil.injector;
    const componentFactoryResolver: ComponentFactoryResolver = GlnSnackbarUtil.injector.get(ComponentFactoryResolver);
    return new DomPortalOutlet(containerWrap, componentFactoryResolver, appRef, injector, document);
  }

  private static createInjector<T>(config: GlnSnackbarConfig, snackbarRef: GlnSnackbarRef<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    return Injector.create({
      parent: userInjector || GlnSnackbarUtil.injector,
      providers: [
        { provide: GlnSnackbarRef, useValue: snackbarRef },
        { provide: GLN_SNACKBAR_DATA, useValue: config.data },
      ],
    });
  }

  /** Places a new component (or template) as content for the snackbar wrapper. */
  private static openContent<T>(
    snackbarMeta: GlnSnackbarMeta,
    content: ComponentType<T> | TemplateRef<T>,
    config: GlnSnackbarConfig
  ): GlnSnackbarRef<T | EmbeddedViewRef<any>> {
    const config2: GlnSnackbarConfig = { ...new GlnSnackbarConfig(), ...this.rootConfig, ...config };
    const snackbarContainer: GlnSnackbarContainerComponent = snackbarMeta.containerComp;

    if (0 === snackbarContainer.wrapperMapSize()) {
      // Position overlay by configuration.
      snackbarMeta.overlayRef.getConfig().positionStrategy?.apply();
    }
    const id: number = uniqueIdCounter++;
    const wrapperClasses: string[] = ArrayUtil.getList<string>(config2.wrapperClass);
    const transition: string = config2.transition || GlnSnackbarConfig.defaultTransition;
    // Create a new wrapper element for the current overlay.
    const wrapperElement: HTMLElement = snackbarContainer.createWrapper(id, wrapperClasses, transition);
    const wrapperPortal: DomPortalOutlet = GlnSnackbarUtil.createWrapPortal(wrapperElement);

    GlnSnackbarUtil.settingCssColor(config2.data['msgType'], new ElementRef<HTMLElement>(wrapperElement));

    const snackbarReference = new GlnSnackbarReference<T | EmbeddedViewRef<any>>(id, config2.duration);

    // Add a wrapper element to the list for the current overlay.
    snackbarContainer.appendWrapper(id, wrapperPortal);
    // Show this wrapper element of the current overlay.
    snackbarContainer.showWrapper(id);

    const snackbarRef: GlnSnackbarRef<T | EmbeddedViewRef<any>> = snackbarReference.getGlnSnackbarRef();
    let htmlElement: HTMLElement | null = null;

    if (content instanceof TemplateRef) {
      const appRef = this.injector.get<ApplicationRef>(ApplicationRef);
      appRef.components[0].hostView;
      const viewContainerRef: ViewContainerRef = (!!config2 && config2.viewContainerRef) || snackbarContainer.viewContainerRef;
      // Create a template portal.
      const context: any = { $implicit: config2.data, snackbarRef, context: config2.data };
      const portal: TemplatePortal<any> = new TemplatePortal(content, viewContainerRef, context as any);
      // Attach the template portal to the "containerPortal".
      snackbarReference.instance = wrapperPortal.attachTemplatePortal(portal);
      htmlElement = snackbarReference.instance.rootNodes[0];
    } else {
      const injector: Injector = GlnSnackbarUtil.createInjector(config2, snackbarRef);
      // Create a component portal.
      const portal = new ComponentPortal(content, undefined, injector);
      // Attach the component portal to the "containerPortal".
      const contentRef: ComponentRef<T> = wrapperPortal.attachComponentPortal(portal);
      htmlElement = contentRef.location.nativeElement;
      // We can't pass this via the injector, because the injector is created earlier.
      snackbarReference.instance = contentRef.instance;
    }
    snackbarRef.instance = snackbarReference.instance;
    htmlElement?.setAttribute('role', 'alert');

    snackbarReference.setHideWrapperFn(() => {
      snackbarContainer.hideWrapper(id);
    });
    snackbarReference.setRemoveWrapperFn(() => {
      snackbarContainer.removeWrapper(id);
    });

    if (snackbarMeta.maxCount > 0) {
      while (snackbarMeta.maxCount < snackbarContainer.wrapperMapSize()) {
        const firstId: number | undefined = snackbarContainer.getItemByIndex(0);
        if (firstId !== undefined) {
          // Remove the wrapper element from the list for the current overlay.
          snackbarContainer.removeWrapper(firstId);
        }
      }
    }
    return snackbarRef;
  }
}

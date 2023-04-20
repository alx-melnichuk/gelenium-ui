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
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnSnackbarConfig } from './gln-snackbar-config.interface';

const CSS_ATTR_IS_HIDE = 'is-hide';
const CSS_ATTR_IS_SHOW = 'is-show';

export const SNACKBAR_POSITION: { [key: string]: string } = {
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

export const GLN_SNACKBAR_CONFIG = new InjectionToken<GlnSnackbarConfig>('GLN_SNACKBAR_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-snackbar',
  exportAs: 'glnSnackbar',
  templateUrl: './gln-snackbar.component.html',
  styleUrls: ['./gln-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarComponent /*<T extends GlnSnackbarAlertComponent>*/ implements OnChanges, OnInit {
  @Input()
  public id = `glnsn-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSnackbarConfig | null | undefined;
  @Input()
  public content: Record<string, unknown> | null = null;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isOpen: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public message: string | TemplateRef<unknown> | null | undefined;

  public currConfig: GlnSnackbarConfig;
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isOpenVal: boolean = false;
  // public messageVal: string | TemplateRef<unknown> | null | undefined = null; // Binding attribute "message".

  // protected /*abstract*/ readonly tooltipCompType: ComponentType<T>;
  protected readonly tooltipCompType = GlnSnackbarComponent;
  protected overlayRef: OverlayRef | null = null;
  protected portal: ComponentPortal<any> | null = null;
  /** A strategy for handling scrolling when the overlay panel is open. */
  protected scrollStrategy: ScrollStrategy;
  protected tooltipInstRef: ComponentRef<any> | null = null;

  constructor(
    // protected document: Document,
    protected overlay: Overlay,
    // protected platform: Platform,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    public hostRef: ElementRef<HTMLElement>,
    // protected scrollStrategyFactory: (() => ScrollStrategy) | null,
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SNACKBAR_CONFIG) private rootConfig: GlnSnackbarConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-snackbar');
    this.scrollStrategy = /*this.scrollStrategyFactory != null ? this.scrollStrategyFactory() :*/ this.overlay.scrollStrategies.noop();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? this.currConfig.isNoAnimation);
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
  }

  public ngOnInit(): void {
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
  }

  // ** Public methods **

  /** Show tooltip without delay. */
  public show(): void {
    const validPosition: string = 'bottom'; // #this.getValidPosition(this.positionVal);
    if (this.overlayRef == null) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.createPositionStrategy(this.overlay, [this.getConnectedPosition(validPosition)]),
        scrollStrategy: this.scrollStrategy,
        // panelClass: [CSS_CLASS_PANEL].concat(this.overlayClassesVal),
        // minWidth: this.minWidthVal != null && this.minWidthVal >= 0 ? this.minWidthVal : undefined,
        // minHeight: this.minHeightVal != null && this.minHeightVal >= 0 ? this.minHeightVal : undefined,
        // maxWidth: this.maxWidthVal != null && this.maxWidthVal > 0 ? this.maxWidthVal : undefined,
        // maxHeight: this.maxHeightVal != null && this.maxHeightVal > 0 ? this.maxHeightVal : undefined,
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
    this.setInstanceMessage(this.tooltipInstRef, this.message, this.content);

    // const { position, alignment } = this.getPositionParts(validPosition);

    const instanceRef: ElementRef<HTMLElement> = this.tooltipInstRef.location;

    // for (let idx = 0; idx < this.classesVal.length; idx++) {
    //   this.renderer.addClass(instanceRef.nativeElement, this.classesVal[idx]);
    // }

    const positionStrategy = this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    positionStrategy.withPositions(this.getConnectedPositionList(validPosition));
    positionStrategy.apply();

    // Add the necessary attributes for the tooltip before displaying.
    this.renderer.setAttribute(instanceRef.nativeElement, CSS_ATTR_IS_SHOW, '');
    // // Set isVisibility = true on the component instance;
    // this.tooltipInstRef.instance.show();

    this.tooltipInstRef.changeDetectorRef.markForCheck();
  }
  /** Hides the tooltip without delay. */
  public hide(options?: { noAnimation?: boolean }): void {
    // return this.startHide(0, options?.noAnimation || !!this.isNoAnimationVal);
  }

  // ** Protected methods **

  /** Get the correct "position" value. */
  protected getValidPosition(position: string | null): string {
    return SNACKBAR_POSITION[position || ''] || SNACKBAR_POSITION['bottom'];
  }

  protected createPositionStrategy(overlay: Overlay, positions: ConnectedPosition[]): PositionStrategy {
    return overlay.position().flexibleConnectedTo(this.hostRef).withFlexibleDimensions(false).withPositions(positions);
  }

  // - - - - Set tooltip properties. - - - -

  protected setInstanceMessage(
    instRef: ComponentRef<any> | null,
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
    return { originX, originY, overlayX, overlayY, panelClass: ['glntt-' + position, 'glntt-' + alignment] };
  }

  private getConnectedPositionList(validPosition: string): ConnectedPosition[] {
    const result: ConnectedPosition[] = [];
    const positions: string[] = Object.keys(SNACKBAR_POSITION);
    let idx: number = positions.indexOf(validPosition);
    for (let len: number = idx !== -1 ? positions.length : 0; len > 0; len--, idx = idx < positions.length ? idx + 1 : 0) {
      result.push(this.getConnectedPosition(positions[idx]));
    }
    return result;
  }

  private settingNoAnimation(isNoAnimationVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noAni', isNoAnimationVal ? '' : null);
  }
}

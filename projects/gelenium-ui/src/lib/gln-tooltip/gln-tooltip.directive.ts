import { Overlay } from '@angular/cdk/overlay';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnTooltipBaseDirective } from './gln-tooltip-base.directive';
import { GlnTooltipConfig } from './gln-tooltip-config.interface';
import { GlnTooltipComponent } from './gln-tooltip.component';

export const TOOLTIP_POSITION: { [key: string]: string } = {
  left: 'left',
  right: 'right',
  above: 'above',
  below: 'below',
  before: 'before',
  after: 'after',
};

export const GLN_TOOLTIP_CONFIG = new InjectionToken<GlnTooltipConfig>('GLN_TOOLTIP_CONFIG');

@Directive({
  selector: '[glnTooltip]',
  exportAs: 'glnTooltip',
})
export class GlnTooltipDirective extends GlnTooltipBaseDirective<GlnTooltipComponent> implements OnChanges, OnInit, OnDestroy {
  @Input()
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnTooltipHideDelay')
  public hideDelay: number | string | null | undefined;
  @Input('glnTooltipDisabled')
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input('glnTooltip')
  public override message: string | null | undefined;
  @Input('glnTooltipPanelClass')
  public panelClass: string | string[] = '';
  @Input('glnTooltipPosition')
  public position: string | null | undefined; // 'left' | 'right' | 'above' | 'below' | 'before' | 'after'
  @Input('glnTooltipShowDelay')
  public showDelay: number | string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public override hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public override isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public override isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public override panelClassVal: string[] = []; // Binding attribute "panelClass"
  public override positionVal: string | null = null; // Binding attribute "position"
  public override showDelayVal: number | null = null; // Binding attribute "showDelay".

  protected readonly tooltipComponent = GlnTooltipComponent;

  // private overlayRef: OverlayRef | null = null;
  // private portal: ComponentPortal<GlnTooltipComponent> | null = null;
  // private tooltipInstance: GlnTooltipComponent | null = null;

  constructor(
    overlay: Overlay,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_TOOLTIP_CONFIG) private rootConfig: GlnTooltipConfig | null
  ) {
    super(overlay, renderer, viewContainerRef, hostRef);
    this.currConfig = this.rootConfig || {};
    // this.scrollStrategy =
    //   this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-tooltip', true);
  }

  // @HostListener('mouseenter', ['$event'])
  // public doMouseenter(event: MouseEvent): void {
  //   console.log(`doMouseenter();`); // #
  //   this.show();
  // }
  // @HostListener('mouseout')
  // public doMouseout(event: MouseEvent): void {
  //   console.log(`doMouseout();`); // #
  //   this.hide();
  // }
  @HostListener('mousedown', ['$event'])
  public doMousedown(event: MouseEvent): void {
    console.log(`doMousedown();`); // # mouseenter
    this.toggle();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['hideDelay'] || (changes['config'] && this.hideDelay == null && this.currConfig.hideDelay != null)) {
      const hideDelayStr: string = (this.hideDelay || this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = this.converInt(hideDelayStr, 0);
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
    }
    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      const panelClass: string | string[] = this.panelClass || this.currConfig.panelClass || [];
      this.panelClassVal = Array.isArray(panelClass) ? panelClass : [panelClass];
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionVal = this.position || this.currConfig.position || null;
      // Updates the position of the tooltip.
      super.updatesPosition(this.positionVal, this.overlayRef);
    }
    if (changes['showDelay'] || (changes['config'] && this.showDelay == null && this.currConfig.showDelay != null)) {
      const showDelayStr: string = (this.showDelay || this.currConfig.showDelay || '').toString();
      this.showDelayVal = this.converInt(showDelayStr, 0);
    }
  }

  public ngOnInit(): void {
    if (this.hideDelay == null) {
      const hideDelayStr: string = (this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = this.converInt(hideDelayStr, 0);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!this.currConfig.isNoAnimation;
    }
    if (this.panelClassVal == null) {
      const panelClass: string | string[] = this.currConfig.panelClass || [];
      this.panelClassVal = Array.isArray(panelClass) ? panelClass : [panelClass];
    }
    if (this.positionVal === null) {
      this.positionVal = this.currConfig.position || null;
    }
    if (this.showDelay == null) {
      const showDelayStr: string = (this.currConfig.showDelay || '').toString();
      this.showDelayVal = this.converInt(showDelayStr, 0);
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ** Public methods **

  /** Show tooltip after delay in ms, default is 0 ms delay. */
  public override show(delay: number = this.showDelayVal || 0): Promise<void> {
    return super.show(delay);
  }

  /** Hides the tooltip after a delay in ms, the default is a delay of 0 ms. */
  public override hide(delay: number = this.hideDelayVal || 0): Promise<void> {
    return super.hide(delay);
  }

  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }

  /** If the tooltip is currently visible, returns true. */
  public override isVisible(): boolean {
    return super.isVisible();
  }

  // ** Private methods **

  private converInt(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseInt(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  /*private getPosition(value: string | null): HorizontalConnectionPos {
    return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start') as HorizontalConnectionPos;
  }*/

  /*private getPositionList(position: string | undefined | null): ConnectedPosition[] {
    const horizontalAlignment: HorizontalConnectionPos = this.getPosition(position || null);
    return [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom' },
    ];
  }*/
}

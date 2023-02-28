import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
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

export const GLN_TOOLTIP_CONFIG = new InjectionToken<GlnTooltipConfig>('GLN_TOOLTIP_CONFIG');

@Directive({
  selector: '[glnTooltip]',
  exportAs: 'glnTooltip',
})
export class GlnTooltipDirective extends GlnTooltipBaseDirective<GlnTooltipComponent> implements OnChanges, OnInit, OnDestroy {
  @Input()
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnttHideDelay')
  public hideDelay: number | string | null | undefined;
  @Input('glnttDisabled')
  public isDisabled: string | boolean | null | undefined;
  @Input('glnttNoAnimation')
  public isNoAnimation: string | boolean | null | undefined;
  @Input('glnttNoHoverable')
  public isNoHoverable: string | boolean | null | undefined;
  @Input('glnttNoTouchable')
  public isNoTouchable: string | boolean | null | undefined;
  @Input('glnTooltip')
  public message: string | null | undefined;
  @Input('glnttPanelClass')
  public panelClass: string | string[] = '';
  @Input('glnttPosition')
  public position: string | null | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  @Input('glnttShowDelay')
  public showDelay: number | string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public override hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public override isArrowVal: boolean | null = null; // Binding attribute "isArrow".
  public override isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public override isNoHoverableVal: boolean | null = null; // Binding attribute "isNoHoverable".
  public override isNoTouchableVal: boolean | null = null; // Binding attribute "isNoTouchable".
  public override panelClassVal: string[] = []; // Binding attribute "panelClass"
  public override showDelayVal: number | null = null; // Binding attribute "showDelay".

  protected readonly tooltipComponent = GlnTooltipComponent;

  constructor(
    @Inject(DOCUMENT) _document: Document,
    overlay: Overlay,
    platform: Platform,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_TOOLTIP_CONFIG) private rootConfig: GlnTooltipConfig | null
  ) {
    super(document, overlay, platform, renderer, viewContainerRef, hostRef);
    this.currConfig = this.rootConfig || {};
    // this.scrollStrategy =
    //   this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-tooltip', true);
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
    if (changes['isNoHoverable'] || (changes['config'] && this.isNoHoverable == null && this.currConfig.isNoHoverable != null)) {
      this.isNoHoverableVal = BooleanUtil.init(this.isNoHoverable) ?? !!this.currConfig.isNoHoverable;
    }
    if (changes['isNoTouchable'] || (changes['config'] && this.isNoTouchable == null && this.currConfig.isNoTouchable != null)) {
      this.isNoTouchableVal = BooleanUtil.init(this.isNoTouchable) ?? !!this.currConfig.isNoTouchable;
    }
    if (changes['message']) {
      this.messageVal = this.message || null;
    }
    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      const panelClass: string | string[] = this.panelClass || this.currConfig.panelClass || [];
      this.panelClassVal = Array.isArray(panelClass) ? panelClass : [panelClass];
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionVal = this.position || this.currConfig.position || null;
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
    if (this.isNoHoverable == null) {
      this.isNoHoverableVal = !!this.currConfig.isNoHoverable;
    }
    if (this.isNoTouchable == null) {
      this.isNoTouchableVal = !!this.currConfig.isNoTouchable;
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

  // ** Private methods **

  private converInt(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseInt(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }
}

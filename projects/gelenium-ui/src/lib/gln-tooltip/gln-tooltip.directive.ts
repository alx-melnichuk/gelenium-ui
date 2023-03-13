import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
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
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnTooltipBaseDirective } from './gln-tooltip-base.directive';
import { GlnTooltipConfig } from './gln-tooltip-config.interface';
import { GlnTooltipComponent } from './gln-tooltip.component';
import { GLN_TOOLTIP_SCROLL_STRATEGY } from './gln-tooltip.providers';

export const TOOLTIP_MAX_WIDTH = 280;
export const GLN_TOOLTIP_CONFIG = new InjectionToken<GlnTooltipConfig>('GLN_TOOLTIP_CONFIG');

@Directive({
  selector: '[glnTooltip]',
  exportAs: 'glnTooltip',
})
export class GlnTooltipDirective extends GlnTooltipBaseDirective<GlnTooltipComponent> implements OnChanges, OnInit, OnDestroy {
  @Input('glnttConfig')
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnttContent')
  public override content: Record<string, unknown> | null = null;
  @Input('glnttClasses')
  public classes: string | string[] = '';
  @Input('glnttHideDelay')
  public hideDelay: number | string | null | undefined;
  @Input('glnttDisabled')
  public isDisabled: string | boolean | null | undefined;
  @Input('glnttNoAnimation')
  public isNoAnimation: string | boolean | null | undefined;
  @Input('glnttNoHideOnScroll')
  public isNoHideOnScroll: string | boolean | null | undefined;
  @Input('glnttNoHoverable')
  public isNoHoverable: string | boolean | null | undefined;
  @Input('glnttNoTouchable')
  public isNoTouchable: string | boolean | null | undefined;
  @Input('glnTooltip')
  public message: string | TemplateRef<unknown> | null | undefined;
  @Input('glnttPosition')
  public position: string | null | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  @Input('glnttShowDelay')
  public showDelay: number | string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public override classesVal: string[] = []; // Binding attribute "classes"
  public override hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public override isArrowVal: boolean | null = null; // Binding attribute "isArrow".
  public override isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public override isNoHideOnScrollVal: boolean | null = null; // Binding attribute "isNoHideOnScroll".
  public override isNoHoverableVal: boolean | null = null; // Binding attribute "isNoHoverable".
  public override isNoTouchableVal: boolean | null = null; // Binding attribute "isNoTouchable".
  public override maxHeightVal: number | string | null = null; // Binding attribute "maxHeight".
  public override maxWidthVal: number | string | null = null; // Binding attribute "maxWidth".
  public override minHeightVal: number | string | null = null; // Binding attribute "minHeight".
  public override minWidthVal: number | string | null = null; // Binding attribute "minWidth".
  public override messageVal: string | TemplateRef<unknown> | null | undefined = null; // Binding attribute "message".
  public override overlayClassesVal: string[] = [];
  public override positionVal: string | null = null; // Binding attribute "position"
  public override showDelayVal: number | null = null; // Binding attribute "showDelay".

  protected readonly tooltipCompType = GlnTooltipComponent;

  constructor(
    @Inject(DOCUMENT) _document: Document,
    overlay: Overlay,
    platform: Platform,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_TOOLTIP_CONFIG) private rootConfig: GlnTooltipConfig | null,
    @Optional() @Inject(GLN_TOOLTIP_SCROLL_STRATEGY) scrollStrategyFactory: (() => ScrollStrategy) | null
  ) {
    super(document, overlay, platform, renderer, viewContainerRef, hostRef, scrollStrategyFactory);
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-tooltip', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };

      this.maxHeightVal = this.currConfig.maxHeight || null;
      this.maxWidthVal = this.currConfig.maxWidth || TOOLTIP_MAX_WIDTH;
      this.minHeightVal = this.currConfig.minHeight || null;
      this.minWidthVal = this.currConfig.minWidth || null;
    }

    if (changes['classes'] || (changes['config'] && this.classes == null && this.currConfig.classes != null)) {
      const classes: string | string[] = this.classes || this.currConfig.classes || [];
      this.classesVal = Array.isArray(classes) ? classes : [classes];
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
    if (changes['isNoHideOnScroll'] || (changes['config'] && this.isNoHideOnScroll == null && this.currConfig.isNoHideOnScroll != null)) {
      this.isNoHideOnScrollVal = BooleanUtil.init(this.isNoHideOnScroll) ?? !!this.currConfig.isNoHideOnScroll;
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
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionVal = this.position || this.currConfig.position || null;
    }
    if (changes['showDelay'] || (changes['config'] && this.showDelay == null && this.currConfig.showDelay != null)) {
      const showDelayStr: string = (this.showDelay || this.currConfig.showDelay || '').toString();
      this.showDelayVal = this.converInt(showDelayStr, 0);
    }
  }

  public ngOnInit(): void {
    if (this.classesVal.length === 0) {
      const classes: string | string[] = this.currConfig.classes || [];
      this.classesVal = Array.isArray(classes) ? classes : [classes];
    }
    if (this.hideDelayVal == null) {
      const hideDelayStr: string = (this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = this.converInt(hideDelayStr, 0);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!this.currConfig.isNoAnimation;
    }
    if (this.isNoHideOnScrollVal == null) {
      this.isNoHideOnScrollVal = !!this.currConfig.isNoHideOnScroll;
    }
    if (this.isNoHoverableVal == null) {
      this.isNoHoverableVal = !!this.currConfig.isNoHoverable;
    }
    if (this.isNoTouchableVal == null) {
      this.isNoTouchableVal = !!this.currConfig.isNoTouchable;
    }
    if (this.overlayClassesVal.length === 0) {
      const overlayClasses: string | string[] = this.currConfig.overlayClasses || [];
      this.overlayClassesVal = Array.isArray(overlayClasses) ? overlayClasses : [overlayClasses];
    }
    if (this.positionVal === null) {
      this.positionVal = this.currConfig.position || null;
    }
    if (this.showDelayVal == null) {
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

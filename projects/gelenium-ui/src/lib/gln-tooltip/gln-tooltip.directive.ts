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

export const MAX_WIDTH = 280;
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
  @Input('glnttHideTouchDelay')
  public hideTouchDelay: number | string | null | undefined;
  @Input('glnttArrow')
  public isArrow: string | boolean | null | undefined;
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
  @Input('glnttNoTransform')
  public isNoTransform: string | boolean | null | undefined;
  @Input('glnttMaxHeight')
  public maxHeight: number | string | null | undefined;
  @Input('glnttMaxWidth')
  public maxWidth: number | string | null | undefined;
  @Input('glnttMinHeight')
  public minHeight: number | string | null | undefined;
  @Input('glnttMinWidth')
  public minWidth: number | string | null | undefined;
  @Input('glnTooltip')
  public message: string | TemplateRef<unknown> | null | undefined;
  @Input('glnttPosition')
  public position: string | null | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  @Input('glnttShowDelay')
  public showDelay: number | string | null | undefined;
  @Input('glnttShowTouchDelay')
  public showTouchDelay: number | string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public override classesVal: string[] = []; // Binding attribute "classes"
  public override hideDelayVal: number | null = null; // Binding attribute "hideDelay".
  public override hideTouchDelayVal: number | null = null; // Binding attribute "hideTouchDelay".
  public override isArrowVal: boolean | null = null; // Binding attribute "isArrow".
  public override isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public override isNoHideOnScrollVal: boolean | null = null; // Binding attribute "isNoHideOnScroll".
  public override isNoHoverableVal: boolean | null = null; // Binding attribute "isNoHoverable".
  public override isNoTouchableVal: boolean | null = null; // Binding attribute "isNoTouchable".
  public override isNoTransformVal: boolean | null = null; // Binding attribute "isNoTransform".
  public override maxHeightVal: number | string | null = null; // Binding attribute "maxHeight".
  public override maxWidthVal: number | string | null = null; // Binding attribute "maxWidth".
  public override minHeightVal: number | string | null = null; // Binding attribute "minHeight".
  public override minWidthVal: number | string | null = null; // Binding attribute "minWidth".
  public override messageVal: string | TemplateRef<unknown> | null | undefined = null; // Binding attribute "message".
  public override overlayClassesVal: string[] = [];
  public override showDelayVal: number | null = null; // Binding attribute "showDelay".
  public override showTouchDelayVal: number | null = null; // Binding attribute "showTouchDelay".

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
    }

    if (changes['classes'] || (changes['config'] && this.classes == null && this.currConfig.classes != null)) {
      const classes: string | string[] = this.classes || this.currConfig.classes || [];
      this.classesVal = Array.isArray(classes) ? classes : [classes];
    }
    if (changes['hideDelay'] || (changes['config'] && this.hideDelay == null && this.currConfig.hideDelay != null)) {
      const hideDelayStr: string = (this.hideDelay || this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = this.converInt(hideDelayStr, 0);
    }
    if (changes['hideTouchDelay'] || (changes['config'] && this.hideTouchDelay == null && this.currConfig.hideTouchDelay != null)) {
      const hideTouchDelayStr: string = (this.hideTouchDelay || this.currConfig.hideTouchDelay || '').toString();
      this.hideTouchDelayVal = this.converInt(hideTouchDelayStr, 0);
    }
    if (changes['isArrow'] || (changes['config'] && this.isArrow == null && this.currConfig.isArrow != null)) {
      this.isArrowVal = BooleanUtil.init(this.isArrow) ?? !!this.currConfig.isArrow;
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
    if (changes['isNoTransform'] || (changes['config'] && this.isNoTransform == null && this.currConfig.isNoTransform != null)) {
      this.isNoTransformVal = BooleanUtil.init(this.isNoTransform) ?? !!this.currConfig.isNoTransform;
    }
    if (changes['maxHeight'] || (changes['config'] && this.maxHeight == null && this.currConfig.maxHeight != null)) {
      const maxHeightStr: string = (this.maxHeight || this.currConfig.maxHeight || '').toString();
      this.maxHeightVal = this.converInt(maxHeightStr, -1);
    }
    if (changes['maxWidth'] || (changes['config'] && this.maxWidth == null && this.currConfig.maxWidth != null)) {
      const maxWidthStr: string = (this.maxWidth || this.currConfig.maxWidth || '').toString();
      this.maxWidthVal = this.converInt(maxWidthStr, MAX_WIDTH);
    }
    if (changes['minHeight'] || (changes['config'] && this.minHeight == null && this.currConfig.minHeight != null)) {
      const minHeightStr: string = (this.minHeight || this.currConfig.minHeight || '').toString();
      this.minHeightVal = this.converInt(minHeightStr, -1);
    }
    if (changes['minWidth'] || (changes['config'] && this.minWidth == null && this.currConfig.minWidth != null)) {
      const minWidthStr: string = (this.minWidth || this.currConfig.minWidth || '').toString();
      this.minWidthVal = this.converInt(minWidthStr, -1);
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
    if (changes['showTouchDelay'] || (changes['config'] && this.showTouchDelay == null && this.currConfig.showTouchDelay != null)) {
      const showTouchDelayStr: string = (this.showTouchDelay || this.currConfig.showTouchDelay || '').toString();
      this.showTouchDelayVal = this.converInt(showTouchDelayStr, 0);
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
    if (this.hideTouchDelayVal == null) {
      const hideTouchDelayStr: string = (this.currConfig.hideTouchDelay || '').toString();
      this.hideTouchDelayVal = this.converInt(hideTouchDelayStr, 0);
    }
    if (this.isArrowVal == null) {
      this.isArrowVal = !!this.currConfig.isArrow;
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
    if (this.isNoTransformVal == null) {
      this.isNoTransformVal = !!this.currConfig.isNoTransform;
    }
    if (this.maxHeightVal == null) {
      const maxHeightStr: string = (this.currConfig.maxHeight || '').toString();
      this.maxHeightVal = this.converInt(maxHeightStr, -1);
    }
    if (this.maxWidthVal == null) {
      const maxWidthStr: string = (this.currConfig.maxWidth || '').toString();
      this.maxWidthVal = this.converInt(maxWidthStr, MAX_WIDTH);
    }
    if (this.minHeightVal == null) {
      const minHeightStr: string = (this.currConfig.minHeight || '').toString();
      this.minHeightVal = this.converInt(minHeightStr, -1);
    }
    if (this.minWidthVal == null) {
      const minWidthStr: string = (this.currConfig.minWidth || '').toString();
      this.minWidthVal = this.converInt(minWidthStr, -1);
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
    if (this.showTouchDelayVal == null) {
      const showTouchDelayStr: string = (this.currConfig.showTouchDelay || '').toString();
      this.showTouchDelayVal = this.converInt(showTouchDelayStr, 0);
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

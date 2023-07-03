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
import { ChangeUtil } from '../_utils/change.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnTooltipBaseDirective } from './gln-tooltip-base.directive';
import { GlnTooltipConfig } from './gln-tooltip-config.interface';
import { GlnTooltipComponent } from './gln-tooltip.component';
import { GLN_TOOLTIP_SCROLL_STRATEGY } from './gln-tooltip.providers';

const SHOW_DELAY_FOR_MOUSE = 100;
const HIDE_DELAY_FOR_MOUSE = 100; // 0
const SHOW_DELAY_FOR_TOUCH = 800;
const HIDE_DELAY_FOR_TOUCH = 1500;

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
    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (!!changes['classes'] || ChangeUtil.check(changes['config'], 'classes')) {
      const classes: string | string[] = this.classes || this.currConfig.classes || [];
      this.classesVal = Array.isArray(classes) ? classes : [classes];
    }
    if (!!changes['hideDelay'] || ChangeUtil.check(changes['config'], 'hideDelay')) {
      const hideDelayStr: string = (this.hideDelay || this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = NumberUtil.converInt(hideDelayStr, HIDE_DELAY_FOR_MOUSE);
    }
    if (!!changes['hideTouchDelay'] || ChangeUtil.check(changes['config'], 'hideTouchDelay')) {
      const hideTouchDelayStr: string = (this.hideTouchDelay || this.currConfig.hideTouchDelay || '').toString();
      this.hideTouchDelayVal = NumberUtil.converInt(hideTouchDelayStr, HIDE_DELAY_FOR_TOUCH);
    }
    if (!!changes['isArrow'] || ChangeUtil.check(changes['config'], 'isArrow')) {
      this.isArrowVal = BooleanUtil.init(this.isArrow) ?? !!this.currConfig.isArrow;
    }
    if (!!changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
    }
    if (!!changes['isNoAnimation'] || ChangeUtil.check(changes['config'], 'isNoAnimation')) {
      this.isNoAnimationVal = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
    }
    const isNoHideOnScroll: boolean | undefined = this.currConfig.isNoHideOnScroll;
    if (!!changes['isNoHideOnScroll'] || ChangeUtil.check(changes['config'], 'isNoHideOnScroll')) {
      this.isNoHideOnScrollVal = BooleanUtil.init(this.isNoHideOnScroll) ?? !!this.currConfig.isNoHideOnScroll;
    }
    if (!!changes['isNoHoverable'] || ChangeUtil.check(changes['config'], 'isNoHoverable')) {
      this.isNoHoverableVal = BooleanUtil.init(this.isNoHoverable) ?? !!this.currConfig.isNoHoverable;
    }
    if (!!changes['isNoTouchable'] || ChangeUtil.check(changes['config'], 'isNoTouchable')) {
      this.isNoTouchableVal = BooleanUtil.init(this.isNoTouchable) ?? !!this.currConfig.isNoTouchable;
    }
    if (!!changes['isNoTransform'] || ChangeUtil.check(changes['config'], 'isNoTransform')) {
      this.isNoTransformVal = BooleanUtil.init(this.isNoTransform) ?? !!this.currConfig.isNoTransform;
    }
    if (!!changes['maxHeight'] || ChangeUtil.check(changes['config'], 'maxHeight')) {
      const maxHeightStr: string = (this.maxHeight || this.currConfig.maxHeight || '').toString();
      this.maxHeightVal = NumberUtil.converInt(maxHeightStr, -1);
    }
    if (!!changes['maxWidth'] || ChangeUtil.check(changes['config'], 'maxWidth')) {
      const maxWidthStr: string = (this.maxWidth || this.currConfig.maxWidth || '').toString();
      this.maxWidthVal = NumberUtil.converInt(maxWidthStr, MAX_WIDTH);
    }
    if (!!changes['minHeight'] || ChangeUtil.check(changes['config'], 'minHeight')) {
      const minHeightStr: string = (this.minHeight || this.currConfig.minHeight || '').toString();
      this.minHeightVal = NumberUtil.converInt(minHeightStr, -1);
    }
    if (!!changes['minWidth'] || ChangeUtil.check(changes['config'], 'minWidth')) {
      const minWidthStr: string = (this.minWidth || this.currConfig.minWidth || '').toString();
      this.minWidthVal = NumberUtil.converInt(minWidthStr, -1);
    }
    if (!!changes['message']) {
      this.messageVal = this.message || null;
    }
    if (!!changes['position'] || ChangeUtil.check(changes['config'], 'position')) {
      this.positionVal = this.position || this.currConfig.position || null;
    }
    if (!!changes['showDelay'] || ChangeUtil.check(changes['config'], 'showDelay')) {
      const showDelayStr: string = (this.showDelay || this.currConfig.showDelay || '').toString();
      this.showDelayVal = NumberUtil.converInt(showDelayStr, SHOW_DELAY_FOR_MOUSE);
    }
    if (!!changes['showTouchDelay'] || ChangeUtil.check(changes['config'], 'showTouchDelay')) {
      const showTouchDelayStr: string = (this.showTouchDelay || this.currConfig.showTouchDelay || '').toString();
      this.showTouchDelayVal = NumberUtil.converInt(showTouchDelayStr, SHOW_DELAY_FOR_TOUCH);
    }
  }

  public ngOnInit(): void {
    if (this.classesVal.length === 0) {
      const classes: string | string[] = this.currConfig.classes || [];
      this.classesVal = Array.isArray(classes) ? classes : [classes];
    }
    if (this.hideDelayVal == null) {
      const hideDelayStr: string = (this.currConfig.hideDelay || '').toString();
      this.hideDelayVal = NumberUtil.converInt(hideDelayStr, HIDE_DELAY_FOR_MOUSE);
    }
    if (this.hideTouchDelayVal == null) {
      const hideTouchDelayStr: string = (this.currConfig.hideTouchDelay || '').toString();
      this.hideTouchDelayVal = NumberUtil.converInt(hideTouchDelayStr, HIDE_DELAY_FOR_TOUCH);
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
      this.maxHeightVal = NumberUtil.converInt(maxHeightStr, -1);
    }
    if (this.maxWidthVal == null) {
      const maxWidthStr: string = (this.currConfig.maxWidth || '').toString();
      this.maxWidthVal = NumberUtil.converInt(maxWidthStr, MAX_WIDTH);
    }
    if (this.minHeightVal == null) {
      const minHeightStr: string = (this.currConfig.minHeight || '').toString();
      this.minHeightVal = NumberUtil.converInt(minHeightStr, -1);
    }
    if (this.minWidthVal == null) {
      const minWidthStr: string = (this.currConfig.minWidth || '').toString();
      this.minWidthVal = NumberUtil.converInt(minWidthStr, -1);
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
      this.showDelayVal = NumberUtil.converInt(showDelayStr, SHOW_DELAY_FOR_MOUSE);
    }
    if (this.showTouchDelayVal == null) {
      const showTouchDelayStr: string = (this.currConfig.showTouchDelay || '').toString();
      this.showTouchDelayVal = NumberUtil.converInt(showTouchDelayStr, SHOW_DELAY_FOR_TOUCH);
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ** Public methods **

  // ** Private methods **
}

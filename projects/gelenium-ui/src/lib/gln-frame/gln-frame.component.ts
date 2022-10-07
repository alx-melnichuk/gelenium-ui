import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnFrameExterior, GlnFrameExteriorUtil } from './gln-frame-exterior.interface';
import { GlnFrameConfig } from './gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from './gln-frame-size.interface';

export const ATR_FR_HIDE_ANIMATION_INIT = 'hdAnmInit';

export const GLN_FRAME_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_FRAME_CONFIG');

@Component({
  selector: 'gln-frame',
  exportAs: 'glnFrame',
  templateUrl: './gln-frame.component.html',
  styleUrls: ['./gln-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnFrameComponent implements OnChanges, OnInit {
  @Input()
  public config: GlnFrameConfig | null | undefined;
  @Input()
  public cssElementRef: ElementRef<HTMLElement> = this.hostRef;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null | undefined; // GlnFrameSizeType
  @Input()
  public isAttrHideAnimation: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isFilled: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

  @Output()
  readonly changeCssParams: EventEmitter<void> = new EventEmitter();

  public get isOutlinedExterior(): boolean {
    return GlnFrameExterior.outlined === this.exteriorVal;
  }
  public get isUnderlineExterior(): boolean {
    return GlnFrameExterior.underline === this.exteriorVal;
  }
  public get isStandardExterior(): boolean {
    return GlnFrameExterior.standard === this.exteriorVal;
  }
  public get lineHeight(): number {
    return this.lineHeightInn;
  }

  public attrHideAnimation: boolean | null = null; // Binding attribute "isAttrHideAnimation".
  public currConfig: GlnFrameConfig;
  public cssBorderRadius: string | null = null;
  public cssPaddingBottom: number | null = null;
  public cssPaddingLeft: number | null = null;
  public cssPaddingRight: number | null = null;
  public cssPaddingShrink: number | null = null;
  public cssPaddingTop: number | null = null;
  public cssTranslateY: number | null = null;
  public cssTranslateY2: number | null = null;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public exteriorVal: GlnFrameExterior | null = null; // Binding attribute "exterior".
  public error: boolean | null = null; // Binding attribute "isError".
  public filled: boolean | null = null; // Binding attribute "isFilled".
  public frameSizeVal: GlnFrameSize | null = null; // Binding attribute "frameSize".
  public frameSizeValue: number = 0;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public required: boolean | null = null; // Binding attribute "isRequired".

  private lineHeightInn: number = 0;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    let isUpdateCssParams = false;
    if (changes['exterior'] || (changes['config'] && this.exterior == null && this.currConfig.exterior != null)) {
      this.exteriorVal = GlnFrameExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (changes['frameSize'] || (changes['config'] && this.frameSize == null && this.currConfig.frameSize != null)) {
      const frameSizeStr = this.frameSize || this.currConfig.frameSize || null;
      this.frameSizeValue = GlnFrameSizeUtil.getSizeValue(frameSizeStr);
      this.frameSizeVal = GlnFrameSizeUtil.create(frameSizeStr);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.cssElementRef);
    }

    if (changes['isAttrHideAnimation']) {
      this.attrHideAnimation = !!BooleanUtil.init(this.isAttrHideAnimation);
      if (this.attrHideAnimation) {
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_FR_HIDE_ANIMATION_INIT, '');
      } else {
        Promise.resolve().then(() => {
          HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_FR_HIDE_ANIMATION_INIT, null);
        });
      }
    }
    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['isError']) {
      this.error = !!BooleanUtil.init(this.isError);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', this.error);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.error ? '' : null);
    }
    if (changes['isFilled']) {
      this.filled = !!BooleanUtil.init(this.isFilled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.filled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.filled ? '' : null);
    }

    if (changes['isLabelShrink'] || (changes['config'] && this.isLabelShrink == null && this.currConfig.isLabelShrink != null)) {
      this.labelShrink = BooleanUtil.init(this.isLabelShrink) ?? !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.labelShrink, this.renderer, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.noAnimation = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.noAnimation, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.required = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }

    if (changes['label'] || changes['isRequired']) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    let isUpdateCssParams = false;
    if (this.exteriorVal == null) {
      this.exteriorVal = GlnFrameExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (this.frameSizeValue === 0) {
      this.frameSizeValue = GlnFrameSizeUtil.getSizeValue(this.currConfig.frameSize);
      this.frameSizeVal = GlnFrameSizeUtil.create(this.currConfig.frameSize || null);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.cssElementRef);
    }

    if (this.labelShrink == null) {
      this.labelShrink = !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.labelShrink, this.renderer, this.hostRef);
    }
    if (this.noAnimation == null) {
      this.noAnimation = !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.noAnimation, this.renderer, this.hostRef);
    }
    if (this.required == null) {
      this.required = !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }
  }

  // ** Public API **

  // ** Private API **

  private getLineHeight(): number {
    if (this.lineHeightInn === 0) {
      this.lineHeightInn = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height').replace('px', ''));
    }
    return this.lineHeightInn;
  }

  private updateCssParams(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    this.cssBorderRadius = null;
    this.cssPaddingBottom = null;
    this.cssPaddingLeft = null;
    this.cssPaddingRight = null;
    this.cssPaddingShrink = null;
    this.cssPaddingTop = null;
    this.cssTranslateY = null;
    this.cssTranslateY2 = null;

    if (frameSizeValue > 0 && lineHeight > 0) {
      const radius: number = NumberUtil.roundTo100(frameSizeValue / 10);
      const param = frameSizeValue - lineHeight;
      if (exteriorVal === GlnFrameExterior.outlined) {
        this.cssBorderRadius = radius > 0 ? radius + 'px' : null;
        this.cssPaddingBottom = param * 0.5;
        this.cssPaddingLeft = NumberUtil.roundTo100(0.25 * frameSizeValue);
        this.cssPaddingTop = param * 0.5;
        this.cssTranslateY = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
        this.cssTranslateY2 = NumberUtil.roundTo100(param * 0.5);
      } else if (exteriorVal === GlnFrameExterior.underline) {
        this.cssBorderRadius = radius > 0 ? radius + 'px ' + radius + 'px 0px 0px' : null;
        this.cssPaddingBottom = param * 0.25;
        this.cssPaddingLeft = NumberUtil.roundTo100(0.21428 * frameSizeValue);
        this.cssPaddingTop = param * 0.75;
        this.cssTranslateY = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
        this.cssTranslateY2 = NumberUtil.roundTo100(param * 0.5);
      } else if (exteriorVal === GlnFrameExterior.standard) {
        this.cssPaddingBottom = param * 0.25;
        this.cssPaddingLeft = 0;
        this.cssPaddingTop = param * 0.75;
        this.cssTranslateY = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
        this.cssTranslateY2 = NumberUtil.roundTo100(param * 0.75);
      }
      this.cssPaddingRight = this.cssPaddingLeft;
      this.cssPaddingShrink = this.cssPaddingLeft != null ? NumberUtil.roundTo100(2 * this.cssPaddingLeft * 1.33) : this.cssPaddingShrink;
    }
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-lf', NumberUtil.str(this.cssPaddingLeft)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-rg', NumberUtil.str(this.cssPaddingRight)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--br-rd', this.cssBorderRadius);
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-shr', NumberUtil.str(this.cssPaddingShrink)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-tp', NumberUtil.str(this.cssPaddingTop)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-bt', NumberUtil.str(this.cssPaddingBottom)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--trn-y', NumberUtil.str(this.cssTranslateY)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--glnfrs--trn2-y', NumberUtil.str(this.cssTranslateY2)?.concat('px'));
    this.changeCssParams.emit();
  }

  private settingExterior(exteriorVal: GlnFrameExterior | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    const isOutlined = GlnFrameExteriorUtil.isOutlined(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
    const isUnderline = GlnFrameExteriorUtil.isUnderline(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', isUnderline);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', isUnderline ? '' : null);
    const isStandard = GlnFrameExteriorUtil.isStandard(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', isStandard);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', isStandard ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isStandard || isUnderline);
  }
  private settingLabelShrink(labelShrink: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-shrink', !!labelShrink);
    HtmlElemUtil.setAttr(renderer, elem, 'shr', labelShrink ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noani', noAnimation ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
}

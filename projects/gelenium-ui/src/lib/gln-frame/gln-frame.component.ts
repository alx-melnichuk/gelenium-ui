import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
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
  public isFilled = false;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoLabel: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

  public get isOutlinedExterior(): boolean {
    return GlnFrameExterior.outlined === this.exteriorVal;
  }
  public get isUnderlineExterior(): boolean {
    return GlnFrameExterior.underline === this.exteriorVal;
  }
  public get isStandardExterior(): boolean {
    return GlnFrameExterior.standard === this.exteriorVal;
  }

  public attrHideAnimation: boolean | null = null; // Binding attribute "isAttrHideAnimation".
  public currConfig: GlnFrameConfig;
  public exteriorVal: GlnFrameExterior | null = null;
  public frameSizeVal: GlnFrameSize | null = null;
  public frameSizeValue: number = 0;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".

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
    if (changes['exterior'] || (changes['config'] && this.exteriorVal == null && this.currConfig.exterior != null)) {
      const configExterior: GlnFrameExterior | null = GlnFrameExteriorUtil.convert(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(GlnFrameExteriorUtil.create(configExterior));
      isUpdateCssParams = true;
    }
    if (changes['frameSize'] || (changes['config'] && this.frameSizeValue === 0 && this.currConfig.frameSize != null)) {
      const frameSize: string | null = this.frameSize || this.currConfig.frameSize || null;
      this.frameSizeValue = this.setFrameSize(frameSize);
      this.frameSizeVal = GlnFrameSizeUtil.convert(frameSize);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.hostRef);
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
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!this.isDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes['isError']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', !!this.isError);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes['isFilled']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }

    if (changes['isLabelShrink'] || (changes['config'] && this.labelShrink == null && this.currConfig.isLabelShrink != null)) {
      this.settingLabelShrink(BooleanUtil.init(this.isLabelShrink) ?? (this.currConfig.isLabelShrink || null));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.noAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.settingNoAnimation(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
    }
    if (changes['isNoLabel'] || (changes['config'] && this.noLabel == null && this.currConfig.isNoLabel != null)) {
      this.settingNoLabel(BooleanUtil.init(this.isNoLabel) ?? (this.currConfig.isNoLabel || null));
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
      const configExterior: GlnFrameExterior | null = GlnFrameExteriorUtil.convert(this.currConfig.exterior || null);
      this.settingExterior(GlnFrameExteriorUtil.create(configExterior));
      isUpdateCssParams = true;
    }
    if (this.frameSizeValue === 0) {
      this.frameSizeValue = this.setFrameSize(this.currConfig.frameSize);
      this.frameSizeVal = GlnFrameSizeUtil.convert(this.currConfig.frameSize || null);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.hostRef);
    }

    if (this.labelShrink == null && this.currConfig.isLabelShrink != null) {
      this.settingLabelShrink(this.currConfig.isLabelShrink);
    }
    if (this.noAnimation == null && this.currConfig.isNoAnimation != null) {
      this.settingNoAnimation(this.currConfig.isNoAnimation);
    }
    if (this.noLabel == null && this.currConfig.isNoLabel != null) {
      this.settingNoLabel(this.currConfig.isNoLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private getLineHeight(): number {
    if (this.lineHeightInn === 0) {
      const lineHeight: number = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height').replace('px', ''));
      this.lineHeightInn = NumberUtil.roundTo100(lineHeight);
    }
    return this.lineHeightInn;
  }

  private setFrameSize(frameSize: string | null | undefined): number {
    let result: number = 0;
    const numberFromFrameSize = frameSize ? Number(frameSize) : 0;
    if (!isNaN(numberFromFrameSize) && numberFromFrameSize > 0) {
      result = numberFromFrameSize;
    } else {
      const frameSizeVal = GlnFrameSizeUtil.create(GlnFrameSizeUtil.convert(frameSize || null));
      result = GlnFrameSizeUtil.getValue(frameSizeVal) || 0;
    }
    return result;
  }

  private updateCssParams(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number, host: ElementRef<HTMLElement>): void {
    let borderRadius: string | null = null;
    let bottom: number | null = null;
    let left: number | null = null;
    let pdShr: number | null = null;
    let top: number | null = null;
    let translateY: number | null = null;
    let translateY2: number | null = null;
    const radius: number = frameSizeValue > 0 ? NumberUtil.roundTo100(frameSizeValue / 10) : 0;
    if (frameSizeValue > 0 && lineHeight > 0) {
      const param = frameSizeValue - lineHeight;
      if (exteriorVal === GlnFrameExterior.outlined) {
        borderRadius = radius > 0 ? radius + 'px' : null;
        bottom = param * 0.5;
        left = NumberUtil.roundTo100(0.25 * frameSizeValue);
        top = param * 0.5;
        translateY = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
        translateY2 = NumberUtil.roundTo100(param * 0.5);
      } else if (exteriorVal === GlnFrameExterior.underline) {
        borderRadius = radius > 0 ? radius + 'px ' + radius + 'px 0px 0px' : null;
        bottom = param * 0.25;
        left = NumberUtil.roundTo100(0.21428 * frameSizeValue);
        top = param * 0.75;
        translateY = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
        translateY2 = NumberUtil.roundTo100(param * 0.5);
      } else if (exteriorVal === GlnFrameExterior.standard) {
        bottom = param * 0.25;
        left = 0;
        top = param * 0.75;
        translateY = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
        translateY2 = NumberUtil.roundTo100(param * 0.75);
      }
      pdShr = left != null ? NumberUtil.roundTo100(2 * left * 1.33) : pdShr;
    }
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-lf', NumberUtil.str(left)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-rg', NumberUtil.str(left)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--br-rd', borderRadius);
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-shr', NumberUtil.str(pdShr)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-tp', NumberUtil.str(top)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-bt', NumberUtil.str(bottom)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--trn-y', NumberUtil.str(translateY)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--trn2-y', NumberUtil.str(translateY2)?.concat('px'));
  }

  private settingExterior(exteriorVal: GlnFrameExterior | null): void {
    this.exteriorVal = exteriorVal;
    const isOutlined = GlnFrameExteriorUtil.isOutlined(exteriorVal);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-outlined', isOutlined);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-o', isOutlined ? '' : null);
    const isUnderline = GlnFrameExteriorUtil.isUnderline(exteriorVal);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-underline', isUnderline);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-u', isUnderline ? '' : null);
    const isStandard = GlnFrameExteriorUtil.isStandard(exteriorVal);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-standard', isStandard);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-s', isStandard ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-bottom-frame', isStandard || isUnderline);
  }
  private settingLabelShrink(labelShrink: boolean | null): void {
    this.labelShrink = labelShrink;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-shrink', !!labelShrink);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shr', labelShrink ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null): void {
    this.noAnimation = noAnimation;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', noAnimation ? '' : null);
  }
  private settingNoLabel(noLabel: boolean | null): void {
    this.noLabel = noLabel;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-no-label', !!noLabel);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'nolab', noLabel ? '' : null);
  }
}

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
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".

  private exteriorVal: GlnFrameExterior | null = null;
  private frameSizeValue: number = 0;
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

    let isUpdateCssProperties = false;
    if (changes['exterior'] || (changes['config'] && this.exteriorVal == null && this.currConfig.exterior != null)) {
      const configExterior: GlnFrameExterior | null = this.currConfig.exterior || null;
      this.settingExterior(GlnFrameExteriorUtil.convert(this.exterior || null) ?? GlnFrameExteriorUtil.create(configExterior));
      isUpdateCssProperties = true;
    }
    if (changes['frameSize'] || (changes['config'] && this.frameSizeValue === 0 && this.currConfig.frameSize != null)) {
      this.frameSizeValue = this.setFrameSize(this.frameSize, this.currConfig.frameSize);
      isUpdateCssProperties = true;
    }
    if (isUpdateCssProperties && this.exteriorVal) {
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
      this.settingExterior(GlnFrameExteriorUtil.create(this.currConfig.exterior || null));
      isUpdateCssParams = true;
    }
    if (this.frameSizeValue === 0) {
      this.frameSizeValue = this.setFrameSize(null, this.currConfig.frameSize);
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

  private setFrameSize(frameSize: string | null | undefined, configFrameSize: GlnFrameSize | undefined): number {
    let result: number = 0;
    const numberFromFrameSize = frameSize ? Number(frameSize) : 0;
    if (!isNaN(numberFromFrameSize) && numberFromFrameSize > 0) {
      result = numberFromFrameSize;
    } else {
      const frameSizeVal = GlnFrameSizeUtil.convert(frameSize || null) ?? (configFrameSize || null);
      const frameSizeVal2 = GlnFrameSizeUtil.create(frameSizeVal);
      result = GlnFrameSizeUtil.getValue(frameSizeVal2) || 0;
    }
    return result;
  }

  private updateCssParams(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number, host: ElementRef<HTMLElement>): void {
    const borderRadius: string | null = this.getBorderRadius(exteriorVal, frameSizeValue);
    HtmlElemUtil.setProperty(host, '--glnfrs--br-rd', borderRadius);
    // const paddingHor: GlnFrameSizePaddingHorRes | null = this.modifyHorizontalPadding();
    const paddingHor: number = this.getPaddingHor(exteriorVal, frameSizeValue);
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-lf', NumberUtil.str(paddingHor)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-rg', NumberUtil.str(paddingHor)?.concat('px'));
    const pdLfRgShr = NumberUtil.roundTo100(2 * paddingHor * 1.33);
    HtmlElemUtil.setProperty(host, '--glnfre--pd-shr', NumberUtil.str(pdLfRgShr)?.concat('px'));
    // const paddingVer: GlnFrameSizePaddingVerRes | null = this.modifyverticalPadding();
    const { top, bottom } = this.getPaddingVer(exteriorVal, frameSizeValue, lineHeight);
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-tp', NumberUtil.str(top)?.concat('px'));
    HtmlElemUtil.setProperty(host, '--glnfrs--pd-bt', NumberUtil.str(bottom)?.concat('px'));

    const translateY: number | null = this.translateY(exteriorVal, frameSizeValue, lineHeight);
    HtmlElemUtil.setProperty(host, '--glnfre--trn-y', NumberUtil.str(translateY)?.concat('px'));

    const translateY2 = this.translate2Y(exteriorVal, frameSizeValue, lineHeight);
    HtmlElemUtil.setProperty(host, '--glnfre--trn2-y', NumberUtil.str(translateY2)?.concat('px'));
  }
  private getBorderRadius(exteriorVal: GlnFrameExterior, frameSizeValue: number): string | null {
    let result: string | null = null;
    if (frameSizeValue > 0) {
      const isOutlined = GlnFrameExteriorUtil.isOutlined(exteriorVal);
      const isUnderline = GlnFrameExteriorUtil.isUnderline(exteriorVal);
      const radius = isOutlined || isUnderline ? NumberUtil.roundTo100(frameSizeValue / 10) + 'px' : null;
      if (isOutlined) {
        result = radius;
      } else if (isUnderline) {
        result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
      }
    }
    return result;
  }
  private getPaddingHor(exteriorVal: GlnFrameExterior, frameSizeValue: number): number {
    let result: number = 0;
    if (exteriorVal === GlnFrameExterior.outlined) {
      result = NumberUtil.roundTo100(0.25 * frameSizeValue);
    } else if (exteriorVal === GlnFrameExterior.underline) {
      result = NumberUtil.roundTo100(0.21428 * frameSizeValue);
    }
    return result;
  }
  public getPaddingVer(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number): { top: number; bottom: number } {
    let top: number = 0;
    let bottom: number = 0;
    if (frameSizeValue > 0 && lineHeight > 0) {
      const param = frameSizeValue - lineHeight;
      if (exteriorVal === GlnFrameExterior.outlined) {
        const value = param / 2;
        top = value;
        bottom = value;
      } else if (exteriorVal === GlnFrameExterior.underline || exteriorVal === GlnFrameExterior.standard) {
        top = param * 0.75;
        bottom = param * 0.25;
      }
    }
    return { top, bottom };
  }
  // Determines the y transform value at the shrink position (top).
  public translateY(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (frameSizeValue > 0 && lineHeight > 0) {
      result = NumberUtil.roundTo100(lineHeight * 0.25);
      if (exteriorVal === GlnFrameExterior.standard) {
        result = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
      } else if (exteriorVal === GlnFrameExterior.outlined) {
        result = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
      } else if (exteriorVal === GlnFrameExterior.underline) {
        result = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public translate2Y(exteriorVal: GlnFrameExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exteriorVal != null && frameSizeValue > 0 && lineHeight != null) {
      result = NumberUtil.roundTo100((frameSizeValue - lineHeight) * (GlnFrameExterior.standard === exteriorVal ? 0.75 : 0.5));
    }
    return result;
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

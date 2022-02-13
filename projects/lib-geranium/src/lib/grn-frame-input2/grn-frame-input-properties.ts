import { ElementRef } from '@angular/core';

import { GrnSizePaddingHorRes, GrnSizePaddingVerRes } from '../directives/grn-size/grn-size.directive';
import { InputExterior } from '../interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { InputLabelUtil, TranslateVerRes } from '../utils/input-label.util';
import { NumberUtil } from '../utils/number.util';

export class GrnFrameInputProperties {
  public labelPaddingHor = 0;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  // ** Public API **

  // ** Methods for interacting with GrnSizeDirective. **

  public valueSizeBorderRadius(frameSizeValue: number, exterior: InputExterior | undefined): string {
    let result = '';
    if (exterior && frameSizeValue > 0) {
      const radius = '' + Math.round(100 * (frameSizeValue / 10)) / 100 + 'px';
      if (exterior === InputExterior.outlined) {
        result = radius;
      } else if (exterior === InputExterior.underline) {
        result = radius + ' ' + radius + ' 0px 0px';
      }
    }
    console.log(`valueSizeBorderRadius(frameSizeValue:${frameSizeValue})=${result}`);
    return result;
  }

  public valueSizePaddingHor(
    frameSizeValue: number,
    exterior: InputExterior | undefined,
    configLabelPd: number | undefined
  ): GrnSizePaddingHorRes {
    let result = configLabelPd || 0;
    if (frameSizeValue > 0 && result <= 0 && exterior) {
      result = InputLabelUtil.paddingLfRg(exterior, frameSizeValue, configLabelPd) || 0;
    }
    console.log(`valueSizePaddingHor(frameSizeValue:${frameSizeValue})=${result} conf.labelPd=${configLabelPd}`);
    this.labelPaddingHor = result;
    return { left: result, right: result };
  }

  public valueSizePaddingVer(frameSizeValue: number, lineHeight: number, exterior: InputExterior | undefined): GrnSizePaddingVerRes {
    let labelPaddingTop = 0;
    let labelPaddingBottom = 0;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      const res = InputLabelUtil.paddingVer(exterior, frameSizeValue, lineHeight);
      labelPaddingTop = res.labelPaddingTop || 0;
      labelPaddingBottom = res.labelPaddingBottom || 0;
    }
    console.log(`valueSizePaddingVer(frameSizeValue:${frameSizeValue})={${labelPaddingTop},${labelPaddingBottom}}lineHeight=${lineHeight}`);
    return { top: labelPaddingTop, bottom: labelPaddingBottom };
  }

  public valueSizeAfterChanges(
    frameSizeValue: number,
    lineHeight: number,
    exterior: InputExterior | undefined,
    ornamentLfWidth: number | undefined,
    ornamentRgWidth: number | undefined
  ): void {
    console.log(`valueSizeAfterChanges()`);
    // Determine new parameter values that depend on: labelPadding.
    this.settingLabelMaxWidth(this.hostRef, this.getLabelMaxWidth(this.labelPaddingHor));
    // Determine new parameter values that depend on: labelPadding, ornamentLfWidth, ornamentRgWidth.
    this.settingLabel2MaxWidth(this.hostRef, this.getLabel2MaxWidth(this.labelPaddingHor, ornamentLfWidth, ornamentRgWidth));
    // Determine new parameter values that depend on: frameSizeValue, lineHeight.
    this.settingLabelTranslateVer(this.hostRef, InputLabelUtil.translateVer(exterior || null, frameSizeValue, lineHeight));
  }
  // ** - **

  // ** Private API **

  // Max width of the label in a shrink position (in the top).
  protected getLabelMaxWidth(labelPadding: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      result = labelPadding === 0 ? '133%' : 'calc(133% - ' + Math.round(100 * 2.66 * labelPadding) / 100 + 'px)';
    }
    return result;
  }

  // Max width of the label in the unshrink position (in the middle).
  protected getLabel2MaxWidth(
    labelPadding: number | null,
    ornamentLfWidth: number | undefined,
    ornamentRgWidth: number | undefined
  ): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      const valueLfWidth = ornamentLfWidth != null ? ornamentLfWidth : labelPadding;
      const valueRgWidth = ornamentRgWidth != null ? ornamentRgWidth : labelPadding;
      const value = valueLfWidth + valueRgWidth;
      result = value === 0 ? '100%' : 'calc(100% - ' + Math.round(100 * value) / 100 + 'px)';
    }
    return result;
  }

  protected settingLabelTranslateVer(el: ElementRef<HTMLElement> | undefined, translateVertical: TranslateVerRes): void {
    HtmlElemUtil.setProperty(el, '--lbl-trn-y', NumberUtil.str(translateVertical.labelTranslateY)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl2-trn-y', NumberUtil.str(translateVertical.label2TranslateY)?.concat('px'));
  }

  protected settingLabelMaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-wd', maxWidth);
  }

  protected settingLabel2MaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth2: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl2-wd', maxWidth2);
  }

  protected settingOrnamentLf(elem: ElementRef<HTMLElement> | undefined, ornamentLfWidth: number | null): void {
    HtmlElemUtil.setProperty(elem, '--orn-lf', NumberUtil.str(ornamentLfWidth)?.concat('px'));
  }
}

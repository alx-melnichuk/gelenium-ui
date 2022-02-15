import { ElementRef } from '@angular/core';
import { GrnSizePaddingHorRes, GrnSizePaddingVerRes } from '../directives/grn-size/grn-size.directive';
import { InputExterior } from '../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { InputLabelUtil } from '../_utils/input-label.util';
import { NumberUtil } from '../_utils/number.util';

export class GrnFrameProperties {
  constructor(public hostRef: ElementRef<HTMLElement>) {}

  // ** Public API **

  // ** Methods for interacting with GrnSizeDirective. **

  public valueSizeBorderRadius(frameSizeValue: number, lineHeight: number, exterior: InputExterior | null): string {
    let result = '';
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      const radius = '' + Math.round(100 * (frameSizeValue / 10)) / 100 + 'px';
      if (exterior === InputExterior.outlined) {
        result = radius;
      } else if (exterior === InputExterior.underline) {
        result = radius + ' ' + radius + ' 0px 0px';
      }
    }
    return result;
  }

  // Defines the parameter values: '--s-lbl-pd-lf', '--s-lbl-pd-rg'.
  public valueSizePaddingHor(
    frameSizeValue: number,
    lineHeight: number,
    exterior: InputExterior | null,
    configLabelPd: number | null,
    ornamentLfWidth: number,
    ornamentRgWidth: number
  ): GrnSizePaddingHorRes {
    let left = 0;
    let right = 0;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      left = right = InputLabelUtil.paddingLfRg(exterior, frameSizeValue, configLabelPd) || 0;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-wd', this.getLabelMaxWidth(left, right));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-wd', this.getLabel2MaxWidth(left, right, ornamentLfWidth, ornamentRgWidth));
    HtmlElemUtil.setProperty(this.hostRef, '--he-pd-lf', NumberUtil.str(left || null)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--orn-lbl-pd-lf', NumberUtil.str(ornamentLfWidth || null)?.concat('px'));
    return { left, right };
  }

  // Defines the parameter values: '--s-lbl-pd-tp', '--s-lbl-pd-bt'.
  public valueSizePaddingVer(frameSizeValue: number, lineHeight: number, exterior: InputExterior | null): GrnSizePaddingVerRes {
    let top = 0;
    let bottom = 0;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      const res = InputLabelUtil.paddingVer(exterior, frameSizeValue, lineHeight);
      top = res.paddingTop || 0;
      bottom = res.paddingBottom || 0;
    }
    const translateVer = InputLabelUtil.translateVer(exterior, frameSizeValue, lineHeight);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-trn-y', NumberUtil.str(translateVer.translateY)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-trn-y', NumberUtil.str(translateVer.translateY2)?.concat('px'));
    return { top, bottom };
  }

  // ** - **

  // ** Private API **

  // Max width of the label in a shrink position (in the top).
  protected getLabelMaxWidth(paddingLeft: number, paddingRight: number): string | null {
    const paddingLfRt = (paddingLeft > -1 ? paddingLeft : 0) + (paddingRight > -1 ? paddingRight : 0);
    return paddingLfRt === 0 ? '133%' : 'calc(133% - ' + Math.round(100 * 1.66 * paddingLfRt) / 100 + 'px)';
  }

  // Max width of the label in the unshrink position (in the middle).
  protected getLabel2MaxWidth(paddingLeft: number, paddingRight: number, ornamentLfWidth: number, ornamentRgWidth: number): string | null {
    let result: string | null = null;
    if (paddingLeft > -1 && paddingRight > -1) {
      const valueLfWidth = ornamentLfWidth > 0 ? ornamentLfWidth : paddingLeft;
      const valueRgWidth = ornamentRgWidth > 0 ? ornamentRgWidth : paddingRight;
      const value = valueLfWidth + valueRgWidth;
      result = value === 0 ? '100%' : 'calc(100% - ' + Math.round(100 * value) / 100 + 'px)';
    }
    return result;
  }
}

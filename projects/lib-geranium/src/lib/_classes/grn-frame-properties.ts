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
      const radius = '' + Math.round((frameSizeValue / 10) * 100) / 100 + 'px';
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
    configLabelPd: number | null
  ): GrnSizePaddingHorRes {
    let left = 0;
    let right = 0;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      left = right = InputLabelUtil.paddingLfRg(exterior, frameSizeValue, configLabelPd) || 0;
    }
    const pdLfRgWd = Math.round(1.66 * (left + right) * 100) / 100;
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-wd', NumberUtil.str(pdLfRgWd)?.concat('px'));

    HtmlElemUtil.setProperty(this.hostRef, '--he-pd-lf', NumberUtil.str(left || null)?.concat('px'));
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
}

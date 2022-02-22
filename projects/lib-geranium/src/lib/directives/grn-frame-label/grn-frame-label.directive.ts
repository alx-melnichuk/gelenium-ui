import { Directive, ElementRef, Input } from '@angular/core';

import { GrnFrameSizePaddingVerHorRes } from '../../_interfaces/grn-frame-size-prepare-data.interface';
import { InputExterior, InputExteriorUtil } from '../../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[grnFrameLabel]',
  exportAs: 'grnFrameLabel',
})
export class GrnFrameLabelDirective {
  @Input()
  public grnFrameLabelElementRef: ElementRef<HTMLElement> | null = null;

  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(private hostRef: ElementRef<HTMLElement>) {}

  // ** Public API **

  public updateByPaddingVerHor(paddingVerHor: GrnFrameSizePaddingVerHorRes): void {
    const elementRef = this.grnFrameLabelElementRef || this.hostRef;
    // paddingHor
    const left = paddingVerHor.left;
    const right = paddingVerHor.right;

    const pdLfRgWd = Math.round(1.66 * (left + right) * 100) / 100;
    HtmlElemUtil.setProperty(elementRef, '--lbl-wd', NumberUtil.str(pdLfRgWd)?.concat('px') || null);
    HtmlElemUtil.setProperty(elementRef, '--he-pd-lf', NumberUtil.str(left)?.concat('px') || null);

    // paddingVer
    const exterior = InputExteriorUtil.convert(paddingVerHor.exterior);
    const translateY = this.translateY(exterior, paddingVerHor.frameSizeValue, paddingVerHor.lineHeight);
    const translateY2 = this.translate2Y(exterior, paddingVerHor.frameSizeValue, paddingVerHor.lineHeight);

    HtmlElemUtil.setProperty(elementRef, '--lbl-trn-y', NumberUtil.str(translateY)?.concat('px') || null);
    HtmlElemUtil.setProperty(elementRef, '--lbl2-trn-y', NumberUtil.str(translateY2)?.concat('px') || null);
  }

  // ** Private API **

  // Determines the y transform value at the shrink position (top).
  public translateY(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round(lineHeight * 0.25 * 100) / 100;
      if (exterior === InputExterior.standard) {
        result = Math.round((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4 * 100) / 100;
      } else if (exterior === InputExterior.outlined) {
        result = Math.round(((-0.75 * lineHeight) / 2) * 100) / 100;
      } else if (exterior === InputExterior.underline) {
        result = Math.round((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45 * 100) / 100;
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public translate2Y(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round((frameSizeValue - lineHeight) * (InputExterior.standard === exterior ? 0.75 : 0.5) * 100) / 100;
    }
    return result;
  }
}

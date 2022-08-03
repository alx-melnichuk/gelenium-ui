import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import {
  GlnFrameSizePaddingHorRes,
  GlnFrameSizePaddingVerRes,
  GlnFrameSizePrepare,
} from '../gln-frame-size/gln-frame-size-prepare.interface';
import { GlnFrameExterior, GlnFrameExteriorUtil } from '../../gln-frame/gln-frame-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[glnFrameExteriorInput]',
  exportAs: 'glnFrameExteriorInput',
})
export class GlnFrameExteriorInputDirective implements OnChanges, GlnFrameSizePrepare {
  @Input()
  public glnFrameExteriorInput: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public glnFrameExteriorInputElementRef: ElementRef<HTMLElement> | null | undefined;

  @Output()
  readonly glnFrameExteriorInputChange: EventEmitter<void> = new EventEmitter();

  public exterior: GlnFrameExterior = GlnFrameExteriorUtil.create(null);
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.glnFrameExteriorInputElementRef) {
      this.elementRef = this.glnFrameExteriorInputElementRef || this.hostRef;
    }
    if (changes.glnFrameExteriorInput) {
      const exteriorInp = GlnFrameExteriorUtil.convert(this.glnFrameExteriorInput || null);
      const exterior = GlnFrameExteriorUtil.create(exteriorInp);
      this.exterior = exterior;
      this.glnFrameExteriorInputChange.emit();
    }
  }

  // ** Implementation of the GlnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.exterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    let result: string | null = null;
    const radius =
      frameSizeValue > 0 && (this.exterior === GlnFrameExterior.outlined || this.exterior === GlnFrameExterior.underline)
        ? NumberUtil.roundTo100(frameSizeValue / 10) + 'px'
        : null;
    if (this.exterior === GlnFrameExterior.outlined) {
      result = radius;
    } else if (this.exterior === GlnFrameExterior.underline) {
      result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
    } else if (this.exterior === GlnFrameExterior.standard) {
      result = null;
    }
    return result;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingHorRes | null => {
    let value: number | null = null;
    if (this.exterior === GlnFrameExterior.outlined) {
      value = NumberUtil.roundTo100(0.25 * frameSizeValue);
    } else if (this.exterior === GlnFrameExterior.underline) {
      value = NumberUtil.roundTo100(0.21428 * frameSizeValue);
    } else if (this.exterior === GlnFrameExterior.standard) {
      value = 0;
    }
    if (value !== null) {
      // paddingHor
      const pdLfRgShr = NumberUtil.roundTo100(2 * value * 1.33);
      HtmlElemUtil.setProperty(this.elementRef, '--glnfre-pd-shr', NumberUtil.str(pdLfRgShr)?.concat('px'));
    }
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingVerRes | null => {
    let result: GlnFrameSizePaddingVerRes | null = null;
    const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
    if (param != null) {
      if (this.exterior === GlnFrameExterior.outlined) {
        const value = param / 2;
        result = { top: value, bottom: value };
      } else if (this.exterior === GlnFrameExterior.underline || this.exterior === GlnFrameExterior.standard) {
        result = { top: param * 0.75, bottom: param * 0.25 };
      }
    }
    if (result !== null) {
      // paddingVer
      const translateY = this.translateY(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn-y', NumberUtil.str(translateY)?.concat('px'));

      const translateY2 = this.translate2Y(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn2-y', NumberUtil.str(translateY2)?.concat('px'));
    }
    return result;
  };

  // ** Implementation of the GlnSizePrepareData interface. (finish) **

  // ** Private API **

  // Determines the y transform value at the shrink position (top).
  public translateY(exterior: GlnFrameExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = NumberUtil.roundTo100(lineHeight * 0.25);
      if (exterior === GlnFrameExterior.standard) {
        result = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
      } else if (exterior === GlnFrameExterior.outlined) {
        result = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
      } else if (exterior === GlnFrameExterior.underline) {
        result = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public translate2Y(exterior: GlnFrameExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = NumberUtil.roundTo100((frameSizeValue - lineHeight) * (GlnFrameExterior.standard === exterior ? 0.75 : 0.5));
    }
    return result;
  }
}

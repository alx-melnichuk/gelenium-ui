import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import {
  GlnFrameSizePaddingHorRes,
  GlnFrameSizePaddingVerRes,
  GlnFrameSizePrepareData,
} from '../../_interfaces/gln-frame-size-prepare-data.interface';
import { GlnInputExterior, GlnInputExteriorUtil } from '../../_interfaces/gln-input-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[glnFrameExteriorInput]',
  exportAs: 'glnFrameExteriorInput',
})
export class GlnFrameExteriorInputDirective implements OnChanges, GlnFrameSizePrepareData {
  @Input()
  public glnFrameExteriorInput: string | null = null; // InputExteriorType
  @Input()
  public glnFrameExteriorInputElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly glnFrameExteriorInputChange: EventEmitter<void> = new EventEmitter();

  public exterior: GlnInputExterior = GlnInputExteriorUtil.create(null);
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.glnFrameExteriorInputElementRef) {
      this.elementRef = this.glnFrameExteriorInputElementRef || this.hostRef;
    }
    if (changes.glnFrameExteriorInput) {
      const exteriorInp = GlnInputExteriorUtil.convert(this.glnFrameExteriorInput);
      const exterior = GlnInputExteriorUtil.create(exteriorInp);
      this.exterior = exterior;
      this.glnFrameExteriorInputChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.exterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    let result: string | null = null;
    const radius =
      frameSizeValue > 0 && (this.exterior === GlnInputExterior.outlined || this.exterior === GlnInputExterior.underline)
        ? Math.round((frameSizeValue / 10) * 100) / 100 + 'px'
        : null;
    if (this.exterior === GlnInputExterior.outlined) {
      result = radius;
    } else if (this.exterior === GlnInputExterior.underline) {
      result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
    } else if (this.exterior === GlnInputExterior.standard) {
      result = null;
    }
    return result;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingHorRes | null => {
    let value: number | null = null;
    if (this.exterior === GlnInputExterior.outlined) {
      value = Math.round(0.25 * frameSizeValue * 100) / 100;
    } else if (this.exterior === GlnInputExterior.underline) {
      value = Math.round(0.21428 * frameSizeValue * 100) / 100;
    } else if (this.exterior === GlnInputExterior.standard) {
      value = 0;
    }
    if (value !== null) {
      // paddingHor
      const pdLfRgWd = Math.round(1.66 * (2 * value) * 100) / 100;
      HtmlElemUtil.setProperty(this.elementRef, '--glnfe-mx-wd', NumberUtil.str(pdLfRgWd)?.concat('px') || null);
    }
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingVerRes | null => {
    let result: GlnFrameSizePaddingVerRes | null = null;
    const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
    if (param != null) {
      if (this.exterior === GlnInputExterior.outlined) {
        const value = param / 2;
        result = { top: value, bottom: value };
      } else if (this.exterior === GlnInputExterior.underline || this.exterior === GlnInputExterior.standard) {
        result = { top: param * 0.75, bottom: param * 0.25 };
      }
    }
    if (result !== null) {
      // paddingVer
      const translateY = this.translateY(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--glnfe-trn-y', NumberUtil.str(translateY)?.concat('px') || null);

      const translateY2 = this.translate2Y(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--glnfe-trn2-y', NumberUtil.str(translateY2)?.concat('px') || null);
    }
    return result;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **

  // ** Private API **

  // Determines the y transform value at the shrink position (top).
  public translateY(exterior: GlnInputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round(lineHeight * 0.25 * 100) / 100;
      if (exterior === GlnInputExterior.standard) {
        result = Math.round((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4 * 100) / 100;
      } else if (exterior === GlnInputExterior.outlined) {
        result = Math.round(((-0.75 * lineHeight) / 2) * 100) / 100;
      } else if (exterior === GlnInputExterior.underline) {
        result = Math.round((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45 * 100) / 100;
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public translate2Y(exterior: GlnInputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round((frameSizeValue - lineHeight) * (GlnInputExterior.standard === exterior ? 0.75 : 0.5) * 100) / 100;
    }
    return result;
  }
}

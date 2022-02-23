import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import {
  GrnFrameSizePaddingHorRes,
  GrnFrameSizePaddingVerRes,
  GrnFrameSizePrepareData,
} from '../../_interfaces/grn-frame-size-prepare-data.interface';
import { InputExterior, InputExteriorUtil } from '../../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[grnFrameExteriorInput]',
  exportAs: 'grnFrameExteriorInput',
})
export class GrnFrameExteriorInputDirective implements OnChanges, GrnFrameSizePrepareData {
  @Input()
  public grnFrameExteriorInput: string | null = null; // InputExteriorType
  @Input()
  public grnFrameExteriorInputElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly grnFrameExteriorInputChange: EventEmitter<void> = new EventEmitter();

  public exterior: InputExterior = InputExteriorUtil.create(null);
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnFrameExteriorInputElementRef) {
      this.elementRef = this.grnFrameExteriorInputElementRef || this.hostRef;
    }
    // const s1 = `${changes.grnFrameExteriorInput ? 'Change.emit() exterior=' + this.exterior : ''}`;
    // console.log(`ngOnChanges() ${s1}`);
    if (changes.grnFrameExteriorInput) {
      const exteriorInp = InputExteriorUtil.convert(this.grnFrameExteriorInput);
      const exterior = InputExteriorUtil.create(exteriorInp);
      this.exterior = exterior;
      this.grnFrameExteriorInputChange.emit();
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
      frameSizeValue > 0 && (this.exterior === InputExterior.outlined || this.exterior === InputExterior.underline)
        ? Math.round((frameSizeValue / 10) * 100) / 100 + 'px'
        : null;
    if (this.exterior === InputExterior.outlined) {
      result = radius;
    } else if (this.exterior === InputExterior.underline) {
      result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
    } else if (this.exterior === InputExterior.standard) {
      result = null;
    }
    return result;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingHorRes | null => {
    let value: number | null = null;
    if (this.exterior === InputExterior.outlined) {
      value = Math.round(0.25 * frameSizeValue * 100) / 100;
    } else if (this.exterior === InputExterior.underline) {
      value = Math.round(0.21428 * frameSizeValue * 100) / 100;
    } else if (this.exterior === InputExterior.standard) {
      value = 0;
    }
    if (value !== null) {
      // paddingHor
      const pdLfRgWd = Math.round(1.66 * (2 * value) * 100) / 100;
      HtmlElemUtil.setProperty(this.elementRef, '--lbl-wd', NumberUtil.str(pdLfRgWd)?.concat('px') || null);
      HtmlElemUtil.setProperty(this.elementRef, '--he-pd-lf', NumberUtil.str(value)?.concat('px') || null);
    }
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingVerRes | null => {
    let result: GrnFrameSizePaddingVerRes | null = null;
    const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
    if (param != null) {
      if (this.exterior === InputExterior.outlined) {
        const value = param / 2;
        result = { top: value, bottom: value };
      } else if (this.exterior === InputExterior.underline || this.exterior === InputExterior.standard) {
        result = { top: param * 0.75, bottom: param * 0.25 };
      }
    }
    if (result !== null) {
      // paddingVer
      const translateY = this.translateY(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--lbl-trn-y', NumberUtil.str(translateY)?.concat('px') || null);

      const translateY2 = this.translate2Y(this.exterior, frameSizeValue, lineHeight);
      HtmlElemUtil.setProperty(this.elementRef, '--lbl2-trn-y', NumberUtil.str(translateY2)?.concat('px') || null);
    }
    return result;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **

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

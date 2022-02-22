import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import {
  GrnFrameSizePaddingHorRes,
  GrnFrameSizePaddingVerRes,
  GrnFrameSizePrepareData,
} from '../../_interfaces/grn-frame-size-prepare-data.interface';
import { InputExterior, InputExteriorUtil } from '../../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';

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

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnFrameExteriorInputElementRef) {
      this.elementRef = this.grnFrameExteriorInputElementRef || this.hostRef;
    }
    if (changes.grnFrameExteriorInput) {
      const exteriorInp = InputExteriorUtil.convert(this.grnFrameExteriorInput);
      const exterior = InputExteriorUtil.create(exteriorInp);
      this.exterior = exterior;
      this.settingExterior(this.elementRef, exterior);
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
    return result;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement>, exterior: InputExterior): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-outlined', InputExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', InputExteriorUtil.isOutlined(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-underline', InputExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-u', InputExteriorUtil.isUnderline(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-standard', InputExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-s', InputExteriorUtil.isStandard(exterior) ? '' : null);
    const isBorder = InputExteriorUtil.isStandard(exterior) || InputExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-border', isBorder);
    HtmlElemUtil.setAttr(this.renderer, elem, 'frm-br', isBorder ? '' : null);
  }
}

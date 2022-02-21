import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import {
  GrnSizePaddingHorRes,
  GrnSizePaddingVerRes,
  GrnSizePrepareData,
  GRN_SIZE_PREPARE_DATA,
} from '../../_interfaces/grn-size-prepare-data.interface';
import { InputExterior, InputExteriorUtil } from '../../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';

@Directive({
  selector: '[grnInputExterior]',
  exportAs: 'grnInputExterior',
  providers: [{ provide: GRN_SIZE_PREPARE_DATA, useExisting: GrnInputExteriorDirective }],
})
export class GrnInputExteriorDirective implements OnChanges, GrnSizePrepareData {
  @Input()
  public grnInputExterior: string | null = null; // InputExteriorType
  @Input()
  public grnInputElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly grnInputExteriorChange: EventEmitter<void> = new EventEmitter();

  public innExterior: InputExterior = InputExteriorUtil.create(null);
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnInputElementRef) {
      this.elementRef = this.grnInputElementRef || this.hostRef;
    }
    if (changes.grnInputExterior) {
      const exteriorInp = InputExteriorUtil.convert(this.grnInputExterior);
      const exterior = InputExteriorUtil.create(exteriorInp);
      this.innExterior = exterior;
      this.settingExterior(this.elementRef, exterior);
      this.grnInputExteriorChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.innExterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    let result: string | null = null;
    const radius =
      frameSizeValue > 0 && (this.innExterior === InputExterior.outlined || this.innExterior === InputExterior.underline)
        ? Math.round((frameSizeValue / 10) * 100) / 100 + 'px'
        : null;
    if (this.innExterior === InputExterior.outlined) {
      result = radius;
    } else if (this.innExterior === InputExterior.underline) {
      result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
    } else if (this.innExterior === InputExterior.standard) {
      result = null;
    }
    return result;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes | null => {
    const ratio1 = this.innExterior === InputExterior.outlined ? 0.25 : null;
    const ratio2 = this.innExterior === InputExterior.underline ? 0.21428 : null;
    const ratio = ratio1 || ratio2;
    const value = ratio ? Math.round(ratio * frameSizeValue * 100) / 100 : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes | null => {
    let result: GrnSizePaddingVerRes | null = null;
    const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
    if (param != null) {
      if (this.innExterior === InputExterior.outlined) {
        const value = param / 2;
        result = { top: value, bottom: value };
      } else if (this.innExterior === InputExterior.underline || this.innExterior === InputExterior.standard) {
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

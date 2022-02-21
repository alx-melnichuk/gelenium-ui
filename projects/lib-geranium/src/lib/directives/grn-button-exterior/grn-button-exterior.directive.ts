import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import { ButtonExterior, ButtonExteriorUtil } from '../../_interfaces/button-exterior.interface';
import {
  GrnSizePaddingHorRes,
  GrnSizePaddingVerRes,
  GrnSizePrepareData,
  GRN_SIZE_PREPARE_DATA,
} from '../../_interfaces/grn-size-prepare-data.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';

@Directive({
  selector: '[grnButtonExterior]',
  exportAs: 'grnButtonExterior',
  providers: [{ provide: GRN_SIZE_PREPARE_DATA, useExisting: GrnButtonExteriorDirective }],
})
export class GrnButtonExteriorDirective implements OnChanges, GrnSizePrepareData {
  @Input()
  public grnButtonExterior: string | null = null; // ButtonExteriorType
  @Input()
  public grnButtonElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly grnButtonExteriorChange: EventEmitter<void> = new EventEmitter();

  public innExterior: ButtonExterior | null = null;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnButtonElementRef) {
      this.elementRef = this.grnButtonElementRef || this.hostRef;
    }
    if (changes.grnButtonExterior) {
      const exteriorInp = ButtonExteriorUtil.convert(this.grnButtonExterior);
      const exterior = ButtonExteriorUtil.create(exteriorInp);
      if (this.innExterior !== exterior) {
        this.innExterior = exterior;
        this.settingExterior(this.elementRef, exterior);
      }
      this.grnButtonExteriorChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.grnButtonExterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    const borderRadiusRatio = 0.1;
    return (frameSizeValue > 0 ? Math.round(borderRadiusRatio * frameSizeValue * 100) / 100 : 0) + 'px';
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes | null => {
    const ratio = this.innExterior === ButtonExterior.contained ? 0.3636 : this.innExterior === ButtonExterior.outlined ? 0.3409 : 0.2045;
    const value = frameSizeValue > 0 ? Math.round(ratio * frameSizeValue * 100) / 100 : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes | null => {
    const param = frameSizeValue > 0 && lineHeight > 0 ? (frameSizeValue - lineHeight) / 2 : null;
    const value = param === null ? null : this.innExterior === ButtonExterior.outlined ? param - 1 : param;
    return value !== null ? { top: value, bottom: value } : null;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement>, exterior: ButtonExterior): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-text', ButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-t', ButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-contained', ButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-c', ButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-outlined', ButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', ButtonExteriorUtil.isOutlined(exterior) ? '' : null);
  }
}

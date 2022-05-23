import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import { ButtonExterior, ButtonExteriorUtil } from '../../_interfaces/button-exterior.interface';
import {
  GrnFrameSizePaddingHorRes,
  GrnFrameSizePaddingVerRes,
  GrnFrameSizePrepareData,
} from '../../_interfaces/grn-frame-size-prepare-data.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';

@Directive({
  selector: '[grnFrameExteriorButton]',
  exportAs: 'grnFrameExteriorButton',
})
export class GrnFrameExteriorButtonDirective implements OnChanges, GrnFrameSizePrepareData {
  @Input()
  public grnFrameExteriorButton: string | null = null; // ButtonExteriorType
  @Input()
  public grnFrameExteriorButtonElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly grnFrameExteriorButtonChange: EventEmitter<void> = new EventEmitter();

  public exterior: ButtonExterior | null = null;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnFrameExteriorButtonElementRef) {
      this.elementRef = this.grnFrameExteriorButtonElementRef || this.hostRef;
    }
    if (changes.grnFrameExteriorButton) {
      const exteriorInp = ButtonExteriorUtil.convert(this.grnFrameExteriorButton);
      const exterior = ButtonExteriorUtil.create(exteriorInp);
      if (this.exterior !== exterior) {
        this.exterior = exterior;
        this.settingExterior(this.elementRef, exterior);
      }
      this.grnFrameExteriorButtonChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.grnFrameExteriorButton;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    const borderRadiusRatio = 0.1;
    // The radius value must be an integer, otherwise the frame in the "dotted" style is poorly drawn.
    return (frameSizeValue > 0 ? Math.round(Math.round(borderRadiusRatio * frameSizeValue * 100) / 100) : 0) + 'px';
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingHorRes | null => {
    const ratio = this.exterior === ButtonExterior.contained ? 0.3636 : this.exterior === ButtonExterior.outlined ? 0.3409 : 0.2045;
    const value = frameSizeValue > 0 ? Math.round(ratio * frameSizeValue * 100) / 100 : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingVerRes | null => {
    const param = frameSizeValue > 0 && lineHeight > 0 ? (frameSizeValue - lineHeight) / 2 : null;
    const value = param === null ? null : this.exterior === ButtonExterior.outlined ? param - 1 : param;
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

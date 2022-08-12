import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import { GlnButtonExterior, GlnButtonExteriorUtil } from '../../gln-button/gln-button-exterior.interface';
import {
  GlnFrameSizePaddingHorRes,
  GlnFrameSizePaddingVerRes,
  GlnFrameSizePrepare,
} from '../gln-frame-size/gln-frame-size-prepare.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[glnFrameExteriorButton]',
  exportAs: 'glnFrameExteriorButton',
})
export class GlnFrameExteriorButtonDirective implements OnChanges, GlnFrameSizePrepare {
  @Input()
  public glnFrameExteriorButton: string | null | undefined; // GlnButtonExteriorType
  @Input()
  public glnFrameExteriorButtonElementRef: ElementRef<HTMLElement> | null | undefined;

  @Output()
  readonly glnFrameExteriorButtonChange: EventEmitter<void> = new EventEmitter();

  public exterior: GlnButtonExterior | null = null;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['glnFrameExteriorButtonElementRef']) {
      this.elementRef = this.glnFrameExteriorButtonElementRef || this.hostRef;
    }
    if (changes['glnFrameExteriorButton']) {
      const exteriorInp = GlnButtonExteriorUtil.convert(this.glnFrameExteriorButton || null);
      const exterior = GlnButtonExteriorUtil.create(exteriorInp);
      if (this.exterior !== exterior) {
        this.exterior = exterior;
        this.settingExterior(this.renderer, this.elementRef, exterior);
      }
      this.glnFrameExteriorButtonChange.emit();
    }
  }

  // ** Implementation of the GlnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.glnFrameExteriorButton || null;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    const borderRadiusRatio = 0.1;
    return (frameSizeValue > 0 ? NumberUtil.roundTo100(borderRadiusRatio * frameSizeValue) : 0) + 'px';
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingHorRes | null => {
    const ratio = this.exterior === GlnButtonExterior.contained ? 0.3636 : this.exterior === GlnButtonExterior.outlined ? 0.3409 : 0.2045;
    const value = frameSizeValue > 0 ? NumberUtil.roundTo100(ratio * frameSizeValue) : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingVerRes | null => {
    const param = frameSizeValue > 0 && lineHeight > 0 ? (frameSizeValue - lineHeight) / 2 : null;
    const value = param === null ? null : this.exterior === GlnButtonExterior.outlined ? param - 1 : param;
    return value !== null ? { top: value, bottom: value } : null;
  };

  // ** Implementation of the GlnSizePrepareData interface. (finish) **

  // ** Private API **

  private settingExterior(renderer: Renderer2, elem: ElementRef<HTMLElement>, exterior: GlnButtonExterior): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-text', GlnButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-t', GlnButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-contained', GlnButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-c', GlnButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-outlined', GlnButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', GlnButtonExteriorUtil.isOutlined(exterior) ? '' : null);
  }
}

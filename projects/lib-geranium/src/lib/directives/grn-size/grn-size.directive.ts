import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { FrameSize, FrameSizeUtil } from '../../_interfaces/frame-size.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

export type GrnSizeBorderRadius = (frameSizeValue: number, lineHeight: number) => string;

export type GrnSizePaddingHorRes = { left: number; right: number };

export type GrnSizePaddingHor = (frameSizeValue: number, lineHeight: number) => GrnSizePaddingHorRes;

export type GrnSizePaddingVerRes = { top: number; bottom: number };

export type GrnSizePaddingVer = (frameSizeValue: number, lineHeight: number) => GrnSizePaddingVerRes;

@Directive({
  selector: '[grnSize]',
  exportAs: 'grnSize',
})
export class GrnSizeDirective implements OnChanges {
  @Input()
  public grnSize: FrameSize | undefined;
  @Input()
  public grnSizeValue: number | undefined;
  @Input()
  public grnSizeModify: string | undefined;
  @Input()
  public grnSizeBorderRadius: GrnSizeBorderRadius | undefined;
  @Input()
  public grnSizePaddingHor: GrnSizePaddingHor | undefined;
  @Input()
  public grnSizePaddingVer: GrnSizePaddingVer | undefined;

  public frameSizeValue = 0;
  public lineHeight = 0;

  constructor(private hostRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.lineHeight) {
      this.lineHeight = this.getLineHeight(this.hostRef);
    }
    let isModify = !!changes.grnSizeModify;
    if (changes.grnSize || changes.grnSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      this.frameSizeValue = FrameSizeUtil.getValue(this.grnSize || null) || this.grnSizeValue || 0;
      const isModifySize = this.frameSizeValue !== frameSizeValueOld;
      isModify = !isModify && isModifySize ? isModifySize : isModify;
    }
    if (isModify) {
      this.modifyPaddingHor();
      this.modifyPaddingVer();
    }
  }

  // ** Public API **

  public modifyPaddingHor(): void {
    const borderRadius =
      this.frameSizeValue > 0 && this.lineHeight > 0 && this.grnSizeBorderRadius
        ? this.grnSizeBorderRadius(this.frameSizeValue, this.lineHeight)
        : undefined;
    HtmlElemUtil.setProperty(this.hostRef, '--s-br-rd', borderRadius);

    const paddingHorRes =
      this.frameSizeValue > 0 && this.lineHeight > 0 && this.grnSizePaddingHor
        ? this.grnSizePaddingHor(this.frameSizeValue, this.lineHeight)
        : undefined;
    HtmlElemUtil.setProperty(this.hostRef, '--s-lbl-pd-lf', NumberUtil.str(paddingHorRes?.left)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--s-lbl-pd-rg', NumberUtil.str(paddingHorRes?.right)?.concat('px'));
  }

  public modifyPaddingVer(): void {
    const paddingVerRes =
      this.frameSizeValue > 0 && this.lineHeight > 0 && this.grnSizePaddingVer
        ? this.grnSizePaddingVer(this.frameSizeValue, this.lineHeight)
        : undefined;
    HtmlElemUtil.setProperty(this.hostRef, '--s-lbl-pd-tp', NumberUtil.str(paddingVerRes?.top)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, '--s-lbl-pd-bt', NumberUtil.str(paddingVerRes?.bottom)?.concat('px'));
  }

  // ** Private API **

  private getLineHeight(elem: ElementRef<HTMLElement>): number {
    let result = 0;
    if (elem && elem.nativeElement) {
      // Get the line height from the style set.
      const lineHeightPx = getComputedStyle(elem.nativeElement).getPropertyValue('line-height');
      result = Number(lineHeightPx.replace('px', ''));
    }
    return result;
  }
}

import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FrameSizeUtil } from '../../_interfaces/frame-size.interface';
import {
  GrnFrameSizePaddingHorRes,
  GrnFrameSizePaddingVerHorRes,
  GrnFrameSizePaddingVerRes,
  GrnFrameSizePrepareData,
} from '../../_interfaces/grn-frame-size-prepare-data.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[grnFrameSize]',
  exportAs: 'grnFrameSize',
})
export class GrnFrameSizeDirective implements OnChanges {
  @Input()
  public grnFrameSize: string | null = null;
  @Input()
  public grnFrameSizeValue: number | null = null;
  @Input()
  public grnFrameSizeLabelPd: number | null = null;
  @Input()
  public grnFrameSizeElementRef: ElementRef<HTMLElement> | null = null;
  @Input()
  public grnFrameSizePrepareData: GrnFrameSizePrepareData | null = null;
  @Input()
  public grnFrameSizeModify: string | null = null;

  @Output()
  readonly grnFrameSizeChange: EventEmitter<GrnFrameSizePaddingVerHorRes> = new EventEmitter();

  public frameSizeValue = 0;
  public lineHeight = 0;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;
  public paddingVerHorRes: GrnFrameSizePaddingVerHorRes | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnButtonElementRef) {
      this.elementRef = this.grnFrameSizeElementRef || this.hostRef;
    }
    if (this.lineHeight === 0) {
      this.lineHeight = this.getLineHeight(this.hostRef);
    }
    let isModify = !!changes.grnFrameSizeLabelPd || !!changes.grnFrameSizeModify;
    if (changes.grnFrameSize || changes.grnFrameSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      const frameSize = FrameSizeUtil.convert(this.grnFrameSize);
      this.frameSizeValue = FrameSizeUtil.getValue(frameSize) || this.grnFrameSizeValue || 0;
      const isModifySize = this.frameSizeValue !== frameSizeValueOld;
      isModify = !isModify && isModifySize ? isModifySize : isModify;
    }
    if (isModify) {
      this.updatePaddingVerAndHor();
    }
  }

  // ** Public API **

  public updatePaddingVerAndHor(): void {
    this.modifyBorderRadius();
    const paddingHor: GrnFrameSizePaddingHorRes | null = this.modifyHorizontalPadding();
    const paddingVer: GrnFrameSizePaddingVerRes | null = this.modifyverticalPadding();
    if (paddingHor !== null && paddingVer !== null) {
      this.paddingVerHorRes = {
        ...paddingHor,
        ...paddingVer,
        ...{
          frameSizeValue: this.frameSizeValue,
          lineHeight: this.lineHeight,
          exterior: this.grnFrameSizePrepareData?.getExterior() || '',
        },
      };
      this.grnFrameSizeChange.emit(this.paddingVerHorRes);
    }
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

  private modifyBorderRadius(): void {
    let borderRadius: string | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      borderRadius = this.grnFrameSizePrepareData?.getBorderRadius(this.frameSizeValue, this.lineHeight) || null;
    }
    HtmlElemUtil.setProperty(this.elementRef, '--br-rd', borderRadius);
  }

  private modifyHorizontalPadding(): GrnFrameSizePaddingHorRes | null {
    let paddingHorRes: GrnFrameSizePaddingHorRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      if (this.grnFrameSizeLabelPd) {
        paddingHorRes = { left: this.grnFrameSizeLabelPd, right: this.grnFrameSizeLabelPd };
      } else {
        paddingHorRes = this.grnFrameSizePrepareData?.getPaddingHor(this.frameSizeValue, this.lineHeight) || null;
      }
    }
    const left = paddingHorRes && paddingHorRes.left !== null ? paddingHorRes.left : null;
    HtmlElemUtil.setProperty(this.elementRef, '--lbl-pd-lf', NumberUtil.str(left)?.concat('px') || null);
    const right = paddingHorRes && paddingHorRes.right !== null ? paddingHorRes.right : null;
    HtmlElemUtil.setProperty(this.elementRef, '--lbl-pd-rg', NumberUtil.str(right)?.concat('px') || null);

    return paddingHorRes;
  }

  private modifyverticalPadding(): GrnFrameSizePaddingVerRes | null {
    let paddingVerRes: GrnFrameSizePaddingVerRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      paddingVerRes = this.grnFrameSizePrepareData?.getPaddingVer(this.frameSizeValue, this.lineHeight) || null;
      const top = paddingVerRes && paddingVerRes.top !== null ? paddingVerRes.top : null;
      HtmlElemUtil.setProperty(this.elementRef, '--lbl-pd-tp', NumberUtil.str(top)?.concat('px') || null);
      const bottom = paddingVerRes && paddingVerRes?.bottom !== null ? paddingVerRes.bottom : null;
      HtmlElemUtil.setProperty(this.elementRef, '--lbl-pd-bt', NumberUtil.str(bottom)?.concat('px') || null);
    }
    return paddingVerRes;
  }
}

import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { GlnFrameSizeUtil } from '../../_interfaces/gln-frame-size.interface';
import {
  GlnFrameSizePaddingHorRes,
  GlnFrameSizePaddingVerHorRes,
  GlnFrameSizePaddingVerRes,
  GlnFrameSizePrepareData,
} from '../../_interfaces/gln-frame-size-prepare-data.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[glnFrameSize]',
  exportAs: 'glnFrameSize',
})
export class GlnFrameSizeDirective implements OnChanges {
  @Input()
  public glnFrameSize: string | null = null;
  @Input()
  public glnFrameSizeValue: number | null = null;
  @Input()
  public glnFrameSizeLabelPd: number | null = null;
  @Input()
  public glnFrameSizeElementRef: ElementRef<HTMLElement> | null = null;
  @Input()
  public glnFrameSizePrepareData: GlnFrameSizePrepareData | null = null;
  @Input()
  public glnFrameSizeModify: string | null = null;

  @Output()
  readonly glnFrameSizeChange: EventEmitter<GlnFrameSizePaddingVerHorRes> = new EventEmitter();

  public frameSizeValue = 0;
  public lineHeight = 0;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;
  public paddingVerHorRes: GlnFrameSizePaddingVerHorRes | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.glnFrameSizeElementRef) {
      this.elementRef = this.glnFrameSizeElementRef || this.hostRef;
    }
    if (this.lineHeight === 0) {
      this.lineHeight = this.getLineHeight(this.hostRef);
    }
    let isModify = !!changes.glnFrameSizeLabelPd || !!changes.glnFrameSizeModify;
    if (changes.glnFrameSize || changes.glnFrameSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      const frameSize = GlnFrameSizeUtil.convert(this.glnFrameSize);
      this.frameSizeValue = GlnFrameSizeUtil.getValue(frameSize) || this.glnFrameSizeValue || 0;
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
    const paddingHor: GlnFrameSizePaddingHorRes | null = this.modifyHorizontalPadding();
    const paddingVer: GlnFrameSizePaddingVerRes | null = this.modifyverticalPadding();
    if (paddingHor !== null && paddingVer !== null) {
      this.paddingVerHorRes = {
        ...paddingHor,
        ...paddingVer,
        ...{
          frameSizeValue: this.frameSizeValue,
          lineHeight: this.lineHeight,
          exterior: this.glnFrameSizePrepareData?.getExterior() || '',
        },
      };
      this.glnFrameSizeChange.emit(this.paddingVerHorRes);
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
      borderRadius = this.glnFrameSizePrepareData?.getBorderRadius(this.frameSizeValue, this.lineHeight) || null;
    }
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-br-rd', borderRadius);
  }

  private modifyHorizontalPadding(): GlnFrameSizePaddingHorRes | null {
    let paddingHorRes: GlnFrameSizePaddingHorRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      if (this.glnFrameSizeLabelPd) {
        paddingHorRes = { left: this.glnFrameSizeLabelPd, right: this.glnFrameSizeLabelPd };
      } else {
        paddingHorRes = this.glnFrameSizePrepareData?.getPaddingHor(this.frameSizeValue, this.lineHeight) || null;
      }
    }
    const left = paddingHorRes && paddingHorRes.left !== null ? paddingHorRes.left : null;
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-lf', NumberUtil.str(left)?.concat('px') || null);
    const right = paddingHorRes && paddingHorRes.right !== null ? paddingHorRes.right : null;
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-rg', NumberUtil.str(right)?.concat('px') || null);

    return paddingHorRes;
  }

  private modifyverticalPadding(): GlnFrameSizePaddingVerRes | null {
    let paddingVerRes: GlnFrameSizePaddingVerRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      paddingVerRes = this.glnFrameSizePrepareData?.getPaddingVer(this.frameSizeValue, this.lineHeight) || null;
      const top = paddingVerRes && paddingVerRes.top !== null ? paddingVerRes.top : null;
      HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-tp', NumberUtil.str(top)?.concat('px') || null);
      const bottom = paddingVerRes && paddingVerRes?.bottom !== null ? paddingVerRes.bottom : null;
      HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-bt', NumberUtil.str(bottom)?.concat('px') || null);
    }
    return paddingVerRes;
  }
}

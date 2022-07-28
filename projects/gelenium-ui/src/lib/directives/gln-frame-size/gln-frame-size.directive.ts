import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { GlnFrameSizeUtil } from '../../gln-frame/gln-frame-size.interface';
import {
  GlnFrameSizePaddingHorRes,
  GlnFrameSizePaddingVerHorRes,
  GlnFrameSizePaddingVerRes,
  GlnFrameSizePrepare,
} from './gln-frame-size-prepare.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[glnFrameSize]',
  exportAs: 'glnFrameSize',
})
export class GlnFrameSizeDirective implements OnChanges {
  @Input()
  public glnFrameSize: string | null | undefined;
  @Input()
  public glnFrameSizeValue: number | null | undefined;
  @Input()
  public glnFrameSizeLabelPd: number | null | undefined;
  @Input()
  public glnFrameSizeElementRef: ElementRef<HTMLElement> | null | undefined;
  @Input()
  public glnFrameSizePrepare: GlnFrameSizePrepare | null | undefined;
  @Input()
  public glnFrameSizeModify: string | null | undefined;

  @Output()
  readonly glnFrameSizeChange: EventEmitter<GlnFrameSizePaddingVerHorRes> = new EventEmitter();

  public frameSizeValue = 0;
  public lineHeight = 0;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;
  public paddingVerHorRes: GlnFrameSizePaddingVerHorRes | null = null;

  private isBeforeInit = true;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isBeforeInit) {
      this.isBeforeInit = false;
    }
    if (changes.glnFrameSizeElementRef) {
      this.elementRef = this.glnFrameSizeElementRef || this.hostRef;
    }
    if (this.lineHeight === 0) {
      this.lineHeight = this.getLineHeight(this.hostRef);
    }
    let isModify = !!changes.glnFrameSizeLabelPd || !!changes.glnFrameSizeModify;
    if (changes.glnFrameSize || changes.glnFrameSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      const frameSize = GlnFrameSizeUtil.convert(this.glnFrameSize || null);
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
    if (this.isBeforeInit) {
      return;
    }
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
          exterior: this.glnFrameSizePrepare?.getExterior() || '',
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
      borderRadius = this.glnFrameSizePrepare?.getBorderRadius(this.frameSizeValue, this.lineHeight) || null;
    }
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-br-rd', borderRadius);
  }

  private modifyHorizontalPadding(): GlnFrameSizePaddingHorRes | null {
    let paddingHorRes: GlnFrameSizePaddingHorRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      if (this.glnFrameSizeLabelPd) {
        paddingHorRes = { left: this.glnFrameSizeLabelPd, right: this.glnFrameSizeLabelPd };
      } else {
        paddingHorRes = this.glnFrameSizePrepare?.getPaddingHor(this.frameSizeValue, this.lineHeight) || null;
      }
    }
    const left = paddingHorRes && paddingHorRes.left !== null ? paddingHorRes.left : null;
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-lf', NumberUtil.str(left)?.concat('px'));
    const right = paddingHorRes && paddingHorRes.right !== null ? paddingHorRes.right : null;
    HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-rg', NumberUtil.str(right)?.concat('px'));

    return paddingHorRes;
  }

  private modifyverticalPadding(): GlnFrameSizePaddingVerRes | null {
    let paddingVerRes: GlnFrameSizePaddingVerRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      paddingVerRes = this.glnFrameSizePrepare?.getPaddingVer(this.frameSizeValue, this.lineHeight) || null;
      const top = paddingVerRes && paddingVerRes.top !== null ? paddingVerRes.top : null;
      HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-tp', NumberUtil.str(top)?.concat('px'));
      const bottom = paddingVerRes && paddingVerRes?.bottom !== null ? paddingVerRes.bottom : null;
      HtmlElemUtil.setProperty(this.elementRef, '--glnfs-pd-bt', NumberUtil.str(bottom)?.concat('px'));
    }
    return paddingVerRes;
  }
}

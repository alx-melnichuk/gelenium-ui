import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, Optional, Output, SimpleChanges } from '@angular/core';

import { FrameSizeUtil } from '../../_interfaces/frame-size.interface';
import {
  GrnSizePaddingHorRes,
  GrnSizePaddingVerHorRes,
  GrnSizePaddingVerRes,
  GrnSizePrepareData,
  GRN_SIZE_PREPARE_DATA,
} from '../../_interfaces/grn-size-prepare-data.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

@Directive({
  selector: '[grnSize]',
  exportAs: 'grnSize',
})
export class GrnSizeDirective implements OnChanges {
  @Input()
  public grnSize: string | null = null;
  @Input()
  public grnSizeValue: number | null = null;
  @Input()
  public grnSizeLabelPd: number | null = null;
  @Input()
  public grnSizeElementRef: ElementRef<HTMLElement> | null = null;

  @Output()
  readonly grnSizeChange: EventEmitter<GrnSizePaddingVerHorRes> = new EventEmitter();

  public frameSizeValue = 0;
  public lineHeight = 0;
  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  constructor(
    @Optional() @Inject(GRN_SIZE_PREPARE_DATA) private grnSizePrepareData: GrnSizePrepareData | null,
    private hostRef: ElementRef<HTMLElement>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnButtonElementRef) {
      this.elementRef = this.grnSizeElementRef || this.hostRef;
    }
    if (this.lineHeight === 0) {
      this.lineHeight = this.getLineHeight(this.hostRef);
    }
    let isModify = !!changes.grnSizeLabelPd;
    if (changes.grnSize || changes.grnSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      const frameSize = FrameSizeUtil.convert(this.grnSize);
      this.frameSizeValue = FrameSizeUtil.getValue(frameSize) || this.grnSizeValue || 0;
      const isModifySize = this.frameSizeValue !== frameSizeValueOld;
      isModify = !isModify && isModifySize ? isModifySize : isModify;
    }
    if (isModify) {
      this.updateProperties();
    }
  }

  // ** Public API **

  public updateProperties(): void {
    this.modifyBorderRadius();
    const paddingHor: GrnSizePaddingHorRes | null = this.modifyHorizontalPadding();
    const paddingVer: GrnSizePaddingVerRes | null = this.modifyverticalPadding();
    if (paddingHor !== null && paddingVer !== null) {
      this.grnSizeChange.emit({
        ...paddingHor,
        ...paddingVer,
        ...{
          frameSizeValue: this.frameSizeValue,
          lineHeight: this.lineHeight,
          exterior: this.grnSizePrepareData?.getExterior() || '',
        },
      });
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
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      const borderRadius = this.grnSizePrepareData ? this.grnSizePrepareData.getBorderRadius(this.frameSizeValue, this.lineHeight) : null;
      HtmlElemUtil.setProperty(this.elementRef, '--s-br-rd', borderRadius);
    }
  }

  private modifyHorizontalPadding(): GrnSizePaddingHorRes | null {
    let paddingHorRes: GrnSizePaddingHorRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      if (this.grnSizeLabelPd) {
        paddingHorRes = { left: this.grnSizeLabelPd, right: this.grnSizeLabelPd };
      } else if (this.grnSizePrepareData) {
        paddingHorRes = this.grnSizePrepareData.getPaddingHor(this.frameSizeValue, this.lineHeight);
      }
      HtmlElemUtil.setProperty(this.elementRef, '--s-lbl-pd-lf', NumberUtil.str(paddingHorRes?.left || null)?.concat('px') || null);
      HtmlElemUtil.setProperty(this.elementRef, '--s-lbl-pd-rg', NumberUtil.str(paddingHorRes?.right || null)?.concat('px') || null);
    }
    return paddingHorRes;
  }

  private modifyverticalPadding(): GrnSizePaddingVerRes | null {
    let paddingVerRes: GrnSizePaddingVerRes | null = null;
    if (this.frameSizeValue > 0 && this.lineHeight > 0) {
      paddingVerRes = this.grnSizePrepareData ? this.grnSizePrepareData.getPaddingVer(this.frameSizeValue, this.lineHeight) : null;
      HtmlElemUtil.setProperty(this.elementRef, '--s-lbl-pd-tp', NumberUtil.str(paddingVerRes?.top || null)?.concat('px') || null);
      HtmlElemUtil.setProperty(this.elementRef, '--s-lbl-pd-bt', NumberUtil.str(paddingVerRes?.bottom || null)?.concat('px') || null);
    }
    return paddingVerRes;
  }
}

import { AfterContentChecked, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { FrameSize, FrameSizeUtil } from '../../interfaces/frame-size.interface';
import { HtmlElemUtil } from '../../utils/html-elem.util';
import { NumberUtil } from '../../utils/number.util';

export type GrnSizeBorderRadius = (frameSizeValue: number) => string;

export type GrnSizePaddingHorRes = { left: number; right: number };

export type GrnSizePaddingHor = (frameSizeValue: number) => GrnSizePaddingHorRes;

export type GrnSizePaddingVerRes = { top: number; bottom: number };

export type GrnSizePaddingVer = (frameSizeValue: number, lineHeight: number) => GrnSizePaddingVerRes;

export type GrnSizeAfterChanges = (frameSizeValue: number, lineHeight: number) => void;

@Directive({
  selector: '[grnSize]',
  exportAs: 'grnSize',
})
export class GrnSizeDirective implements OnChanges, AfterContentChecked {
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
  @Input()
  public grnSizeAfterChanges: GrnSizeAfterChanges | undefined;

  public frameSizeValue = 0;
  public lineHeight: number | null = null;
  public isModify = false;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isModify = !!changes.grnSizeModify;
    if (changes.grnSize || changes.grnSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      this.frameSizeValue = FrameSizeUtil.getValue(this.grnSize || null) || this.grnSizeValue || 0;
      const isModifySize = this.frameSizeValue !== frameSizeValueOld;
      this.isModify = !this.isModify && isModifySize ? isModifySize : this.isModify;
    }
    if (this.isModify) {
      this.modifyProperties();
    }
  }

  ngAfterContentChecked(): void {
    if (this.isModify) {
      this.grnSizeAfterChangesCallBack(this.frameSizeValue, this.lineHeight, this.grnSizeAfterChanges);
    }
  }

  // ** Public API **

  public modifyProperties(): void {
    this.modifyPaddingHor();
    if (!this.lineHeight && this.hostRef && this.hostRef.nativeElement) {
      // Get the line height from the style set.
      const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
      this.lineHeight = Number(lineHeightPx.replace('px', ''));
    }
    if (this.lineHeight) {
      this.modifyPaddingVer();
    }
  }

  public modifyPaddingHor(): void {
    const borderRadius = this.getSizeBorderRadiusCallBack(this.frameSizeValue, this.grnSizeBorderRadius);
    this.settingBorderRadius(this.hostRef, borderRadius);

    const paddingHorRes = this.getSizePaddingHorCallBack(this.frameSizeValue, this.grnSizePaddingHor);
    this.settingLabelPaddingHor(this.hostRef, paddingHorRes);
  }

  public modifyPaddingVer(): void {
    const paddingVerRes = this.getSizePaddingVerCallBack(this.frameSizeValue, this.lineHeight, this.grnSizePaddingVer);
    this.settingLabelPaddingVer(this.hostRef, paddingVerRes);
  }

  // ** Private API **

  private getSizeBorderRadiusCallBack(frameSizeValue: number, grnSizeBorderRadius: GrnSizeBorderRadius | undefined): string | undefined {
    return frameSizeValue > 0 && grnSizeBorderRadius ? grnSizeBorderRadius(frameSizeValue) : undefined;
  }

  private getSizePaddingHorCallBack(
    frameSizeValue: number,
    grnSizePaddingHor: GrnSizePaddingHor | undefined
  ): GrnSizePaddingHorRes | undefined {
    return frameSizeValue > 0 && grnSizePaddingHor ? grnSizePaddingHor(frameSizeValue) : undefined;
  }

  private getSizePaddingVerCallBack(
    frameSizeValue: number,
    lineHeight: number | null,
    grnSizePaddingVer: GrnSizePaddingVer | undefined
  ): GrnSizePaddingVerRes | undefined {
    return frameSizeValue > 0 && lineHeight && grnSizePaddingVer ? grnSizePaddingVer(frameSizeValue, lineHeight) : undefined;
  }

  private grnSizeAfterChangesCallBack(
    frameSizeValue: number,
    lineHeight: number | null,
    grnSizeAfterContentChecked: GrnSizeAfterChanges | undefined
  ): void {
    lineHeight && grnSizeAfterContentChecked ? grnSizeAfterContentChecked(frameSizeValue, lineHeight) : undefined;
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: string | undefined): void {
    HtmlElemUtil.setProperty(elem, '--s-br-rd', borderRadius);
  }

  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, paddingHor: GrnSizePaddingHorRes | undefined): void {
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-lf', NumberUtil.str(paddingHor?.left)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-rg', NumberUtil.str(paddingHor?.right)?.concat('px'));
  }

  private settingLabelPaddingVer(elem: ElementRef<HTMLElement> | undefined, paddingVer: GrnSizePaddingVerRes | undefined): void {
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-tp', NumberUtil.str(paddingVer?.top)?.concat('px'));
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-bt', NumberUtil.str(paddingVer?.bottom)?.concat('px'));
  }
}

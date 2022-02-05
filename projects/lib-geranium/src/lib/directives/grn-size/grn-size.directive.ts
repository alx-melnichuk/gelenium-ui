import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { FrameSize, FrameSizeUtil } from '../../interfaces/frame-size.interface';
import { HtmlElemUtil } from '../../utils/html-elem.util';
import { NumberUtil } from '../../utils/number.util';

export type GrnSizeBorderRadius = (frameSizeValue: number) => number;

export type GrnSizePaddingHorRes = { left: number; right: number };

export type GrnSizePaddingHor = (frameSizeValue: number) => GrnSizePaddingHorRes;

export type GrnSizePaddingVerRes = { top: number; bottom: number };

export type GrnSizePaddingVer = (frameSizeValue: number, lineHeight: number) => GrnSizePaddingVerRes;

@Directive({
  selector: '[grnSize]',
  exportAs: 'grnSize',
})
export class GrnSizeDirective implements OnChanges, AfterContentInit {
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
  public labelPaddingLeft: number | undefined;
  public labelPaddingRight: number | undefined;
  public lineHeight: number | null = null;
  public labelPaddingTop: number | undefined;
  public labelPaddingBottom: number | undefined;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    let isModify = !!changes.grnSizeModify;
    if (changes.grnSizeModify) {
      // console.log('## ngOnChanges(); grnSizeModify="' + this.grnSizeModify + '"');
    }
    if (changes.grnSize || changes.grnSizeValue) {
      const frameSizeValueOld = this.frameSizeValue;
      this.frameSizeValue = FrameSizeUtil.getValue(this.grnSize || null) || this.grnSizeValue || 0;
      const isModifySize = this.frameSizeValue !== frameSizeValueOld;
      isModify = !isModify && isModifySize ? isModifySize : isModify;
      // console.log(`## ngOnChanges(); grnSize=${this.grnSize} grnSizeValue=${this.grnSizeValue}`);
      // console.log(`## ngOnChanges(); isModify=${isModifySize} frameSizeValue=${this.frameSizeValue}`);
    }
    if (isModify) {
      this.modifyProperties();
    }
  }

  ngAfterContentInit(): void {
    // Get the line height from the style set.
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    // console.log('## lineHeightPx=', lineHeightPx);
    this.modifyPaddingVer();
  }

  // ** Public API **

  public modifyProperties(): void {
    this.modifyPaddingHor();
    if (this.lineHeight) {
      this.modifyPaddingVer();
    }
  }

  // ** Private API **

  public modifyPaddingHor(): void {
    const borderRadius = this.getSizeBorderRadiusCallBack(this.frameSizeValue, this.grnSizeBorderRadius);
    this.settingBorderRadius(this.hostRef, borderRadius);

    // GrnSizePaddingHorRes = { left: number; right: number }
    const paddingHorRes = this.getSizePaddingHor(this.frameSizeValue, this.grnSizePaddingHor);
    this.labelPaddingLeft = paddingHorRes?.left;
    this.labelPaddingRight = paddingHorRes?.right;

    // console.log('## grnSizePaddingHor()...labelPaddingHor=', this.labelPaddingHor);
    this.settingLabelPaddingHor(this.hostRef, paddingHorRes);
  }

  public modifyPaddingVer(): void {
    const paddingVerRes = this.getSizePaddingVerCallBack(this.frameSizeValue, this.lineHeight, this.grnSizePaddingVer);
    this.labelPaddingTop = paddingVerRes?.top;
    this.labelPaddingBottom = paddingVerRes?.bottom;
    // console.log('## grnSizePaddingVer()...labelPaddingVer=', this.labelPaddingVer);
    this.settingLabelPaddingVer(this.hostRef, paddingVerRes);
  }

  private getSizeBorderRadiusCallBack(frameSizeValue: number, grnSizeBorderRadius: GrnSizeBorderRadius | undefined): number | undefined {
    let result = undefined;
    if (frameSizeValue > 0 && grnSizeBorderRadius) {
      result = grnSizeBorderRadius(frameSizeValue);
    }
    return result;
  }

  private getSizePaddingHor(frameSizeValue: number, grnSizePaddingHor: GrnSizePaddingHor | undefined): GrnSizePaddingHorRes | undefined {
    let result = undefined;
    if (frameSizeValue > 0 && grnSizePaddingHor) {
      result = grnSizePaddingHor(frameSizeValue);
    }
    return result;
  }

  private getSizePaddingVerCallBack(
    frameSizeValue: number,
    lineHeight: number | null,
    grnSizePaddingVer: GrnSizePaddingVer | undefined
  ): GrnSizePaddingVerRes | undefined {
    let result = undefined;
    if (frameSizeValue > 0 && lineHeight && grnSizePaddingVer) {
      result = grnSizePaddingVer(frameSizeValue, lineHeight);
    }
    return result;
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: number | undefined): void {
    HtmlElemUtil.setProperty(elem, '--s-br-rd', NumberUtil.str(borderRadius)?.concat('px'));
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

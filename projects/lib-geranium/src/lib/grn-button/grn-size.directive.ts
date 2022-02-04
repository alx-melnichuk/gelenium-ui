import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { NumberUtil } from '../utils/number.util';

export type GrnFrameSizeValue = (frameSizeValue: number) => number;

export type GrnFrameSizeValueAndLineHeight = (frameSizeValue: number, lineHeight: number) => number;

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
  public grnSizeBorderRadius: GrnFrameSizeValue | undefined;
  @Input()
  public grnSizePaddingHor: GrnFrameSizeValue | undefined;
  @Input()
  public grnSizePaddingVer: GrnFrameSizeValueAndLineHeight | undefined;

  public frameSizeValue = 0;
  public labelPaddingHor: number | null = null;
  public lineHeight: number | null = null;
  public labelPaddingVer: number | null = null;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges();');
    if (changes.grnSize || changes.grnSizeValue) {
      this.frameSizeValue = this.grnSizeValue || FrameSizeUtil.getValue(this.grnSize || null) || 0;
      console.log(`grnSize=${this.grnSize} frameSizeValue=${this.frameSizeValue}`);
    }

    this.modifyPaddingHor();
    if (this.lineHeight) {
      this.modifyPaddingVer();
    }
  }

  ngAfterContentInit(): void {
    // Get the line height from the style set.
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    // console.log('lineHeightPx=', lineHeightPx);

    this.modifyPaddingVer();
  }

  // ** Public API **

  public modifyProperties(): void {
    this.modifyPaddingHor();
    this.modifyPaddingVer();
  }

  // ** Private API **
  public modifyPaddingHor(): void {
    const borderRadius = this.getFrameSizeValueCallBack(this.frameSizeValue, this.grnSizeBorderRadius);
    // console.log('step02 grnSizeBorderRadius()...borderRadius=', borderRadius);
    this.settingBorderRadius(this.hostRef, borderRadius);

    this.labelPaddingHor = this.getFrameSizeValueCallBack(this.frameSizeValue, this.grnSizePaddingHor);
    console.log('step03 grnSizePaddingHor()...labelPaddingHor=', this.labelPaddingHor);
    this.settingLabelPaddingHor(this.hostRef, this.labelPaddingHor);
  }
  public modifyPaddingVer(): void {
    this.labelPaddingVer = this.getFrameSizeValueAndLineHeightCallBack(this.frameSizeValue, this.lineHeight, this.grnSizePaddingVer);
    console.log('step04 grnSizePaddingVer()...labelPaddingVer=', this.labelPaddingVer);
    this.settingLabelPaddingVer(this.hostRef, this.labelPaddingVer);
  }

  private getFrameSizeValueCallBack(frameSizeValue: number, grnFrameSizeValue: GrnFrameSizeValue | undefined): number | null {
    let result = 0;
    if (frameSizeValue > 0 && grnFrameSizeValue) {
      result = grnFrameSizeValue(frameSizeValue);
    }
    return result > 0 ? result : null;
  }
  private getFrameSizeValueAndLineHeightCallBack(
    frameSizeValue: number,
    lineHeight: number | null,
    grnFrameSizeValueAndLineHeight: GrnFrameSizeValueAndLineHeight | undefined
  ): number | null {
    let result = 0;
    if (frameSizeValue > 0 && lineHeight && grnFrameSizeValueAndLineHeight) {
      result = grnFrameSizeValueAndLineHeight(frameSizeValue, lineHeight);
    }
    return result > 0 ? result : null;
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: number | null): void {
    HtmlElemUtil.setProperty(elem, '--s-br-rd', NumberUtil.str(borderRadius)?.concat('px'));
  }
  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-hor', NumberUtil.str(labelPadding)?.concat('px'));
  }
  private settingLabelPaddingVer(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--s-lbl-pd-ver', NumberUtil.str(labelPadding)?.concat('px'));
  }
}

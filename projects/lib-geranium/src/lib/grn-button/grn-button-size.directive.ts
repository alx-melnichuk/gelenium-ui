import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { ButtonExterior } from '../interfaces/button-exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { NumberUtil } from '../utils/number.util';

@Directive({
  selector: '[grnButtonSize]',
  exportAs: 'grnButtonSize',
})
export class GrnButtonSizeDirective implements OnChanges {
  @Input()
  public grnButtonSize: FrameSize | undefined;
  @Input()
  public grnButtonSizeValue: number | undefined;
  @Input()
  public grnButtonSizeLabelPd: number | undefined;
  @Input()
  public grnButtonSizeExterior: ButtonExterior | undefined;

  public innFrameSize: FrameSize | null = null;
  public innFrameSizeValue = 0;
  public labelPadding: number | null = null;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    console.log('GrnButtonSize();');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges();');
    let isModifyLabelPadding = false;
    if (changes.grnButtonSize) {
      console.log('this.grnButtonSize="' + this.grnButtonSize + '"');
      this.innFrameSize = this.getFrameSize(this.grnButtonSize);
      this.innFrameSizeValue = FrameSizeUtil.getValue(this.innFrameSize) || 0;
      isModifyLabelPadding = true;
    }
    if (changes.grnButtonSizeValue) {
      const frameSize = this.getFrameSize(this.grnButtonSize);
      this.innFrameSizeValue = this.grnButtonSizeValue || FrameSizeUtil.getValue(frameSize) || 0;
      isModifyLabelPadding = true;
    }
    if (changes.grnButtonSizeLabelPd) {
      isModifyLabelPadding = true;
    }
    if (changes.grnButtonSizeExterior) {
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding) {
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innFrameSizeValue));
      this.labelPadding = this.paddingLfRg(this.grnButtonSizeExterior, this.innFrameSizeValue, this.grnButtonSizeLabelPd);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
    }
  }

  // ** Private API **
  private getFrameSize(frameSize: FrameSize | undefined): FrameSize {
    return FrameSizeUtil.create(frameSize || FrameSize.small);
  }

  private getBorderRadius(frameSizeValue: number): string | null {
    let result: string | null = null;
    if (frameSizeValue > 0) {
      result = Math.round(100 * (frameSizeValue / 10)) / 100 + 'px';
    }
    return result;
  }

  // Get left/right padding for the element.
  private paddingLfRg(exterior: ButtonExterior | undefined, frameSizeVal: number, configLabelPd: number | undefined): number | null {
    let result: number | null = configLabelPd || null;
    if (exterior && frameSizeVal > 0 && (!result || result <= 0)) {
      if (exterior === ButtonExterior.contained) {
        result = Math.round(100 * 0.3636 * frameSizeVal) / 100; // 16px
      } else if (exterior === ButtonExterior.outlined) {
        result = Math.round(100 * 0.3409 * frameSizeVal) / 100; // 15px
      } else if (exterior === ButtonExterior.text) {
        result = Math.round(100 * 0.2045 * frameSizeVal) / 100; // 9px
      }
    }
    return result;
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: string | null): void {
    HtmlElemUtil.setProperty(elem, '--fs-br-rd', borderRadius);
  }

  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--fs-lbl-pd-hor', NumberUtil.str(labelPadding)?.concat('px'));
  }
}

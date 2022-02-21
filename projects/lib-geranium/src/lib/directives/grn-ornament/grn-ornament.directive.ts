import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { OrnamAlign, OrnamAlignUtil } from '../../_interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

export const ATTR_ORN_LF = 'orn-lf';
export const ATTR_ORN_RG = 'orn-rg';
export const PROP_ORN_LBL_PD_LF = '--orn-lbl-pd-lf';
export const PROP_ORN_LBL_PD_RG = '--orn-lbl-pd-rg';

@Directive({
  selector: '[grnOrnament]',
})
export class GrnOrnamentDirective implements OnChanges, AfterContentInit {
  @Input()
  public grnOrnamentLfAlign: string | null = null; // OrnamAlign
  @Input()
  public grnOrnamentRgAlign: string | null = null; // OrnamAlign

  private isInit = true;
  private ornamentLf: HTMLElement | null = null;
  private ornamentRg: HTMLElement | null = null;
  private ornamentLfElemRef: ElementRef<HTMLElement> | null = null;
  private ornamentRgElemRef: ElementRef<HTMLElement> | null = null;

  private ornamentLfWidth = 0;
  private ornamentRgWidth = 0;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInit) {
      const hostElement = this.hostRef.nativeElement?.children.item(0) as HTMLElement;
      const hostElementRef = HtmlElemUtil.getElementRef(hostElement);

      this.ornamentLf = HtmlElemUtil.getChildByAttribute(hostElementRef, [ATTR_ORN_LF]) as HTMLElement;
      this.ornamentLfElemRef = HtmlElemUtil.getElementRef(this.ornamentLf);

      this.ornamentRg = HtmlElemUtil.getChildByAttribute(hostElementRef, [ATTR_ORN_RG]) as HTMLElement;
      this.ornamentRgElemRef = HtmlElemUtil.getElementRef(this.ornamentRg);

      this.isInit = false;
    }
    if (changes.grnOrnamentLfAlign && this.ornamentLfElemRef) {
      const ornamLfAlign2 = OrnamAlignUtil.convert(this.grnOrnamentLfAlign || null) || OrnamAlign.default;
      HtmlElemUtil.setAttr(this.renderer, this.ornamentLfElemRef, ATTR_ORN_LF, ornamLfAlign2.toString());
    }
    if (changes.grnOrnamentRgAlign && this.ornamentRgElemRef) {
      const ornamRgAlign2 = OrnamAlignUtil.convert(this.grnOrnamentRgAlign || null) || OrnamAlign.default;
      HtmlElemUtil.setAttr(this.renderer, this.ornamentRgElemRef, ATTR_ORN_RG, ornamRgAlign2.toString());
    }
  }

  ngAfterContentInit(): void {
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
    this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;

    const parentElement = this.hostRef.nativeElement.parentElement;
    const parentElementRef = this.ornamentLfWidth > 0 || this.ornamentRgWidth > 0 ? HtmlElemUtil.getElementRef(parentElement) : null;
    if (this.ornamentLfWidth > 0) {
      HtmlElemUtil.setProperty(parentElementRef, PROP_ORN_LBL_PD_LF, NumberUtil.str(this.ornamentLfWidth)?.concat('px') || null);
    }
    if (this.ornamentRgWidth > 0) {
      HtmlElemUtil.setProperty(parentElementRef, PROP_ORN_LBL_PD_RG, NumberUtil.str(this.ornamentRgWidth)?.concat('px') || null);
    }
  }
}

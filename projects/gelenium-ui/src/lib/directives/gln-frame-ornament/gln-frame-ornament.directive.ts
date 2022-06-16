import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from './gln-frame-ornam-align.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';

export const ATTR_ORN_LF = 'glnf-orn-lf';
export const ATTR_ORN_RG = 'glnf-orn-rg';

@Directive({
  selector: '[glnFrameOrnament]',
  exportAs: 'glnFrameOrnament',
})
export class GlnFrameOrnamentDirective implements OnChanges, AfterContentInit {
  @Input()
  public glnFrameOrnamentLfAlign: string | null = null; // OrnamAlign
  @Input()
  public glnFrameOrnamentRgAlign: string | null = null; // OrnamAlign
  @Input()
  public glnFrameOrnamentElementRef: ElementRef<HTMLElement> | null = null;

  private isInit = true;
  private ornamentLf: HTMLElement | null = null;
  private ornamentRg: HTMLElement | null = null;
  private ornamentLfElemRef: ElementRef<HTMLElement> | null = null;
  private ornamentRgElemRef: ElementRef<HTMLElement> | null = null;
  private ornamentLfWidth = 0;
  private ornamentRgWidth = 0;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

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
    if (changes.glnFrameOrnamentLfAlign && this.ornamentLfElemRef) {
      const ornamLfAlign2 = GlnFrameOrnamAlignUtil.convert(this.glnFrameOrnamentLfAlign || null) || GlnFrameOrnamAlign.default;
      HtmlElemUtil.setAttr(this.renderer, this.ornamentLfElemRef, ATTR_ORN_LF, ornamLfAlign2.toString());
    }
    if (changes.glnFrameOrnamentRgAlign && this.ornamentRgElemRef) {
      const ornamRgAlign2 = GlnFrameOrnamAlignUtil.convert(this.glnFrameOrnamentRgAlign || null) || GlnFrameOrnamAlign.default;
      HtmlElemUtil.setAttr(this.renderer, this.ornamentRgElemRef, ATTR_ORN_RG, ornamRgAlign2.toString());
    }
  }

  ngAfterContentInit(): void {
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
    this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;

    // const parentElementRef = HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement);
    const elementRef: ElementRef<HTMLElement> | null = this.glnFrameOrnamentElementRef || this.hostRef;

    if (this.ornamentLfWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfo-pd-lf', NumberUtil.str(this.ornamentLfWidth)?.concat('px') || null);
    }
    if (this.ornamentRgWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfo-pd-rg', NumberUtil.str(this.ornamentRgWidth)?.concat('px') || null);
    }
  }
}

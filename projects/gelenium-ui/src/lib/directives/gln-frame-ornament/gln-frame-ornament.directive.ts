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
  @Input()
  /** Path to an element that has children with 'glnf-orn-lf' and 'glnf-orn-rg' attributes. */
  // Example: "/div{0}" - the first child tag is "div" with index 0.
  // Example: "/.glnf-border{0}" - first child tag with class "glnf-border" and index 0..
  public glnFrameOrnamentPath: string | null = null;
  @Input()
  public glnFrameOrnamentAfterContent: boolean | null = null;

  private isInit = true;
  private ornamentLf: HTMLElement | null = null;
  private ornamentRg: HTMLElement | null = null;
  private ornamentLfElemRef: ElementRef<HTMLElement> | null = null;
  private ornamentRgElemRef: ElementRef<HTMLElement> | null = null;
  private ornamentLfWidth = 0;
  private ornamentRgWidth = 0;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isInit) {
      if (!this.glnFrameOrnamentAfterContent) {
        this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath);
      }
      this.isInit = false;
    }
    if (changes.glnFrameOrnamentLfAlign && this.ornamentLfElemRef) {
      this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign, this.ornamentLfElemRef);
    }
    if (changes.glnFrameOrnamentRgAlign && this.ornamentRgElemRef) {
      this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign, this.ornamentRgElemRef);
    }
  }

  public ngAfterContentInit(): void {
    if (this.glnFrameOrnamentAfterContent) {
      this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath);

      this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign, this.ornamentLfElemRef);
      this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign, this.ornamentRgElemRef);
    }
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
    this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;

    const elementRef: ElementRef<HTMLElement> | null = this.glnFrameOrnamentElementRef || this.hostRef;
    if (this.ornamentLfWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfo-pd-lf', NumberUtil.str(this.ornamentLfWidth)?.concat('px') || null);
    }
    if (this.ornamentRgWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfo-pd-rg', NumberUtil.str(this.ornamentRgWidth)?.concat('px') || null);
    }
  }

  // ** Private API **

  private initialSetting(htmlElement: HTMLElement, pathElement: string | null): void {
    const element = HtmlElemUtil.getElementByPathClassOrTag(htmlElement, pathElement);
    if (element) {
      const elementRef = HtmlElemUtil.getElementRef(element);

      this.ornamentLf = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_LF]) as HTMLElement;
      this.ornamentLfElemRef = HtmlElemUtil.getElementRef(this.ornamentLf);

      this.ornamentRg = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_RG]) as HTMLElement;
      this.ornamentRgElemRef = HtmlElemUtil.getElementRef(this.ornamentRg);
    }
  }

  private settingOrnamentLeft(renderer: Renderer2, ornamentLfAlign: string | null, leftElemRef: ElementRef<HTMLElement> | null): void {
    if (leftElemRef) {
      const ornamLfAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentLfAlign || null) || GlnFrameOrnamAlign.default;
      HtmlElemUtil.setAttr(renderer, leftElemRef, ATTR_ORN_LF, ornamLfAlign2.toString());
    }
  }

  private settingOrnamentRight(renderer: Renderer2, ornamentRgAlign: string | null, rightElemRef: ElementRef<HTMLElement> | null): void {
    if (rightElemRef) {
      const ornamRgAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentRgAlign || null) || GlnFrameOrnamAlign.default;
      HtmlElemUtil.setAttr(renderer, rightElemRef, ATTR_ORN_RG, ornamRgAlign2.toString());
    }
  }
}

import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from './gln-frame-ornam-align.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { HtmlPathUtil } from '../../_utils/html-path.util';

export const ATTR_ORN_LF = 'glnfr-orn-lf';
export const ATTR_ORN_RG = 'glnfr-orn-rg';

@Directive({
  selector: '[glnFrameOrnament]',
  exportAs: 'glnFrameOrnament',
})
export class GlnFrameOrnamentDirective implements OnChanges, AfterContentInit {
  @Input()
  public glnFrameOrnamentLfAlign: string | null | undefined; // OrnamAlign
  @Input()
  public glnFrameOrnamentRgAlign: string | null | undefined; // OrnamAlign
  @Input()
  public glnFrameOrnamentElementRef: ElementRef<HTMLElement> | null | undefined;
  @Input()
  /** Path to an element that has children with 'glnfr-orn-lf' and 'glnfr-orn-rg' attributes. */
  // Example: "/div{0}" - the first child tag is "div" with index 0.
  // Example: "/.glnfr-border{0}" - first child tag with class "glnfr-border" and index 0.
  public glnFrameOrnamentPath: string | null | undefined;
  @Input()
  public glnFrameOrnamentAfterContent: boolean | null | undefined;

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
        this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
      }
      this.isInit = false;
    }
    if (changes['glnFrameOrnamentLfAlign'] && this.ornamentLfElemRef) {
      this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
    }
    if (changes['glnFrameOrnamentRgAlign'] && this.ornamentRgElemRef) {
      this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
    }
  }

  public ngAfterContentInit(): void {
    if (this.glnFrameOrnamentAfterContent) {
      this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);

      this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
      this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
    }
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
    this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;

    const elementRef: ElementRef<HTMLElement> | null = this.glnFrameOrnamentElementRef || this.hostRef;
    if (this.ornamentLfWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-lf', this.ornamentLfWidth.toString().concat('px'));
    }
    if (this.ornamentRgWidth > 0) {
      HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-rg', this.ornamentRgWidth.toString().concat('px'));
    }
  }

  // ** Private methods **

  private initialSetting(htmlElement: HTMLElement, pathElement: string | null): void {
    const element = HtmlPathUtil.getElementByPathClassOrTag(htmlElement, pathElement);
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

import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { HtmlPathUtil } from '../../_utils/html-path.util';

export const ATTR_ORN_LF = 'gln-orn-lf';
export const ATTR_ORN_RG = 'gln-orn-rg';

export const ORNAMENT_ALIGN: { [key: string]: string } = {
  'default': 'default',
  'center': 'center',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'baseline': 'baseline',
  'stretch': 'stretch',
};

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
  private ornamentLeftRefList: ElementRef<HTMLElement>[] = [];
  private ornamentRightRefList: ElementRef<HTMLElement>[] = [];
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
    if (changes['glnFrameOrnamentLfAlign']) {
      this.settingOrnamentList(this.renderer, this.ornamentLeftRefList, ATTR_ORN_LF, this.glnFrameOrnamentLfAlign || '');
    }
    if (changes['glnFrameOrnamentRgAlign']) {
      this.settingOrnamentList(this.renderer, this.ornamentRightRefList, ATTR_ORN_RG, this.glnFrameOrnamentRgAlign || '');
    }
  }

  public ngAfterContentInit(): void {
    if (this.glnFrameOrnamentAfterContent) {
      this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
      this.settingOrnamentList(this.renderer, this.ornamentLeftRefList, ATTR_ORN_LF, this.glnFrameOrnamentLfAlign || '');
      this.settingOrnamentList(this.renderer, this.ornamentRightRefList, ATTR_ORN_RG, this.glnFrameOrnamentRgAlign || '');
    }
    // Get the width of the ornament block.

    this.ornamentLfWidth = this.getWidthByList(this.ornamentLeftRefList);
    this.ornamentRgWidth = this.getWidthByList(this.ornamentRightRefList);

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
      const leftList: NodeListOf<Element> = element.querySelectorAll<Element>('[' + ATTR_ORN_LF + ']');
      for (let idx = 0; idx < leftList.length; idx++) {
        if (leftList.item(idx) != null) {
          this.ornamentLeftRefList.push(new ElementRef<HTMLElement>(leftList.item(idx) as HTMLElement));
        }
      }
      const rightList: NodeListOf<Element> = element.querySelectorAll<Element>('[' + ATTR_ORN_RG + ']');
      for (let idx = 0; idx < rightList.length; idx++) {
        if (rightList.item(idx) != null) {
          this.ornamentRightRefList.push(new ElementRef<HTMLElement>(rightList.item(idx) as HTMLElement));
        }
      }
    }
  }

  private settingOrnamentList(renderer: Renderer2, elementRefList: ElementRef<HTMLElement>[], attrName: string, ornamAlign: string): void {
    const ornamAlignValue = ORNAMENT_ALIGN[ornamAlign] || ORNAMENT_ALIGN['default'];
    if (attrName) {
      for (let idx = 0; idx < elementRefList.length; idx++) {
        HtmlElemUtil.setAttr(renderer, elementRefList[idx], attrName, ornamAlignValue);
      }
    }
  }

  private getWidthByList(elementRefList: ElementRef<HTMLElement>[]): number {
    let result: number = 0;
    for (const elementRef of elementRefList) {
      result = result + elementRef.nativeElement.offsetWidth || 0;
    }
    return result;
  }
}

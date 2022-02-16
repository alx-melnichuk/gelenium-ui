import { AfterContentInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { OrnamAlign, OrnamAlignUtil } from '../../_interfaces/ornam-align.interface';
import { ElementUtil } from '../../_utils/element.util';
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

  private ornamLfAlign2: OrnamAlign = OrnamAlign.default;
  private ornamRgAlign2: OrnamAlign = OrnamAlign.default;
  private ornamentLfWidth = 0;
  private ornamentRgWidth = 0;

  private ornamentLf: HTMLElement | undefined | null = undefined;
  private ornamentRg: HTMLElement | undefined | null = undefined;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ornamentLf === undefined) {
      this.ornamentLf = ElementUtil.getChildByAttribute(this.hostRef.nativeElement?.children.item(0) || null, [ATTR_ORN_LF]) as HTMLElement;
    }
    if (this.ornamentRg === undefined) {
      this.ornamentRg = ElementUtil.getChildByAttribute(this.hostRef.nativeElement?.children.item(0) || null, [ATTR_ORN_RG]) as HTMLElement;
    }
    if (changes.grnOrnamentLfAlign && this.ornamentLf) {
      this.ornamLfAlign2 = OrnamAlignUtil.convert(this.grnOrnamentLfAlign || null) || this.ornamLfAlign2;
      ElementUtil.setAttr(this.renderer, this.ornamentLf, ATTR_ORN_LF, this.ornamLfAlign2.toString());
    }
    if (changes.grnOrnamentRgAlign && this.ornamentRg) {
      this.ornamRgAlign2 = OrnamAlignUtil.convert(this.grnOrnamentRgAlign || null) || this.ornamRgAlign2;
      ElementUtil.setAttr(this.renderer, this.ornamentRg, ATTR_ORN_RG, this.ornamRgAlign2.toString());
    }
  }

  ngAfterContentInit(): void {
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
    this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;
    if (this.ornamentLfWidth > 0) {
      const parent = this.hostRef.nativeElement.parentElement;
      ElementUtil.setProperty(parent, PROP_ORN_LBL_PD_LF, NumberUtil.str(this.ornamentLfWidth)?.concat('px'));
    }
    if (this.ornamentRgWidth > 0) {
      const parent = this.hostRef.nativeElement.parentElement;
      ElementUtil.setProperty(parent, PROP_ORN_LBL_PD_RG, NumberUtil.str(this.ornamentRgWidth)?.concat('px'));
    }
  }
}

import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { NumberUtil } from '../_utils/number.util';

@Directive({
  selector: '[glnOptionListPanel]',
  exportAs: 'glnOptionListPanel',
})
export class GlnOptionListPanelDirective implements OnInit {
  @Input()
  public originRect: DOMRect | null | undefined;

  private panelLeft: number | null = null;
  private panelRight: number | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    if (this.originRect != null) {
      const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      const isJoinOnLeft = panelRect.left === this.originRect.left;
      const delta = NumberUtil.roundTo100((this.originRect.width - panelRect.width) / 2);
      this.panelLeft = isJoinOnLeft ? delta : null;
      this.panelRight = isJoinOnLeft ? null : delta;
      HtmlElemUtil.setProperty(this.hostRef, '--glnolpd--panel-left', NumberUtil.str(this.panelLeft)?.concat('px'));
      HtmlElemUtil.setProperty(this.hostRef, '--glnolpd--panel-right', NumberUtil.str(this.panelRight)?.concat('px'));
    }
  }
}

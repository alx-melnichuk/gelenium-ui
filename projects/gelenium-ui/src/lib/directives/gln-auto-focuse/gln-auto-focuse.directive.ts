import { AfterViewInit, Directive, Input, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

import { BooleanUtil } from '../../_utils/boolean.util';
import { HtmlElemUtil } from '../../_utils/html-elem.util';

@Directive({
  selector: '[glnAutoFocuse]',
  exportAs: 'glnAutoFocuse',
})
export class GlnAutoFocuseDirective implements OnChanges, AfterViewInit {
  @Input()
  public glnAutoFocuse: string | boolean | null = null;

  private autoFocuse = false;
  public get isAutoFocuse(): boolean {
    return this.autoFocuse;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set isAutoFocuse(value: boolean) {}

  private hasOwner = false;
  public get isHasOwner(): boolean {
    return this.hasOwner;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set isHasOwner(value: boolean) {}

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['glnAutoFocuse']) {
      this.autoFocuse = !!BooleanUtil.init(this.glnAutoFocuse != null ? '' + this.glnAutoFocuse : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'auto-focuse', this.autoFocuse ? '' : null);
    }
  }

  public ngAfterViewInit(): void {
    if (!this.hasOwner && this.autoFocuse) {
      Promise.resolve().then(() => {
        this.focuseElement();
      });
    }
  }

  // ** Public API **

  public focuseElement(): void {
    const isDisabled = (this.hostRef.nativeElement as HTMLInputElement).disabled;
    if (!isDisabled) {
      this.hostRef.nativeElement.focus();
    }
  }

  public setIsHasOwner(isHasOwner: boolean): void {
    this.hasOwner = isHasOwner;
  }
}

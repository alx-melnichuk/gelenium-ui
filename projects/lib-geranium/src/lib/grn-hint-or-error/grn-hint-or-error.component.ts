import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { HtmlElemUtil } from '../utils/html-elem.util';

@Component({
  selector: 'grn-hint-or-error',
  templateUrl: './grn-hint-or-error.component.html',
  styleUrls: ['./grn-hint-or-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnHintOrErrorComponent implements OnChanges {
  @Input()
  public text: string | null = null;
  @Input()
  public isError: boolean | null = null;
  @Input()
  public isFocused: boolean | null = null;
  @Input()
  public isDisabled: boolean | null = null;

  constructor(private renderer: Renderer2, private hostRef: ElementRef<HTMLElement>) {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-hint-or-error', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isError) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-error', !!this.isError);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes.isFocused) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-focused', !!this.isFocused);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'foc', this.isFocused ? '' : null);
    }
    if (changes.isDisabled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-disabled', !!this.isDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
  }
}

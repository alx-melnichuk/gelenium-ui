import { Directive, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { GrnRegexMatchUtil } from './grn-regex-match.interface';

import { RegexUtil } from './regex.util';

@Directive({
  selector: '[grnRegexMatch]',
  exportAs: 'grnRegexMatch',
})
export class GrnRegexMatchDirective implements OnChanges {
  @Input()
  public grnRegexMatch: string | null = null;

  private regex: RegExp | null = null;
  private initialValue: string | null = null;

  constructor(private control: NgControl) {
    if (!control) {
      throw new Error('Required parameter NgControl is missing.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexMatch) {
      const regexStr = GrnRegexMatchUtil.create(this.grnRegexMatch);
      this.regex = RegexUtil.create(regexStr);
    }
  }

  @HostListener('beforeinput')
  public doBeforeinput(): void {
    if (!!this.regex && !!this.control.control) {
      this.initialValue = this.control.control.value;
    }
  }

  @HostListener('input', ['$event'])
  public doInput(event: InputEvent): void {
    if (!!this.regex && !!this.control.control) {
      // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
      // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
      if (!!event && !event.cancelBubble) {
        const newValue = this.control.control.value;
        if (!!newValue && !this.regex.test(newValue)) {
          (event.target as any).value = this.initialValue;
          this.control.control.setValue(this.initialValue, { emitEvent: false });
          event.stopImmediatePropagation();
        }
      }
      this.initialValue = null;
    }
  }
}

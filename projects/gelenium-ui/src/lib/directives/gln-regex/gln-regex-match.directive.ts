import { Directive, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { RegexUtil } from './regex.util';

import { GlnRegexMatchUtil } from './gln-regex-match.interface';

/**
 * @description
 *
 * The "GlnRegexMatch" directive allows you to enter only those values that match the specified
 * regular expression. If the new value does not match the regular expression, then it is not
 * accepted.
 *
 * For example:
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexMatch="^-?(\d+)$">
 *  [glnRegexMatch]="'^-?(\\d+)$'"
 *  glnRegexMatch="/^-?(\d+)$/i"
 *  [glnRegexMatch]="'/^-?(\\d+)$/i'"
 */

@Directive({
  selector: '[glnRegexMatch]',
  exportAs: 'glnRegexMatch',
})
export class GlnRegexMatchDirective implements OnChanges {
  @Input()
  public glnRegexMatch: string | null = null;

  private regex: RegExp | null = null;
  private initialValue: string | null = null;

  constructor(private control: NgControl) {
    if (!control) {
      throw new Error('Required parameter NgControl is missing.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.glnRegexMatch) {
      const regexStr = GlnRegexMatchUtil.create(this.glnRegexMatch);
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
          // (event.target as any).value = this.initialValue;
          // this.control.control.setValue(this.initialValue, { emitEvent: false });
          // event.stopImmediatePropagation();
          const value = this.initialValue as string;
          const inputElement: HTMLInputElement = event.target as HTMLInputElement;
          const newLen = (newValue as string).length;
          let start = inputElement.selectionStart;
          inputElement.value = value;
          this.control.control.setValue(value, { emitEvent: false });
          const len = (value || '').length;
          if (start != null && start > 0) {
            start -= newLen > len ? newLen - len : 0;
            if (start > len) {
              start = len;
            }
          }
          inputElement.selectionStart = start;
          inputElement.selectionEnd = start;
          event.stopImmediatePropagation();
        }
      }
      this.initialValue = null;
    }
  }
}

import { Directive, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { RegexUtil } from './regex.util';

export const NAME_NUMERIC = '#numeric';
export const REGEXP_NUMERIC = '^-?(\\d+)$';

export const NAME_NUMERIC_EXP = '#numeric-exp';
export const REGEXP_NUMERIC_EXP = '^-?[\\d.]+(?:e-?\\d+)?$';

export const NAME_NUMERIC_DECIMAL2 = '#numeric(,2)';
export const REGEXP_NUMERIC_DECIMAL2 = '^-?(\\d+(\\.\\d{0,2})?|\\.\\d{0,2})$';

export const NAME_NUMERIC12_DECIMAL2 = '#numeric(12,2)';
export const REGEXP_NUMERIC12_DECIMAL2 = '^-?(\\d{1,12}(\\.\\d{0,2})?|\\.\\d{0,2})$';

const REGEXP_PHONE = '^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$';
const REGEXP_URL =
  '^(http?|ftp):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)' +
  '(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.' +
  "(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$";

const valueMap: { [key: string]: string } = {
  [NAME_NUMERIC]: REGEXP_NUMERIC,
  [NAME_NUMERIC_EXP]: REGEXP_NUMERIC_EXP,
  [NAME_NUMERIC_DECIMAL2]: REGEXP_NUMERIC_DECIMAL2,
  [NAME_NUMERIC12_DECIMAL2]: REGEXP_NUMERIC12_DECIMAL2,
};

@Directive({
  selector: '[grnRegexMatch]',
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
      let grnRegexMatch = this.grnRegexMatch;
      if (grnRegexMatch && grnRegexMatch.startsWith(NAME_NUMERIC)) {
        grnRegexMatch = valueMap[grnRegexMatch] || grnRegexMatch;
      }
      this.regex = RegexUtil.create(grnRegexMatch);
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

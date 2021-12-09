import { Directive, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { RegexUtil } from './regex.util';

/**
 * @description
 *
 * The directive removes those characters that do not match the specified regular expression.
 * The regular expression must contain those characters that should not be present in the
 * resulting string.
 * In other words, if for a character the regex check returned true, then this character is
 * not included in the resulting string.
 *
 * For example:
 * For the expression "/[^\d]/gm", all non-numeric values will be removed.
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" grnRegexRemove="/[^\d]/gm">
 *
 * For the expression "/[^A-Za-z]/gm", all non-alphabetic values will be removed.
 * 2. <input type="text" formControlName="name2" grnRegexRemove="/[^A-Za-z]/gm">
 *
 * For the expression "/[^\dA-Za-z]/gm", all non-numeric and non-alphabetic values will be removed.
 * 3. <input type="text" formControlName="name2" grnRegexRemove="/[^\dA-Za-z]/gm">
 */

@Directive({
  selector: '[grnRegexRemove]',
  exportAs: 'grnRegexRemove',
})
export class GrnRegexRemoveDirective implements OnChanges {
  @Input()
  public grnRegexRemove: string | null = null;

  private regex: RegExp | null = null;

  constructor(private control: NgControl) {
    if (!control) {
      throw new Error('Required parameter NgControl is missing.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexRemove) {
      this.regex = RegexUtil.create(this.grnRegexRemove);
    }
  }

  @HostListener('input', ['$event'])
  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble && !!this.regex && !!this.control.control) {
      const newValue = this.control.control.value;
      const value = newValue ? newValue.replace(this.regex, '') : '';
      if (!!newValue && newValue !== value) {
        (event.target as any).value = value;
        this.control.control.setValue(value, { emitEvent: false });
        event.stopImmediatePropagation();
      }
    }
  }
}

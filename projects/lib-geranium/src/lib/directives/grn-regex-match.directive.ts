import { Directive, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { RegexUtil } from './regex.util';

@Directive({
  selector: '[grnRegexMatch]',
})
export class GrnRegexMatchDirective implements OnChanges {
  @Input()
  public grnRegexMatch: string | null = null;

  private regex: RegExp | null = null;
  private currentValue: string | null = null;

  constructor(private control: NgControl) {
    if (!control) {
      throw new Error('Required parameter NgControl is missing.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexMatch) {
      this.regex = RegexUtil.create(this.grnRegexMatch);
    }
  }

  @HostListener('beforeinput', ['$event'])
  public doBeforeinput(event: InputEvent): void {
    // console.log('doBeforM() event.data=', event.data); // TODO del;
    if (!!this.regex && !!this.control.control) {
      this.currentValue = this.control.control.value;
    }
  }

  @HostListener('input', ['$event'])
  public doInput(event: InputEvent): void {
    if (!event.cancelBubble && !!this.regex && !!this.control.control) {
      const newValue = this.control.control.value;
      // const val = ' val="' + newValue + '"';
      // const cur = ' cur="' + this.currentValue + '"';
      // console.log('doInputM() event.data=', event.data, cur, val, ' cancelBubble=', event.cancelBubble); // TODO del;
      if (!!newValue && !this.regex.test(newValue)) {
        (event.target as any).value = this.currentValue;
        this.control.control.setValue(this.currentValue, { emitEvent: false });
        // event.preventDefault();
        // event.stopPropagation();
        event.stopImmediatePropagation();
        // console.log('doInputM() !regex(newValue) cancelBubble=', event.cancelBubble); // TODO del;
      }
    }
    this.currentValue = null;
  }
}

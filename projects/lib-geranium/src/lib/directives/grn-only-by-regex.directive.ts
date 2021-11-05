import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

export const NAME_NUMERIC = '#numeric';
export const REGEXP_NUMBER = '^-?(\\d+)$';
export const NAME_NUMERIC_DECIMAL2 = '#numeric(,2)';
export const REGEXP_NUMBER_DECIMAL2 = '^-?(\\d+(\\.\\d{0,2})?|\\.\\d{0,2})$';
export const NAME_NUMERIC12_DECIMAL2 = '#numeric(12,2)';
export const REGEXP_NUMBER12_DECIMAL2 = '^-?(\\d{1,12}(\\.\\d{0,2})?|\\.\\d{0,2})$';

const valueMap: { [key: string]: string } = {
  [NAME_NUMERIC]: REGEXP_NUMBER,
  [NAME_NUMERIC_DECIMAL2]: REGEXP_NUMBER_DECIMAL2,
  [NAME_NUMERIC12_DECIMAL2]: REGEXP_NUMBER12_DECIMAL2,
};

@Directive({
  selector: 'input[grnOnlyByRegex]',
})
export class GrnOnlyByRegexDirective implements OnChanges {
  @Input()
  public grnOnlyByRegex: string | null = null;

  private regExp: RegExp | null = null;
  private currentValue: string | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnOnlyByRegex) {
      this.regExp = null;
      if (this.grnOnlyByRegex) {
        if (this.grnOnlyByRegex.startsWith(NAME_NUMERIC)) {
          const value = valueMap[this.grnOnlyByRegex];
          this.grnOnlyByRegex = value ? value : this.grnOnlyByRegex;
        }
        this.regExp = new RegExp(this.grnOnlyByRegex);
      }
    }
  }

  @HostListener('keydown')
  public doKeydown(): void {
    this.currentValue = this.elementRef.nativeElement.value;
  }

  @HostListener('input')
  public doInputChange(): void {
    const newValue = this.elementRef.nativeElement.value;
    if (!!this.regExp && !!newValue) {
      if (!this.regExp.test(newValue)) {
        this.elementRef.nativeElement.value = this.currentValue;
      }
    }
    this.currentValue = null;
  }
}

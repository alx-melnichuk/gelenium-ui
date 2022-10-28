import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GlnOptionComponent } from './gln-option.component';

@Directive({
  selector: '[glnOptionHeight]',
  exportAs: 'glnOptionHeight',
})
export class GlnOptionHeightDirective implements OnInit {
  @Input('glnOptionHeight')
  public options: GlnOptionComponent[] | null | undefined;

  @Output()
  readonly attached: EventEmitter<{ optionHeight: number }> = new EventEmitter();

  public optionHeight: number = 0;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    this.optionHeight = this.getOptionHeight(this.options || []);
    this.attached.emit({ optionHeight: this.optionHeight });
  }

  // ** Public methods **

  // ** Private methods **

  private getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
  /** Get the height of the option. */
  private getOptionHeight(options: GlnOptionComponent[]): number {
    const value: number[] = [];
    const count: number[] = [];
    let maxCount = -1;
    let resultIndex = -1;
    for (let i = 0; i < options.length && maxCount < 4; i++) {
      const height = this.getHeight(options[i].hostRef);
      let index = value.indexOf(height);
      if (index === -1) {
        value.push(height);
        count.push(1);
        index = value.length - 1;
      } else {
        count[index]++;
      }
      if (count[index] > maxCount) {
        maxCount = count[index];
        resultIndex = index;
      }
    }
    return resultIndex > -1 ? value[resultIndex] : 0;
  }
}

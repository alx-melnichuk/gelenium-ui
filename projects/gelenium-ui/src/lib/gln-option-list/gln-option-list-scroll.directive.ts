import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOption } from '../gln-option/gln-option.interface';

import { GlnOptionListScroll } from './gln-option-list-scroll.interface';

@Directive({
  selector: '[glnOptionListScroll]',
  exportAs: 'glnOptionListScroll',
})
export class GlnOptionListScrollDirective implements OnInit, OnDestroy, GlnOptionListScroll {
  @Input('glnOptionListScroll')
  public options: GlnOption[] | null | undefined;

  public get optionList(): GlnOption[] {
    return this.options || [];
  }

  @Output('glnOptionListScrollAttached')
  readonly attached: EventEmitter<GlnOptionListScroll> = new EventEmitter();

  private markedOption: GlnOption | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    console.log(`optionList.length=${this.optionList.length}`); // #
    this.attached.emit({
      movingMarkedOption: (delta: number): void => this.movingMarkedOption(delta),
    });
  }

  public ngOnDestroy(): void {
    this.markedOption?.setMarked(false);
  }

  // ** Public methods **

  // ** interface GlnOptionListScroll - start **

  /** Moving the option marker by the specified offset amount. */
  public movingMarkedOption = (delta: number): void => {
    console.log(`movingMarkedOption(${delta})`); // #
  };

  // ** interface GlnOptionListScroll - finish **
}

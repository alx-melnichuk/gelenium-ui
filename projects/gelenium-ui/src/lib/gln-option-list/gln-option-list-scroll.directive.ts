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
  public movingMarkedOption(delta: number): void {
    console.log(`movingMarkedOption(${delta})`); // #
    const indexOld = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const newIndex = indexOld + delta;
    if (this.optionList.length > 0 && delta !== 0 && -1 < newIndex && newIndex < this.optionList.length) {
      // Change option marker.
      this.markedOption?.setMarked(false);
      this.markedOption = this.optionList[newIndex];
      this.markedOption.setMarked(true);

      this.prepareMarkedOption(this.markedOption);
    }
  }

  /*public movingMarkedOption0(delta: number): void {
    const indexOld = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;

    // Change option marker.
    let markedOption: GlnOptionComponent | null = null;
    const newIndex = indexOld + delta;
    if (this.optionList.length > 0 && -1 < newIndex && newIndex < this.optionList.length) {
      this.markedOption?.setMarked(false);
      markedOption = this.optionList[newIndex];
      markedOption.setMarked(true);
    }
    this.markedOption = markedOption;

    // Get the index of the new option marker.
    const indexNew = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    if (indexNew != -1 && indexNew != indexOld) {
      // If the option marker has changed, then shift the options bar.
      this.setScrollForMarkedOption(indexNew, this.visibleSizeValue ?? 0, 36 / *this.optionHeight* /);
      // this.changeDetectorRef.markForCheck();
    }
  }*/

  // ** interface GlnOptionListScroll - finish **

  // ** Private methods **

  private prepareMarkedOption(markedOption: GlnOption | null): void {
    if (markedOption != null) {
      const optRect: DOMRect = markedOption.hostRef.nativeElement.getBoundingClientRect();
      console.log(`optRect`, optRect); // #
      const hostRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      console.log(`hostRect`, hostRect); // #
      // hostRect.scrollTop
      const isTop = hostRect.top <= optRect.top;
      const isBottom = optRect.bottom <= hostRect.bottom;
      console.log(`isTop=${isTop} isBottom=${isBottom}`); // #
    }
  }
}

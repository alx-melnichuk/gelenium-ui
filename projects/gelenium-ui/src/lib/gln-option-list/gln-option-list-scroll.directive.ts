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
      moveMarkedOption: (delta: number): void => this.moveMarkedOption(delta),
    });
  }

  public ngOnDestroy(): void {
    this.markedOption?.setMarked(false);
  }

  // ** Public methods **

  // ** interface GlnOptionListScroll - start **

  /** Moving the option marker by the specified offset amount. */
  public moveMarkedOption(delta: number): void {
    console.log(`movingMarkedOption(${delta})`); // #
    const indexPrev = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const indexNext = indexPrev + delta;
    if (this.optionList.length > 0 && delta !== 0 && -1 < indexNext && indexNext < this.optionList.length) {
      // Change option marker.
      this.markedOption?.setMarked(false);
      this.markedOption = this.optionList[indexNext];
      this.markedOption.setMarked(true);

      const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      const scrollY = this.getScrollYOnPanel(indexPrev, indexNext, this.optionList, panelRect);
      const scrollTop: number = this.hostRef.nativeElement.scrollTop;
      this.hostRef.nativeElement.scrollTo(0, scrollTop + scrollY);
    }
  }

  // ** interface GlnOptionListScroll - finish **

  // ** Private methods **

  private getScrollYOnPanel(indexPrev: number, indexNext: number, optionList: GlnOption[], panelRect: DOMRect): number {
    let result: number = 0;
    let isTop = false;
    let isBottom = false;
    const option: GlnOption | null = -1 < indexNext && indexNext < optionList.length ? optionList[indexNext] : null;
    if (option !== null) {
      const optionRect: DOMRect = option.hostRef.nativeElement.getBoundingClientRect();
      const delta = indexPrev !== -1 ? indexNext - indexPrev : indexNext;
      if (delta === -1 && panelRect.top > optionRect.top) {
        isBottom = true;
      } else if (delta === 1 && panelRect.bottom < optionRect.bottom) {
        isTop = true;
      } else if (optionRect.bottom < panelRect.top || panelRect.bottom < optionRect.top) {
        isTop = true;
        isBottom = true;
      }
    }
    if (isTop || isBottom) {
      result = this.getDeltaScrollYOnPanel(panelRect, indexNext, optionList, isTop, isBottom);
    }
    return result;
  }
  private getDeltaScrollYOnPanel(panelRect: DOMRect, index: number, optionList: GlnOption[], isTop: boolean, isBottom: boolean): number {
    let result: number = 0;
    const option: GlnOption | null = -1 < index && index < optionList.length ? optionList[index] : null;
    if (option != null && (isTop || isBottom)) {
      let option1Rect: DOMRect = option.hostRef.nativeElement.getBoundingClientRect();
      let option2Rect: DOMRect = option1Rect;
      let index1 = index;
      let index2 = index;
      let isFlagTop = true;
      while (panelRect.height > option2Rect.bottom - option1Rect.top) {
        if (isTop && isFlagTop && index1 > 0) {
          option1Rect = optionList[--index1].hostRef.nativeElement.getBoundingClientRect();
        } else if (isBottom && !isFlagTop && index2 < optionList.length - 1) {
          option2Rect = optionList[++index2].hostRef.nativeElement.getBoundingClientRect();
        }
        isFlagTop = !isFlagTop;
      }
      result = option1Rect.top - panelRect.top;
    }
    return result;
  }
}

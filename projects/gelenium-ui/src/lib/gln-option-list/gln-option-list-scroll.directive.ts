import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOption } from '../gln-option/gln-option.interface';

import { GlnOptionListScroll } from './gln-option-list-scroll.interface';

export type ScrollOptionType = { index: number; scroll: number; indexTop: number; indexBottom: number };

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

  private indexBottom: number = -1;
  private indexTop: number = -1;
  private markedOption: GlnOption | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    console.log(`optionList.length=${this.optionList.length}`); // #
    this.attached.emit({
      moveMarkedOption: (keyboardKey: string): void => this.moveMarkedOption(keyboardKey),
    });
  }

  public ngOnDestroy(): void {
    this.markedOption?.setMarked(false);
  }

  // ** Public methods **

  // ** interface GlnOptionListScroll - start **

  /** Moving the option marker by the specified offset amount. */
  public moveMarkedOption0(keyboardKey: string): void {
    const indexPrev = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const delta: number = this.getDeltaForKeyboardKey(keyboardKey, indexPrev, this.optionList.length);
    console.log(`movingMarkedOption(${keyboardKey})`); // #
    // console.log(`movingMarkedOption(${keyboardKey} delta=${delta})`); // #
    const indexNext = indexPrev + delta;
    if (this.optionList.length > 0 && delta !== 0 && -1 < indexNext && indexNext < this.optionList.length) {
      console.log(`movingMarkedOption(delta=${delta})`); // #
      // Change option marker.
      this.markedOption?.setMarked(false);
      this.markedOption = this.optionList[indexNext];
      this.markedOption.setMarked(true);

      const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      const scrollY = this.getScrollYOnPanel(indexPrev, indexNext, this.optionList, panelRect);
      if (scrollY !== 0) {
        const scrollTop: number = this.hostRef.nativeElement.scrollTop;
        this.hostRef.nativeElement.scrollTo(0, scrollTop + scrollY);
      }
    }
  }

  public moveMarkedOption(keyboardKey: string): void {
    const indexPrev = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
    const { index, scroll, indexTop, indexBottom } = this.scrollOption(keyboardKey, indexPrev, this.optionList, panelRect);
    console.log(`movingMarkedOption() index=${index} scroll=${scroll} indexTop=${indexTop}, indexBottom=${indexBottom}`); // #
    if (-1 < index && index < this.optionList.length) {
      // Change option marker.
      this.markedOption?.setMarked(false);
      this.markedOption = this.optionList[index];
      this.markedOption.setMarked(true);

      this.indexTop = indexTop;
      this.indexBottom = indexBottom;
      if (scroll !== 0) {
        const scrollTop: number = this.hostRef.nativeElement.scrollTop;
        this.hostRef.nativeElement.scrollTo(0, scrollTop + scroll);
      }
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

  private scrollOption(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): ScrollOptionType {
    let scrollY: number = 0;
    const indexMax = optionList.length - 1;
    let index1: number = -1;
    let index2: number = -1;
    let isTop = false;
    let isBottom = false;
    let indexNext: number = -1;
    let option: GlnOption | null = null;
    switch (keyboardKey) {
      case 'ArrowUp':
      case 'Home':
        if (0 < indexPrev) {
          option = optionList[(indexNext = keyboardKey === 'ArrowUp' ? indexPrev - 1 : 0)];
          isBottom = panelRect.top > option.hostRef.nativeElement.getBoundingClientRect().top;
        }
        break;
      case 'ArrowDown':
      case 'End':
        if (indexPrev < indexMax) {
          option = optionList[(indexNext = keyboardKey === 'ArrowDown' ? indexPrev + 1 : indexMax)];
          isTop = panelRect.bottom < option.hostRef.nativeElement.getBoundingClientRect().bottom;
        }
        break;
      // case 'PageUp':
      //   if (0 < indexPrev) {
      //     indexNext = 0;
      //     const optionRect = optionList[indexNext].hostRef.nativeElement.getBoundingClientRect();
      //     isBottom = panelRect.top > optionRect.top;
      //   }
      //   break;
      // case 'PageDown':
      //   if (indexPrev < indexMax) {
      //     indexNext = indexMax;
      //     const optionRect = optionList[indexNext].hostRef.nativeElement.getBoundingClientRect();
      //     isTop = panelRect.bottom < optionRect.bottom;
      //   }
      //   break;
    }
    // scrollY = this.getDeltaScrollYOnPanel(panelRect, indexNext, optionList, isTop, isBottom);
    // let scrollY: number = 0;
    // const option: GlnOption | null = -1 < indexNext && indexNext < optionList.length ? optionList[indexNext] : null;
    if (option != null && (isTop || isBottom)) {
      let option1Rect: DOMRect = option.hostRef.nativeElement.getBoundingClientRect();
      let option2Rect: DOMRect = option1Rect;
      index1 = indexNext;
      index2 = indexNext;
      let isFlagTop = true;
      while (panelRect.height > option2Rect.bottom - option1Rect.top) {
        if (isTop && isFlagTop && index1 > 0) {
          option1Rect = optionList[--index1].hostRef.nativeElement.getBoundingClientRect();
        } else if (isBottom && !isFlagTop && index2 < optionList.length - 1) {
          option2Rect = optionList[++index2].hostRef.nativeElement.getBoundingClientRect();
        }
        isFlagTop = !isFlagTop;
      }
      scrollY = option1Rect.top - panelRect.top;
    }
    return { index: indexNext, scroll: scrollY, indexTop: index1, indexBottom: index2 };
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

  private getDeltaForKeyboardKey(keyboardKey: string, indexPrev: number, amount: number): number {
    let result: number = 0;
    if ('ArrowDown' === keyboardKey) {
      result = 1;
    } else if ('ArrowUp' === keyboardKey) {
      result = -1;
    } else if ('Home' === keyboardKey) {
      result = -indexPrev;
    } else if ('End' === keyboardKey) {
      result = amount - indexPrev - 1;
    }
    return result;
  }
}

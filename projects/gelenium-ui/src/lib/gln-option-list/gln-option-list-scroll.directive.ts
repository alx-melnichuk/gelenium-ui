import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOption } from '../gln-option/gln-option.interface';

import { GlnOptionListScroll } from './gln-option-list-scroll.interface';
import { KeyboardKeysToMoveMarkedToPage, KeyboardKeysToMoveMarkedToArrow } from './gln-option-list.interface';

export type ScrollOptionType = { index: number; scroll: number };

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
    const delta: number = this.getDeltaForKeyboardKey0(keyboardKey, indexPrev, this.optionList.length);
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
      const scrollY = this.getScrollYOnPanel0(indexPrev, indexNext, this.optionList, panelRect);
      if (scrollY !== 0) {
        const scrollTop: number = this.hostRef.nativeElement.scrollTop;
        this.hostRef.nativeElement.scrollTo(0, scrollTop + scrollY);
      }
    }
  }

  public moveMarkedOption(keyboardKey: string): void {
    const indexPrev = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
    let result: ScrollOptionType = { index: -1, scroll: 0 };
    if (KeyboardKeysToMoveMarkedToArrow.indexOf(keyboardKey) > -1) {
      result = this.scrollOptionToArrow(keyboardKey, indexPrev, this.optionList, panelRect);
    } else if (KeyboardKeysToMoveMarkedToPage.indexOf(keyboardKey) > -1) {
      result = this.scrollOptionToPage(keyboardKey, indexPrev, this.optionList, panelRect);
    }
    console.log(`movingMarkedOption() index=${result.index} scroll=${result.scroll}`); // #
    if (-1 < result.index && result.index < this.optionList.length) {
      // Change option marker.
      this.markedOption?.setMarked(false);
      this.markedOption = this.optionList[result.index];
      this.markedOption.setMarked(true);
      // Change position scroll.
      if (result.scroll !== 0) {
        const scrollTop: number = this.hostRef.nativeElement.scrollTop;
        console.log(`scrollTop=${scrollTop} result.scroll=${result.scroll} scrollTop+result.scroll=${scrollTop + result.scroll}`); // #
        this.hostRef.nativeElement.scrollTo(0, scrollTop + result.scroll);
      }
    }
  }

  // ** interface GlnOptionListScroll - finish **

  // ** Private methods **

  private getScrollYOnPanel0(indexPrev: number, indexNext: number, optionList: GlnOption[], panelRect: DOMRect): number {
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
      result = this.getDeltaScrollYOnPanel0(panelRect, indexNext, optionList, isTop, isBottom);
    }
    return result;
  }

  private scrollOptionToArrow(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): ScrollOptionType {
    const result: ScrollOptionType = { index: -1, scroll: 0 };
    const indexMax = optionList.length - 1;
    let isTop = false;
    let isBottom = false;
    let option: GlnOption | null = null;
    switch (keyboardKey) {
      case 'ArrowUp':
      case 'Home':
        if (0 < indexPrev) {
          option = optionList[(result.index = keyboardKey === 'ArrowUp' ? indexPrev - 1 : 0)];
          isBottom = panelRect.top > option.hostRef.nativeElement.getBoundingClientRect().top;
        }
        break;
      case 'ArrowDown':
      case 'End':
        if (indexPrev < indexMax) {
          option = optionList[(result.index = keyboardKey === 'ArrowDown' ? indexPrev + 1 : indexMax)];
          isTop = panelRect.bottom < option.hostRef.nativeElement.getBoundingClientRect().bottom;
        }
        break;
    }
    if (option != null && (isTop || isBottom)) {
      let option1Rect: DOMRect = option.hostRef.nativeElement.getBoundingClientRect();
      let option2Rect: DOMRect = option1Rect;
      let index1: number = result.index;
      let index2: number = result.index;
      let isFlagTop = true;
      while (panelRect.height > option2Rect.bottom - option1Rect.top) {
        if (isTop && isFlagTop && index1 > 0) {
          option1Rect = optionList[--index1].hostRef.nativeElement.getBoundingClientRect();
        } else if (isBottom && !isFlagTop && index2 < indexMax) {
          option2Rect = optionList[++index2].hostRef.nativeElement.getBoundingClientRect();
        }
        isFlagTop = !isFlagTop;
      }
      result.scroll = option1Rect.top - panelRect.top;
    }
    return result;
  }
  private scrollOptionToPage(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): ScrollOptionType {
    const result: ScrollOptionType = { index: -1, scroll: 0 };
    if (indexPrev !== -1 && ('PageDown' === keyboardKey || 'PageUp' === keyboardKey)) {
      const indexMax: number = optionList.length - 1;
      const isModeDown = 'PageDown' === keyboardKey;
      let optionRect: DOMRect = optionList[indexPrev].hostRef.nativeElement.getBoundingClientRect();
      let deltaBt: number = 0;
      let indexBt: number = indexPrev;
      let deltaTp: number = 0;
      let indexTp: number = indexPrev;
      if (isModeDown) {
        while (optionRect.bottom <= panelRect.bottom && indexBt < indexMax) {
          optionRect = optionList[++indexBt].hostRef.nativeElement.getBoundingClientRect();
        }
        deltaBt = indexBt < indexMax ? indexBt - indexPrev - 1 : 0;
      } else {
        while (panelRect.top <= optionRect.top && 0 < indexTp) {
          optionRect = optionList[--indexTp].hostRef.nativeElement.getBoundingClientRect();
        }
        deltaTp = 0 < indexTp ? indexPrev - indexTp - 1 : 0;
      }
      let rectTp: DOMRect = optionRect;
      let rectBt: DOMRect = optionRect;
      while (panelRect.height > rectBt.bottom - rectTp.top && 0 < indexTp && indexBt < indexMax) {
        if (isModeDown) {
          rectBt = optionList[++indexBt].hostRef.nativeElement.getBoundingClientRect();
        } else {
          rectTp = optionList[--indexTp].hostRef.nativeElement.getBoundingClientRect();
        }
      }
      result.index = isModeDown ? indexBt - deltaBt : indexTp + deltaTp;
      result.scroll = rectTp.top - panelRect.top;
    }
    return result;
  }
  private scrollOption(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): ScrollOptionType {
    let scrollTop: number = 0;
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
    }
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
      scrollTop = option1Rect.top - panelRect.top;
    }
    return { index: indexNext, scroll: scrollTop };
  }
  private getDeltaScrollYOnPanel0(panelRect: DOMRect, index: number, optionList: GlnOption[], isTop: boolean, isBottom: boolean): number {
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

  private getDeltaForKeyboardKey0(keyboardKey: string, indexPrev: number, amount: number): number {
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

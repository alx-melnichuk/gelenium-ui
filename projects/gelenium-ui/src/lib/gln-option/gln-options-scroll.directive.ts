import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOption } from './gln-option.interface';
import { GlnOptionsScroll, OptionsScrollKeysToArrow, OptionsScrollKeysToPage } from './gln-options-scroll.interface';

type IndexAndScrollType = { index: number; scroll: number };

@Directive({
  selector: '[glnOptionsScroll]',
  exportAs: 'glnOptionsScroll',
})
export class GlnOptionsScrollDirective implements OnInit, OnDestroy, GlnOptionsScroll {
  @Input('glnOptionsScroll')
  public options: GlnOption[] | null | undefined;

  public get optionList(): GlnOption[] {
    return this.options || [];
  }

  @Output('glnOptionsScrollAttached')
  readonly attached: EventEmitter<GlnOptionsScroll> = new EventEmitter();
  @Output('glnOptionsScrollDetached')
  readonly detached: EventEmitter<void> = new EventEmitter();

  private markedOption: GlnOption | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    this.attached.emit({
      hostRef: this.hostRef,
      getMarkedOption: (): GlnOption | null => this.getMarkedOption(),
      setMarkedOption: (value: GlnOption | null): void => this.setMarkedOption(value),
      moveMarkedOptionByKey: (keyboardKey: string): void => this.moveMarkedOptionByKey(keyboardKey),
    });
  }

  public ngOnDestroy(): void {
    if (this.markedOption) {
      this.markedOption.marked = false;
    }
    this.detached.emit();
  }

  // ** Public methods **

  // ** interface GlnOptionListScroll - start **

  /** Get the option marked. */
  public getMarkedOption(): GlnOption | null {
    return this.markedOption;
  }
  /** Set the option marked. */
  public setMarkedOption(value: GlnOption | null): void {
    if (this.options && value != null && this.options.indexOf(value) > -1) {
      this.markedOption = value;
    }
  }
  /** Move the marked option by the key. */
  public moveMarkedOptionByKey(keyboardKey: string): void {
    const indexPrev = this.markedOption != null ? this.optionList.indexOf(this.markedOption) : -1;
    const panelRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
    let result: IndexAndScrollType = { index: -1, scroll: 0 };
    if (OptionsScrollKeysToArrow.indexOf(keyboardKey) > -1) {
      result = this.scrollOptionToArrow(keyboardKey, indexPrev, this.optionList, panelRect);
    } else if (OptionsScrollKeysToPage.indexOf(keyboardKey) > -1) {
      result = this.scrollOptionToPage(keyboardKey, indexPrev, this.optionList, panelRect);
    }
    if (-1 < result.index && result.index < this.optionList.length) {
      // Change option marker.
      if (this.markedOption) {
        this.markedOption.marked = false;
      }
      this.markedOption = this.optionList[result.index];
      this.markedOption.marked = true;
      // Change position scroll.
      if (result.scroll !== 0) {
        const scrollTop: number = this.hostRef.nativeElement.scrollTop;
        this.hostRef.nativeElement.scrollTo(0, scrollTop + result.scroll);
      }
    }
  }

  // ** interface GlnOptionListScroll - finish **

  // ** Private methods **

  private scrollOptionToArrow(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): IndexAndScrollType {
    const result: IndexAndScrollType = { index: -1, scroll: 0 };
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
  private scrollOptionToPage(keyboardKey: string, indexPrev: number, optionList: GlnOption[], panelRect: DOMRect): IndexAndScrollType {
    const result: IndexAndScrollType = { index: -1, scroll: 0 };
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
}

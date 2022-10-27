import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnOptionParent, GLN_OPTION_PARENT } from './gln-option-parent.interface';
import { GlnOptionComponent } from './gln-option.component';
import { GlnOptionsPanel } from './gln-options-panel.interface';

@Directive({
  selector: '[glnOptionsPanel]',
  exportAs: 'glnOptionsPanel',
})
export class GlnOptionsPanelDirective implements OnChanges, OnInit, OnDestroy, GlnOptionsPanel {
  @Input('glnOptionsPanelOptions')
  public options: GlnOptionComponent[] | null | undefined;
  @Input('glnOptionsPanelVisibleSize')
  public visibleSize: number | null | undefined;

  public get optionList(): GlnOptionComponent[] {
    return this.options || [];
  }
  public get visibleSizeValue(): number {
    return this.visibleSize || 0;
  }

  private firstVisibleOption: number = -1;
  private maxHeight: number | null = null;
  private markedOption: GlnOptionComponent | null = null;
  private optionHeight: number = 0;

  constructor(public hostRef: ElementRef<HTMLElement>, @Optional() @Inject(GLN_OPTION_PARENT) public parent: GlnOptionParent) {
    console.log(`parent ${this.parent != null ? '!' : ''}= null`);
    if (this.parent != null && typeof this.parent['setOptionsPanel'] === 'function') {
      this.parent.setOptionsPanel({
        movingMarkedOption: (delta: number): void => this.movingMarkedOption(delta),
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let isPrepareMaxHeight = false;
    if (changes['options']) {
      this.optionHeight = this.getOptionHeight(this.optionList);
      isPrepareMaxHeight = true;
    }

    if (isPrepareMaxHeight) {
      // Prepare and setting property 'max-height'.
      this.prepareCssMaxHeight(this.visibleSizeValue, this.optionHeight);
      this.settingCssMaxHeight(this.hostRef, this.maxHeight);
    }
  }

  public ngOnInit(): void {
    console.log(`optionList.length=${this.optionList.length} visibleSizeValue=${this.visibleSizeValue}`);
  }

  public ngOnDestroy(): void {
    this.markedOption?.setMarked(false);
  }

  // ** Public methods **

  // ** interface GlnOptionsPanel - start **

  /** Moving the option marker by the specified offset amount. */
  public movingMarkedOption(delta: number): void {
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
      this.setScrollForMarkedOption(indexNew, this.visibleSizeValue ?? 0, 36 /*this.optionHeight*/);
      // this.changeDetectorRef.markForCheck();
    }
  }

  // ** interface GlnOptionsPanel - finish **

  // ** Private methods **

  private setScrollForMarkedOption(indexMarked: number, visibleSize: number, optionHeight: number): void {
    if (visibleSize > 0 && this.hostRef != null && optionHeight > 0) {
      const value = this.getIndexFirstVisibleOption(this.optionList.length, visibleSize, indexMarked, this.firstVisibleOption);
      if (this.firstVisibleOption !== value) {
        this.firstVisibleOption = value;
        this.hostRef.nativeElement.scrollTo(0, this.firstVisibleOption * optionHeight);
      }
    }
  }
  private getIndexFirstVisibleOption(countOptions: number, visibleSize: number, indexMarked: number, indexVisible: number): number {
    let result: number = indexVisible;
    if (countOptions > 0 && visibleSize > 0 && countOptions > visibleSize && indexMarked > -1 && indexMarked < countOptions) {
      const maxIndex = countOptions - visibleSize;
      if (indexVisible === -1) {
        let index = Math.floor(indexMarked / visibleSize) * visibleSize;
        result = index + visibleSize <= countOptions ? index : maxIndex;
      } else {
        let endIndex = indexVisible + visibleSize;
        if (endIndex > countOptions) {
          endIndex = countOptions;
          result = endIndex - visibleSize;
        }

        if (indexMarked > -1 && indexMarked < result) {
          result = indexMarked;
        } else if (endIndex <= indexMarked) {
          result = indexMarked - visibleSize + 1;
          result = result > maxIndex ? maxIndex : result;
        }
      }
    }
    return result;
  }

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

  private prepareCssMaxHeight(visibleSize: number, optionHeight: number): void {
    this.maxHeight = null;
    if (visibleSize > 0 && optionHeight > 0) {
      this.maxHeight = optionHeight * visibleSize;
    }
  }

  private settingCssMaxHeight(elem: ElementRef<HTMLElement>, maxHeight: number | null): void {
    HtmlElemUtil.setProperty(elem, '--glnacpo-max-height', NumberUtil.str(maxHeight)?.concat('px'));
  }

  /*
  private indexFirstVisibleOption: number = -1;
  private markedOption: GlnOptionComponent | null = null;
  private optionHeight: number = 0;
  private options: GlnOptionComponent[] = [];
  private selectPanelRef: ElementRef<HTMLElement> | null = null;
  private visibleSizeVal: number | null = null;
  */

  /*public ngOnInit(): void {
    console.log(`glnOptionsPanel`);
    this.selectPanelRef = this.hostRef;
    if (this.config) {
      this.options = this.config.options || [];
      this.visibleSizeVal = this.config.visibleSize || 0;

      if (this.optionHeight === 0) {
        this.optionHeight = this.getOptionHeight(this.options);
      }

      const indexMarked = this.markedOption != null ? this.options.indexOf(this.markedOption) : -1;
      if (this.markedOption !== null && this.selectPanelRef !== null && this.visibleSizeVal > 0 && this.optionHeight > 0) {
        this.indexFirstVisibleOption = this.getIndexFirstVisibleOption(this.options.length, this.visibleSizeVal, indexMarked, -1);
        this.selectPanelRef.nativeElement.scrollTo(0, this.indexFirstVisibleOption * this.optionHeight);
      }
    }
  }*/

  // ** Public methods **

  /*public moveMarkedOption(isNext: boolean): GlnOptionComponent | null {
    let result: GlnOptionComponent | null = null;

    // Moving the cursor marker.
    this.markedOption = this.movingMarkedOption(this.options, isNext, this.markedOption);

    const indexMarked = this.markedOption != null ? this.options.indexOf(this.markedOption) : -1;
    const visibleSize = this.visibleSizeVal ?? 0;
    if (visibleSize > 0 && !!this.selectPanelRef && this.optionHeight > 0) {
      const value = this.getIndexFirstVisibleOption(this.options.length, visibleSize, indexMarked, this.indexFirstVisibleOption);
      if (this.indexFirstVisibleOption !== value) {
        this.indexFirstVisibleOption = value;
        this.selectPanelRef.nativeElement.scrollTo(0, this.indexFirstVisibleOption * this.optionHeight);
      }
    }

    return result;
  }*/

  // ** Private methods **
}

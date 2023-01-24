import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnPaginationConfig } from './gln-pagination-config.interface';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

const CSS_PROP_SIZE = '--glnpg--size';
const CSS_PROP_BORDER_RADIUS = '--glnbt-br-rd';

export const GLN_PAGINATION_CONFIG = new InjectionToken<GlnPaginationConfig>('GLN_PAGINATION_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-pagination',
  templateUrl: './gln-pagination.component.html',
  styleUrls: ['./gln-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnPaginationComponent implements OnChanges, OnInit {
  @Input()
  public id = `glnpg-${uniqueIdCounter++}`;
  @Input()
  public config: GlnPaginationConfig | null | undefined;
  @Input() // The total number of pages.
  public count: number = 1;
  @Input() // The number of always visible pages at the beginning and at the end.
  public countBorder: number = 1; // boundaryCount
  @Input() // The number of always visible pages before and after the current page.
  public countNearby: number = 1; // siblingCount
  @Input() // Current page number, initial value.
  public page: number = 1;
  @Input()
  public isHideNext: string | boolean | null | undefined;
  @Input()
  public isHidePrev: string | boolean | null | undefined;
  @Input()
  public isShowFirst: string | boolean | null | undefined;
  @Input()
  public isShowLast: string | boolean | null | undefined;
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  public currConfig: GlnPaginationConfig;
  public isHideNextVal: boolean | null = null; // Binding attribute "isHideNext".
  public isHidePrevVal: boolean | null = null; // Binding attribute "isHidePrev".
  public isShowFirstVal: boolean | null = null; // Binding attribute "isShowFirst".
  public isShowLastVal: boolean | null = null; // Binding attribute "isShowLast".
  public pageBuffer: number[] = [];
  public sizeVal: number | null = null; // Binding attribute "size".

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_PAGINATION_CONFIG) private rootConfig: GlnPaginationConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-pagination', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isHideNext'] || (changes['config'] && this.isHideNextVal == null && this.currConfig.isHideNext != null)) {
      this.isHideNextVal = !!(BooleanUtil.init(this.isHideNext) ?? (this.currConfig.isHideNext || null));
      this.settingHideNext(this.isHideNextVal, this.renderer, this.hostRef);
    }
    if (changes['isHidePrev'] || (changes['config'] && this.isHidePrevVal == null && this.currConfig.isHidePrev != null)) {
      this.isHidePrevVal = !!(BooleanUtil.init(this.isHidePrev) ?? (this.currConfig.isHidePrev || null));
      this.settingHidePrev(this.isHidePrevVal, this.renderer, this.hostRef);
    }
    if (changes['isShowFirst'] || (changes['config'] && this.isShowFirstVal == null && this.currConfig.isShowFirst != null)) {
      this.isShowFirstVal = !!(BooleanUtil.init(this.isShowFirst) ?? (this.currConfig.isShowFirst || null));
      this.settingShowFirst(this.isShowFirstVal, this.renderer, this.hostRef);
    }
    if (changes['isShowLast'] || (changes['config'] && this.isShowLastVal == null && this.currConfig.isShowLast != null)) {
      this.isShowLastVal = !!(BooleanUtil.init(this.isShowLast) ?? (this.currConfig.isShowLast || null));
      this.settingShowLast(this.isShowLastVal, this.renderer, this.hostRef);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      this.setCssBorderRadius(this.sizeVal, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.isHideNextVal == null) {
      this.isHideNextVal = !!(this.currConfig.isHideNext || null);
      this.settingHideNext(this.isHideNextVal, this.renderer, this.hostRef);
    }
    if (this.isHidePrevVal == null) {
      this.isHidePrevVal = !!(this.currConfig.isHidePrev || null);
      this.settingHidePrev(this.isHidePrevVal, this.renderer, this.hostRef);
    }
    if (this.isShowFirstVal == null) {
      this.isShowFirstVal = !!(this.currConfig.isShowFirst || null);
      this.settingShowFirst(this.isShowFirstVal, this.renderer, this.hostRef);
    }
    if (this.isShowLastVal == null) {
      this.isShowLastVal = !!(this.currConfig.isShowLast || null);
      this.settingShowLast(this.isShowLastVal, this.renderer, this.hostRef);
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      this.setCssBorderRadius(this.sizeVal, this.hostRef);
    }

    // this.pageBuffer = new Array(3 + this.countBorder * 2 + this.countNearby * 2);
    // for (let i = 0; i < this.count && i < this.pageBuffer.length; i++) {
    //   this.pageBuffer[i] = i + 1;
    // }

    // const data = this.getPageBuffer(this.count, 1, this.countNearby, this.countBorder); // [1, 2, 3, 4, 5, -1, 10]
    // const data = this.getPageBuffer(this.count, 7, this.countNearby, this.countBorder); // [1, -1, 6, 7, 8, 9, 10]
    // const data = this.getPageBuffer(this.count, 6, this.countNearby, this.countBorder); // [1, -1, 5, 6, 7, -1, 10]
    // const data = this.getPageBuffer(this.count, 6, 0/*countNearby*/, this.countBorder); // [1, -1, 6, -1, 10]
    // const data = this.getPageBuffer(this.count, 6, 0 /*countNearby*/, 2 /*countBorder*/); // [1, 2, -1, 6, -1, 9, 10]
    // const data = this.getPageBuffer(this.count, 6, 1 /*countNearby*/, 2 /*countBorder*/); // [1, 2, -1, 5, 6, 7, 8, 9, 10]

    this.pageBuffer = this.getPageBuffer(this.count, this.page, this.countNearby, this.countBorder);
    // console.log(`pageBuffer=`, this.pageBuffer); // #
  }

  // ** Public methods **

  public trackByIndex(index: number, item: number): number {
    return index;
  }

  // ** Private methods **

  private getPageBuffer(count: number, page: number, countNearby: number, countBorder: number): number[] {
    const result: number[] = [];
    if (count > 0 && page > 0 && countNearby > -1 && countBorder > -1) {
      result.length = 3 + countBorder * 2 + countNearby * 2;

      const pageLeft: number = countBorder + 1 + countNearby + 1;
      const pageRight: number = count - pageLeft;

      const isPageLeft: boolean = page <= pageLeft;
      const isPageRight: boolean = page > pageRight;

      let idx: number = 0;
      let idxPage: number = 1;
      let len1: number = isPageLeft ? pageLeft + 1 : countBorder;
      while (idx < len1) {
        result[idx++] = idxPage++;
      }
      if (!isPageLeft) {
        result[idx++] = -1;
      }
      if (!isPageLeft && !isPageRight) {
        idxPage = page - countNearby;
        const len2: number = idx + 1 + 2 * countNearby;
        while (idx < len2) {
          result[idx++] = idxPage++;
        }
      }
      if (!isPageRight) {
        result[idx++] = -1;
      }
      idxPage = isPageRight ? pageRight : count - countBorder + 1;
      while (idx < result.length) {
        result[idx++] = idxPage++;
      }
    }
    return result;
  }

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
  }

  private setCssBorderRadius(size: number, elem: ElementRef<HTMLElement>): void {
    const borderRadius: number = size > 0 ? Math.round((size / 2) * 100) / 100 : 0;
    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, (borderRadius > 0 ? borderRadius.toString() : null)?.concat('px'));
  }

  private settingHideNext(isHideNextVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-hide-next', !!isHideNextVal);
    HtmlElemUtil.setAttr(renderer, elem, 'nex', isHideNextVal ? '' : null);
  }

  private settingHidePrev(isHidePrevVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-hide-prev', !!isHidePrevVal);
    HtmlElemUtil.setAttr(renderer, elem, 'pre', isHidePrevVal ? '' : null);
  }

  private settingShowFirst(isShowFirstVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-show-first', !!isShowFirstVal);
    HtmlElemUtil.setAttr(renderer, elem, 'fir', isShowFirstVal ? '' : null);
  }

  private settingShowLast(isShowLastVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-show-last', !!isShowLastVal);
    HtmlElemUtil.setAttr(renderer, elem, 'las', isShowLastVal ? '' : null);
  }
}

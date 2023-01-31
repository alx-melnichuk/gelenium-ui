import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnPaginationConfig } from './gln-pagination-config.interface';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };
const EXTERIOR: { [key: string]: string } = { text: 'text', outlined: 'outlined', contained: 'contained' };

const CSS_PROP_SIZE = '--glnpg--size';
const CSS_PROP_BORDER_RADIUS = '--glnbt-br-rd';
const COUNT_BORDER = 1;
const COUNT_NEARBY = 1;

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
  @Input()
  public exterior: string | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isHideNext: string | boolean | null | undefined;
  @Input()
  public isHidePrev: string | boolean | null | undefined;
  @Input() // Disable the display of the icon.
  public isNoIcon: string | boolean | null | undefined;
  @Input()
  public isNoRound: string | boolean | null | undefined;
  @Input()
  public isShowFirst: string | boolean | null | undefined;
  @Input()
  public isShowLast: string | boolean | null | undefined;
  @Input()
  public page: number = 1;
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  @Output()
  readonly changePage: EventEmitter<number> = new EventEmitter();

  public currConfig: GlnPaginationConfig;
  public countBorderVal: number | null = null; // Binding attribute "countBorder".
  public countNearbyVal: number | null = null; // Binding attribute "countNearby".
  public exteriorVal: string | null = null; // Binding attribute "exterior".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideNextVal: boolean | null = null; // Binding attribute "isHideNext".
  public isHidePrevVal: boolean | null = null; // Binding attribute "isHidePrev".
  public isNoIconVal: boolean | null = null; // Binding attribute "isNoIcon",
  public isNoRoundVal: boolean | null = null; // Binding attribute "isNoRound".
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
    let isBorderRadius: boolean = false;
    let isPageBuffer: boolean = !!changes['count'] || !!changes['page'];
    if (changes['countBorder'] || (changes['config'] && this.countBorderVal == null && this.currConfig.countBorder != null)) {
      this.countBorderVal = this.countBorder || this.currConfig.countBorder || COUNT_BORDER;
      isPageBuffer = true;
    }
    if (changes['countNearby'] || (changes['config'] && this.countNearbyVal == null && this.currConfig.countNearby != null)) {
      this.countNearbyVal = this.countNearby || this.currConfig.countNearby || COUNT_NEARBY;
      isPageBuffer = true;
    }
    if (isPageBuffer) {
      this.updatePageBuffer(this.count, this.page, this.countNearbyVal, this.countBorderVal);
    }

    if (changes['exterior'] || (changes['config'] && this.exteriorVal == null && this.currConfig.exterior != null)) {
      this.exteriorVal = EXTERIOR[this.exterior || this.currConfig.exterior || ''] || EXTERIOR['text'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabledVal || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabledVal ? '' : null);
    }
    if (changes['isHideNext'] || (changes['config'] && this.isHideNextVal == null && this.currConfig.isHideNext != null)) {
      this.isHideNextVal = !!(BooleanUtil.init(this.isHideNext) ?? (this.currConfig.isHideNext || null));
      this.settingHideNext(this.isHideNextVal, this.renderer, this.hostRef);
    }
    if (changes['isHidePrev'] || (changes['config'] && this.isHidePrevVal == null && this.currConfig.isHidePrev != null)) {
      this.isHidePrevVal = !!(BooleanUtil.init(this.isHidePrev) ?? (this.currConfig.isHidePrev || null));
      this.settingHidePrev(this.isHidePrevVal, this.renderer, this.hostRef);
    }
    if (changes['isNoIcon'] || (changes['config'] && this.isNoIconVal == null && this.currConfig.isNoIcon != null)) {
      this.isNoIconVal = !!(BooleanUtil.init(this.isNoIcon) ?? (this.currConfig.isNoIcon || null));
      this.settingNoIcon(this.isNoIconVal, this.renderer, this.hostRef);
    }
    if (changes['isNoRound'] || (changes['config'] && this.isNoRoundVal == null && this.currConfig.isNoRound != null)) {
      this.isNoRoundVal = !!(BooleanUtil.init(this.isNoRound) ?? (this.currConfig.isNoRound || null));
      isBorderRadius = true;
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
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['short']);
      this.setCssSize(this.sizeVal, this.hostRef);
      isBorderRadius = true;
    }
    if (isBorderRadius) {
      this.setCssBorderRadius(this.sizeVal, this.isNoRoundVal, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    let isBorderRadius: boolean = false;
    let isPageBuffer: boolean = false;
    if (this.countBorderVal == null) {
      this.countBorderVal = this.currConfig.countBorder || COUNT_BORDER;
      isPageBuffer = true;
    }
    if (this.countNearbyVal == null) {
      this.countNearbyVal = this.currConfig.countNearby || COUNT_BORDER;
      isPageBuffer = true;
    }
    if (isPageBuffer || this.pageBuffer.length === 0) {
      this.updatePageBuffer(this.count, this.page, this.countNearbyVal, this.countBorderVal);
    }

    if (this.exteriorVal == null) {
      this.exteriorVal = EXTERIOR[this.currConfig.exterior || ''] || EXTERIOR['text'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    if (this.isHideNextVal == null) {
      this.isHideNextVal = !!(this.currConfig.isHideNext || null);
      this.settingHideNext(this.isHideNextVal, this.renderer, this.hostRef);
    }
    if (this.isHidePrevVal == null) {
      this.isHidePrevVal = !!(this.currConfig.isHidePrev || null);
      this.settingHidePrev(this.isHidePrevVal, this.renderer, this.hostRef);
    }
    if (this.isNoIconVal == null) {
      this.isNoIconVal = !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.isNoIconVal, this.renderer, this.hostRef);
    }
    if (this.isNoRoundVal == null) {
      this.isNoRoundVal = !!(this.currConfig.isNoRound || null);
      isBorderRadius = true;
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
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['short']);
      this.setCssSize(this.sizeVal, this.hostRef);
      isBorderRadius = true;
    }

    if (isBorderRadius) {
      this.setCssBorderRadius(this.sizeVal, this.isNoRoundVal, this.hostRef);
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

    this.updatePageBuffer(this.count, this.page, this.countNearby, this.countBorder);
    // console.log(`pageBuffer=`, this.pageBuffer); // #
  }

  // ** Public methods **

  public trackByIndex(index: number, item: number): number {
    return index;
  }

  public doClickPage(itemPage: number | null): void {
    if (!this.isDisabledVal && itemPage != null && 0 < itemPage && itemPage <= this.count) {
      this.changePage.emit(itemPage);
    }
  }

  // ** Private methods **

  private updatePageBuffer(count: number, page: number, countNearby: number | null, countBorder: number | null): void {
    const pageBuffer: number[] = [];
    if (count > 0 && page > 0 && countNearby != null && countNearby > -1 && countBorder != null && countBorder > -1) {
      pageBuffer.length = 3 + countBorder * 2 + countNearby * 2;

      const pageLeft: number = countBorder + 1 + countNearby + 1;
      const pageRight: number = count - pageLeft;

      const isPageLeft: boolean = page <= pageLeft;
      const isPageRight: boolean = page > pageRight;

      let idx: number = 0;
      let idxPage: number = 1;
      let len1: number = isPageLeft ? pageLeft + 1 : countBorder;
      while (idx < len1) {
        pageBuffer[idx++] = idxPage++;
      }
      if (!isPageLeft) {
        pageBuffer[idx++] = -1;
      }
      if (!isPageLeft && !isPageRight) {
        idxPage = page - countNearby;
        const len2: number = idx + 1 + 2 * countNearby;
        while (idx < len2) {
          pageBuffer[idx++] = idxPage++;
        }
      }
      if (!isPageRight) {
        pageBuffer[idx++] = -1;
      }
      idxPage = isPageRight ? pageRight : count - countBorder + 1;
      while (idx < pageBuffer.length) {
        pageBuffer[idx++] = idxPage++;
      }
    }
    this.pageBuffer = pageBuffer;
  }

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
  }
  private setCssBorderRadius(size: number | null, isNoRound: boolean | null, elem: ElementRef<HTMLElement>): void {
    const borderRadius: number = !isNoRound && size != null && size > 0 ? Math.round((size / 2) * 100) / 100 : 0;
    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, (borderRadius > 0 ? borderRadius.toString() : null)?.concat('px'));
  }
  private settingExterior(exterior: string, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    if (!!exterior) {
      HtmlElemUtil.setClass(renderer, elem, 'glnpg-' + exterior, true);
      HtmlElemUtil.setAttr(renderer, elem, 'ext-' + exterior[0], '');
    }
  }
  private settingHideNext(isHideNextVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-hide-next', !!isHideNextVal);
    HtmlElemUtil.setAttr(renderer, elem, 'nex', isHideNextVal ? '' : null);
  }
  private settingHidePrev(isHidePrevVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnpg-hide-prev', !!isHidePrevVal);
    HtmlElemUtil.setAttr(renderer, elem, 'pre', isHidePrevVal ? '' : null);
  }
  private settingNoIcon(isNoIconVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-icon', !!isNoIconVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noico', isNoIconVal ? '' : null);
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

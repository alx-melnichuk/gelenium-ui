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
  public initPage: number = 1;
  @Input()
  public isShowFirst: string | boolean | null | undefined;
  @Input()
  public isShowLast: string | boolean | null | undefined;
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  public currConfig: GlnPaginationConfig;
  public isShowFirstVal: boolean | null = null; // Binding attribute "isShowFirst".
  public isShowLastVal: boolean | null = null; // Binding attribute "isShowLast".
  public page: number = 1;
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

    if (changes['isShowFirst'] || (changes['config'] && this.isShowFirstVal == null && this.currConfig.isShowFirst != null)) {
      this.isShowFirstVal = !!(BooleanUtil.init(this.isShowFirst) ?? (this.currConfig.isShowFirst || null));
      this.settingShowFirst(this.isShowFirstVal);
    }
    if (changes['isShowLast'] || (changes['config'] && this.isShowLastVal == null && this.currConfig.isShowLast != null)) {
      this.isShowLastVal = !!(BooleanUtil.init(this.isShowLast) ?? (this.currConfig.isShowLast || null));
      this.settingShowLast(this.isShowLastVal);
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

    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      this.setCssBorderRadius(this.sizeVal, this.hostRef);
    }

    this.pageBuffer = new Array(3 + this.countBorder * 2 + this.countNearby * 2);
    for (let i = 0; i < this.count && i < this.pageBuffer.length; i++) {
      this.pageBuffer[i] = i + 1;
    }
    this.pageBuffer[0] = 1234;
    this.page = this.initPage;
  }

  // ** Public methods **

  public trackByIndex(index: number, item: number): number {
    return index;
  }

  // ** Private methods **

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private setCssSize(size: number, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
  }

  private setCssBorderRadius(size: number, elem: ElementRef<HTMLElement> | null): void {
    const borderRadius: number = size > 0 ? Math.round((size / 2) * 100) / 100 : 0;
    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, (borderRadius > 0 ? borderRadius.toString() : null)?.concat('px'));
  }

  private settingShowFirst(isShowFirstVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnpg-show-first', !!isShowFirstVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fir', isShowFirstVal ? '' : null);
  }

  private settingShowLast(isShowLastVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnpg-show-last', !!isShowLastVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'las', isShowLastVal ? '' : null);
  }
}
/*
 */

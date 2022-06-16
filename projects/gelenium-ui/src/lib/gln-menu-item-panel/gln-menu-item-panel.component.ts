import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

export const VISIBLE_COUNT_DEFAULT = 3;
@Component({
  selector: 'gln-menu-item-panel',
  exportAs: 'glnMenuItemPanel',
  templateUrl: './gln-menu-item-panel.component.html',
  styleUrls: ['./gln-menu-item-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnMenuItemPanelComponent implements AfterContentInit {
  @Input()
  public isFixRight = false;
  @Input()
  public isMultiple = false;
  @Input()
  public visibleSize = VISIBLE_COUNT_DEFAULT;
  @Input()
  public menuItemList!: QueryList<GlnMenuItemComponent>;

  @Output()
  readonly selected: EventEmitter<GlnMenuItemComponent> = new EventEmitter();
  @Output()
  readonly closing: EventEmitter<void> = new EventEmitter();

  // @ContentChildren(GlnMenuItemComponent)
  // public menuItemList!: QueryList<GlnMenuItemComponent>;

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList.toArray();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  private innVisibleCount = 0;
  public get visibleCount(): number {
    return this.innVisibleCount;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set visibleCount(value: number) {}

  private innItemHeight = 0;
  public get itemHeight(): number {
    return this.innItemHeight;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set itemHeight(value: number) {}

  constructor(public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterContentInit(): void {
    this.innItemHeight = this.getItemHeight(this.hostRef);
    console.log(`1.innItemHeight=${this.innItemHeight}`); // TODO del;
    console.log(`1.menuItems.length=${this.menuItems.length}`); // TODO del;
    this.innVisibleCount = this.getVisibleCount(this.menuItems.length, this.visibleSize);
    const height = this.innItemHeight * this.innVisibleCount;
    this.activate(this.hostRef, height, this.isFixRight);
  }

  @HostListener('document:mousedown', ['$event'])
  public documentClick(event: Event): void {
    const withinBoundaries = event.composedPath().includes(this.hostRef.nativeElement);
    if (withinBoundaries) {
      this.handlerClick(event);
    } else {
      this.closing.emit();
    }
  }

  // ** Public API **

  public trackByMenuItem(index: number, item: GlnMenuItemComponent): string {
    return String(item.value) + '#' + String(item.label);
  }

  public getItemByValue(value: unknown | null): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    for (let i = 0; i < this.menuItems.length && !result; i++) {
      const item = this.menuItems[i];
      result = item.value === value ? item : result;
    }
    return result;
  }

  public handlerClick(event: Event): void {
    event.stopPropagation();
    let count = this.menuItems.length;
    let start = 0;
    if (this.visibleSize > 0 && this.visibleSize < this.menuItems.length) {
      const scroll = this.getScrollValue(this.hostRef);
      const value = scroll / this.innItemHeight;
      start = Math.trunc(value);
      const delta = Math.round(value * 100) / 100 - start > 0.01 ? 1 : 0;
      count = start + delta + this.visibleSize;
    }
    const target = event.target as Node;
    let result: GlnMenuItemComponent | null = null;
    for (let i = start; i < count && !result; i++) {
      const item = this.menuItems[i];
      result = (item.hostRef as any) === target || item.hostRef.nativeElement.contains(target) ? item : result;
    }
    if (!!result && !result.disabled) {
      console.log(`result.label=${result.label}, result.value=${result.value}`); // TODO del;
      this.selected.emit(result);
    }
  }

  // ** Private API **

  private getScrollValue(elem: ElementRef<HTMLElement>): number {
    const style = elem.nativeElement.style;
    const value = style.getPropertyValue('offsetScroll').replace('px', '');
    return 0 + parseInt(value);
  }

  private getItemHeight(elem: ElementRef<HTMLElement>): number {
    const styleDeclaration = getComputedStyle(elem.nativeElement);
    // Get the css value of the "top indent" variable.
    const liPaddingTop = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-tp').replace('px', ''));
    // Get the css value of the "bottom indent" variable.
    const liPaddingBottom = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-bt').replace('px', ''));
    // Get the line height from the style set.
    const lineHeight = Number(styleDeclaration.getPropertyValue('line-height').replace('px', ''));

    return liPaddingTop + lineHeight + liPaddingBottom;
  }

  private getVisibleCount(itemsLength: number, sizeVisible: number): number {
    return sizeVisible > 0 && sizeVisible < itemsLength ? sizeVisible : itemsLength;
  }

  private isDownValue(parent: HTMLElement, itemsLength: number): boolean {
    const rect = parent.getBoundingClientRect();
    const value = Math.round(rect.top * 100) / 100 + Math.round(rect.height * 100) / 100 + itemsLength;
    // const screen = new Screen();
    return true; // value < screen.height;
  }

  private activate(hostRef: ElementRef<HTMLElement>, height: number, isFixRight: boolean): void {
    const parent = hostRef.nativeElement.parentElement as HTMLElement;
    const isDown = this.isDownValue(parent, height);
    const top = isDown ? parent.offsetHeight : null;
    const bottom = isDown ? null : -parent.offsetHeight;
    const left = isFixRight ? null : 0;
    const right = isFixRight ? 0 : null;
    HtmlElemUtil.setProperty(this.hostRef, '--glnmip-ul-height', NumberUtil.str(height)?.concat('px') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-top', NumberUtil.str(top)?.concat('px') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-bottom', NumberUtil.str(bottom)?.concat('px') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-left', NumberUtil.str(left)?.concat('px') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-right', NumberUtil.str(right)?.concat('px') || null);
  }
}

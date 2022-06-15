import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { GlnMenuItemComponentMap } from '../gln-menu-item/grn-menu-item.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

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
  public visibleSize = 0;

  @Output()
  readonly selected: EventEmitter<GlnMenuItemComponent> = new EventEmitter();

  @ContentChildren(GlnMenuItemComponent)
  public menuItemList!: QueryList<GlnMenuItemComponent>;

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

  private innMenuItemMap: GlnMenuItemComponentMap = {};
  public get menuItemMap(): GlnMenuItemComponentMap {
    return this.innMenuItemMap;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItemMap(value: GlnMenuItemComponentMap) {}

  constructor(public hostRef: ElementRef<HTMLElement> /*, private renderer: Renderer2*/, private changeDetectorRef: ChangeDetectorRef) {
    console.log(`GlnMenuItemPanel()`); // TODO del;
  }

  public ngAfterContentInit(): void {
    this.innItemHeight = this.getItemHeight(this.hostRef);
    this.innVisibleCount = this.getVisibleCount(this.menuItems.length, this.visibleSize);
    const height = this.innItemHeight * this.innVisibleCount;
    this.activate(this.hostRef, height, this.isFixRight);
    this.innMenuItemMap = this.getMenuItemMap(this.menuItems, true);
  }

  @HostListener('click', ['$event'])
  public handlerClick(event: Event): void {
    let count = this.menuItems.length;
    let start = 0;
    if (this.visibleSize > 0 && this.visibleSize < this.menuItems.length) {
      const scroll = this.getScrollValue(this.hostRef);
      const value = scroll / this.innItemHeight;
      start = Math.trunc(value);
      const delta = Math.round(value * 100) / 100 - start > 0.01 ? 1 : 0;
      count = start + delta + this.visibleSize;
    }
    const target = event.target;
    let result: GlnMenuItemComponent | null = null;
    for (let i = start; i < count && !result; i++) {
      const item = this.menuItems[i];
      result = (item.hostRef as any) === target || (item.hostRef as any).contains(target);
    }
    if (!!result && !result.disabled) {
      this.selected.emit(result);
    }
  }

  // ** Public API **

  public getItemByValue(value: unknown | null): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    for (let i = 0; i < this.menuItems.length && !result; i++) {
      const item = this.menuItems[i];
      result = item.value === value ? item : result;
    }
    return result;
  }

  // ** Private API **

  private getScrollValue(elem: ElementRef<HTMLElement>): number {
    const style = elem.nativeElement.style;
    const value = style.getPropertyValue('offsetScroll').replace('px', '');
    return 0 + parseInt(value);
  }

  private getItemHeight(elem: ElementRef<HTMLElement>): number {
    const style = elem.nativeElement.style;
    const heightValue = style.getPropertyValue('--pn-height').replace('px', '');
    const heightDefault = style.getPropertyValue('--pn-height-def').replace('px', '');
    return 0 + parseInt(heightValue || heightDefault || '40');
  }

  private getVisibleCount(itemsLength: number, sizeVisible: number): number {
    return sizeVisible > 0 && sizeVisible < itemsLength ? sizeVisible : itemsLength;
  }

  private isDownValue(parent: HTMLElement, itemsLength: number): boolean {
    const rect = parent.getBoundingClientRect();
    const value = Math.round(rect.top * 100) / 100 + Math.round(rect.height * 100) / 100 + itemsLength;
    return value < new Screen().height;
  }

  private activate(hostRef: ElementRef<HTMLElement>, height: number, isFixRight: boolean): void {
    const parent = hostRef.nativeElement.parentElement as HTMLElement;
    const isDown = this.isDownValue(parent, height);
    const top = isDown ? parent.offsetHeight : null;
    const bottom = isDown ? null : -parent.offsetHeight;
    const left = isFixRight ? null : 0;
    const right = isFixRight ? 0 : null;
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-height', String(height));
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-top', String(top));
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-bottom', String(bottom));
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-left', String(left));
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-right', String(right));
  }

  private getMenuItemMap(menuItems: GlnMenuItemComponent[], isCheckUnique: boolean): GlnMenuItemComponentMap {
    const result: GlnMenuItemComponentMap = {};
    for (let i = 0; i < menuItems.length; i++) {
      const indexStr = (menuItems[i].value as any).toString();
      if (isCheckUnique && result[indexStr] !== undefined) {
        console.error(`Value "${indexStr}" is not unique.`);
      }
      result[indexStr] = { index: i, menuItem: menuItems[i] };
    }
    return result;
  }
}

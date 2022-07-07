import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

const DEFAULT_HEIGHT = 40;
const GLN_MENU_ITEM_PANEL = 'GLN-MENU-ITEM-PANEL';
const GLN_MENU_ITEM = 'GLN-MENU-ITEM';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-menu-item-panel',
  exportAs: 'glnMenuItemPanel',
  templateUrl: './gln-menu-item-panel.component.html',
  styleUrls: ['./gln-menu-item-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnMenuItemPanelComponent implements OnInit, AfterContentInit {
  @Input()
  public id = `glnmib-${uniqueIdCounter++}`;
  @Input()
  public isMultiple: boolean | null = null; // TODO remove;
  @Input()
  public menuItemList!: QueryList<GlnMenuItemComponent>;
  @Input()
  public visibleSize = -1;

  @Output()
  readonly selected: EventEmitter<GlnMenuItemComponent> = new EventEmitter();
  @Output()
  readonly closing: EventEmitter<void> = new EventEmitter();

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  private itemHeight = 0;
  private indexMarked = -1;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
  }

  public ngAfterContentInit(): void {
    this.itemHeight = this.getMenuItemHeight(this.hostRef.nativeElement.children[0]);
    const visibleCount = this.getCountVisible((this.menuItemList?.toArray() || []).length, this.visibleSize);
    this.settingItemListHeight(this.hostRef, this.itemHeight, visibleCount);
  }

  @HostListener('mouseup', ['$event'])
  public elementHandling(event: Event): void {
    // Get the menu item as the parent of the clicked item.
    const targetMenuItem = this.getMenuItemFromEvent(event.target as HTMLElement);
    // Find the menu item component by the selected html element.
    const menuItem = this.getMenuItemByHtmlElement(targetMenuItem, this.menuItems);
    if (menuItem && !menuItem.disabled) {
      this.selected.emit(menuItem);
    }
  }

  @HostListener('document:keydown', ['$event'])
  public documentKeydownHandling(event: KeyboardEvent): void {
    // 'ArrowDown', 'ArrowUp', 'Escape', 'Enter', 'Tab'
    switch (event.code) {
      case 'Escape':
        this.closing.emit();
        break;
      case 'ArrowDown':
        this.markRequiredMenuItem(true);
        break;
      case 'ArrowUp':
        this.markRequiredMenuItem(false);
        break;
    }
  }

  // ** Public API **

  // ** Private API **

  // Determine the height of the menu item.
  private getMenuItemHeight(listElem: Element): number {
    let result = DEFAULT_HEIGHT;
    if (listElem.children.length > 0) {
      result = Number(getComputedStyle(listElem.children[0]).getPropertyValue('height').replace('px', ''));
    }
    return result;
  }
  /** Determine the number of visible menu items. */
  private getCountVisible(countItems: number, visibleSize: number): number {
    return visibleSize > 0 && visibleSize < countItems ? visibleSize : countItems;
  }
  /** Set the height value of the list of menu items. */
  private settingItemListHeight(elem: ElementRef<HTMLElement>, height: number, countVisible: number): void {
    const menuItemsHeight = height * countVisible;
    const itemsHeight = menuItemsHeight > 0 ? menuItemsHeight : null;
    HtmlElemUtil.setProperty(elem, '--glnmip-list-height', NumberUtil.str(itemsHeight)?.concat('px') || null);
  }
  /** Get the menu item as the parent of the clicked item. */
  private getMenuItemFromEvent(htmlElement: HTMLElement | null): HTMLElement | null {
    let result: HTMLElement | null = null;
    let elem: HTMLElement | null = htmlElement;
    while (!result && !!elem && elem.tagName !== GLN_MENU_ITEM_PANEL) {
      result = elem.tagName === GLN_MENU_ITEM ? elem : result;
      elem = elem.parentElement;
    }
    return result;
  }
  /** Find the menu item component by the selected html element. */
  private getMenuItemByHtmlElement(element: HTMLElement | null, menuItems: GlnMenuItemComponent[]): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    if (element && menuItems.length > 0) {
      for (let idx = 0; idx < menuItems.length && !result; idx++) {
        result = element === menuItems[idx].hostRef.nativeElement ? menuItems[idx] : result;
      }
    }
    return result;
  }
  /** Mark the menu item as marked with the cursor. */
  private markRequiredMenuItem(isNext: boolean): void {
    const menuItem = this.indexMarked > -1 ? this.menuItems[this.indexMarked] : null;
    // Uncheck the old menu item.
    if (menuItem && menuItem.marked) {
      menuItem.setMarked(false);
    }
    // Get the index for the required menu item.
    if (isNext) {
      this.indexMarked = this.indexMarked === this.menuItems.length - 1 ? 0 : this.indexMarked + 1;
    } else {
      this.indexMarked = this.indexMarked === 0 ? this.menuItems.length - 1 : this.indexMarked - 1;
    }
    // Set the checkbox for the new menu item.
    this.menuItems[this.indexMarked].setMarked(true);
  }
}

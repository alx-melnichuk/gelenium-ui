import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

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
export class GlnMenuItemPanelComponent implements AfterContentInit {
  @Input()
  public id = `glnmip-${uniqueIdCounter++}`;
  @Input()
  public isFixRight: boolean | null = null;
  @Input()
  public isMultiple: boolean | null = null;
  @Input()
  public menuItemList!: QueryList<GlnMenuItemComponent>;
  @Input()
  public visibleSize = -1;

  @Output()
  readonly selected: EventEmitter<GlnMenuItemComponent> = new EventEmitter();
  @Output()
  readonly closing: EventEmitter<void> = new EventEmitter();

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList.toArray();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  private visibleCountVal = 0;
  public get visibleCount(): number {
    return this.visibleCountVal;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set visibleCount(value: number) {}

  private itemHeightVal = 0;
  public get itemHeight(): number {
    return this.itemHeightVal;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set itemHeight(value: number) {}

  private indexMarked = -1;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
  }

  public ngAfterContentInit(): void {
    // Determine the height of the menu item by the properties of the "ul" element, it contains the "line height".
    this.itemHeightVal = this.getItemHeight(this.hostRef.nativeElement);
    // Determine the number of visible menu items.
    this.visibleCountVal = this.visibleSize > 0 && this.visibleSize < this.menuItems.length ? this.visibleSize : this.menuItems.length;
    this.activate(this.hostRef, this.itemHeightVal * this.visibleCountVal, this.isFixRight);
  }

  @HostListener('document:mouseup', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public documentMouseupHandling(event: Event): void {
    // If the mouse click is outside the area of the current element, then send an "outside" event.
    this.closing.emit();
  }

  @HostListener('mouseup', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mouseupHandling(event: Event): void {
    event.stopPropagation();
    // If the mouse click is inside the area of the current element, then determine the selected menu item.
    const menuItem = this.getMenuItemByHtmlElement(this.getHtmlElementByEvent(event.target as HTMLElement), this.menuItems);
    if (!menuItem) {
      this.closing.emit();
    } else if (!menuItem.disabled) {
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

  private getHtmlElementByEvent(htmlElement: HTMLElement | null): HTMLElement | null {
    let result: HTMLElement | null = null;
    let elem: HTMLElement | null = htmlElement;
    while (!!elem && !result && elem.tagName !== GLN_MENU_ITEM_PANEL) {
      result = elem.tagName === GLN_MENU_ITEM ? elem : result;
      elem = elem.parentElement;
    }
    return result;
  }

  private getMenuItemByHtmlElement(element: HTMLElement | null, menuItems: GlnMenuItemComponent[]): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    if (element && menuItems.length > 0) {
      for (let idx = 0; idx < menuItems.length && !result; idx++) {
        result = element === menuItems[idx].hostRef.nativeElement ? menuItems[idx] : result;
      }
    }
    return result;
  }

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

  private getItemHeight(elem: HTMLElement): number {
    const styleDeclaration = getComputedStyle(elem);
    // Get the css value of the "top indent" variable.
    const liPaddingTop = parseInt(styleDeclaration.getPropertyValue('--glnmi-pd-tp') || '6');
    // Get the css value of the "bottom indent" variable.
    const liPaddingBottom = parseInt(styleDeclaration.getPropertyValue('--glnmi-pd-bt') || '6');
    // Get the line height from the style set.
    const lineHeight = parseInt(styleDeclaration.getPropertyValue('line-height') || '24');

    return liPaddingTop + lineHeight + liPaddingBottom;
  }

  private isDownValue(hostElement: HTMLElement, itemsLength: number): boolean {
    const rect = hostElement.getBoundingClientRect();
    const value = Math.round(rect.top * 100) / 100 + itemsLength;
    const screenHeight = ScreenUtil.getHeight();
    return value < screenHeight;
  }

  private activate(hostRef: ElementRef<HTMLElement>, height: number, isFixRight: boolean | null): void {
    // const parent = hostRef.nativeElement.parentElement as HTMLElement;
    const isDown = this.isDownValue(hostRef.nativeElement, height);
    // const top = isDown ? /*parent.offsetHeight*/ 100 : null;
    const bottom = isDown ? null : 'calc(var(--glns-frameSize) + 0.25em)';

    HtmlElemUtil.setProperty(this.hostRef, '--glnmip-ul-height', NumberUtil.str(height)?.concat('px') || null);
    // HtmlElemUtil.setProperty(this.hostRef, '--gmp-top', NumberUtil.str(top)?.concat('%') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-bottom', bottom);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-left', isFixRight ? null : '0');
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-right', isFixRight ? '0' : null);
  }
}

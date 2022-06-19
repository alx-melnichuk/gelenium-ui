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
    // Determine the height of the menu item by the properties of the "ul" element, it contains the "line height".
    this.innItemHeight = 24; // this.getItemHeight2(this.hostRef.nativeElement.getElementsByTagName('ul')[0]);
    // Determine the number of visible menu items.
    this.innVisibleCount = this.getVisibleCount(this.menuItems.length, this.visibleSize);
    this.activate(this.hostRef, this.innItemHeight * this.innVisibleCount, this.isFixRight);
  }

  @HostListener('document:mouseup', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public documentMouseup(event: Event): void {
    // If the mouse click is outside the area of the current element, then send an "outside" event.
    this.closing.emit();
  }

  @HostListener('document:keydown', ['$event'])
  public documentKeydown(event: KeyboardEvent): void {
    // 'ArrowDown', 'ArrowUp', 'Escape', 'Enter', 'Tab'
    switch (event.code) {
      case 'Escape':
        this.closing.emit();
        break;
    }
  }

  // ** Public API **

  public trackByMenuItem(index: number, item: GlnMenuItemComponent): string {
    return String(item.value) + '#' + String(item.label);
  }
  // If the mouse click is inside the area of the current item, then determine the selected menu item.
  public doMouseupItem(event: Event): void {
    event.stopPropagation();
    const dataValue = (event.target as Element).getAttribute('data-value') || '';
    const result: GlnMenuItemComponent | null = this.findMeniItemByValue(this.menuItems, dataValue);
    if (!!result && !result.disabled) {
      // console.log(`result.label='${result.label}', result.value='${result.value}'`); // TODO del;
      this.selected.emit(result);
    }
  }

  // ** Private API **

  private findMeniItemByValue(menuItems: GlnMenuItemComponent[], value: unknown): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    for (let i = 0; i < menuItems.length && !result; i++) {
      result = menuItems[i].value === value ? menuItems[i] : result;
    }
    return result;
  }

  private getVisibleCount(itemsLength: number, sizeVisible: number): number {
    return sizeVisible > 0 && sizeVisible < itemsLength ? sizeVisible : itemsLength;
  }

  private getItemHeight(elem: ElementRef<HTMLElement>): number {
    const styleDeclaration = getComputedStyle(elem.nativeElement);
    // Get the css value of the "top indent" variable.
    const liPaddingTop = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-tp').replace('px', ''));
    // Get the css value of the "bottom indent" variable.
    const liPaddingBottom = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-bt').replace('px', ''));
    const elementUl: HTMLElement = elem.nativeElement.getElementsByTagName('ul')[0] as HTMLElement;
    const d = Number(getComputedStyle(elementUl).getPropertyValue('line-height').replace('px', ''));
    // Get the line height from the style set.
    const lineHeight = Number(styleDeclaration.getPropertyValue('line-height').replace('px', ''));

    return liPaddingTop + lineHeight + liPaddingBottom;
  }
  private getItemHeight2(elem: HTMLElement): number {
    const styleDeclaration = getComputedStyle(elem);
    // Get the css value of the "top indent" variable.
    const liPaddingTop = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-tp').replace('px', ''));
    // Get the css value of the "bottom indent" variable.
    const liPaddingBottom = Number(styleDeclaration.getPropertyValue('--glnmip-li-pd-bt').replace('px', ''));
    // Get the line height from the style set.
    const lineHeight = Number(styleDeclaration.getPropertyValue('line-height').replace('px', ''));

    return liPaddingTop + lineHeight + liPaddingBottom;
  }

  private isDownValue(parent: HTMLElement, itemsLength: number): boolean {
    const rect = parent.getBoundingClientRect();
    const value = Math.round(rect.top * 100) / 100 + Math.round(rect.height * 100) / 100 + itemsLength;
    // const screen = new Screen();
    return true; // value < screen.height;
  }

  private activate(hostRef: ElementRef<HTMLElement>, height: number, isFixRight: boolean | null): void {
    const parent = hostRef.nativeElement.parentElement as HTMLElement;
    const isDown = false; // this.isDownValue(parent, height);
    // const top = isDown ? /*parent.offsetHeight*/ 100 : null;
    const bottom = isDown ? null : 'calc(var(--glns-frameSize) + 4px)'; // parent.offsetHeight + 2; // ;
    const left = isFixRight ? null : 0;
    const right = isFixRight ? 0 : null;
    HtmlElemUtil.setProperty(this.hostRef, '--glnmip-ul-height', NumberUtil.str(height)?.concat('px') || null);
    // HtmlElemUtil.setProperty(this.hostRef, '--gmp-top', NumberUtil.str(top)?.concat('%') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-bottom', bottom);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-left', NumberUtil.str(left)?.concat('px') || null);
    HtmlElemUtil.setProperty(this.hostRef, '--gmp-right', NumberUtil.str(right)?.concat('px') || null);
  }
}

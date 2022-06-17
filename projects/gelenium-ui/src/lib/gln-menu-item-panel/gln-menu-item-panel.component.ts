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
  readonly outside: EventEmitter<void> = new EventEmitter();

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
    // Determine the height of the menu item by the properties of the "ul" element, it contains the "line height".
    this.innItemHeight = 24; // this.getItemHeight2(this.hostRef.nativeElement.getElementsByTagName('ul')[0]);
    // Determine the number of visible menu items.
    this.innVisibleCount = this.getVisibleCount(this.menuItems.length, this.visibleSize);
    this.activate(this.hostRef, this.innItemHeight * this.innVisibleCount, this.isFixRight);
  }

  @HostListener('document:mousedown', ['$event'])
  public documentClick(event: Event): void {
    const withinBoundaries = event.composedPath().includes(this.hostRef.nativeElement);
    if (withinBoundaries) {
      // If the mouse click is inside the area of the current item, then determine the selected menu item.
      this.handlerClick(event);
    } else {
      // If the mouse click is outside the area of the current element, then send an "outside" event.
      this.outside.emit();
    }
  }

  // ** Public API **

  public trackByMenuItem(index: number, item: GlnMenuItemComponent): string {
    return String(item.value) + '#' + String(item.label);
  }
  // Determine the selected menu item.
  public handlerClick(event: Event): void {
    event.stopPropagation();
    const dataValue = (event.target as Element).getAttribute('data-value') || '';
    const result: GlnMenuItemComponent | null = this.findMeniItemByValue(this.menuItems, dataValue);
    if (!!result && !result.disabled) {
      console.log(`result.label='${result.label}', result.value='${result.value}'`); // TODO del;
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
    console.log(`1.getItemHeight() lineHeight=${lineHeight} d=${d}`); // TODO del;

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
    console.log(`3.getItemHeight() lineHeight=${lineHeight}`); // TODO del;

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

  private activate(hostRef: ElementRef<HTMLElement>, height: number, isFixRight: boolean | null): void {
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

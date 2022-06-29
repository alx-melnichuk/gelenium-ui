import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GlnMenuItemBarComponent } from '../gln-menu-item-bar/gln-menu-item-bar.component';

import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';

import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ScreenUtil } from '../_utils/screen.util';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-menu-item-bar-show',
  exportAs: 'glnMenuItemBarShow',
  templateUrl: './gln-menu-item-bar-show.component.html',
  styleUrls: ['./gln-menu-item-bar-show.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnMenuItemBarShowComponent implements OnChanges, AfterViewInit {
  @Input()
  public id = `glnmibs-${uniqueIdCounter++}`;
  @Input()
  public isFixRight: boolean | null = null;
  @Input()
  public menuItemList!: QueryList<GlnMenuItemComponent>;
  @Input()
  public visibleSize = -1;

  @ViewChild(GlnMenuItemBarComponent, { static: true })
  public menuItemBar!: GlnMenuItemBarComponent;

  public menuItemHeight = 0;
  public visibleCount = 0;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isFixRight) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'is-fix-right', !!this.isFixRight);
    }
  }

  public ngAfterViewInit(): void {
    const heightMenuItemBar = this.getHeightMenuItemBar(this.menuItemBar.hostRef.nativeElement);
    const isDown = this.isDownValue(this.hostRef.nativeElement.parentElement, heightMenuItemBar);
    this.settingElementPosition(this.hostRef, this.isFixRight, isDown);
    this.changeDetectorRef.markForCheck();
  }

  // ** Public API **

  // ** Private API **

  private getHeightMenuItemBar(elemMenuItemBar: HTMLElement): number {
    return Number(getComputedStyle(elemMenuItemBar).getPropertyValue('height').replace('px', ''));
  }

  private isDownValue(parentElement: HTMLElement | null, heightMenuItemBar: number): boolean {
    let result = true;
    if (parentElement) {
      const rect = parentElement.getBoundingClientRect();
      const top = Math.round(rect.top * 100) / 100;
      const height = Math.round(rect.height * 100) / 100;
      const value = top + height + heightMenuItemBar;
      const screenHeight = ScreenUtil.getHeight();
      result = value < screenHeight;
    }
    return result;
  }

  private settingElementPosition(hostRef: ElementRef<HTMLElement>, isFixRight: boolean | null, isDown: boolean | null): void {
    HtmlElemUtil.setProperty(hostRef, 'left', isFixRight ? null : '0');
    HtmlElemUtil.setProperty(hostRef, 'right', isFixRight ? '0' : null);
    HtmlElemUtil.setProperty(hostRef, 'top', isDown ? '100%' : null);
    HtmlElemUtil.setProperty(hostRef, 'bottom', isDown ? null : 'calc(100% + 0.375em)');
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GlnMenuItemBarComponent } from '../gln-menu-item-bar/gln-menu-item-bar.component';

import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';

import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
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
export class GlnMenuItemBarShowComponent implements OnChanges, OnInit, AfterViewInit {
  @Input()
  public id = `glnmibs-${uniqueIdCounter++}`;
  @Input()
  public isFixRight: boolean | null = null;
  @Input()
  public isShow: boolean | null = null;
  @Input()
  public menuItemList!: QueryList<GlnMenuItemComponent>;
  @Input()
  public noAnimation: boolean | null = null;
  @Input()
  public visibleSize = -1;

  @Output()
  readonly closing: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly hasAnimation: EventEmitter<boolean> = new EventEmitter();
  @Output()
  readonly selected: EventEmitter<GlnMenuItemComponent> = new EventEmitter();

  @ViewChild(GlnMenuItemBarComponent, { static: true })
  public menuItemBar!: GlnMenuItemBarComponent;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
  }

  @HostListener('animationstart')
  public animationStartHandling(): void {
    if (!this.noAnimation) {
      console.log(`^hasAnimation=true`); // TODO del;
      this.hasAnimation.emit(true);
    }
  }
  @HostListener('animationend')
  public animationEndHandling(): void {
    if (!this.noAnimation) {
      console.log(`^hasAnimation=false`); // TODO del;
      this.hasAnimation.emit(false);
    }
  }
  @HostListener('animationcancel')
  public animationCancelHandling(): void {
    if (!this.noAnimation) {
      console.log(`^^hasAnimation=false`); // TODO del;
      this.hasAnimation.emit(false);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isFixRight) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'is-fix-right', !!this.isFixRight);
    }
    if (changes.isShow && !this.noAnimation) {
      this.settingIsShow(this.renderer, this.hostRef, this.isShow);
    }
  }

  public ngOnInit(): void {
    if (!this.noAnimation) {
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'anm', '');
    }
  }

  public ngAfterViewInit(): void {
    const heightItemsBar = Number(getComputedStyle(this.menuItemBar.hostRef.nativeElement).getPropertyValue('height').replace('px', ''));
    if (!this.noAnimation) {
      const showHeight = -Math.round((heightItemsBar / 2) * 100) / 100;
      HtmlElemUtil.setProperty(this.hostRef, '--glnmibs-show-hg', NumberUtil.str(showHeight)?.concat('px') || null);
    }
    const isDown = this.isDownValue(this.hostRef.nativeElement.parentElement, heightItemsBar);
    this.settingElementPosition(this.hostRef, this.isFixRight, isDown);
    this.changeDetectorRef.markForCheck();
  }

  // ** Public API **

  public doClosing(): void {
    this.closing.emit();
  }

  // ** Private API **

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

  private settingElementPosition(elem: ElementRef<HTMLElement>, isFixRight: boolean | null, isDown: boolean | null): void {
    HtmlElemUtil.setProperty(elem, 'left', isFixRight ? null : '0');
    HtmlElemUtil.setProperty(elem, 'right', isFixRight ? '0' : null);
    HtmlElemUtil.setProperty(elem, 'top', isDown ? '100%' : null);
    HtmlElemUtil.setProperty(elem, 'bottom', isDown ? null : 'calc(100% + 0.375em)');
  }

  private settingIsShow(renderer: Renderer2, elem: ElementRef<HTMLElement>, isShow: boolean | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'is-open', isShow ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-open', !!isShow);
    HtmlElemUtil.setAttr(renderer, elem, 'is-hide', !isShow ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'is-hide', !isShow);
  }
}

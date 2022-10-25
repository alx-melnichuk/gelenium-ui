import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnAutocompletePosition } from './gln-autocomplete.interface';

export interface GlnAutocompletePanelConfig {
  hostRect: DOMRect;
  isWdFull: boolean;
  maxWidth: number;
  options: GlnOptionComponent[];
  originRect: DOMRect;
  position: string; // Horizontal position = 'start' | 'center' | 'end';
  visibleSize: number;
}

@Directive({
  selector: '[glnAutocompletePanel]',
})
export class GlnAutocompletePanelDirective implements OnInit, OnDestroy {
  @Input('glnAutocompletePanel')
  public config: GlnAutocompletePanelConfig | null | undefined;

  @Output()
  readonly attached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();
  @Output()
  readonly detached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();

  private borderRadius: number | null = null;
  private maxWidth: number | null = null;
  private minWidth: number | null = null;
  private left: number | null = null;
  private right: number | null = null;
  private top: number | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    const config = this.config;
    this.prepareCssBorderRadius(config?.originRect.height);
    this.prepareCssMaxHeight(config?.visibleSize || 0, this.getOptionHeight(config?.options || []));
    this.prepareCssMaxWidthAndMinWidth(config?.isWdFull, config?.originRect.width, config?.maxWidth);
    this.prepareCssLeftAndRight(config?.isWdFull, config?.position, config?.originRect, config?.hostRect.left);
    this.prepareCssTop(config?.originRect, config?.hostRect);

    this.settingCss(this.hostRef, this.borderRadius, this.left, this.right);

    this.attached.emit(this.hostRef);
  }

  public ngOnDestroy(): void {
    this.detached.emit(this.hostRef);
  }

  // ** Private methods **

  private prepareCssBorderRadius(originRectHeight?: number): void {
    this.borderRadius = null;
    if (originRectHeight && originRectHeight > 0) {
      this.borderRadius = originRectHeight > 0 ? NumberUtil.roundTo100(originRectHeight / 10) : null;
    }
    // HtmlElemUtil.setProperty(this.hostRef, '--glnacp-border-radius', NumberUtil.str(this.borderRadius)?.concat('px'));
  }
  // Should only be called after calling prepareCssMaxWidthAndMinWidth(), which specifies the width of the panel.
  private prepareCssLeftAndRight(isWdFull?: boolean, position?: string, originRect?: DOMRect, hostRectLeft?: number): void {
    this.left = null;
    this.right = null;
    if (isWdFull != null && originRect != null && hostRectLeft != null) {
      const isJoinOnLeftSide = NumberUtil.roundTo100(hostRectLeft - originRect.left) < 0.02;
      if (!isWdFull) {
        switch (position) {
          case GlnAutocompletePosition.center:
            const clientRect = this.hostRef.nativeElement.getBoundingClientRect();
            const delta = NumberUtil.roundTo100((originRect.width - clientRect.width) / 2);
            if (isJoinOnLeftSide) {
              this.left = delta;
            } else {
              this.right = delta;
            }
            break;
          case GlnAutocompletePosition.end:
            this.right = isJoinOnLeftSide ? -originRect.width : 0;
            break;
          default:
            // GlnAutocompletePosition.start
            this.left = isJoinOnLeftSide ? 0 : -originRect.width;
            break;
        }
      } else {
        // isWdFull
        this.left = isJoinOnLeftSide ? 0 : -originRect.width;
      }
    }
    // HtmlElemUtil.setProperty(this.hostRef, 'left', NumberUtil.str(this.left)?.concat('px'));
    // HtmlElemUtil.setProperty(this.hostRef, 'right', NumberUtil.str(this.right)?.concat('px'));
  }

  private prepareCssMaxWidthAndMinWidth(isWdFull?: boolean, originRectWidth?: number, maxWidth?: number): void {
    this.maxWidth = null;
    this.minWidth = null;
    if (originRectWidth != null) {
      this.minWidth = originRectWidth;
      if (isWdFull) {
        this.maxWidth = maxWidth != null && maxWidth > originRectWidth ? maxWidth : originRectWidth;
      }
    }
    HtmlElemUtil.setProperty(this.hostRef, 'min-width', NumberUtil.str(this.minWidth)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'max-width', NumberUtil.str(this.maxWidth)?.concat('px'));
  }

  private settingCss(elem: ElementRef<HTMLElement>, borderRadius: number | null, left: number | null, right: number | null): void {
    // Set Property 'borderRadius'.
    // Set Property 'left', 'right'.
    HtmlElemUtil.setProperty(elem, '--glnacp-border-radius', NumberUtil.str(borderRadius)?.concat('px'));
    HtmlElemUtil.setProperty(elem, 'left', NumberUtil.str(left)?.concat('px'));
    HtmlElemUtil.setProperty(elem, 'right', NumberUtil.str(right)?.concat('px'));
  }
  private prepareCssTop(originRect?: DOMRect, hostRect?: DOMRect): void {
    this.top = null;
    if (originRect != null && hostRect) {
      this.top = NumberUtil.roundTo100(originRect.bottom - hostRect.top);
    }
    HtmlElemUtil.setProperty(this.hostRef, 'top', NumberUtil.str(this.top)?.concat('px'));
  }

  private prepareCssMaxHeight(visibleSize: number, optionHeight: number): void {
    let maxHeightOfOptionsPanel: number | null = null;
    if (visibleSize > 0 && optionHeight > 0) {
      maxHeightOfOptionsPanel = optionHeight * visibleSize;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--glnacpo-max-height', NumberUtil.str(maxHeightOfOptionsPanel)?.concat('px'));
  }
  private getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
  /** Get the height of the option. */
  private getOptionHeight(options: GlnOptionComponent[]): number {
    const value: number[] = [];
    const count: number[] = [];
    let maxCount = -1;
    let resultIndex = -1;
    for (let i = 0; i < options.length && maxCount < 4; i++) {
      const height = this.getHeight(options[i].hostRef);
      let index = value.indexOf(height);
      if (index === -1) {
        value.push(height);
        count.push(1);
        index = value.length - 1;
      } else {
        count[index]++;
      }
      if (count[index] > maxCount) {
        maxCount = count[index];
        resultIndex = index;
      }
    }
    return resultIndex > -1 ? value[resultIndex] : 0;
  }
}

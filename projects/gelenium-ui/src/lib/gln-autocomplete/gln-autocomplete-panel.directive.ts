import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnAutocompletePosition } from './gln-autocomplete.interface';

export interface GlnAutocompletePanelConfig {
  hostRect: DOMRect;
  isWdOrigin: boolean;
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
    // Prepare and setting property 'borderRadius'.
    this.prepareCssBorderRadius(this.config?.originRect.height);
    this.settingCssBorderRadius(this.hostRef, this.borderRadius);

    // #// Prepare and setting property 'max-height'.
    // #this.prepareCssMaxHeight(this.config?.visibleSize || 0, this.getOptionHeight(this.config?.options || [])); /*+*/
    // #this.settingCssMaxHeight(this.hostRef, this.maxHeight); /*+*/

    // Prepare and setting properties: 'max-width', 'min-width'.
    this.prepareCssMaxWidthAndMinWidth(this.config?.isWdOrigin, this.config?.originRect.width, this.config?.maxWidth);
    this.settingCssMaxWidthAndMinWidth(this.hostRef, this.minWidth, this.maxWidth);

    // Prepare and setting properties: 'left', 'right'.
    this.prepareCssLeftAndRight(this.config?.isWdOrigin, this.config?.position, this.config?.originRect, this.config?.hostRect.left);
    this.settingCssLeftAndRight(this.hostRef, this.left, this.right);

    // Prepare and setting property 'top'.
    this.prepareCssTop(this.config?.originRect, this.config?.hostRect);
    this.settingCssTop(this.hostRef, this.top);

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
  }
  // #private prepareCssMaxHeight(visibleSize: number, optionHeight: number): void {
  // #  this.maxHeight = null;
  // #  if (visibleSize > 0 && optionHeight > 0) {
  // #    this.maxHeight = optionHeight * visibleSize;
  // #  }
  // #}
  private prepareCssMaxWidthAndMinWidth(isWdOrigin?: boolean, originRectWidth?: number, maxWidth?: number): void {
    this.maxWidth = null;
    this.minWidth = null;
    if (originRectWidth != null) {
      this.minWidth = originRectWidth;
      if (isWdOrigin) {
        this.maxWidth = maxWidth != null && maxWidth > originRectWidth ? maxWidth : originRectWidth;
      }
    }
  }
  // Should only be called after calling prepareCssMaxWidthAndMinWidth(), which specifies the width of the panel.
  private prepareCssLeftAndRight(isWdOrigin?: boolean, position?: string, originRect?: DOMRect, hostRectLeft?: number): void {
    this.left = null;
    this.right = null;
    if (isWdOrigin != null && originRect != null && hostRectLeft != null) {
      const isJoinOnLeftSide = NumberUtil.roundTo100(hostRectLeft - originRect.left) < 0.02;
      if (!isWdOrigin) {
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
        // isWdOrigin
        this.left = isJoinOnLeftSide ? 0 : -originRect.width;
      }
    }
  }
  private prepareCssTop(originRect?: DOMRect, hostRect?: DOMRect): void {
    this.top = null;
    if (originRect != null && hostRect) {
      this.top = NumberUtil.roundTo100(originRect.bottom - hostRect.top);
    }
  }

  private settingCssBorderRadius(elem: ElementRef<HTMLElement>, borderRadius: number | null): void {
    HtmlElemUtil.setProperty(elem, '--glnacp-border-radius', NumberUtil.str(borderRadius)?.concat('px'));
  }
  // #private settingCssMaxHeight(elem: ElementRef<HTMLElement>, maxHeight: number | null): void {
  // #  HtmlElemUtil.setProperty(elem, '--glnacpo-max-height', NumberUtil.str(maxHeight)?.concat('px'));
  // #}
  private settingCssMaxWidthAndMinWidth(elem: ElementRef<HTMLElement>, minWidth: number | null, maxWidth: number | null): void {
    HtmlElemUtil.setProperty(elem, 'min-width', NumberUtil.str(minWidth)?.concat('px'));
    HtmlElemUtil.setProperty(elem, 'max-width', NumberUtil.str(maxWidth)?.concat('px'));
  }
  private settingCssLeftAndRight(elem: ElementRef<HTMLElement>, left: number | null, right: number | null): void {
    HtmlElemUtil.setProperty(elem, 'left', NumberUtil.str(left)?.concat('px'));
    HtmlElemUtil.setProperty(elem, 'right', NumberUtil.str(right)?.concat('px'));
  }
  private settingCssTop(elem: ElementRef<HTMLElement>, top: number | null): void {
    HtmlElemUtil.setProperty(elem, 'top', NumberUtil.str(top)?.concat('px'));
  }

  private getHeight(value: ElementRef<HTMLElement> | null): number /*+*/ {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
  /** Get the height of the option. */
  private getOptionHeight(options: GlnOptionComponent[]): number /*+*/ {
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

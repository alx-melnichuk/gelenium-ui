import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnOptionListTrigger } from './gln-option-list-trigger.interface';
import { GlnOptionList, GlnOptionListPosition, GlnOptionListPositionUtil } from './gln-option-list.interface';

@Component({
  selector: 'gln-option-list',
  exportAs: 'glnOptionList',
  templateUrl: './gln-option-list.component.html',
  styleUrls: ['./gln-option-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnOptionListComponent }],
})
export class GlnOptionListComponent implements OnChanges, OnInit, GlnOptionList, GlnOptionParent {
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public visibleSize: number | null | undefined;
  @Input()
  public wdOrigin: string | null | undefined;

  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  // @Output()
  // readonly selected: EventEmitter<{ value: unknown | null; values: unknown[]; change: GlnSelectionChange<GlnOptionComponent> }> =
  //   new EventEmitter();

  /** List of possible options. */
  @ContentChildren(GlnOptionComponent, { descendants: true })
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  // public currConfig: GlnAutocompleteConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  // public hasPanelAnimation: boolean = false;
  public isOptionsPanelOpen: boolean = false;
  public isWdOrigin: boolean = false; // Binding attribute "wdOrigin".
  // public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public panelBorderRadius: number | null = null;
  public panelLeft: number | null = null;
  public panelMaxHeight: number | null = null;
  public panelMaxWidth: number | null = null;
  public panelMinWidth: number | null = null;
  public panelRight: number | null = null;
  public panelTop: number | null = null;
  public positionValue: GlnOptionListPosition = GlnOptionListPosition.start; // Binding attribute "position" ('start' | 'center' | 'end').
  public visibleSizeValue: number | null = null; // Binding attribute "visibleSize".

  // interface GlnOptionParent - start
  // checkmark?: boolean | null | undefined; // Only for multiple=true
  // multiple?: boolean | null | undefined;
  // noRipple?: boolean | null | undefined;
  // optionSelection(option: unknown): void;
  // setOptionsPanel?(value: GlnOptionsPanel): void;
  // interface GlnOptionParent - finish

  private optionListTrigger: GlnOptionListTrigger | null = null;
  // private optionsPanel: GlnOptionsPanel | null = null;
  private originRect: DOMRect | null = null;
  private optionHeight: number = 0;

  constructor(private renderer: Renderer2, public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {}
  // window.addEventListener('blur', function () {
  //   console.log(`window.addEventListener(blur)`); // #
  // });

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['position']) {
      this.positionValue = GlnOptionListPositionUtil.create(this.position || null);
    }
    if (changes['visibleSize']) {
      this.visibleSizeValue = this.visibleSize || null;
    }
    if (changes['wdOrigin']) {
      this.isWdOrigin = !!BooleanUtil.init(this.wdOrigin);
    }
  }

  ngOnInit(): void {
    // console.log(`OnInit()`); // #
  }

  // ** interface GlnOptionList - start **

  /** A sign that the panel is open. */
  public isPanelOpen = (): boolean => {
    return this.isOptionsPanelOpen;
  };
  /** Open the autocomplete suggestion panel. */
  public openPanel = (trigger: GlnOptionListTrigger | null): void => {
    this.optionListTrigger = trigger;
    this.originRect = this.optionListTrigger?.getOriginalRect() || null;
    if (!this.disabled && this.originRect != null && !this.isOptionsPanelOpen && this.options.length > 0) {
      const fontSize = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('font-size'); // '16px'
      const lineHeight = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height'); // '24px'

      // this.open(originRect, this.isWdOrigin, this.positionValue, this.visibleSizeValue || 0);
      // open(originRect: DOMRect | null, isWdOrigin: boolean, position: GlnAutocompletePosition, visibleSize: number): void {
      this.isOptionsPanelOpen = true;
      // console.log(`Panel();   origin left=${originRect.left} right=${originRect.right} top=${originRect.top} height=${originRect.height}`); // #
      const hostRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      // console.log(`Panel();   host   left=${hostRect.left} right=${hostRect.right} top=${hostRect.top} height=${hostRect.height}`); // #

      // this.optionsConfig = { options: this.options, visibleSize };
      // this.panelConfig = { hostRect, isWdOrigin, maxWidth, options: this.options, originRect, position, visibleSize };

      // Prepare and setting property 'borderRadius'.
      this.prepareCssBorderRadius(this.originRect.height);
      HtmlElemUtil.setProperty(this.hostRef, '--glnacp-border-radius', NumberUtil.str(this.panelBorderRadius)?.concat('px'));
      // Prepare and setting properties: 'max-width', 'min-width'.
      this.prepareCssMaxWidthAndMinWidth(this.isWdOrigin, this.originRect.width);
      // Prepare and setting properties: 'left', 'right'.
      this.prepareCssLeftAndRight(this.isWdOrigin, this.originRect.left, this.originRect.width, hostRect.left, this.position || undefined);
      // Prepare and setting property 'top'.
      this.prepareCssTop(this.originRect, hostRect);

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public closePanel = (): void => {
    this.isOptionsPanelOpen = false;
    this.optionListTrigger = null;
    this.originRect = null;
    // this.optionsPanel = null;
    this.changeDetectorRef.markForCheck();
    this.closed.emit();
  };
  /** Move the option marker by the amount of the offset. */
  public movingMarkedOption = (delta: number): void => {
    // this.optionsPanel?.movingMarkedOption(delta);
  };

  // ** interface GlnOptionList - finish **

  // ** interface GlnOptionParent - start **

  public optionSelection(optionItem: GlnOptionComponent): void {
    console.log(`optionSelection(); optionItem.value=`, optionItem.value); // #
    Promise.resolve().then(() => {
      if (this.optionListTrigger) {
        const value: string = optionItem.value as unknown as string;
        this.optionListTrigger.setValue(value);
        console.log(`optionSelection(); optionListTrigger.setValueForOriginal(String(optionItem.value));`); // #
        if (this.isOptionsPanelOpen) {
          this.optionListTrigger?.passFocus();
          this.closePanel();
        }
      }
    });
  }

  public setOptionsPanel(value: any /*GlnOptionsPanel*/): void {
    // this.optionsPanel = value;
    console.log(`setOptionsPanel() `, value); // #
    // console.log(`this.optionsPanel ${this.optionsPanel != null ? '!' : ''}=null`); // #
  }

  // ** interface GlnOptionParent - finish **

  public setMaxHeight(optionHeight: number): void {
    this.optionHeight = optionHeight;
    this.prepareCssMaxHeight(this.visibleSizeValue, this.optionHeight);
    HtmlElemUtil.setProperty(this.hostRef, '--glnacp-max-height', NumberUtil.str(this.panelMaxHeight)?.concat('px'));
  }

  // ** Private methods **

  private prepareCssBorderRadius(originRectHeight: number): void {
    this.panelBorderRadius = originRectHeight > 0 ? NumberUtil.roundTo100(originRectHeight / 10) : null;
  }
  private prepareCssMaxWidthAndMinWidth(isWdOrigin: boolean, originRectWidth: number): void {
    this.panelMinWidth = originRectWidth;
    this.panelMaxWidth = isWdOrigin ? originRectWidth : null;
  }
  // Should only be called after calling prepareCssMaxWidthAndMinWidth(), which specifies the width of the panel.
  private prepareCssLeftAndRight(isWdOrigin: boolean, originLeft: number, originWidth: number, hostLeft: number, position?: string): void {
    this.panelLeft = null;
    this.panelRight = null;
    const isJoinOnLeftSide = NumberUtil.roundTo100(hostLeft - originLeft) < 0.02;
    if (!isWdOrigin) {
      switch (position) {
        case GlnOptionListPosition.center:
          const clientRect = this.hostRef.nativeElement.getBoundingClientRect();
          const delta = NumberUtil.roundTo100((originWidth - clientRect.width) / 2);
          if (isJoinOnLeftSide) {
            this.panelLeft = delta;
          } else {
            this.panelRight = delta;
          }
          break;
        case GlnOptionListPosition.end:
          this.panelRight = isJoinOnLeftSide ? -originWidth : 0;
          break;
        default:
          // GlnOptionListPosition.start
          this.panelLeft = isJoinOnLeftSide ? 0 : -originWidth;
          break;
      }
    } else {
      // isWdOrigin
      this.panelLeft = isJoinOnLeftSide ? 0 : -originWidth;
    }
  }
  private prepareCssTop(originRect: DOMRect, hostRect: DOMRect): void {
    this.panelTop = NumberUtil.roundTo100(originRect.bottom - hostRect.top);
  }
  private prepareCssMaxHeight(visibleSize: number | null, optionHeight: number): void {
    this.panelMaxHeight = null;
    if (visibleSize != null && visibleSize > 0 && optionHeight > 0) {
      this.panelMaxHeight = optionHeight * visibleSize;
    }
  }
}

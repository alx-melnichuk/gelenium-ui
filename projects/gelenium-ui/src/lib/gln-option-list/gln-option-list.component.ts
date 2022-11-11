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

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnOption } from '../gln-option/gln-option.interface';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnOptionList } from './gln-option-list.interface';
import { GlnOptionListScroll } from './gln-option-list-scroll.interface';
import { GlnOptionListTrigger } from './gln-option-list-trigger.interface';
import { GlnOptionUtil } from '../gln-option/gln-option.util';
import { GlnOptionListPosition, GlnOptionListPositionUtil } from './gln-option-list-position';

interface LeftRight {
  left: number | null;
  right: number | null;
}

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
  @Output()
  readonly selected: EventEmitter<GlnOption> = new EventEmitter();

  /** List of possible options. */
  @ContentChildren(GlnOptionComponent, { descendants: true })
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOption[] {
    return (this.optionList.toArray() as GlnOption[]) || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOption[]) {}

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

  private optionHeight: number = 0;
  private optionListScroll: GlnOptionListScroll | null = null;
  private optionListTrigger: GlnOptionListTrigger | null = null;
  // private optionsPanel: GlnOptionsPanel | null = null;
  private originRect: DOMRect | null = null;

  constructor(private renderer: Renderer2, public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {}

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
    const fontSize = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('font-size').replace('px', '') || '0');
    const lineHeight = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height').replace('px', '') || '0');
    this.optionHeight = GlnOptionUtil.getHeightOption(fontSize, lineHeight);
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
      this.isOptionsPanelOpen = true;
      const hostRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();

      // Prepare and setting property 'border-radius'.
      this.panelBorderRadius = this.originRect.height > 0 ? NumberUtil.roundTo100(this.originRect.height / 10) : null;
      HtmlElemUtil.setProperty(this.hostRef, '--glnolpn--border-radius', NumberUtil.str(this.panelBorderRadius)?.concat('px'));

      // Prepare and setting property 'max-height'.
      const visibleSize = this.visibleSizeValue;
      this.panelMaxHeight = visibleSize != null && visibleSize > 0 && this.optionHeight > 0 ? this.optionHeight * visibleSize : 0;
      HtmlElemUtil.setProperty(this.hostRef, '--glnolpn--max-height', NumberUtil.str(this.panelMaxHeight)?.concat('px'));

      // Prepare and setting properties: 'max-width', 'min-width'.
      this.panelMinWidth = this.originRect.width;
      this.panelMaxWidth = this.isWdOrigin ? this.originRect.width : null;

      // Prepare and setting properties: 'left', 'right'.
      const position = this.position || undefined;
      const resLeftRight = this.getCssLeftRight(this.isWdOrigin, this.originRect.left, this.originRect.width, hostRect.left, position);
      this.panelLeft = resLeftRight.left;
      this.panelRight = resLeftRight.right;

      // Prepare and setting property 'top'.
      this.panelTop = NumberUtil.roundTo100(this.originRect.bottom - hostRect.top);

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public closePanel = (): void => {
    this.isOptionsPanelOpen = false;
    this.optionListTrigger = null;
    this.originRect = null;
    this.changeDetectorRef.markForCheck();
    this.closed.emit();
  };
  /** Move the option marker by the amount of the offset. */
  public moveMarkedOption = (delta: number): void => {
    this.optionListScroll?.moveMarkedOption(delta);
  };

  // ** interface GlnOptionList - finish **

  // ** interface GlnOptionParent - start **

  public optionSelection(optionItem: GlnOption): void {
    console.log(`optionSelection(); optionItem.value=`, optionItem.getValue()); // #

    Promise.resolve().then(() => {
      this.selected.emit(optionItem);
      const value: string | null | undefined = optionItem.getValue<string>();
      this.optionListTrigger?.setValue(value);
      console.log(`optionSelection(); this.optionListTrigger.setValue(value);`); // #
      if (this.isOptionsPanelOpen) {
        this.optionListTrigger?.passFocus();
        this.closePanel();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  public optionListScrollAttached(value: GlnOptionListScroll): void {
    console.log(`optionListScrollAttached()`, value); // #
    this.optionListScroll = value;
  }

  // ** Private methods **

  // Should only be called after calling prepareCssMaxWidthAndMinWidth(), which specifies the width of the panel.
  private getCssLeftRight(isWdOrigin: boolean, originLeft: number, originWidth: number, hostLeft: number, position?: string): LeftRight {
    const result: LeftRight = { left: null, right: null };
    const isJoinOnLeftSide = NumberUtil.roundTo100(hostLeft - originLeft) < 0.02;
    if (!isWdOrigin) {
      switch (position) {
        case GlnOptionListPosition.center:
          const clientRect = this.hostRef.nativeElement.getBoundingClientRect();
          const delta = NumberUtil.roundTo100((originWidth - clientRect.width) / 2);
          if (isJoinOnLeftSide) {
            result.left = delta;
          } else {
            result.right = delta;
          }
          break;
        case GlnOptionListPosition.end:
          result.right = isJoinOnLeftSide ? -originWidth : 0;
          break;
        default:
          // GlnOptionListPosition.start
          result.left = isJoinOnLeftSide ? 0 : -originWidth;
          break;
      }
    } else {
      // isWdOrigin
      result.left = isJoinOnLeftSide ? 0 : -originWidth;
    }
    return result;
  }
}

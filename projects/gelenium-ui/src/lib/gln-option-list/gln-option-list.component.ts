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
import { GlnOptionUtil } from '../gln-option/gln-option.util';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnOptionList, GlnOptionListPosition, GlnOptionListPositionUtil } from './gln-option-list.interface';
import { GlnOptionListScroll } from './gln-option-list-scroll.interface';
import { GlnOptionListTrigger } from './gln-option-list-trigger.interface';

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
  public isMaxWd: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;

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
  public hasPanelAnimation: boolean = false;
  public isMaxWidth: boolean = false; // Binding attribute "isMaxWd".
  public isOptionsPanelOpen: boolean = false;
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public panelBorderRadius: number | null = null;
  public panelLeft: number | null = null;
  public panelMaxHeight: number | null = null;
  public panelMaxWidth: number | null = null;
  public panelMinWidth: number | null = null;
  public panelRight: number | null = null;
  public panelTop: number | null = null;
  public positionValue: GlnOptionListPosition = GlnOptionListPosition.start; // Binding attribute "position" ('start' | 'center' | 'end').
  public visibleSizeValue: number | null = null; // Binding attribute "visibleSize".

  protected optionHeight: number = 0;
  protected optionListScroll: GlnOptionListScroll | null = null;
  protected optionListTrigger: GlnOptionListTrigger | null = null;
  protected originRect: DOMRect | null = null;

  constructor(protected renderer: Renderer2, public hostRef: ElementRef<HTMLElement>, protected changeDetectorRef: ChangeDetectorRef) {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-option-list', true);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'gln-option-list', '');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['isMaxWd']) {
      this.isMaxWidth = !!BooleanUtil.init(this.isMaxWd);
    }
    if (changes['isNoAnimation']) {
      this.noAnimation = !!BooleanUtil.init(this.isNoAnimation);
    }
    if (changes['position']) {
      this.positionValue = GlnOptionListPositionUtil.create(this.position || null);
    }
    if (changes['visibleSize']) {
      this.visibleSizeValue = this.visibleSize || null;
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
  public open = (trigger: GlnOptionListTrigger | null): void => {
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
      this.panelMaxHeight = visibleSize != null && visibleSize > 0 && this.optionHeight > 0 ? this.optionHeight * visibleSize : null;
      HtmlElemUtil.setProperty(this.hostRef, '--glnolpn--max-height', NumberUtil.str(this.panelMaxHeight)?.concat('px'));

      // Prepare and setting properties: 'max-width', 'min-width'.
      this.panelMinWidth = this.originRect.width;
      this.panelMaxWidth = this.isMaxWidth ? this.originRect.width : null;

      // Prepare and setting properties: 'left', 'right'.
      this.panelLeft = null;
      this.panelRight = null;
      if (!this.isNotMaxWidthAndPositionCenter(this.isMaxWidth, this.positionValue)) {
        const isJoinOnLeft = hostRect.left === this.originRect.left;
        if (this.isMaxWidth || (!this.isMaxWidth && GlnOptionListPosition.start === this.positionValue)) {
          this.panelLeft = isJoinOnLeft ? 0 : -this.originRect.width;
        } else if (!this.isMaxWidth && GlnOptionListPosition.end === this.positionValue) {
          this.panelRight = isJoinOnLeft ? -this.originRect.width : 0;
        }
        HtmlElemUtil.setProperty(this.hostRef, '--glnolpn--panel-left', NumberUtil.str(this.panelLeft)?.concat('px'));
        HtmlElemUtil.setProperty(this.hostRef, '--glnolpn--panel-right', NumberUtil.str(this.panelRight)?.concat('px'));
      }

      // Prepare and setting property 'top'.
      this.panelTop = NumberUtil.roundTo100(this.originRect.bottom - hostRect.top);

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public close = (options?: { noAnimation?: boolean }): void => {
    this.isOptionsPanelOpen = false;
    this.optionListTrigger = null;
    this.originRect = null;

    this.changeDetectorRef.markForCheck();
    this.closed.emit();
  };
  /** Get the option marked. */
  public getMarkedOption = (): GlnOption | null => {
    return this.optionListScroll?.getMarkedOption() || null;
  };
  /** Move the marked option by the key. */
  public moveMarkedOptionByKey = (keyboardKey: string): void => {
    this.optionListScroll?.moveMarkedOptionByKey(keyboardKey);
  };
  /** Set the marked option as selected. */
  public setMarkedOptionAsSelected = (): void => {
    const option: GlnOption | null = this.optionListScroll?.getMarkedOption() || null;
    console.log(`setMarkedOptionAsSelected(); option.value=`, option?.getValue()); // #
    if (option !== null) {
      this.setOptionSelected(option);
    }
  };
  // ** interface GlnOptionList - finish **

  // ** interface GlnOptionParent - start **

  /** Set the option as selected. */
  public setOptionSelected(optionItem: GlnOption): void {
    console.log(`setOptionSelected(); optionItem.value=`, optionItem.getValue()); // #

    Promise.resolve().then(() => {
      this.selected.emit(optionItem);
      const value: string | null | undefined = optionItem.getValue<string>();
      this.optionListTrigger?.setValue(value);
      console.log(`setOptionSelected(); this.optionListTrigger.setValue(value);`); // #
      if (this.isOptionsPanelOpen) {
        this.optionListTrigger?.passFocus();
        this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  public optionListScrollAttached(value: GlnOptionListScroll): void {
    console.log(`optionListScrollAttached()`, value); // #
    this.optionListScroll = value;
  }

  public isNotMaxWidthAndPositionCenter(isWdOrigin: boolean, positionValue: GlnOptionListPosition): boolean {
    return !isWdOrigin && GlnOptionListPosition.center === positionValue;
  }

  public log(text: string): void {
    console.log(text);
  }

  // ** Private methods **
}

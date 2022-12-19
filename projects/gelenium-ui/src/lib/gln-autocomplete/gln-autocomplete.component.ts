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
import { GlnOptionsScroll } from '../gln-option/gln-options-scroll.interface';
import { GlnOptionUtil } from '../gln-option/gln-option.util';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnAutocomplete } from './gln-autocomplete.interface';
import { GlnAutocompletePosition, GlnAutocompletePositionUtil } from './gln-autocomplete-position.util';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';
import { GlnAutocompleteOpenUtil } from './gln-autocomplete-open.util';

const CSS_PROP_BORDER_RADIUS = '--glnolp--border-radius';
const CSS_PROP_BOTTOM = '--glnolp--bottom';
const CSS_PROP_LEFT = '--glnolp--left';
const CSS_PROP_MAX_HEIGHT = '--glnolp--max-height';
const CSS_PROP_MAX_WIDTH = '--glnolp--max-width';
const CSS_PROP_MIN_WIDTH = '--glnolp--min-width';
const CSS_PROP_RIGHT = '--glnolp--right';
const CSS_PROP_TOP = '--glnolp--top';
const CSS_PROP_TRANSLATE_Y = '--glnolp--translate-y';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-autocomplete',
  exportAs: 'glnAutocomplete',
  templateUrl: './gln-autocomplete.component.html',
  styleUrls: ['./gln-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnAutocompleteComponent }],
})
export class GlnAutocompleteComponent implements OnChanges, OnInit, GlnAutocomplete, GlnOptionParent {
  @Input()
  public id = `glnac-${uniqueIdCounter++}`;
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
  public isPanelOnTop: boolean = false;
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public panelBorderRadius: number | null = null;
  public panelBottom: number | null = null;
  public panelLeft: number | null = null;
  public panelMaxHeight: number | null = null;
  public panelMaxWidth: number | null = null;
  public panelMinWidth: number | null = null;
  public panelRight: number | null = null;
  public panelTop: number | null = null;
  public positionValue: GlnAutocompletePosition = GlnAutocompletePosition.start; // Binding attribute "position" ('start'|'center'|'end').
  public visibleSizeValue: number | null = null; // Binding attribute "visibleSize".

  protected containerRef: ElementRef<HTMLElement> | null = null;
  protected optionHeight: number = 0;
  protected optionsScroll: GlnOptionsScroll | null = null;
  protected optionListTrigger: GlnAutocompleteTrigger | null = null;
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
      this.positionValue = GlnAutocompletePositionUtil.create(this.position || null);
    }
    if (changes['visibleSize']) {
      this.visibleSizeValue = this.visibleSize || null;
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

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
  public open = (trigger: GlnAutocompleteTrigger | null): void => {
    this.optionListTrigger = trigger;
    this.originRect = this.optionListTrigger?.getOriginalRect() || null;

    if (!this.disabled && this.originRect != null && !this.isOptionsPanelOpen && this.options.length > 0) {
      this.isOptionsPanelOpen = true;
      // Add the current object to the list of elements with the panel open.
      GlnAutocompleteOpenUtil.add(this);

      // Prepare and setting property 'max-height'.
      const visibleSize = this.visibleSizeValue;
      this.panelMaxHeight = visibleSize != null && visibleSize > 0 && this.optionHeight > 0 ? this.optionHeight * visibleSize : null;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_HEIGHT, NumberUtil.str(this.panelMaxHeight)?.concat('px'));

      // Prepare and setting property: 'min-width'.
      this.panelMinWidth = this.originRect.width;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MIN_WIDTH, NumberUtil.str(this.panelMinWidth)?.concat('px'));

      // Prepare and setting property: 'max-width'.
      this.panelMaxWidth = this.isMaxWidth ? this.originRect.width : null;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_WIDTH, NumberUtil.str(this.panelMaxWidth)?.concat('px'));

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public close = (options?: { noAnimation?: boolean }): void => {
    if (!this.disabled && this.originRect != null && this.isOptionsPanelOpen) {
      this.isOptionsPanelOpen = false;
      // Remove the current object from the list of items with the panel open.
      GlnAutocompleteOpenUtil.remove(this);

      this.optionListTrigger = null;
      this.originRect = null;
      if (this.hasPanelAnimation && options?.noAnimation) {
        this.hasPanelAnimation = false;
      }
      this.containerRef = null;

      this.changeDetectorRef.markForCheck();
      this.closed.emit();
    }
  };
  /** Get the option marked. */
  public getMarkedOption = (): GlnOption | null => {
    return this.optionsScroll?.getMarkedOption() || null;
  };
  /** Move the marked option by the key. */
  public moveMarkedOptionByKey = (keyboardKey: string): void => {
    this.optionsScroll?.moveMarkedOptionByKey(keyboardKey);
  };
  /** Set the marked option as selected. */
  public setMarkedOptionAsSelected = (): void => {
    const option: GlnOption | null = this.optionsScroll?.getMarkedOption() || null;
    console.log(`setMarkedOptionAsSelected(); option.value=`, option?.value); // #
    if (option !== null) {
      this.setOptionSelected(option);
    }
  };
  // ** interface GlnOptionList - finish **

  // ** interface GlnOptionParent - start **

  /** Set the option as selected. */
  public setOptionSelected(optionItem: GlnOption): void {
    console.log(`setOptionSelected(); optionItem.value=`, optionItem.value); // #

    Promise.resolve().then(() => {
      this.selected.emit(optionItem);
      const value: string | null | undefined = optionItem.value as string;
      this.optionListTrigger?.setValue(value);
      console.log(`setOptionSelected(); this.optionListTrigger.setValue(value);`); // #
      if (this.isOptionsPanelOpen) {
        this.optionListTrigger?.passFocus();
        this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  public cleanProperties(): void {}

  public containerAttached(container: HTMLElement | null, originRect: DOMRect | null): void {
    if (originRect != null && container != null) {
      this.containerRef = HtmlElemUtil.getElementRef(container);
      const containerRect: DOMRect = container.getBoundingClientRect();
      const panelHeight = this.getHeight(this.containerRef);
      this.isPanelOnTop = this.isCheckPanelOnTop(originRect, panelHeight, ScreenUtil.getHeight());

      // Prepare property 'border-radius'.
      this.panelBorderRadius = originRect.height > 0 ? NumberUtil.roundTo100(originRect.height / 10) : null;
      // Setting property 'border-radius'.
      HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_BORDER_RADIUS, NumberUtil.str(this.panelBorderRadius)?.concat('px'));

      // Prepare properties: 'bottom', 'top'.
      this.panelBottom = this.isPanelOnTop ? -(NumberUtil.roundTo100(originRect.top - containerRect.top) - 1) : null;
      this.panelTop = this.isPanelOnTop ? null : NumberUtil.roundTo100(originRect.bottom - containerRect.top);
      // Setting properties: 'bottom', 'top'.
      HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_BOTTOM, NumberUtil.str(this.panelBottom)?.concat('px'));
      HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_TOP, NumberUtil.str(this.panelTop)?.concat('px'));

      // Prepare properties: 'left', 'right'.
      const isJoinOnLeft = containerRect.left === originRect.left;
      // Default - GlnAutocompletePosition.start === this.positionValue
      this.panelLeft = isJoinOnLeft ? 0 : -originRect.width;
      this.panelRight = null;
      if (!this.isMaxWidth) {
        if (GlnAutocompletePosition.center === this.positionValue) {
          const delta = NumberUtil.roundTo100((originRect.width - containerRect.width) / 2);
          this.panelLeft = isJoinOnLeft ? delta : null;
          this.panelRight = isJoinOnLeft ? null : delta;
        } else if (GlnAutocompletePosition.end === this.positionValue) {
          this.panelLeft = null;
          this.panelRight = isJoinOnLeft ? -originRect.width : 0;
        }
      }
      // Setting properties: 'left', 'right'.
      HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_LEFT, NumberUtil.str(this.panelLeft)?.concat('px'));
      HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_RIGHT, NumberUtil.str(this.panelRight)?.concat('px'));

      // Prepare and setting property 'translate-y'.
      if (!this.noAnimation && panelHeight > 0) {
        HtmlElemUtil.setProperty(this.containerRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.isPanelOnTop, panelHeight));
      }
    }
  }

  public containerDetached(): void {
    this.panelBorderRadius = null;

    this.panelBottom = null;
    this.panelTop = null;

    this.panelLeft = null;
    this.panelRight = null;

    this.panelMaxHeight = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_HEIGHT, NumberUtil.str(this.panelMaxHeight)?.concat('px'));
    this.panelMinWidth = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MIN_WIDTH, NumberUtil.str(this.panelMinWidth)?.concat('px'));
    this.panelMaxWidth = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_WIDTH, NumberUtil.str(this.panelMaxWidth)?.concat('px'));
  }

  public optionsScrollAttached(value: GlnOptionsScroll): void {
    this.optionsScroll = value;
  }

  // ** Private methods **

  private isCheckPanelOnTop(triggerRect: DOMRect | null, panelHeight: number, screenHeight: number): boolean {
    let result = false;
    if (!!triggerRect && triggerRect.top > 0 && triggerRect.height > 0 && panelHeight > 0 && screenHeight > 0) {
      const value = triggerRect.top + triggerRect.height + panelHeight;
      result = value > screenHeight;
    }
    return result;
  }

  private getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }

  /** Define the "TranslateY" parameter to correctly open or close. */
  private getTranslateY(isPanelOnTop: boolean, panelHeight: number): string | null {
    let result: string | null = null;
    if (panelHeight > 0) {
      const delta = String(NumberUtil.roundTo100((panelHeight - 0.6 * panelHeight) / 2)).concat('px');
      result = (isPanelOnTop ? '' : '-') + delta;
    }
    return result;
  }
}

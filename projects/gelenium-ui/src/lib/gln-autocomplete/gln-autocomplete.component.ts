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

  protected optionHeight: number = 0;
  protected optionsScroll: GlnOptionsScroll | null = null;
  protected trigger: GlnAutocompleteTrigger | null = null;

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

  public getHostRect(): DOMRect {
    return this.hostRef.nativeElement.getBoundingClientRect();
  }

  public getTriggerRect(): DOMRect | null {
    return this.trigger?.getOriginalRect() || null;
  }

  // ** interface GlnAutocomplete - start **

  /** A sign that the panel is open. */
  public isPanelOpen = (): boolean => {
    return this.isOptionsPanelOpen;
  };

  public setTrigger = (trigger: GlnAutocompleteTrigger): void => {
    this.trigger = trigger;
  };
  /** Open the autocomplete suggestion panel. */
  public open = (): void => {
    const triggerRect = this.getTriggerRect();
    if (!this.disabled && triggerRect != null && !this.isOptionsPanelOpen && this.options.length > 0) {
      this.isOptionsPanelOpen = true;
      // Add the current object to the list of elements with the panel open.
      GlnAutocompleteOpenUtil.add(this);

      // Prepare and setting property 'max-height'.
      const visibleSize = this.visibleSizeValue;
      this.panelMaxHeight = visibleSize != null && visibleSize > 0 && this.optionHeight > 0 ? this.optionHeight * visibleSize : null;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_HEIGHT, NumberUtil.str(this.panelMaxHeight)?.concat('px'));

      // Prepare and setting property: 'min-width'.
      this.panelMinWidth = triggerRect.width;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MIN_WIDTH, NumberUtil.str(this.panelMinWidth)?.concat('px'));

      // Prepare and setting property: 'max-width'.
      this.panelMaxWidth = this.isMaxWidth ? triggerRect.width : null;
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_WIDTH, NumberUtil.str(this.panelMaxWidth)?.concat('px'));

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public close = (options?: { noAnimation?: boolean }): void => {
    if (!this.disabled && this.isOptionsPanelOpen) {
      this.isOptionsPanelOpen = false;
      // Remove the current object from the list of items with the panel open.
      GlnAutocompleteOpenUtil.remove(this);

      if (this.hasPanelAnimation && options?.noAnimation) {
        this.hasPanelAnimation = false;
      }

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
  // ** interface GlnAutocomplete - finish **

  // ** interface GlnOptionParent - start **

  /** Set the option as selected. */
  public setOptionSelected(optionItem: GlnOption): void {
    console.log(`setOptionSelected(); optionItem.value=`, optionItem.value); // #

    Promise.resolve().then(() => {
      this.selected.emit(optionItem);
      const value: string | null | undefined = optionItem.value as string;
      this.trigger?.setValue(value);
      console.log(`setOptionSelected(); this.optionListTrigger.setValue(value);`); // #
      if (this.isOptionsPanelOpen) {
        this.trigger?.passFocus();
        this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  // ** directive: GlnAutocompletePanel - start **

  public containerAttached(container: HTMLElement | null, triggerRect: DOMRect | null, hostRect: DOMRect | null): void {
    const containerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(container);
    if (containerRef != null && triggerRect != null) {
      const containerRect: DOMRect = containerRef.nativeElement.getBoundingClientRect();

      // Prepare and setting property 'border-radius'.
      this.panelBorderRadius = triggerRect.height > 0 ? NumberUtil.roundTo100(triggerRect.height / 10) : null;
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_BORDER_RADIUS, NumberUtil.str(this.panelBorderRadius)?.concat('px'));

      // Prepare properties: 'left', 'right'.
      const isJoinOnLeft = containerRect.left === triggerRect.left;
      // Default - GlnAutocompletePosition.start === this.positionValue
      this.panelLeft = isJoinOnLeft ? 0 : -triggerRect.width;
      this.panelRight = null;
      if (!this.isMaxWidth) {
        if (GlnAutocompletePosition.center === this.positionValue) {
          const delta = NumberUtil.roundTo100((triggerRect.width - containerRect.width) / 2);
          this.panelLeft = isJoinOnLeft ? delta : null;
          this.panelRight = isJoinOnLeft ? null : delta;
        } else if (GlnAutocompletePosition.end === this.positionValue) {
          this.panelLeft = null;
          this.panelRight = isJoinOnLeft ? -triggerRect.width : 0;
        }
      }
      // Setting properties: 'left', 'right'.
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_LEFT, NumberUtil.str(this.panelLeft)?.concat('px'));
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_RIGHT, NumberUtil.str(this.panelRight)?.concat('px'));
    }

    this.containerResize(container, triggerRect, hostRect);
  }

  public containerDetached(): void {
    this.panelBorderRadius = null;
    this.panelBottom = null;
    this.panelTop = null;
    this.panelLeft = null;
    this.panelRight = null;

    this.panelMaxHeight = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_HEIGHT, null);
    this.panelMinWidth = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MIN_WIDTH, null);
    this.panelMaxWidth = null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_MAX_WIDTH, null);
  }

  public containerResize(container: HTMLElement | null, triggerRect: DOMRect | null, hostRect: DOMRect | null): void {
    const containerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(container);
    if (containerRef != null && triggerRect != null && hostRect != null) {
      const panelHeight: number = this.getHeight(containerRef);
      const isPanelOnTop: boolean = triggerRect.top + triggerRect.height + panelHeight > ScreenUtil.getHeight();

      // Prepare properties: 'bottom', 'top'.
      this.panelBottom = isPanelOnTop ? -(NumberUtil.roundTo100(triggerRect.top - hostRect.top) - 1) : null;
      this.panelTop = isPanelOnTop ? null : NumberUtil.roundTo100(triggerRect.bottom - hostRect.top);
      // Setting properties: 'bottom', 'top'.
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_BOTTOM, NumberUtil.str(this.panelBottom)?.concat('px'));
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_TOP, NumberUtil.str(this.panelTop)?.concat('px'));

      // Prepare and setting property 'translate-y'.
      if (panelHeight > 0) {
        // Define the "TranslateY" parameter to correctly open or close.
        const translateY: number = (isPanelOnTop ? 1 : -1) * NumberUtil.roundTo100((panelHeight - 0.6 * panelHeight) / 2);
        HtmlElemUtil.setProperty(containerRef, CSS_PROP_TRANSLATE_Y, NumberUtil.str(translateY)?.concat('px'));
      }
    }
  }

  // ** directive: GlnAutocompletePanel - finish **

  // ** directive: GlnOptionsScroll - start **

  public setOptionsScroll(value: GlnOptionsScroll | null): void {
    this.optionsScroll = value;
  }

  // ** directive: GlnOptionsScroll - finish **

  // ** Private methods **

  private getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
}

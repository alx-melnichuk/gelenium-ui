import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnOption } from '../gln-option/gln-option.interface';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionsScroll } from '../gln-option/gln-options-scroll.interface';
import { GlnOptionUtil } from '../gln-option/gln-option.util';

import { GlnDebounceTimer } from '../_classes/gln-debounce-timer';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnAutocomplete } from './gln-autocomplete.interface';
import { GlnAutocompletePosition, GlnAutocompletePositionUtil } from './gln-autocomplete-position.util';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';
import { GlnAutocompleteOpenUtil } from './gln-autocomplete-open.util';
import { GlnAutocompleteConfig } from './gln-autocomplete-config.interface';

const CSS_PROP_WIDTH = '--glnac--width';
const CSS_PROP_JUSTIFY_CONTENT = '--glnac--justify-content';
const CSS_PROP_BORDER_RADIUS = '--glnac--border-radius';
const CSS_PROP_BOTTOM = '--glnacc--bottom';
const CSS_PROP_MAX_HEIGHT = '--glnac--max-height';
const CSS_PROP_MAX_WIDTH = '--glnac--max-width';
const CSS_PROP_TOP = '--glnacc--top';
const CSS_PROP_TRANSLATE_Y = '--glnacc--translate-y';

let uniqueIdCounter = 0;

export const GLN_AUTOCOMPLETE_CONFIG = new InjectionToken<GlnAutocompleteConfig>('GLN_AUTOCOMPLETE_CONFIG');

@Component({
  selector: 'gln-autocomplete',
  exportAs: 'glnAutocomplete',
  templateUrl: './gln-autocomplete.component.html',
  styleUrls: ['./gln-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnAutocompleteComponent }],
})
export class GlnAutocompleteComponent implements OnChanges, OnInit, OnDestroy, GlnAutocomplete, GlnOptionParent {
  @Input()
  public id = `glnac-${uniqueIdCounter++}`;
  @Input()
  public config: GlnAutocompleteConfig | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isMaxWd: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public visibleSize: number | null | undefined;

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

  public currConfig: GlnAutocompleteConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public hasPanelAnimation: boolean = false;
  public isMaxWidth: boolean | null = null; // Binding attribute "isMaxWd".
  public isPanelOpen: boolean = false;
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public positionValue: GlnAutocompletePosition | null = null; // Binding attribute "position" ('start'|'center'|'end').
  public visibleSizeValue: number | null = null; // Binding attribute "visibleSize".

  private optionHeight: number = 0;
  private optionListSub: Subscription | null = null;
  private optionsScroll: GlnOptionsScroll | null = null;
  private trigger: GlnAutocompleteTrigger | null = null;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_AUTOCOMPLETE_CONFIG) private rootConfig: GlnAutocompleteConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-option-list', true);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'gln-option-list', '');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['isMaxWd'] || (changes['config'] && this.isMaxWd == null && this.currConfig.isMaxWd != null)) {
      this.isMaxWidth = BooleanUtil.init(this.isMaxWd) ?? !!this.currConfig.isMaxWd;
      this.setCssMaxWidth(this.isMaxWidth, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.noAnimation = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionValue = GlnAutocompletePositionUtil.create(this.position || this.currConfig.position || null);
      this.setCssJustifyContent(this.positionValue, this.hostRef);
    }
    if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null && this.currConfig.visibleSize != null)) {
      this.visibleSizeValue = this.visibleSize || this.currConfig.visibleSize || null;
      this.setCssMaxHeight(this.optionHeight, this.visibleSizeValue, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    const lineHeight = HtmlElemUtil.propertyAsNumber(this.hostRef, 'line-height');
    this.optionHeight = GlnOptionUtil.getHeightOption(fontSize, lineHeight);

    if (this.isMaxWidth == null) {
      this.isMaxWidth = !!this.currConfig.isMaxWd;
      this.setCssMaxWidth(this.isMaxWidth, this.hostRef);
    }
    if (this.noAnimation == null) {
      this.noAnimation = !!this.currConfig.isNoAnimation;
    }
    if (this.positionValue == null) {
      this.positionValue = GlnAutocompletePositionUtil.create(this.currConfig.position || null);
      this.setCssJustifyContent(this.positionValue, this.hostRef);
    }
    if (this.visibleSizeValue == null) {
      this.visibleSizeValue = this.currConfig.visibleSize || null;
    }

    // Calling a method according to what is defined by this.optionHeight and this.visibleSizeValue.
    this.setCssMaxHeight(this.optionHeight, this.visibleSizeValue, this.hostRef);
  }

  public ngOnDestroy(): void {
    this.optionListSub?.unsubscribe();
  }

  public getHostRect(): DOMRect {
    return this.hostRef.nativeElement.getBoundingClientRect();
  }

  public getTriggerRect(): DOMRect | null {
    return this.trigger?.getOriginalRect() || null;
  }

  // ** interface GlnAutocomplete - start **

  /** A sign that the panel is open. */
  public isOpen = (): boolean => {
    return this.isPanelOpen;
  };
  /** Open the autocomplete suggestion panel. */
  public open = (): void => {
    if (!this.disabled && !this.isPanelOpen) {
      console.log(`AC.open();  isPanelOpen:${this.isPanelOpen} options.len:${this.optionList.length}`);

      if (this.optionListSub == null) {
        console.log(`AC.open();  optionListSub = optionList.changes.subscribe();`); //#
        // Set subscription: when changing the list of options, open the options panel.
        this.optionListSub = this.optionList.changes.subscribe((items: GlnOptionComponent[]) => {
          this.changeDetectorRef.markForCheck();
          console.log(`AC.optionList.changes() isPanelOpen:${this.isPanelOpen} panelOpening(); options:${this.options.length}`);
          this.panelOpening();
        });
      }
      // If the list of options is not empty, then the options panel will be opened.
      this.panelOpening();
    }
  };
  /** Close the autocomplete suggestion panel. */
  public close = (options?: { noAnimation?: boolean }): void => {
    if (!this.disabled && this.isPanelOpen) {
      this.isPanelOpen = false;
      console.log(`AC.close(); isPanelOpen=${this.isPanelOpen};`); // #
      // Remove the current object from the list of items with the panel open.
      GlnAutocompleteOpenUtil.remove(this);

      if (this.optionListSub != null) {
        console.log(`AC.close();  optionListSub = null;`); //#
      }
      this.optionListSub?.unsubscribe();
      this.optionListSub = null;
      console.log(``); // #

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
    console.log(`setMarkedOptionAsSelected(); option.value:`, option?.value); // #
    if (option !== null) {
      this.setOptionSelected(option);
    }
  };
  /** Set trigger object for autocomplete. */
  public setTrigger = (trigger: GlnAutocompleteTrigger | null): void => {
    this.trigger = trigger;
    const triggerRect: DOMRect | null = this.getTriggerRect();
    // Setting property 'width'.
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WIDTH, NumberUtil.str(triggerRect?.width || null)?.concat('px'));
    // Prepare and setting property 'border-radius'.
    const panelBorderRadius = !!triggerRect && triggerRect.height > 0 ? NumberUtil.roundTo100(triggerRect.height / 10) : null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_BORDER_RADIUS, NumberUtil.str(panelBorderRadius)?.concat('px'));
  };

  // ** interface GlnAutocomplete - finish **

  // ** interface GlnOptionParent - start **

  /** Set the option as selected. */
  public setOptionSelected(option: GlnOption): void {
    console.log(`AC.setOptionSelected(); option.value:`, option.value); // #

    Promise.resolve().then(() => {
      this.selected.emit(option);
      const value: string | null | undefined = option.value as string;
      this.trigger?.setValue(value);
      console.log(`AC.setOptionSelected(); this.optionListTrigger.setValue(value);`); // #
      if (this.isPanelOpen) {
        this.trigger?.passFocus();
        // this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  // ** directive: GlnAutocompletePanel - start **

  public containerResize(container: HTMLElement | null, triggerRect: DOMRect | null, hostRect: DOMRect | null): void {
    const containerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(container);
    if (containerRef != null && triggerRect != null && hostRect != null) {
      const panelHeight: number = HtmlElemUtil.propertyAsNumber(containerRef, 'height');
      const isPanelOnTop: boolean = triggerRect.top + triggerRect.height + panelHeight > ScreenUtil.getHeight();

      // Prepare properties: 'bottom', 'top'.
      const panelBottom = isPanelOnTop ? -(NumberUtil.roundTo100(triggerRect.top - hostRect.top) - 1) : null;
      const panelTop = isPanelOnTop ? null : NumberUtil.roundTo100(triggerRect.bottom - hostRect.top);
      // Setting properties: 'bottom', 'top'.
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_BOTTOM, NumberUtil.str(panelBottom)?.concat('px'));
      HtmlElemUtil.setProperty(containerRef, CSS_PROP_TOP, NumberUtil.str(panelTop)?.concat('px'));

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

  private panelOpening(): void {
    console.log(`AC.panelOpening() isPanelOpen:${this.isPanelOpen} options:${this.options.length}`);
    // If the list of options is not empty, then open the panel.
    if (!this.isPanelOpen && this.getTriggerRect() != null && this.options.length > 0) {
      this.isPanelOpen = true;
      console.log(`AC.panelOpening() isPanelOpen=${this.isPanelOpen};`); // #
      console.log(``); // #

      // Add the current object to the list of elements with the panel open.
      GlnAutocompleteOpenUtil.add(this);

      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Prepare and setting property: 'max-height'. */
  private setCssMaxHeight(optionHeight: number, visibleSizeValue: number | null, elem: ElementRef<HTMLElement> | null): void {
    const maxHeight = visibleSizeValue != null && visibleSizeValue > 0 && optionHeight > 0 ? optionHeight * visibleSizeValue : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MAX_HEIGHT, NumberUtil.str(maxHeight)?.concat('px'));
  }
  /** Prepare and setting property: 'max-width'. */
  private setCssMaxWidth(isMaxWidth: boolean | null, elem: ElementRef<HTMLElement> | null): void {
    const maxWidthStr: string | null = isMaxWidth ? `var(${CSS_PROP_WIDTH})` : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MAX_WIDTH, maxWidthStr);
  }
  /** Prepare and setting property: 'justify-content'. */
  private setCssJustifyContent(positionValue: GlnAutocompletePosition | null, elem: ElementRef<HTMLElement> | null): void {
    let justifyContent: string = 'flex-start';
    justifyContent = GlnAutocompletePosition.center === positionValue ? 'center' : justifyContent;
    justifyContent = GlnAutocompletePosition.end === positionValue ? 'flex-end' : justifyContent;
    // Setting properties: 'justify-content'.
    HtmlElemUtil.setProperty(elem, CSS_PROP_JUSTIFY_CONTENT, justifyContent);
  }
}

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

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnAutocomplete } from './gln-autocomplete.interface';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';
import { GlnAutocompleteOpenUtil } from './gln-autocomplete-open.util';
import { GlnAutocompleteConfig } from './gln-autocomplete-config.interface';

const CSS_PROP_BORDER_RADIUS = '--glnac--border-radius';
const CSS_PROP_BOTTOM = '--glnacc--bottom';
const CSS_PROP_JUSTIFY_CONTENT = '--glnac--justify-content';
const CSS_PROP_MAX_HEIGHT = '--glnac--max-height';
const CSS_PROP_MAX_WIDTH = '--glnac--max-width';
const CSS_PROP_TOP = '--glnacc--top';
const CSS_PROP_TRANSLATE_Y = '--glnacc--translate-y';
const CSS_PROP_WIDTH = '--glnac--width';

let uniqueIdCounter = 0;

export const GLN_AUTOCOMPLETE_CONFIG = new InjectionToken<GlnAutocompleteConfig>('GLN_AUTOCOMPLETE_CONFIG');

export const AUTOCOMPLETE_POSITION: { [key: string]: string } = { start: 'start', center: 'center', end: 'end' };

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
  public id: string = `glnac-${uniqueIdCounter++}`; // interface GlnAutocomplete
  @Input()
  public config: GlnAutocompleteConfig | null | undefined;
  @Input()
  public isClearOnEscape: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isMaxWd: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoCloseOnSelect: string | boolean | null | undefined;
  @Input()
  public isNoOpenOnMouse: string | boolean | null | undefined;
  @Input()
  /** This property to turn off the ripple effect. */
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isOpenOnFocus: string | boolean | null | undefined;
  @Input()
  /** Classes to be passed to the options panel. Supports the same syntax as `ngClass`. */
  public classes: string | string[] | Set<string> | { [key: string]: unknown } = '';
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
  public containerElem: HTMLElement | null = null;
  public clearOnEscape: boolean | null = null; // Binding attribute "isClearOnEscape". // interface GlnAutocomplete
  public disabled: boolean | null = null; // Binding attribute "isDisabled". // interface GlnAutocomplete
  public hasPanelAnimation: boolean = false;
  // The mouse button is pressed over the container options panel.
  public isContainerMousedown: boolean | null = false; // interface GlnAutocomplete
  public isMaxWdVal: boolean | null = null; // Binding attribute "isMaxWd".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoCloseOnSelectVal: boolean | null = null; // Binding attribute "isNoCloseOnSelect".
  public isPanelOpen: boolean = false;
  public noOpenOnMouse: boolean | null = null; // Binding attribute "isNoOpenOnMouse". // interface GlnAutocomplete
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public openOnFocus: boolean | null = null; // Binding attribute "isOpenOnFocus". // interface GlnAutocomplete
  public optionHeight: number = 0;
  public classesVal: string | string[] | Set<string> | { [key: string]: unknown } | undefined; // Binding attribute "classes"
  public positionVal: string | null = null; // Binding attribute "position" ('start'|'center'|'end').
  public visibleSizeVal: number | null = null; // Binding attribute "visibleSize".

  private optionListSub: Subscription | null = null;
  private optionsScroll: GlnOptionsScroll | null = null;
  private panelBottom: number | null | undefined;
  private panelTop: number | null | undefined;
  private selectedOption: GlnOption | null = null;
  private translateY: number | null | undefined;
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
    if (changes['isClearOnEscape'] || (changes['config'] && this.isClearOnEscape == null && this.currConfig.isClearOnEscape != null)) {
      this.clearOnEscape = BooleanUtil.init(this.isClearOnEscape) ?? !!this.currConfig.isClearOnEscape;
    }
    if (changes['isMaxWd'] || (changes['config'] && this.isMaxWd == null && this.currConfig.isMaxWd != null)) {
      this.isMaxWdVal = BooleanUtil.init(this.isMaxWd) ?? !!this.currConfig.isMaxWd;
      this.setCssMaxWidth(this.isMaxWdVal, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
    }
    if (
      changes['isNoCloseOnSelect'] ||
      (changes['config'] && this.isNoCloseOnSelect == null && this.currConfig.isNoCloseOnSelect != null)
    ) {
      this.isNoCloseOnSelectVal = BooleanUtil.init(this.isNoCloseOnSelect) ?? !!this.currConfig.isNoCloseOnSelect;
    }
    if (changes['isNoOpenOnMouse'] || (changes['config'] && this.isNoOpenOnMouse == null && this.currConfig.isNoOpenOnMouse != null)) {
      this.noOpenOnMouse = BooleanUtil.init(this.isNoOpenOnMouse) ?? !!this.currConfig.isNoOpenOnMouse;
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (changes['isOpenOnFocus'] || (changes['config'] && this.isOpenOnFocus == null && this.currConfig.isOpenOnFocus != null)) {
      this.openOnFocus = BooleanUtil.init(this.isOpenOnFocus) ?? !!this.currConfig.isOpenOnFocus;
    }
    if (changes['classes'] || (changes['config'] && this.classes == null && this.currConfig.classes != null)) {
      this.classesVal = this.classes || this.currConfig.classes;
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionVal = AUTOCOMPLETE_POSITION[this.position || this.currConfig.position || ''] || AUTOCOMPLETE_POSITION['start'];
      this.setCssJustifyContent(this.positionVal, this.hostRef);
    }
    if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null && this.currConfig.visibleSize != null)) {
      this.visibleSizeVal = this.visibleSize || this.currConfig.visibleSize || null;
      this.setCssMaxHeight(this.optionHeight, this.visibleSizeVal, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    const lineHeight = HtmlElemUtil.propertyAsNumber(this.hostRef, 'line-height');
    this.optionHeight = GlnOptionUtil.getHeightOption(fontSize, lineHeight);

    if (this.isClearOnEscape == null) {
      this.clearOnEscape = !!this.currConfig.isClearOnEscape;
    }
    if (this.isMaxWdVal == null) {
      this.isMaxWdVal = !!this.currConfig.isMaxWd;
      this.setCssMaxWidth(this.isMaxWdVal, this.hostRef);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!this.currConfig.isNoAnimation;
    }
    if (this.isNoCloseOnSelect == null) {
      this.isNoCloseOnSelectVal = !!this.currConfig.isNoCloseOnSelect;
    }
    if (this.isNoOpenOnMouse == null) {
      this.noOpenOnMouse = !!this.currConfig.isNoOpenOnMouse;
    }
    if (this.noRipple == null) {
      this.noRipple = !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (this.isOpenOnFocus == null) {
      this.openOnFocus = !!this.currConfig.isOpenOnFocus;
    }
    if (this.classesVal == null) {
      this.classesVal = this.currConfig.classes;
    }
    if (this.positionVal == null) {
      this.positionVal = AUTOCOMPLETE_POSITION[this.currConfig.position || ''] || AUTOCOMPLETE_POSITION['start'];
      this.setCssJustifyContent(this.positionVal, this.hostRef);
    }
    if (this.visibleSizeVal == null) {
      this.visibleSizeVal = this.currConfig.visibleSize || null;
    }

    // Calling a method according to what is defined by this.optionHeight and this.visibleSizeValue.
    this.setCssMaxHeight(this.optionHeight, this.visibleSizeVal, this.hostRef);
  }

  public ngOnDestroy(): void {
    this.optionListSub?.unsubscribe();
    this.optionListSub = null;
    if (this.selectedOption != null) {
      this.selectedOption.selected = false;
      this.selectedOption = null;
    }
  }

  // ** Public methods **

  public getHostRect(): DOMRect {
    return this.hostRef.nativeElement.getBoundingClientRect();
  }

  public getTriggerRect(): DOMRect | null {
    return this.trigger?.getOriginalRect() || null;
  }

  public getOptions(optionList: QueryList<GlnOptionComponent> | null): GlnOption[] {
    return (optionList?.toArray() as GlnOption[]) || [];
  }

  // ** interface GlnAutocomplete - start **

  /** A sign that the panel is open. */
  public isOpen = (): boolean => {
    return this.isPanelOpen;
  };
  /** Open the autocomplete suggestion panel. */
  public open = (): void => {
    if (!this.disabled && !this.isPanelOpen) {
      if (this.optionListSub == null) {
        // Set subscription: when changing the list of options, open the options panel.
        this.optionListSub = this.optionList.changes.subscribe(() => {
          this.panelOpening();
          Promise.resolve().then(() => {
            this.containerResize(this.containerElem, this.getTriggerRect(), this.getHostRect(), this.optionHeight);
          });
          this.changeDetectorRef.markForCheck();
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
      // Remove the current object from the list of items with the panel open.
      GlnAutocompleteOpenUtil.remove(this);
      this.optionListSub?.unsubscribe();
      this.optionListSub = null;
      if (this.hasPanelAnimation && options?.noAnimation) {
        this.hasPanelAnimation = false;
      }
      if (this.hasPanelAnimation) {
        this.containerResize(this.containerElem, this.getTriggerRect(), this.getHostRect(), this.optionHeight);
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
    this.setOptionSelected(option);
  };
  /** Set trigger object for autocomplete. */
  public setTrigger = (trigger: GlnAutocompleteTrigger | null): void => {
    this.trigger = trigger;
    const triggerRect: DOMRect | null = this.getTriggerRect();
    // Setting property 'width'.
    const triggerRectWidth: number | null = triggerRect?.width ?? null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_WIDTH, triggerRectWidth?.toString().concat('px'));
    // Prepare and setting property 'border-radius'.
    const triggerRectHeight: number | null = triggerRect?.height ?? 0;
    const panelBorderRadius: number | null = triggerRectHeight > 0 ? Math.round((triggerRectHeight / 10) * 100) / 100 : null;
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_BORDER_RADIUS, panelBorderRadius?.toString().concat('px'));
  };

  // ** interface GlnAutocomplete - finish **

  // ** interface GlnOptionParent - start **

  /** Set the option as selected. */
  public setOptionSelected(option: GlnOption | null): void {
    if (option != null) {
      Promise.resolve().then(() => {
        this.selected.emit(option);
        this.selectedOption = option;
        // Set a new value for the trigger (input element).
        this.trigger?.setValue(option.value as string);
        // If the options list panel is open.
        if (this.isPanelOpen) {
          // Send input focus to trigger (input element).
          this.trigger?.passFocus();
          if (!this.isNoCloseOnSelectVal) {
            // If the 'noCloseOnSelect' flag is specified, then close the options list panel.
            this.close();
          }
        }
      });
    }
  }

  // ** interface GlnOptionParent - finish **

  // ** directive: GlnAutocompletePanel - start **

  public containerAttached(container: HTMLElement | null, triggerRect: DOMRect | null, hostRect: DOMRect | null, optHeight: number): void {
    this.panelBottom = undefined;
    this.panelTop = undefined;
    this.translateY = undefined;
    this.containerElem = container;
    this.containerResize(container, triggerRect, hostRect, optHeight);
  }

  public containerResize(container: HTMLElement | null, triggerRect: DOMRect | null, hostRect: DOMRect | null, optHeight: number): void {
    const containerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(container);
    if (containerRef != null && triggerRect != null && hostRect != null) {
      const panelHeight: number = HtmlElemUtil.propertyAsNumber(containerRef, 'height');
      const isPanelOnTop: boolean = triggerRect.top + triggerRect.height + panelHeight + optHeight > ScreenUtil.getHeight();

      // Prepare properties: 'bottom', 'top'.
      const panelBottom: number | null = isPanelOnTop ? -Math.round((triggerRect.top - hostRect.top - 1) * 100) / 100 : null;
      const panelTop: number | null = isPanelOnTop ? null : Math.round((triggerRect.bottom - hostRect.top) * 100) / 100;
      // Setting properties: 'bottom', 'top'.
      if (this.panelBottom !== panelBottom) {
        this.panelBottom = panelBottom;
        HtmlElemUtil.setProperty(containerRef, CSS_PROP_BOTTOM, panelBottom?.toString().concat('px'));
      }
      if (this.panelTop !== panelTop) {
        this.panelTop = panelTop;
        HtmlElemUtil.setProperty(containerRef, CSS_PROP_TOP, panelTop?.toString().concat('px'));
      }

      // Prepare and setting property 'translate-y'.
      if (panelHeight > 0) {
        // Define the "TranslateY" parameter to correctly open or close.
        const translateY: number = ((isPanelOnTop ? 1 : -1) * Math.round(((panelHeight - 0.6 * panelHeight) / 2) * 100)) / 100;
        if (this.translateY !== translateY) {
          this.translateY = translateY;
          HtmlElemUtil.setProperty(containerRef, CSS_PROP_TRANSLATE_Y, translateY?.toString().concat('px'));
        }
      }
    }
  }

  // ** directive: GlnAutocompletePanel - finish **

  // ** directive: GlnOptionsScroll - start **

  public setOptionsScroll(value: GlnOptionsScroll | null): void {
    this.optionsScroll = value;
    if (this.selectedOption != null) {
      this.selectedOption.selected = false;
      this.selectedOption = null;
    }
    if (this.optionsScroll != null) {
      let value: string | null = this.trigger != null ? this.trigger.getValue() : null;
      const opts: GlnOption[] = this.getOptions(this.optionList);
      const selectedOption: GlnOption | null = (!!value && opts.find((item: GlnOption) => item.value === value)) || null;
      if (selectedOption != null) {
        this.selectedOption = selectedOption;
        this.selectedOption.selected = true;
        this.optionsScroll.setMarkedOption(selectedOption);
      }
    }
  }

  // ** directive: GlnOptionsScroll - finish **

  // ** Private methods **

  private panelOpening(): void {
    // If the list of options is not empty, then open the panel.
    if (!this.isPanelOpen && this.getTriggerRect() != null && this.optionList.length > 0) {
      this.isPanelOpen = true;
      // Add the current object to the list of elements with the panel open.
      GlnAutocompleteOpenUtil.add(this);
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Prepare and setting property: 'max-height'. */
  private setCssMaxHeight(optionHeight: number, visibleSizeVal: number | null, elem: ElementRef<HTMLElement>): void {
    const maxHeight: number | null = !!visibleSizeVal && visibleSizeVal > 0 && optionHeight > 0 ? optionHeight * visibleSizeVal : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MAX_HEIGHT, maxHeight?.toString().concat('px'));
  }
  /** Prepare and setting property: 'max-width'. */
  private setCssMaxWidth(isMaxWidth: boolean | null, elem: ElementRef<HTMLElement>): void {
    const maxWidthStr: string | null = isMaxWidth ? `var(${CSS_PROP_WIDTH})` : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MAX_WIDTH, maxWidthStr);
  }
  /** Prepare and setting property: 'justify-content'. */
  private setCssJustifyContent(positionValue: string | null, elem: ElementRef<HTMLElement>): void {
    let justifyContent: string = 'flex-start';
    justifyContent = AUTOCOMPLETE_POSITION['center'] === positionValue ? 'center' : justifyContent;
    justifyContent = AUTOCOMPLETE_POSITION['end'] === positionValue ? 'flex-end' : justifyContent;
    // Setting properties: 'justify-content'.
    HtmlElemUtil.setProperty(elem, CSS_PROP_JUSTIFY_CONTENT, justifyContent);
  }

  private settingNoRipple(noRipple: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!noRipple);
    HtmlElemUtil.setAttr(renderer, elem, 'norip', noRipple ? '' : null);
  }
}

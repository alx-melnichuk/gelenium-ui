import { CdkConnectedOverlay, ConnectedPosition, HorizontalConnectionPos, ScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameComponent } from '../gln-frame/gln-frame.component';
import { GlnFrameExterior } from '../gln-frame/gln-frame-exterior.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnOptionUtil } from '../gln-option/gln-option.util';
import { ArrayUtil } from '../_utils/array.util';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select.providers';
import { GlnSelectConfig } from './gln-select-config.interface';
import { GlnSelectionChange } from './gln-selection-change.interface';
import { GlnSelectOpenUtil } from './gln-select-open.util';
import { GlnSelectTriggerDirective, GLN_SELECT_TRIGGER } from './gln-select-trigger.directive';

let uniqueIdCounter = 0;

export const GLN_SELECT_CONFIG = new InjectionToken<GlnSelectConfig>('GLN_SELECT_CONFIG');

const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const CSS_ATTR_FOR_PANEL_OPENING_ANIMATION = 'is-open';
const CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION = 'is-hide';
const CSS_PROP_TRANSLATE_Y = '--glnslpo-translate-y';

@Component({
  selector: 'gln-select',
  exportAs: 'glnSelect',
  templateUrl: './gln-select.component.html',
  styleUrls: ['./gln-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSelectComponent },
    { provide: GLN_OPTION_PARENT, useExisting: GlnSelectComponent },
  ],
})
export class GlnSelectComponent
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator, GlnOptionParent
{
  @Input()
  public id = `glnsl-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSelectConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null | undefined; // GlnFrameSizeType
  @Input()
  public helperText: string | null | undefined;
  @Input()
  /** Flag for displaying a "checkbox" for each option. (only for isMultiple) */
  public isCheckmark: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isMultiple: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isPlaceholder: string | boolean | null | undefined;
  @Input()
  /** Disable the display of the icon - the status of the state of the open list. */
  public isNoIcon: string | boolean | null | undefined;
  @Input()
  /** This property to turn off the ripple effect. */
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public maxLength: number | null | undefined;
  @Input()
  public minLength: number | null | undefined;
  @Input()
  public ornamLfAlign: string | null | undefined; // OrnamAlignType
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlignType
  @Input()
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = '';
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public visibleSize: number = 0;
  @Input()
  public tabIndex: number = 0;
  @Input()
  public wdFull: string | null | undefined;

  @Input()
  get value(): unknown | unknown[] | null {
    return this.valueData;
  }
  set value(newValue: unknown | unknown[] | null) {
    if (this.multiple && !Array.isArray(newValue)) {
      throw Error('The value must be an array in multi-select mode.');
    }
    if (!this.multiple && Array.isArray(newValue)) {
      throw Error('The value must not be an array in single select mode.');
    }
    if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
      // Get a list of menu items according to an array of values.
      const newOptions = GlnOptionUtil.getOptionsByValues(newValue, this.options);
      // Which elements of array "this.selectedOptions" are not included in array "newOptions".
      const removed = ArrayUtil.uninclude<GlnOptionComponent>(this.selectedOptions, newOptions);
      // Which elements of array "newOptions" are not included in array "this.selectedOptions".
      const added = ArrayUtil.uninclude<GlnOptionComponent>(newOptions, this.selectedOptions);

      this.selectedOptions = this.mergeOptions(this.selectedOptions, added, removed);
      this.updateValueDataAndIsFilledAndValidity(newValue);
      this.changeDetectorRef.markForCheck();
    }
  }
  private valueData: unknown | unknown[] | null;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly selected: EventEmitter<{ value: unknown | null; values: unknown[]; change: GlnSelectionChange<GlnOptionComponent> }> =
    new EventEmitter();

  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;
  @ContentChild(GLN_SELECT_TRIGGER)
  public customTrigger: GlnSelectTriggerDirective | undefined;
  @ViewChild(GlnFrameComponent, { static: true })
  public frameComp!: GlnFrameComponent;
  /** A trigger that opens a dropdown list of options. */
  @ViewChild('triggerRef', { read: ElementRef<HTMLDivElement>, static: true })
  public triggerRef!: ElementRef<HTMLDivElement>;
  /** List of possible options. */
  @ContentChildren(GlnOptionComponent, { descendants: true })
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  public get triggerHtmlElementRef(): ElementRef<HTMLElement> {
    return this.triggerRef as ElementRef<HTMLElement>;
  }
  public get exteriorVal(): GlnFrameExterior | null {
    return this.frameComp.exteriorVal;
  }
  public get frameSizeVal(): GlnFrameSize | null {
    return this.frameComp.frameSizeVal;
  }
  public get frameSizeValue(): number {
    return this.frameComp.frameSizeValue;
  }
  public get labelShrink(): boolean | null {
    return this.frameComp.labelShrink;
  }
  public get noAnimation(): boolean | null {
    return this.frameComp.noAnimation;
  }

  public backdropClassVal: string | null = null;
  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnSelectConfig;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public error: boolean | null = null; // Binding attribute "isError".
  public errors: ValidationErrors | null = null;
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public hasPanelAnimation = false;
  public isAttrHideAnimation: boolean | undefined;
  public isFocused = false;
  public isFilled = false;
  public isPanelOpen = false;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noIcon: boolean | null = null; // Binding attribute "isNoIcon",
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public overlayPanelClass: string | string[] = '';
  public panelClassList: string | string[] | Set<string> | { [key: string]: any } | undefined; // Binding attribute "panelClass"
  public placeholder: boolean | null = null; // Binding attribute "isPlaceholder".
  public positionList: ConnectedPosition[] = [];
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public selectedOptions: GlnOptionComponent[] = [];
  /** Strategy for handling scrolling when the selection panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;
  public visibleSizeVal: number | null = null; // Binding attribute "visibleSize".

  private indexFirstVisibleOption: number = -1;
  private isFocusAttrOnFrame = false;
  private markedOption: GlnOptionComponent | null = null;
  private maxWidth = 0;
  private optionHeight: number = 0;
  private selectPanelRef: ElementRef<HTMLElement> | null = null;
  /** Saving the font size of the trigger element. */
  private triggerFontSize = 0;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: any
  ) {
    this.currConfig = this.rootConfig || {};
    this.scrollStrategy = this.scrollStrategyFactory();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isCheckmark'] || (changes['config'] && this.isCheckmark == null && this.currConfig.isCheckmark != null)) {
      this.checkmark = BooleanUtil.init(this.isCheckmark) ?? !!this.currConfig.isCheckmark;
      this.settingCheckmark(this.checkmark, this.renderer, this.hostRef);
    }
    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isError'] || (changes['config'] && this.isError == null && this.currConfig.isError != null)) {
      this.error = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.error, this.renderer, this.hostRef);
    }
    if (changes['isMultiple'] || (changes['config'] && this.isMultiple == null && this.currConfig?.isMultiple) || null) {
      this.multiple = BooleanUtil.init(this.isMultiple) ?? !!this.currConfig.isMultiple;
      this.settingMultiple(this.multiple, this.renderer, this.hostRef);
    }
    if (changes['isNoIcon'] || (changes['config'] && this.isNoIcon == null && this.currConfig.isNoIcon != null)) {
      this.noIcon = BooleanUtil.init(this.isNoIcon) ?? !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.noIcon, this.renderer, this.hostRef);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (changes['isPlaceholder'] || (changes['config'] && this.isPlaceholder == null && this.currConfig.isPlaceholder != null)) {
      this.placeholder = BooleanUtil.init(this.isPlaceholder) ?? !!this.currConfig.isPlaceholder;
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.readOnly = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.readOnly, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.required = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }
    if (changes['ornamLfAlign'] || (changes['config'] && this.ornamLfAlign == null && this.currConfig.ornamLfAlign != null)) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamLfAlign || this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (changes['ornamRgAlign'] || (changes['config'] && this.ornamRgAlign == null && this.currConfig.ornamRgAlign != null)) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamRgAlign || this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
    if (changes['panelClass'] || (changes['config'] && this.panelClass == null && this.currConfig.panelClass != null)) {
      this.panelClassList = this.panelClass || this.currConfig?.panelClass;
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionList = this.getPositionList(this.position || this.currConfig?.position);
    }
    if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null && this.currConfig.visibleSize != null)) {
      this.visibleSizeVal = this.visibleSize || this.currConfig?.visibleSize || null;
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.backdropClassVal == null) {
      this.backdropClassVal = this.currConfig?.backdropClass || null;
    }
    if (this.checkmark == null) {
      this.checkmark = !!this.currConfig.isCheckmark;
      this.settingCheckmark(this.checkmark, this.renderer, this.hostRef);
    }
    if (this.error == null) {
      this.error = !!this.currConfig.isError;
      this.settingError(this.error, this.renderer, this.hostRef);
    }
    if (this.multiple == null) {
      this.multiple = !!this.currConfig.isMultiple;
      this.settingMultiple(this.multiple, this.renderer, this.hostRef);
    }
    if (this.noIcon == null) {
      this.noIcon = !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.noIcon, this.renderer, this.hostRef);
    }
    if (this.noRipple == null) {
      this.noRipple = !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (this.placeholder == null) {
      this.placeholder = !!this.currConfig.isPlaceholder;
    }
    if (this.readOnly == null) {
      this.readOnly = !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.readOnly, this.renderer, this.hostRef);
    }
    if (this.required == null) {
      this.required = !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }
    if (this.ornamLfAlignVal == null) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (this.ornamRgAlignVal == null) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
    if (this.currConfig.overlayPanelClass != null) {
      this.overlayPanelClass = this.currConfig.overlayPanelClass;
    }
    if (this.panelClassList == null) {
      this.panelClassList = this.currConfig?.panelClass;
    }
    if (this.positionList.length === 0) {
      this.positionList = this.getPositionList(this.currConfig?.position);
    }
    if (this.visibleSizeVal == null) {
      this.visibleSizeVal = this.currConfig?.visibleSize || null;
    }
  }

  public ngOnDestroy(): void {
    if (this.isPanelOpen) {
      if (this.hasPanelAnimation) {
        this.hasPanelAnimation = false;
      }
      this.close();
    }
  }

  public ngAfterContentInit(): void {
    // Initialized when the value is received via "writeValue()" but the list of menu items is just now.
    if (this.selectedOptions.length === 0 && this.options.length > 0) {
      const newValue = this.valueData;
      this.valueData = undefined;
      this.value = newValue;
    }
    // When using [(ngModel)] parentFormGroup will be null.
    if (!this.parentFormGroup) {
      // Add an attribute that disables animation on initialization.
      this.isAttrHideAnimation = true;
    }
  }

  public ngAfterViewInit(): void {
    let maxWidth = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('max-width').replace('px', ''));
    this.maxWidth = !isNaN(maxWidth) ? maxWidth : 0;
    if (this.maxWidth === 0 && BooleanUtil.init(this.wdFull)) {
      maxWidth = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('width').replace('px', ''));
      this.maxWidth = !isNaN(maxWidth) ? maxWidth : 0;
    }
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    this.value = value;
    if (this.isAttrHideAnimation) {
      // Remove an attribute that disables animation on initialization.
      this.isAttrHideAnimation = false;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', disabled ? '' : null);
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    let result: ValidationErrors | null = null;
    if (this.isEmpty()) {
      if (this.required) {
        result = { ...(result || {}), ...{ required: true } };
      }
    } else if (this.multiple) {
      const actualLength = Array.isArray(this.valueData) ? this.valueData.length : 0;
      if (!!this.minLength && 0 < this.minLength && actualLength < this.minLength) {
        result = { ...(result || {}), ...{ minlength: { requiredLength: this.minLength, actualLength } } };
      } else if (!!this.maxLength && 0 < this.maxLength && actualLength > this.maxLength) {
        result = { ...(result || {}), ...{ maxlength: { requiredLength: this.maxLength, actualLength } } };
      }
    }
    return (this.errors = result);
  }

  // ** interface Validator - finish **

  // ** interface GlnOptionParent - start **

  public setOptionSelected(optionItem: GlnOptionComponent): void {
    Promise.resolve().then(() => {
      this.selectionOptionElement(optionItem);
      if (this.isPanelOpen && !this.isFocused) {
        this.isFocused = true;
        this.focus();
      }
      if (!this.multiple) {
        this.close();
      }
    });
  }

  // ** interface GlnOptionParent - finish **

  // ** Public methods **

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  public trackByOption(index: number, item: GlnOptionComponent): string {
    return item.id;
  }

  public getPanelClass(
    list: string | string[] | Set<string> | { [key: string]: any } | undefined
  ): string | string[] | Set<string> | { [key: string]: any } {
    return list ?? '';
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId) && !!this.frameComp.hostRef) {
      this.frameComp.hostRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      const isFocusedEmit = !this.isFocused;
      this.isFocused = true;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      if (isFocusedEmit) {
        this.focused.emit();
      }
    }
  }
  // The selection panel cease working in the following cases:
  // (Cases-B1) Panel is close and on the trigger, click the Tab key.
  // (Cases-B2) Panel is open and mouse click within the panel.
  // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
  // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
  // (Cases-B5) Panel is open and click the Escape key.
  // (Cases-B6) Panel is open and click the Tab key.
  // (Cases-B7) Panel is open and click the Enter key.

  /** Calls the touch callback only when the panel is closed.
   * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
   */
  public doBlur(): void {
    if (!this.disabled) {
      this.isFocused = false;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      if (!this.isPanelOpen && !this.hasPanelAnimation) {
        // (Cases-B1) Panel is close and on the trigger, click the Tab key.
        this.blured.emit();
      } else {
        // (Cases-B2) Panel is open and mouse click within the panel.
        // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
        // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
        // For case Cases-B3,B4, let's add the "foc" attribute to force the display of focus.
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameComp.hostRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      }
    }
  }
  /** Occurs when a mouse click event occurs outside of the options list pane. */
  public backdropClick(): void {
    if (!this.disabled) {
      // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
      // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
      this.isFocused = true;
      this.focus();
      this.close();
    }
  }
  /** Occurs when the panel receives input focus. */
  public doFocusOnPanel(): void {
    if (!this.disabled) {
      // (Cases-B2) Panel is open and mouse click within the panel.
      this.isFocused = true;
      this.focus();
    }
  }
  public doOverlayPanelKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled && this.isPanelOpen) {
      switch (event.key) {
        // (Cases-B5) Panel is open and click the Escape key.
        // (Cases-B6) Panel is open and click the Tab key.
        case 'Escape':
        case 'Tab':
          this.isFocused = true;
          this.focus();
          this.close();
          break;
      }
    }
  }
  /** Open or close the overlay panel. */
  public toggle(): void {
    if (!this.disabled) {
      if (this.isPanelOpen) {
        this.close();
      } else {
        if (!this.isFocused) {
          this.focus();
        }
        this.open();
      }
    }
  }
  /** Open overlay panel. */
  public open(): void {
    if (!this.disabled && !this.readOnly && !this.isPanelOpen && this.options.length > 0) {
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.noAnimation;
      this.markedOption = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;
      this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
      this.isFocusAttrOnFrame = false;
      this.triggerFontSize = Number((getComputedStyle(this.triggerRef.nativeElement).fontSize || '0').replace('px', ''));
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Closes the overlay panel and focuses the main element. */
  public close(options?: { noAnimation?: boolean }): void {
    if (this.disabled || !this.isPanelOpen) {
      return;
    }
    if (this.isFocusAttrOnFrame) {
      HtmlElemUtil.setAttr(this.renderer, this.frameComp.hostRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
    }
    this.isPanelOpen = false;
    this.changeDetectorRef.markForCheck();
    this.onTouched();
    this.markedOption?.setMarked(false);
    this.markedOption = null;

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    if (overlayElement != null) {
      const panelHeight = this.getHeight(this.selectPanelRef);
      if (panelHeight > 0) {
        const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
        HtmlElemUtil.setProperty(
          overlayRef,
          CSS_PROP_TRANSLATE_Y,
          this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight())
        );
      }
      if (!this.noAnimation && !options?.noAnimation) {
        const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement.children[0] as HTMLElement);
        // Add an attribute for animation and transformation.
        HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_OPENING_ANIMATION, null);
        HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION, '');
      }
    }
    if (options?.noAnimation && this.hasPanelAnimation) {
      this.hasPanelAnimation = false;
    }
    this.selectPanelRef = null;
    this.closed.emit();
  }
  /** Callback when the overlay panel is attached. */
  public attach(): void {
    // Add the current object to the list of elements with the panel open.
    GlnSelectOpenUtil.add(this);

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    // Adding a class so that custom styles can be applied.
    const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
    HtmlElemUtil.setAttr(this.renderer, overlayRef, 'glnslpo-select', '');
    this.selectPanelRef = HtmlElemUtil.getElementRef(overlayElement.children[0]?.children[0] as HTMLElement);
    const panelHeight = this.getHeight(this.selectPanelRef);
    if (!this.noAnimation && panelHeight > 0) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
    }
    // Set the font size for the overlay.
    if (this.triggerFontSize > 0) {
      overlayElement.style.fontSize = `${this.triggerFontSize}px`;
    }
    if (this.maxWidth > 0) {
      overlayElement.style.maxWidth = `${this.maxWidth}px`;
    }
    if (this.frameSizeValue > 0) {
      const borderRadius = NumberUtil.roundTo100(this.frameSizeValue / 10);
      HtmlElemUtil.setProperty(overlayRef, '--glnslpo-border-radius', NumberUtil.str(borderRadius)?.concat('px'));
    }
    if (this.optionHeight === 0) {
      this.optionHeight = this.getOptionHeight(this.options);
    }
    const visibleSize = this.visibleSizeVal ?? 0;
    if (visibleSize > 0 && this.optionHeight > 0) {
      const maxHeightOfOptionsPanel = this.optionHeight * visibleSize;
      HtmlElemUtil.setProperty(overlayRef, '--glnslpo-max-height', NumberUtil.str(maxHeightOfOptionsPanel)?.concat('px'));
    }
    // We cannot get the actual sizes and positions of elements if they are affected by a transformation.
    // Therefore, we first get all the data, and then add attributes for animation and transformation.
    const indexMarked = this.markedOption != null ? this.options.indexOf(this.markedOption) : -1;
    if (this.markedOption !== null && this.selectPanelRef !== null && visibleSize > 0 && this.optionHeight > 0) {
      this.indexFirstVisibleOption = this.getIndexFirstVisibleOption(this.options.length, visibleSize, indexMarked, -1);
      this.selectPanelRef.nativeElement.scrollTo(0, this.indexFirstVisibleOption * this.optionHeight);
    }
    // Important! These operations should be the last, they include animation and the dimensions of the panel are distorted.
    const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement?.children[0] as HTMLElement);
    if (this.noAnimation) {
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, 'noAnm', '');
      HtmlElemUtil.setClass(this.renderer, selectPanelWrapRef, 'gln-no-animation', true);
    } else {
      // Add an attribute for animation and transformation.
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_OPENING_ANIMATION, '');
    }
  }
  /** Callback when the overlay panel is detached. */
  public detach() {
    // Remove the current object from the list of items with the panel open.
    GlnSelectOpenUtil.remove(this);
    if (this.isPanelOpen) {
      this.close();
    }
  }
  /** Handles all keypress events for the component's panel. */
  public frameKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      if (!this.isPanelOpen) {
        // Open the selection panel by pressing the keys: 'up arrow', 'down arrow', 'space' and 'enter'.
        if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(event.key)) {
          // Prevents the page from scrolling down when pressing space.
          event.preventDefault();
          event.stopPropagation();
          this.open();
        }
      } else {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
            // Moving the cursor marker.
            this.markedOption = this.movingMarkedOption(this.options, event.key === 'ArrowDown', this.markedOption);
            const indexMarked = this.markedOption != null ? this.options.indexOf(this.markedOption) : -1;
            const visibleSize = this.visibleSizeVal ?? 0;
            if (visibleSize > 0 && !!this.selectPanelRef && this.optionHeight > 0) {
              const value = this.getIndexFirstVisibleOption(this.options.length, visibleSize, indexMarked, this.indexFirstVisibleOption);
              if (this.indexFirstVisibleOption !== value) {
                this.indexFirstVisibleOption = value;
                this.selectPanelRef.nativeElement.scrollTo(0, this.indexFirstVisibleOption * this.optionHeight);
              }
            }
            this.changeDetectorRef.markForCheck();
            break;
          // (Cases-B7) Panel is open and click the Enter key.
          case 'Enter':
            if (this.markedOption != null) {
              // Selects the element of the current marker.
              this.selectionOptionElement(this.markedOption);
              // And if not multiple, then closing the panel.
              if (!this.multiple) {
                this.close();
              }
            }
            break;
        }
      }
    }
  }
  /** Processing the option selected by the user. */
  public selectionOptionElement(addOption: GlnOptionComponent | null): void {
    const newOptions = addOption !== null ? [addOption] : [];
    if (!this.disabled && newOptions.length > 0) {
      const removed: GlnOptionComponent[] = [];
      if (this.multiple) {
        // Which elements of array "this.selectedOptions" are included in array "addOptions".
        removed.push(...ArrayUtil.include<GlnOptionComponent>(this.selectedOptions, newOptions));
      } else {
        // Which elements of array "this.selectedOptions" are not included in array "addOptions".
        removed.push(...ArrayUtil.uninclude<GlnOptionComponent>(this.selectedOptions, newOptions));
      }
      // Which elements of array "addOptions" are not included in array "this.selectedOptions".
      const added = ArrayUtil.uninclude<GlnOptionComponent>(newOptions, this.selectedOptions);
      this.updateSelectedOptions(added, removed, true);
    }
  }

  public addOption(option: GlnOptionComponent | null): void {
    if (option && this.selectedOptions.indexOf(option) === -1) {
      this.updateSelectedOptions([option], [], true);
    }
  }

  public deleteOption(option: GlnOptionComponent | null): void {
    if (option && this.selectedOptions.indexOf(option) > -1) {
      this.updateSelectedOptions([], [option], true);
    }
  }

  // ** Private methods **

  private settingCheckmark(checkmark: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checkmark', !!checkmark);
    HtmlElemUtil.setAttr(renderer, elem, 'che', checkmark ? '' : null);
  }
  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', !!focus);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingMultiple(multiple: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-multiple', !!multiple);
    HtmlElemUtil.setAttr(renderer, elem, 'mul', multiple ? '' : null);
  }
  private settingNoIcon(noIcon: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-icon', !!noIcon);
    HtmlElemUtil.setAttr(renderer, elem, 'noico', noIcon ? '' : null);
  }
  private settingNoRipple(noRipple: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!noRipple);
    HtmlElemUtil.setAttr(renderer, elem, 'norip', noRipple ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
  private settingOrnamLfAlign(ornamLfAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }

  private updateSelectedOptions(added: GlnOptionComponent[], removed: GlnOptionComponent[], isEmit: boolean): unknown[] {
    this.selectedOptions = this.mergeOptions(this.selectedOptions, added, removed);

    const values = GlnOptionUtil.getValues(this.selectedOptions);
    const value = values.length > 0 ? values[0] : null;
    this.updateValueDataAndIsFilledAndValidity(this.multiple ? values : value);
    this.changeDetectorRef.markForCheck();
    if (isEmit) {
      this.selected.emit({ value: !this.multiple ? value : null, values: this.multiple ? values : [], change: { added, removed } });
    }
    // Update the position once the zone is stable so that the overlay will be fully rendered.
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.connectedOverlay.overlayRef.updatePosition();
    });
    return values;
  }

  private mergeOptions(selected: GlnOptionComponent[], added: GlnOptionComponent[], removed: GlnOptionComponent[]): GlnOptionComponent[] {
    GlnOptionUtil.setSelected(removed, false);
    const currentOptions = ArrayUtil.delete<GlnOptionComponent>(selected, removed);
    GlnOptionUtil.setSelected(added, true);
    const resultOptions = currentOptions.concat(added);
    return this.options.filter((option) => resultOptions.includes(option));
  }

  private getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }
  /** Define the "TranslateY" parameter to correctly open or close. */
  private getTranslateY(triggerRect: DOMRect | null, panelHeight: number, screenHeight: number): string | null {
    let result: string | null = null;
    if (panelHeight > 0 && !!triggerRect && triggerRect.top > 0 && triggerRect.height > 0 && screenHeight > 0) {
      const value = triggerRect.top + triggerRect.height + panelHeight;
      const delta = String(NumberUtil.roundTo100((panelHeight - 0.6 * panelHeight) / 2)).concat('px');
      result = (value < screenHeight ? '-' : '') + delta;
    }
    return result;
  }
  /** Update the data value, the sign of fullness and perform validation. */
  private updateValueDataAndIsFilledAndValidity(newValueData: unknown | unknown[] | null): void {
    this.valueData = newValueData;
    this.isFilled = !this.isEmpty() && this.selectedOptions.length > 0;
    // Calling the validation method for the new value.
    this.onChange(this.valueData);
  }
  /** Move the marked option to the next or previous one. */
  private movingMarkedOption(options: GlnOptionComponent[], isNext: boolean, marked: GlnOptionComponent | null): GlnOptionComponent | null {
    let result: GlnOptionComponent | null = null;
    if (options.length > 0) {
      let indexOld = -1;
      if (marked != null) {
        indexOld = options.indexOf(marked);
        marked.setMarked(false);
      }
      const maxIndex = options.length - 1;
      const indexNew = indexOld + (isNext && indexOld < maxIndex ? 1 : !isNext && indexOld > 0 ? -1 : 0);
      result = options[indexNew];
      result.setMarked(true);
    }
    return result;
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

  private getIndexFirstVisibleOption(countOptions: number, visibleSize: number, indexMarked: number, indexVisible: number): number {
    let result: number = indexVisible;
    if (countOptions > 0 && visibleSize > 0 && countOptions > visibleSize && indexMarked > -1 && indexMarked < countOptions) {
      const maxIndex = countOptions - visibleSize;
      if (indexVisible === -1) {
        let index = Math.floor(indexMarked / visibleSize) * visibleSize;
        result = index + visibleSize <= countOptions ? index : maxIndex;
      } else {
        let endIndex = indexVisible + visibleSize;
        if (endIndex > countOptions) {
          endIndex = countOptions;
          result = endIndex - visibleSize;
        }

        if (indexMarked > -1 && indexMarked < result) {
          result = indexMarked;
        } else if (endIndex <= indexMarked) {
          result = indexMarked - visibleSize + 1;
          result = result > maxIndex ? maxIndex : result;
        }
      }
    }
    return result;
  }

  private getPosition(value: string | null): HorizontalConnectionPos {
    return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start') as HorizontalConnectionPos;
  }

  private getPositionList(position: string | undefined | null): ConnectedPosition[] {
    const horizontalAlignment: HorizontalConnectionPos = this.getPosition(position || null);
    return [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom', offsetY: -5 },
    ];
  }
}

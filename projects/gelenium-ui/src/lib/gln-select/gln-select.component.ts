import { CdkConnectedOverlay, ConnectedPosition, HorizontalConnectionPos, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
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

import { CSS_ATTR_ORN_LF, CSS_PROP_ORN_PD_LF, GlnOrnamentLeftDirective } from '../directives/gln-ornament/gln-ornament-left.directive';
import { GlnOrnamentOwner, GLN_ORNAMENT_OWNER } from '../directives/gln-ornament/gln-ornament-owner.interface';
import { GlnOrnamentOwnerUtil } from '../directives/gln-ornament/gln-ornament-owner.util';
import { CSS_ATTR_ORN_RG, CSS_PROP_ORN_PD_RG, GlnOrnamentRightDirective } from '../directives/gln-ornament/gln-ornament-right.directive';
import { ORNAMENT_ALIGN } from '../directives/gln-ornament/gln-ornament.interface';
import { GlnOrnamentUtil } from '../directives/gln-ornament/gln-ornament.util';
import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameComponent } from '../gln-frame/gln-frame.component';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnOption } from '../gln-option/gln-option.interface';
import { GlnOptionUtil } from '../gln-option/gln-option.util';
import { GlnOptionsScroll, OptionsScrollKeys } from '../gln-option/gln-options-scroll.interface';
import { ArrayUtil } from '../_utils/array.util';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnSelectChange } from './gln-select-change.interface';
import { GlnSelectConfig } from './gln-select-config.interface';
import { GlnSelectOpenUtil } from './gln-select-open.util';
import { GLN_SELECT_TRIGGER, GlnSelectTriggerDirective } from './gln-select-trigger.directive';
import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select.providers';

export const GLN_SELECT_CONFIG = new InjectionToken<GlnSelectConfig>('GLN_SELECT_CONFIG');

const CSS_ATTR_FRAME_FOCUS = 'foc';
const CSS_ATTR_PANEL_OPENING_ANIMATION = 'is-show';
const CSS_ATTR_PANEL_CLOSING_ANIMATION = 'is-hide';
const CSS_PROP_BORDER_RADIUS = '--glnslpo--border-radius';
const CSS_PROP_MAX_HEIGHT = '--glnslpo--max-height';
const CSS_PROP_MAX_WIDTH = '--glnslpo--max-width';
const CSS_PROP_TRANSLATE_Y = '--glnslpo--translate-y';
const CSS_PROP_WIDTH = '--glnslpo--width';

let uniqueIdCounter = 0;

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
    { provide: GLN_ORNAMENT_OWNER, useExisting: GlnSelectComponent },
  ],
})
export class GlnSelectComponent
  implements
    OnChanges,
    OnInit,
    AfterContentInit,
    AfterViewInit,
    OnDestroy,
    ControlValueAccessor,
    Validator,
    GlnOptionParent,
    GlnOrnamentOwner
{
  @Input()
  public id = `glnsl-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSelectConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // 'outlined' | 'underline' | 'standard'
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
  public isMaxWd: string | boolean | null | undefined;
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
  public ornamLfAlign: string | null | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  @Input()
  public ornamRgAlign: string | null | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  @Input()
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public classes: string | string[] | Set<string> | { [key: string]: unknown } = '';
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public visibleSize: number | null | undefined;
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
      const removed = ArrayUtil.uninclude<GlnOption>(this.selectedOptions, newOptions);
      // Which elements of array "newOptions" are not included in array "this.selectedOptions".
      const added = ArrayUtil.uninclude<GlnOption>(newOptions, this.selectedOptions);

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
  readonly selected: EventEmitter<GlnSelectChange> = new EventEmitter();

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

  public get options(): GlnOption[] {
    return (this.optionList?.toArray() || []) as GlnOption[];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOption[]) {}
  @ContentChildren(GlnOrnamentLeftDirective, { descendants: true })
  public ornamLeftList!: QueryList<GlnOrnamentLeftDirective>;
  @ContentChildren(GlnOrnamentRightDirective, { descendants: true })
  public ornamRightList!: QueryList<GlnOrnamentRightDirective>;
  @ViewChild(GlnOrnamentRightDirective)
  public ornamRhomb: GlnOrnamentRightDirective | undefined;

  public backdropClassVal: string | null = null;
  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnSelectConfig;
  public errors: ValidationErrors | null = null;
  public hasPanelAnimation = false;
  public isAttrHideAnimation: boolean | undefined;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isErrorVal: boolean | null = null; // Binding attribute "isError".
  public isFocused = false;
  public isFilled = false;
  public isPanelOpen = false;
  public isMaxWdVal: boolean | null = null; // Binding attribute "isMaxWd".
  public isNoIconVal: boolean | null = null; // Binding attribute "isNoIcon",
  public isPlaceholderVal: boolean | null = null; // Binding attribute "isPlaceholder".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public ornamLfAlignVal: string | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: string | null = null; // Binding attribute "ornamRgAlign".
  public overlayClassesVal: string | string[] = '';
  public classesVal: string | string[] | Set<string> | { [key: string]: unknown } | undefined; // Binding attribute "classes"
  public positionList: ConnectedPosition[] = [];
  public selectedOptions: GlnOption[] = [];
  /** A strategy for handling scrolling when the overlay panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;
  public visibleSizeVal: number | null = null; // Binding attribute "visibleSize".

  protected optionsScroll: GlnOptionsScroll | null = null;

  private hostWidth: number = 0;
  private isFocusAttrOnFrame: boolean = false;
  private optionHeight: number = 0;
  private selectPanelRef: ElementRef<HTMLElement> | null = null;
  /** Saving the font size of the trigger element. */
  private triggerFontSize: number = 0;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private overlay: Overlay,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null,
    @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: (() => ScrollStrategy) | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.scrollStrategy = this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : this.overlay.scrollStrategies.block();
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-select');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
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
      this.isErrorVal = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (changes['isMaxWd'] || (changes['config'] && this.isMaxWd == null && this.currConfig.isMaxWd != null)) {
      this.isMaxWdVal = BooleanUtil.init(this.isMaxWd) ?? !!this.currConfig.isMaxWd;
    }
    if (changes['isMultiple'] || (changes['config'] && this.isMultiple == null && this.currConfig.isMultiple) || null) {
      this.multiple = BooleanUtil.init(this.isMultiple) ?? !!this.currConfig.isMultiple;
      this.settingMultiple(this.multiple, this.renderer, this.hostRef);
    }
    if (changes['isNoIcon'] || (changes['config'] && this.isNoIcon == null && this.currConfig.isNoIcon != null)) {
      this.isNoIconVal = BooleanUtil.init(this.isNoIcon) ?? !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.isNoIconVal, this.renderer, this.hostRef);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (changes['isPlaceholder'] || (changes['config'] && this.isPlaceholder == null && this.currConfig.isPlaceholder != null)) {
      this.isPlaceholderVal = BooleanUtil.init(this.isPlaceholder) ?? !!this.currConfig.isPlaceholder;
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (changes['ornamLfAlign'] || (changes['config'] && this.ornamLfAlign == null && this.currConfig.ornamLfAlign != null)) {
      this.ornamLfAlignVal = ORNAMENT_ALIGN[this.ornamLfAlign || this.currConfig.ornamLfAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
      this.settingOrnamentList(CSS_ATTR_ORN_LF, this.ornamLfAlignVal || '', this.renderer, GlnOrnamentUtil.getElements(this.ornamLeftList));
    }
    if (changes['ornamRgAlign'] || (changes['config'] && this.ornamRgAlign == null && this.currConfig.ornamRgAlign != null)) {
      this.ornamRgAlignVal = ORNAMENT_ALIGN[this.ornamRgAlign || this.currConfig.ornamRgAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
      const rhombRef: ElementRef<HTMLElement> | undefined = this.ornamRhomb?.hostRef;
      const ornamRgAlign: string = this.ornamRgAlignVal || '';
      this.settingOrnamentList(CSS_ATTR_ORN_RG, ornamRgAlign, this.renderer, GlnOrnamentUtil.getElements(this.ornamRightList, rhombRef));
    }
    if (changes['config'] && this.currConfig.overlayClasses != null) {
      this.overlayClassesVal = this.currConfig.overlayClasses;
    }
    if (changes['classes'] || (changes['config'] && this.classes == null && this.currConfig.classes != null)) {
      this.classesVal = this.classes || this.currConfig.classes;
    }
    if (changes['position'] || (changes['config'] && this.position == null && this.currConfig.position != null)) {
      this.positionList = this.getPositionList(this.position || this.currConfig.position);
    }
    if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null && this.currConfig.visibleSize != null)) {
      this.visibleSizeVal = this.visibleSize || this.currConfig.visibleSize || null;
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    const lineHeight = HtmlElemUtil.propertyAsNumber(this.hostRef, 'line-height');
    this.optionHeight = GlnOptionUtil.getHeightOption(fontSize, lineHeight);

    if (this.backdropClassVal == null) {
      this.backdropClassVal = this.currConfig.backdropClass || null;
    }
    if (this.checkmark == null) {
      this.checkmark = !!this.currConfig.isCheckmark;
      this.settingCheckmark(this.checkmark, this.renderer, this.hostRef);
    }
    if (this.isErrorVal == null) {
      this.isErrorVal = !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (this.isMaxWdVal == null) {
      this.isMaxWdVal = !!this.currConfig.isMaxWd;
    }
    if (this.multiple == null) {
      this.multiple = !!this.currConfig.isMultiple;
      this.settingMultiple(this.multiple, this.renderer, this.hostRef);
    }
    if (this.isNoIconVal == null) {
      this.isNoIconVal = !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.isNoIconVal, this.renderer, this.hostRef);
    }
    if (this.noRipple == null) {
      this.noRipple = !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (this.isPlaceholderVal == null) {
      this.isPlaceholderVal = !!this.currConfig.isPlaceholder;
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.ornamLfAlignVal == null) {
      this.ornamLfAlignVal = ORNAMENT_ALIGN[this.currConfig.ornamLfAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (this.ornamRgAlignVal == null) {
      this.ornamRgAlignVal = ORNAMENT_ALIGN[this.currConfig.ornamRgAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
    if (this.currConfig.overlayClasses != null) {
      this.overlayClassesVal = this.currConfig.overlayClasses;
    }
    if (this.classesVal == null) {
      this.classesVal = this.currConfig.classes;
    }
    if (this.positionList.length === 0) {
      this.positionList = this.getPositionList(this.currConfig.position);
    }
    if (this.visibleSizeVal == null) {
      this.visibleSizeVal = this.currConfig.visibleSize || null;
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
    this.settingOrnamentList(CSS_ATTR_ORN_LF, this.ornamLfAlignVal || '', this.renderer, GlnOrnamentUtil.getElements(this.ornamLeftList));
    const rhombRef: ElementRef<HTMLElement> | undefined = this.ornamRhomb?.hostRef;
    const ornamRgAlign: string = this.ornamRgAlignVal || '';
    this.settingOrnamentList(CSS_ATTR_ORN_RG, ornamRgAlign, this.renderer, GlnOrnamentUtil.getElements(this.ornamRightList, rhombRef));
  }

  public ngAfterViewInit(): void {
    this.hostWidth = HtmlElemUtil.propertyAsNumber(this.hostRef, 'width');
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
    if (this.isDisabledVal !== disabled) {
      this.isDisabledVal = disabled;
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
      if (this.isRequiredVal) {
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

  public setOptionSelected(optionItem: GlnOption): void {
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

  // ** GlnOrnamentOwner - start **

  public changeOrnament(isRemove: boolean, elementRef: ElementRef<HTMLElement>, isRight: boolean): void {
    const ornamList: ElementRef<HTMLElement>[] = !isRight
      ? GlnOrnamentUtil.getElements(this.ornamLeftList)
      : GlnOrnamentUtil.getElements(this.ornamRightList, this.ornamRhomb?.hostRef);
    const ornamWidth: number | null = GlnOrnamentOwnerUtil.getWidthAllOrnaments(ornamList, isRemove, elementRef);
    const nameProperty: string = !isRight ? CSS_PROP_ORN_PD_LF : CSS_PROP_ORN_PD_RG;
    HtmlElemUtil.setProperty(this.frameComp.hostRef, nameProperty, ornamWidth?.toString().concat('px'));

    if (!isRight) {
      this.settingOrnamentList(CSS_ATTR_ORN_LF, this.ornamLfAlignVal || '', this.renderer, [elementRef]);
    } else {
      this.settingOrnamentList(CSS_ATTR_ORN_RG, this.ornamRgAlignVal || '', this.renderer, [elementRef]);
    }
    this.changeDetectorRef.markForCheck();
  }

  // ** GlnOrnamentOwner - finish **

  // ** Public methods **

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  public trackByOption(index: number, item: GlnOption): string {
    return item.id;
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.frameComp.hostRef) {
      this.frameComp.hostRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.isDisabledVal) {
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
    if (!this.isDisabledVal) {
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
        HtmlElemUtil.setAttr(this.renderer, this.frameComp.hostRef, CSS_ATTR_FRAME_FOCUS, '');
      }
    }
  }
  /** Occurs when a mouse click event occurs outside of the options list pane. */
  public backdropClick(): void {
    if (!this.isDisabledVal) {
      // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
      // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
      this.isFocused = true;
      this.focus();
      this.close();
    }
  }
  /** Occurs when the panel receives input focus. */
  public doFocusOnPanel(): void {
    if (!this.isDisabledVal) {
      // (Cases-B2) Panel is open and mouse click within the panel.
      this.isFocused = true;
      this.focus();
    }
  }
  public doOverlayPanelKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isDisabledVal && this.isPanelOpen) {
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
    if (!this.isDisabledVal) {
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
    if (!this.isDisabledVal && !this.isReadOnlyVal && !this.isPanelOpen && this.options.length > 0) {
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.frameComp.isNoAnimationVal;
      this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
      this.isFocusAttrOnFrame = false;
      this.triggerFontSize = Number((getComputedStyle(this.triggerRef.nativeElement).fontSize || '0').replace('px', ''));
      this.changeDetectorRef.markForCheck();
      this.opened.emit();
    }
  }
  /** Closes the overlay panel and focuses the main element. */
  public close(options?: { noAnimation?: boolean }): void {
    if (this.isDisabledVal || !this.isPanelOpen) {
      return;
    }
    if (this.isFocusAttrOnFrame) {
      HtmlElemUtil.setAttr(this.renderer, this.frameComp.hostRef, CSS_ATTR_FRAME_FOCUS, null);
    }
    this.isPanelOpen = false;
    this.changeDetectorRef.markForCheck();
    this.onTouched();
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
      if (!this.frameComp.isNoAnimationVal && !options?.noAnimation) {
        const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement.children[0] as HTMLElement);
        // Add an attribute for animation and transformation.
        HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_PANEL_OPENING_ANIMATION, null);
        HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_PANEL_CLOSING_ANIMATION, '');
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
    // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
    // This will correctly use the z-index for child elements.
    this.connectedOverlay.overlayRef.hostElement.style.zIndex = 'unset';

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    // Adding a class so that custom styles can be applied.
    const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
    HtmlElemUtil.setAttr(this.renderer, overlayRef, 'glnslpo-select', '');
    // Setting property 'width'.
    HtmlElemUtil.setProperty(overlayRef, CSS_PROP_WIDTH, this.hostWidth.toString().concat('px'));

    this.selectPanelRef = HtmlElemUtil.getElementRef(overlayElement.children[0]?.children[0] as HTMLElement);
    const panelHeight = this.getHeight(this.selectPanelRef);
    if (!this.frameComp.isNoAnimationVal && panelHeight > 0) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
    }
    // Set the font size for the overlay.
    if (this.triggerFontSize > 0) {
      overlayElement.style.fontSize = `${this.triggerFontSize}px`;
    }
    if (this.frameComp.sizeVal != null && this.frameComp.sizeVal > 0) {
      const borderRadius = Math.round((this.frameComp.sizeVal / 10) * 100) / 100;
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_BORDER_RADIUS, borderRadius.toString().concat('px'));
    }
    const visibleSize = this.visibleSizeVal ?? 0;
    if (visibleSize > 0 && this.optionHeight > 0) {
      const maxHeightOfOptionsPanel = this.optionHeight * visibleSize;
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_HEIGHT, maxHeightOfOptionsPanel.toString().concat('px'));
    }
    if (this.isMaxWdVal) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_WIDTH, this.hostWidth.toString().concat('px'));
    }
    // Important! These operations should be the last, they include animation and the dimensions of the panel are distorted.
    const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement?.children[0] as HTMLElement);
    if (this.frameComp.isNoAnimationVal) {
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, 'noAnm', '');
      HtmlElemUtil.setClass(this.renderer, selectPanelWrapRef, 'gln-no-animation', true);
    } else {
      // Add an attribute for animation and transformation.
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_PANEL_OPENING_ANIMATION, '');
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
    if (!this.isDisabledVal) {
      if (!this.isPanelOpen) {
        // Open the selection panel by pressing the keys: 'up arrow', 'down arrow', 'space' and 'enter'.
        if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(event.key)) {
          // Prevents the page from scrolling down when pressing space.
          event.preventDefault();
          event.stopPropagation();
          this.open();
        }
      } else {
        if (event.key === 'Enter') {
          // (Cases-B7) Panel is open and click the Enter key.
          const marked1Option: GlnOption | null = this.optionsScroll?.getMarkedOption() || null;
          if (marked1Option != null) {
            event.preventDefault();
            event.stopPropagation();
            // Selects the element of the current marker.
            this.selectionOptionElement(marked1Option);
            // And if not multiple, then closing the panel.
            if (!this.multiple) {
              this.close();
            }
          }
        } else if (OptionsScrollKeys.indexOf(event.key) > -1) {
          event.preventDefault();
          event.stopPropagation();
          this.optionsScroll?.moveMarkedOptionByKey(event.key);
        }
      }
    }
  }
  public setOptionsScroll(value: GlnOptionsScroll | null): void {
    this.optionsScroll = value;
    if (this.optionsScroll != null) {
      const markedOption: GlnOption | null = this.selectedOptions.slice(-1)[0] || null;
      if (markedOption != null) {
        this.optionsScroll.setMarkedOption(markedOption);
      }
    }
  }
  /** Processing the option selected by the user. */
  public selectionOptionElement(addOption: GlnOption | null): void {
    const newOptions = addOption !== null ? [addOption] : [];
    if (!this.isDisabledVal && newOptions.length > 0) {
      const removed: GlnOption[] = [];
      if (this.multiple) {
        // Which elements of array "this.selectedOptions" are included in array "addOptions".
        removed.push(...ArrayUtil.include<GlnOption>(this.selectedOptions, newOptions));
      } else {
        // Which elements of array "this.selectedOptions" are not included in array "addOptions".
        removed.push(...ArrayUtil.uninclude<GlnOption>(this.selectedOptions, newOptions));
      }
      // Which elements of array "addOptions" are not included in array "this.selectedOptions".
      const added = ArrayUtil.uninclude<GlnOption>(newOptions, this.selectedOptions);
      this.updateSelectedOptions(added, removed, true);
    }
  }

  public addOption(option: GlnOption | null): void {
    if (option && this.selectedOptions.indexOf(option) === -1) {
      this.updateSelectedOptions([option], [], true);
    }
  }

  public deleteOption(option: GlnOption | null): void {
    if (option && this.selectedOptions.indexOf(option) > -1) {
      this.updateSelectedOptions([], [option], true);
    }
  }

  // ** Private methods **

  private settingCheckmark(checkmark: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checkmark', !!checkmark);
    HtmlElemUtil.setAttr(renderer, elem, 'che', checkmark ? '' : null);
  }
  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', !!focus);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingMultiple(multiple: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-multiple', !!multiple);
    HtmlElemUtil.setAttr(renderer, elem, 'mul', multiple ? '' : null);
  }
  private settingNoIcon(noIcon: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-icon', !!noIcon);
    HtmlElemUtil.setAttr(renderer, elem, 'noico', noIcon ? '' : null);
  }
  private settingNoRipple(noRipple: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!noRipple);
    HtmlElemUtil.setAttr(renderer, elem, 'norip', noRipple ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
  private settingOrnamLfAlign(ornamLfAlign: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }
  private settingOrnamentList(attrName: string, ornamAlign: string, renderer: Renderer2, elementRefList: ElementRef<HTMLElement>[]): void {
    const ornamAlignValue = ORNAMENT_ALIGN[ornamAlign] || ORNAMENT_ALIGN['default'];
    if (attrName) {
      for (let idx = 0; idx < elementRefList.length; idx++) {
        HtmlElemUtil.setAttr(renderer, elementRefList[idx], attrName, ornamAlignValue);
      }
    }
  }

  private updateSelectedOptions(added: GlnOption[], removed: GlnOption[], isEmit: boolean): unknown[] {
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

  private mergeOptions(selected: GlnOption[], added: GlnOption[], removed: GlnOption[]): GlnOption[] {
    GlnOptionUtil.setSelected(removed, false);
    const currentOptions = ArrayUtil.delete<GlnOption>(selected, removed);
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
      const valueNum = (panelHeight - 0.6 * panelHeight) / 2;
      const delta = (Math.round(valueNum * 100) / 100).toString().concat('px');
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

  private getPosition(value: string | null): HorizontalConnectionPos {
    return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start') as HorizontalConnectionPos;
  }

  private getPositionList(position: string | undefined | null): ConnectedPosition[] {
    const horizontalAlignment: HorizontalConnectionPos = this.getPosition(position || null);
    return [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom' /*, offsetY: -5*/ },
    ];
  }
}

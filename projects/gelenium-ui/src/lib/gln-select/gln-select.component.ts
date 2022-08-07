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
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { GlnFrameSizePaddingVerHorRes } from '../directives/gln-frame-size/gln-frame-size-prepare.interface';
import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnBasisFrame } from '../_classes/gln-basis-frame.class';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnOptionUtil } from '../gln-option/gln-option.util';
import { ArrayUtil } from '../_utils/array.util';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnSelectConfig } from './gln-select-config.interface';
import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select.providers';
import { GlnSelectionChange } from './gln-selection-change.interface';
import { GlnSelectTriggerDirective, GLN_SELECT_TRIGGER } from './gln-select-trigger.directive';

let uniqueIdCounter = 0;

export const GLN_SELECT_CONFIG = new InjectionToken<GlnSelectConfig>('GLN_SELECT_CONFIG');

const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const CSS_ATTR_FOR_PANEL_OPENING_ANIMATION = 'is-open';
const CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION = 'is-hide';
const CSS_PROP_BORDER_RADIUS = '--glnslpo-border-radius';
const CSS_PROP_MAX_HEIGHT = '--glnslpo-max-height';
const CSS_PROP_FS_MIN_WIDTH = '--glnsl-fs-min-width';
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
  extends GlnBasisFrame
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor, Validator, GlnOptionParent
{
  // @Input()
  // public id = `glns-${uniqueIdCounter++}`; // Is in GlnBasisControl.
  @Input()
  public config: GlnSelectConfig | null | undefined; // -
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null | undefined; // GlnFrameSizeType // -
  @Input()
  public helperText: string | null | undefined;
  @Input()
  public isCheckmark: string | boolean | null | undefined;
  // @Input()
  // public isDisabled: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isError: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isHoverColor: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isLabelShrink: string | boolean | null | undefined; // Is in GlnBasisControl.
  @Input()
  public isMultiple: string | boolean | null | undefined;
  // @Input()
  // public isNoAnimation: string | boolean | null | undefined; // Is in GlnBasisControl.
  @Input()
  public isNoIcon: string | boolean | null | undefined;
  // @Input()
  // public isNoLabel: string | boolean | null | undefined; // Is in GlnBasisControl.
  @Input()
  public isNoRipple: string | boolean | null | undefined; // -
  // @Input()
  // public isReadOnly: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isRequired: string | boolean | null | undefined; // Is in GlnBasisControl.
  // @Input()
  // public isValueInit: string | boolean | null | undefined; // Is in GlnBasisControl. //~
  @Input()
  public label: string | null | undefined;
  @Input()
  public maxLength: number | null | undefined;
  @Input()
  public minLength: number | null | undefined;
  @Input()
  public noElevation: string | null = null; // -
  @Input()
  public ornamLfAlign: string | null | undefined; // OrnamAlign // -
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlign // -
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  @Input()
  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = ''; // -
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public visibleSize = -1;
  @Input()
  public tabIndex = 0; // ~
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
  // @Output()
  // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // Is in GlnBasisControl.
  @Output()
  readonly selected: EventEmitter<{ value: unknown | null; values: unknown[]; change: GlnSelectionChange<GlnOptionComponent> }> =
    new EventEmitter();

  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;
  @ContentChild(GLN_SELECT_TRIGGER)
  public customTrigger: GlnSelectTriggerDirective | undefined;
  @ViewChild('frameRef', { read: ElementRef, static: true })
  public frameRef!: ElementRef<HTMLElement>;
  /** A trigger that opens a dropdown list of options. */
  @ViewChild('triggerRef', { static: true })
  public triggerRef!: ElementRef<HTMLElement>;
  /** List of possible options. */
  @ContentChildren(GlnOptionComponent, { descendants: true })
  public optionList!: QueryList<GlnOptionComponent>;

  public get options(): GlnOptionComponent[] {
    return this.optionList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set options(value: GlnOptionComponent[]) {}

  public checkmark: boolean | null = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
  public currConfig: GlnSelectConfig | null = null;
  // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
  public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
  public errors: ValidationErrors | null = null;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public hasPanelAnimation = false;
  // public hoverColor: boolean | null = null; // Binding attribute "isHoverColor". // Is in GlnBasisControl.
  public isFocused = false;
  public isFilled = false;
  public isPanelOpen = false;
  // public isWriteValueInit: boolean | null = null;                         // Is in GlnBasisControl.
  // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // interface GlnOptionParent
  // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
  public noIcon: boolean | null = null; // Binding attribute "isNoIcon",
  // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public overlayPanelClass: string | string[] = '';
  public panelClassList: string | string[] | Set<string> | { [key: string]: any } | undefined; // Binding attribute "panelClass"
  public positionList: ConnectedPosition[] = [];
  // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
  // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
  public selectedOptions: GlnOptionComponent[] = [];
  /** Strategy for handling scrolling when the selection panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;
  // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.

  private isFocusAttrOnFrame = false;
  private markedOption: GlnOptionComponent | null = null;
  private maxWidth = 0;
  /** Saving the font size of the trigger element. */
  private triggerFontSize = 0;
  /** Saving the frame size of the trigger element. Defines BorderRadius. */
  private triggerFrameSize = 0;

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    changeDetectorRef: ChangeDetectorRef,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: any,
    private ngZone: NgZone
  ) {
    super(uniqueIdCounter++, 'glns', hostRef, renderer, changeDetectorRef);
    this.currConfig = this.rootConfig;
    this.scrollStrategy = this.scrollStrategyFactory();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    // In the GlnBasisControl.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    // - this.error = BooleanUtil.init(this.isError);
    // - this.hoverColor = BooleanUtil.init(this.isHoverColor);
    // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
    // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    // - this.noLabel = BooleanUtil.init(this.isNoLabel);
    // - this.readOnly = BooleanUtil.init(this.isReadOnly);
    // - this.required = BooleanUtil.init(this.isRequired);
    // - this.valueInit = BooleanUtil.init(this.isValueInit);
    super.ngOnChanges(changes);
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
      if (this.noAnimation == null) {
        this.noAnimation = this.currConfig?.isNoAnimation || null;
      }
    }
    if (changes.isCheckmark || (changes.config && this.isCheckmark == null)) {
      const isCheckmark = this.isCheckmark != null ? '' + this.isCheckmark : null;
      this.checkmark = BooleanUtil.init(isCheckmark) || this.currConfig?.isCheckmark || null;
    }
    if (changes.isMultiple || (changes.config && this.isMultiple == null)) {
      const isMultiple = this.isMultiple != null ? '' + this.isMultiple : null;
      this.multiple = BooleanUtil.init(isMultiple) || this.currConfig?.isMultiple || null;
    }
    if (changes.isNoIcon || (changes.config && this.isNoIcon == null)) {
      const isNoIcon = this.isNoIcon != null ? '' + this.isNoIcon : null;
      this.noIcon = BooleanUtil.init(isNoIcon) || this.currConfig?.isNoIcon || null;
    }
    if (changes.isNoRipple || (changes.config && this.isNoRipple == null)) {
      const isNoRipple = this.isNoRipple != null ? '' + this.isNoRipple : null;
      this.noRipple = BooleanUtil.init(isNoRipple) || this.currConfig?.isNoRipple || null;
    }
    if (changes.panelClass || (changes.config && this.panelClass == null)) {
      this.panelClassList = this.panelClass || this.currConfig?.panelClass;
    }
    if (changes.position || (changes.config && this.position == null)) {
      this.positionList = this.getPositionList(this.position || this.currConfig?.position);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    if (this.checkmark == null) {
      this.checkmark = this.currConfig?.isCheckmark || null;
    }
    if (this.multiple == null) {
      this.multiple = this.currConfig?.isMultiple || null;
    }
    if (this.noAnimation == null) {
      this.noAnimation = this.currConfig?.isNoAnimation || null;
    }
    if (this.noIcon == null) {
      this.noIcon = this.currConfig?.isNoIcon || null;
    }
    if (this.noRipple == null) {
      this.noRipple = this.currConfig?.isNoRipple || null;
    }
    if (this.currConfig?.overlayPanelClass) {
      this.overlayPanelClass = this.currConfig.overlayPanelClass;
    }
    if (this.panelClassList == null) {
      this.panelClassList = this.currConfig?.panelClass;
    }
    if (this.positionList.length === 0) {
      this.positionList = this.getPositionList(this.currConfig?.position);
    }
  }

  public override ngAfterContentInit(): void {
    // Initialized when the value is received via "writeValue()" but the list of menu items is just now.
    if (this.selectedOptions.length === 0 && this.options.length > 0) {
      const newValue = this.valueData;
      this.valueData = undefined;
      this.value = newValue;
    }
    super.ngAfterContentInit();
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public override writeValue(value: any): void {
    this.value = value;
    super.writeValue(value);
  }

  public override setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      isDisabled ? this.formGroup.disable() : this.formGroup.enable();
      super.setDisabledState(isDisabled);
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

  public optionSelection(optionItem: GlnOptionComponent): void {
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

  public trackByOption(index: number, item: GlnOptionComponent): string {
    return item.id;
  }
  /** Determine the value of the css variable "frame size". */
  public frameSizeChange(event: GlnFrameSizePaddingVerHorRes): void {
    this.triggerFrameSize = event.frameSizeValue || 0;
    const minWidth = NumberUtil.roundTo100(this.triggerFrameSize * 1.1);
    HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_FS_MIN_WIDTH, NumberUtil.str(minWidth)?.concat('px'));
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId)) {
      this.frameRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      const isFocusedEmit = !this.isFocused;
      this.isFocused = true;
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
      if (!this.isPanelOpen && !this.hasPanelAnimation) {
        // (Cases-B1) Panel is close and on the trigger, click the Tab key.
        this.blured.emit();
      } else {
        // (Cases-B2) Panel is open and mouse click within the panel.
        // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
        // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
        // For case Cases-B3,B4, let's add the "foc" attribute to force the display of focus.
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      }
    }
  }
  /** Occurs when mouse click events are outside the overlay. */
  public overlayOutsideClick(): void {
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
  public close(): void {
    if (this.disabled || !this.isPanelOpen) {
      return;
    }
    if (this.isFocusAttrOnFrame) {
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
    }
    this.isPanelOpen = false;
    this.changeDetectorRef.markForCheck();
    this.onTouched();
    this.markedOption?.setMarked(false);
    this.markedOption = null;

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    const selectPanelRef = HtmlElemUtil.getElementRef(overlayElement.children[0]?.children[0] as HTMLElement);
    const panelHeight = this.getHeight(selectPanelRef);
    if (panelHeight > 0) {
      const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
    }
    if (!this.noAnimation) {
      const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement.children[0] as HTMLElement);
      // Add an attribute for animation and transformation.
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_OPENING_ANIMATION, null);
      HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION, '');
    }
    this.closed.emit();
  }
  /** Callback when the overlay panel is attached. */
  public attach(): void {
    // Add a class to not skip mouse events.
    const hostElementRef = HtmlElemUtil.getElementRef(this.connectedOverlay.overlayRef.hostElement);
    HtmlElemUtil.setClass(this.renderer, hostElementRef, 'gln-overlay-events-auto', true);

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    // Adding a class so that custom styles can be applied.
    const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
    HtmlElemUtil.setAttr(this.renderer, overlayRef, 'glnspo-select', '');
    const selectPanelRef = HtmlElemUtil.getElementRef(overlayElement.children[0]?.children[0] as HTMLElement);
    const panelHeight = this.getHeight(selectPanelRef);
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
    if (this.triggerFrameSize > 0) {
      const borderRadius = NumberUtil.roundTo100(this.triggerFrameSize / 10);
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_BORDER_RADIUS, NumberUtil.str(borderRadius)?.concat('px'));
    }
    const optionHeigth = this.visibleSize > 0 ? this.getOptionHeigth(this.options) : 0;
    const maxHeigthSelectPanel = optionHeigth * this.visibleSize;
    if (maxHeigthSelectPanel > 0) {
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_HEIGHT, NumberUtil.str(maxHeigthSelectPanel)?.concat('px'));
    }
    // We cannot get the actual sizes and positions of elements if they are affected by a transformation.
    // Therefore, we first get all the data, and then add attributes for animation and transformation.
    if (this.markedOption !== null && selectPanelRef !== null && maxHeigthSelectPanel > 0) {
      const delta = NumberUtil.roundTo100(maxHeigthSelectPanel / 2) - NumberUtil.roundTo100(this.getHeight(this.markedOption.hostRef) / 2);
      const optionRect = this.markedOption.hostRef.nativeElement.getBoundingClientRect();
      const panelRect = selectPanelRef.nativeElement.getBoundingClientRect();
      selectPanelRef.nativeElement.scrollTo(0, optionRect.top - panelRect.top - delta);
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
  /** Handles all keypress events for the component's panel. */
  public frameKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      if (!this.isPanelOpen) {
        // Open the selection panel by pressing the keys: 'up arrow', 'down arrow', 'space' and 'enter'.
        if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(event.key)) {
          // Prevents the page from scrolling down when pressing space.
          event.preventDefault();
          this.open();
        }
      } else {
        if (['ArrowDown', 'ArrowUp', ' ', 'Tab'].includes(event.key)) {
          // Prevents the page from scrolling down when pressing: 'up arrow', 'down arrow', 'space' and 'tab'.
          event.preventDefault();
        }
        switch (event.key) {
          // (Cases-B5) Panel is open and click the Escape key.
          // (Cases-B6) Panel is open and click the Tab key.
          case 'Escape':
          case 'Tab':
            this.close();
            break;
          case 'ArrowDown':
          case 'ArrowUp':
            // Moving the cursor marker.
            this.markedOption = this.movingMarkedOption(event.key === 'ArrowDown', this.markedOption);
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

  // ** Private API **

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
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
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
  private movingMarkedOption(isNext: boolean, markedOption: GlnOptionComponent | null): GlnOptionComponent | null {
    let result: GlnOptionComponent | null = null;
    if (this.options.length > 0) {
      let indexOld = -1;
      if (markedOption != null) {
        indexOld = this.options.indexOf(markedOption);
        markedOption.setMarked(false);
      }
      const maxIndex = this.options.length - 1;
      const index = isNext ? (indexOld < maxIndex ? indexOld + 1 : 0) : indexOld > 0 ? indexOld - 1 : maxIndex;
      result = this.options[index];
      result.setMarked(true);
    }
    return result;
  }
  /** Get the height of the option. */
  private getOptionHeigth(options: GlnOptionComponent[]): number {
    const value: number[] = [];
    const count: number[] = [];
    let countByIndex = -1;
    let resultIndex = -1;
    for (let i = 0; i < options.length && countByIndex < 4; i++) {
      const height = this.getHeight(options[i].hostRef);
      let index = value.indexOf(height);
      if (index === -1) {
        value.push(height);
        count.push(1);
        index = value.length - 1;
      } else {
        count[index]++;
      }
      if (count[index] > countByIndex) {
        countByIndex = count[index];
        resultIndex = index;
      }
    }
    return resultIndex > -1 ? value[resultIndex] : 0;
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

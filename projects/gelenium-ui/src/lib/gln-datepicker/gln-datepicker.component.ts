import { CdkConnectedOverlay, ConnectedPosition, HorizontalConnectionPos, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  AsyncValidatorFn,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { CSS_ATTR_ORN_LF, CSS_PROP_ORN_PD_LF, GlnOrnamentLeftDirective } from '../directives/gln-ornament/gln-ornament-left.directive';
import { GlnOrnamentOwnerUtil } from '../directives/gln-ornament/gln-ornament-owner.util';
import { CSS_ATTR_ORN_RG, CSS_PROP_ORN_PD_RG, GlnOrnamentRightDirective } from '../directives/gln-ornament/gln-ornament-right.directive';
import { ORNAMENT_ALIGN } from '../directives/gln-ornament/gln-ornament.interface';
import { GlnOrnamentUtil } from '../directives/gln-ornament/gln-ornament.util';
import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameComponent } from '../gln-frame/gln-frame.component';
import { ArrayUtil } from '../_utils/array.util';
import { BooleanUtil } from '../_utils/boolean.util';
import { ChangeUtil } from '../_utils/change.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnDatepickerConfig } from './gln-datepicker-config.interface';
import { GLN_DATEPICKER_SCROLL_STRATEGY } from './gln-datepicker.providers';
import { DateUtil } from '../_utils/date.util';

export const GLN_DATEPICKER_CONFIG = new InjectionToken<GlnDatepickerConfig>('GLN_DATEPICKER_CONFIG');

const CSS_ATTR_FRAME_FOCUS = 'foc';
const CSS_ATTR_PANEL_OPENING_ANIMATION = 'is-show';
const CSS_ATTR_PANEL_CLOSING_ANIMATION = 'is-hide';
const CSS_PROP_BORDER_RADIUS = '--glndppo--border-radius';
// const CSS_PROP_MAX_HEIGHT = '--glnslpo--max-height';
// #? const CSS_PROP_MAX_WIDTH = '--glndppo--max-width';
// #? const CSS_PROP_WIDTH = '--glndppo--width';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-datepicker',
  exportAs: 'glnDatepicker',
  templateUrl: './gln-datepicker.component.html',
  styleUrls: ['./gln-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnDatepickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnDatepickerComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnDatepickerComponent },
  ],
})
export class GlnDatepickerComponent
  implements OnChanges, OnInit, OnDestroy, AfterContentInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id = `glndp-${uniqueIdCounter++}`;
  @Input()
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  public classes: string | string[] | Set<string> | { [key: string]: unknown } = '';
  @Input()
  public config: GlnDatepickerConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // 'outlined' | 'underline' | 'standard'
  @Input()
  public helperText: string | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isMaxWd: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoIcon: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isPlaceholder: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public ornamLfAlign: string | null | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  @Input()
  public ornamRgAlign: string | null | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  @Input()
  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public tabIndex: number = 0;
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly change: EventEmitter<Date> = new EventEmitter();

  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;
  @ViewChild(GlnFrameComponent, { static: true })
  public frameComp!: GlnFrameComponent;
  /** A trigger that opens a dropdown list of options. */
  @ViewChild('triggerRef', { read: ElementRef<HTMLDivElement>, static: true })
  public triggerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('inputElementRef', { static: true })
  public inputElementRef!: ElementRef<HTMLElement>;
  @ContentChildren(GlnOrnamentLeftDirective, { descendants: true })
  public ornamLeftList!: QueryList<GlnOrnamentLeftDirective>;
  @ContentChildren(GlnOrnamentRightDirective, { descendants: true })
  public ornamRightList!: QueryList<GlnOrnamentRightDirective>;

  @ViewChild(GlnOrnamentRightDirective)
  public ornamRhomb: GlnOrnamentRightDirective | undefined;

  public backdropClassVal: string | null = null;
  public currConfig: GlnDatepickerConfig;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
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
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public ornamLfAlignVal: string | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: string | null = null; // Binding attribute "ornamRgAlign".
  public overlayClassesVal: string | string[] = '';
  public classesVal: string | string[] | Set<string> | { [key: string]: unknown } | undefined; // Binding attribute "classes"
  public positionList: ConnectedPosition[] = [];
  // /** A strategy for handling scrolling when the overlay panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect | null = null;

  private hostWidth: number = 0;
  private isFocusAttrOnFrame: boolean = false;
  /** Saving the font size of the trigger element. */
  private triggerFontSize: number = 0;
  private valueDate: Date | null | undefined;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    // private ngZone: NgZone,
    private overlay: Overlay,
    @Optional() @Inject(GLN_DATEPICKER_CONFIG) private rootConfig: GlnDatepickerConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null,
    @Optional() @Inject(GLN_DATEPICKER_SCROLL_STRATEGY) private scrollStrategyFactory: (() => ScrollStrategy) | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.scrollStrategy = this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : this.overlay.scrollStrategies.block();
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-datepicker');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (!!changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (!!changes['isError'] || ChangeUtil.check(changes['config'], 'isError')) {
      this.isErrorVal = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (!!changes['isMaxWd'] || ChangeUtil.check(changes['config'], 'isMaxWd')) {
      this.isMaxWdVal = BooleanUtil.init(this.isMaxWd) ?? !!this.currConfig.isMaxWd;
    }
    if (!!changes['isNoIcon'] || ChangeUtil.check(changes['config'], 'isNoIcon')) {
      this.isNoIconVal = BooleanUtil.init(this.isNoIcon) ?? !!this.currConfig.isNoIcon;
      this.settingNoIcon(this.isNoIconVal, this.renderer, this.hostRef);
    }
    if (!!changes['isNoRipple'] || ChangeUtil.check(changes['config'], 'isNoRipple')) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
    }
    if (!!changes['isPlaceholder'] || ChangeUtil.check(changes['config'], 'isPlaceholder')) {
      this.isPlaceholderVal = BooleanUtil.init(this.isPlaceholder) ?? !!this.currConfig.isPlaceholder;
    }
    if (!!changes['isReadOnly'] || ChangeUtil.check(changes['config'], 'isReadOnly')) {
      this.isReadOnlyVal = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (!!changes['isRequired'] || ChangeUtil.check(changes['config'], 'isRequired')) {
      this.isRequiredVal = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (!!changes['ornamLfAlign'] || ChangeUtil.check(changes['config'], 'ornamLfAlign')) {
      this.ornamLfAlignVal = ORNAMENT_ALIGN[this.ornamLfAlign || this.currConfig.ornamLfAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
      this.settingOrnamentList(CSS_ATTR_ORN_LF, this.ornamLfAlignVal || '', this.renderer, GlnOrnamentUtil.getElements(this.ornamLeftList));
    }
    if (!!changes['ornamRgAlign'] || ChangeUtil.check(changes['config'], 'ornamRgAlign')) {
      this.ornamRgAlignVal = ORNAMENT_ALIGN[this.ornamRgAlign || this.currConfig.ornamRgAlign || ''] || ORNAMENT_ALIGN['default'];
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
      const rhombRef: ElementRef<HTMLElement> | undefined = this.ornamRhomb?.hostRef;
      const ornamRgAlign: string = this.ornamRgAlignVal || '';
      this.settingOrnamentList(CSS_ATTR_ORN_RG, ornamRgAlign, this.renderer, GlnOrnamentUtil.getElements(this.ornamRightList, rhombRef));
    }
    if (ChangeUtil.check(changes['config'], 'overlayClasses') && this.currConfig.overlayClasses != null) {
      this.overlayClassesVal = this.currConfig.overlayClasses;
    }
    if (!!changes['classes'] || ChangeUtil.check(changes['config'], 'classes')) {
      this.classesVal = this.classes || this.currConfig.classes;
    }
    if (!!changes['position'] || ChangeUtil.check(changes['config'], 'position')) {
      this.positionList = this.getPositionList(this.position || this.currConfig.position);
    }

    if (!!changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.backdropClassVal == null) {
      this.backdropClassVal = this.currConfig.backdropClass || null;
    }
    if (this.isErrorVal == null) {
      this.isErrorVal = !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
    }
    if (this.isMaxWdVal == null) {
      this.isMaxWdVal = !!this.currConfig.isMaxWd;
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
    const isFilledOld: boolean = this.isFilled;
    this.valueDate = value;
    this.formControl.setValue(this.formatDate(value), { emitEvent: false });
    this.isFilled = !!this.formControl.value;
    if (isFilledOld !== this.isFilled) {
      this.changeDetectorRef.markForCheck();
    }
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
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formControl.errors;
  }

  // ** interface Validator - finish **

  // ** GlnNodeInternalValidator - start **

  public addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  public addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addAsyncValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  // ** GlnNodeInternalValidator - finish **

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

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
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
      this.isFilled = !!this.formControl.value;
      if (!this.isPanelOpen && !this.hasPanelAnimation) {
        this.onTouched();
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
  /*public doOverlayPanelKeydown(event: KeyboardEvent): void {
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
  }*/
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
    if (!this.isDisabledVal && !this.isReadOnlyVal && !this.isPanelOpen) {
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
      // #? const panelHeight = this.getHeight(this.selectPanelRef);
      // #? if (panelHeight > 0) {
      // #?   const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
      // #?   HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
      // #? }
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
    // this.selectPanelRef = null;
    this.closed.emit();
  }
  /** Callback when the overlay panel is attached. */
  public attach(): void {
    // Add the current object to the list of elements with the panel open.
    // #? GlnSelectOpenUtil.add(this);
    // Adding z-index: 'unset' will allow you to have one parent with a single z-index value.
    // This will correctly use the z-index for child elements.
    this.connectedOverlay.overlayRef.hostElement.style.zIndex = 'unset';

    // const validPosition: string = this.getValidPosition(this.positionVal);
    // this.getConnectedPosition(validPosition)

    const overlayElement: HTMLElement = this.connectedOverlay.overlayRef.overlayElement;
    // Adding a class so that custom styles can be applied.
    const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
    HtmlElemUtil.setAttr(this.renderer, overlayRef, 'glndppo-datepicker', '');
    // #? // Setting property 'width'.
    // #? HtmlElemUtil.setProperty(overlayRef, CSS_PROP_WIDTH, this.hostWidth.toString().concat('px'));

    // Set the font size for the overlay.
    if (this.triggerFontSize > 0) {
      overlayElement.style.fontSize = `${this.triggerFontSize}px`;
    }
    if (this.frameComp.sizeVal != null && this.frameComp.sizeVal > 0) {
      const borderRadius = Math.round((this.frameComp.sizeVal / 10) * 100) / 100;
      HtmlElemUtil.setProperty(overlayRef, CSS_PROP_BORDER_RADIUS, borderRadius.toString().concat('px'));
    }
    // #? const visibleSize = this.visibleSizeVal ?? 0;
    // #? if (visibleSize > 0 && this.optionHeight > 0) {
    // #?   const maxHeightOfOptionsPanel = this.optionHeight * visibleSize;
    // #?   HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_HEIGHT, maxHeightOfOptionsPanel.toString().concat('px'));
    // #? }

    // #? if (this.isMaxWdVal) {
    // #?   HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_WIDTH, this.hostWidth.toString().concat('px'));
    // #? }

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
    // #? GlnSelectOpenUtil.remove(this);
    if (this.isPanelOpen) {
      this.close();
    }
  }

  public dateSelected(selectedDate: Date | null): void {
    this.valueDate = selectedDate;
    this.formControl.setValue(this.formatDate(selectedDate), { emitEvent: false });
    this.isFilled = !!this.formControl.value;
    this.onChange(this.formControl.value);
    if (this.isPanelOpen) {
      this.close();
    }
  }
  // ** Protected methods **

  /** Get the correct "position" value. */
  /*protected getValidPosition(position: string | null): string {
    return TOOLTIP_POSITION[position || ''] || TOOLTIP_POSITION['bottom'];
  }*/
  /*private getPositionParts(positionIn: string | null): { position: string; alignment: string } {
    const tokenList: string[] = (positionIn || '').split('-');
    const position: string = tokenList[0] || 'bottom';
    const alignment: string = tokenList[1] || 'center';
    return { position, alignment };
  }*/
  /*private getConnectedPosition(positionIn: string | null): ConnectedPosition {
    let originX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let originY: VerticalConnectionPos = 'bottom'; // 'top' | 'center' | 'bottom'
    let overlayX: HorizontalConnectionPos = 'center'; // 'start' | 'center' | 'end'
    let overlayY: VerticalConnectionPos = 'top'; // 'top' | 'center' | 'bottom'

    const { position, alignment } = this.getPositionParts(positionIn);

    if ('top' === position || 'bottom' === position) {
      originY = 'top' === position ? 'top' : 'bottom';
      overlayY = 'top' === position ? 'bottom' : 'top';
      originX = overlayX = 'start' === alignment ? 'start' : 'end' === alignment ? 'end' : 'center';
    } else if ('left' === position || 'right' === position) {
      originX = 'left' === position ? 'start' : 'end';
      overlayX = 'left' === position ? 'end' : 'start';
      originY = overlayY = 'start' === alignment ? 'top' : 'end' === alignment ? 'bottom' : 'center';
    }
    return { originX, originY, overlayX, overlayY, panelClass: ['glntt-' + position, 'glntt-' + alignment] };
  }*/

  // ** Private methods **

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  private formatDate(dateValue: Date | null | undefined): string | null | undefined {
    let result: string | null | undefined = null;
    if (dateValue != null) {
      const year: string = DateUtil.formatDateTime(dateValue, { year: 'numeric' }, 'default');
      const month: string = DateUtil.formatDateTime(dateValue, { month: '2-digit' }, 'default');
      const day: string = DateUtil.formatDateTime(dateValue, { day: '2-digit' }, 'default');
      result = `${day}/${month}/${year}`;
    } else {
      result = dateValue;
    }
    return result;
  }
  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', !!focus);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
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

  private getPosition(value: string | null): HorizontalConnectionPos {
    return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start') as HorizontalConnectionPos;
  }

  private getPositionList(position: string | undefined | null): ConnectedPosition[] {
    const horizontAlignment: HorizontalConnectionPos = this.getPosition(position || null);
    return [
      { originX: horizontAlignment, originY: 'bottom', overlayX: horizontAlignment, overlayY: 'top', panelClass: ['glndp-bottom'] },
      { originX: horizontAlignment, originY: 'top', overlayX: horizontAlignment, overlayY: 'bottom', panelClass: ['glndp-top'] },
    ];
  }
}

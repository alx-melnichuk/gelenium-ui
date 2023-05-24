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
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnDatepickerConfig } from './gln-datepicker-config.interface';

export const GLN_DATEPICKER_CONFIG = new InjectionToken<GlnDatepickerConfig>('GLN_DATEPICKER_CONFIG');

const CSS_ATTR_FRAME_FOCUS = 'foc';
// const CSS_ATTR_PANEL_OPENING_ANIMATION = 'is-show';
// const CSS_ATTR_PANEL_CLOSING_ANIMATION = 'is-hide';
// const CSS_PROP_BORDER_RADIUS = '--glnslpo--border-radius';
// const CSS_PROP_MAX_HEIGHT = '--glnslpo--max-height';
// const CSS_PROP_MAX_WIDTH = '--glnslpo--max-width';
// const CSS_PROP_TRANSLATE_Y = '--glnslpo--translate-y';
// const CSS_PROP_WIDTH = '--glnslpo--width';

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
  implements OnChanges, OnInit, AfterContentInit, OnDestroy, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public id = `glndp-${uniqueIdCounter++}`;
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

  @ViewChild(GlnFrameComponent, { static: true })
  public frameComp!: GlnFrameComponent;
  @ViewChild('inputElementRef', { static: true })
  public inputElementRef!: ElementRef<HTMLElement>;
  @ContentChildren(GlnOrnamentLeftDirective, { descendants: true })
  public ornamLeftList!: QueryList<GlnOrnamentLeftDirective>;
  @ContentChildren(GlnOrnamentRightDirective, { descendants: true })
  public ornamRightList!: QueryList<GlnOrnamentRightDirective>;

  @ViewChild(GlnOrnamentRightDirective)
  public ornamRhomb: GlnOrnamentRightDirective | undefined;

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
  public isNoIconVal: boolean | null = null; // Binding attribute "isNoIcon",
  public isPlaceholderVal: boolean | null = null; // Binding attribute "isPlaceholder".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
  public ornamLfAlignVal: string | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: string | null = null; // Binding attribute "ornamRgAlign".

  private isFocusAttrOnFrame: boolean = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    // private ngZone: NgZone,
    // private overlay: Overlay,
    @Optional() @Inject(GLN_DATEPICKER_CONFIG) private rootConfig: GlnDatepickerConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null // @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: (() => ScrollStrategy) | null
  ) {
    this.currConfig = this.rootConfig || {};
    // this.scrollStrategy = this.scrollStrategyFactory != null ? this.scrollStrategyFactory() : this.overlay.scrollStrategies.block();
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-datepicker');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isDisabled']) {
      this.setDisabledState(!!BooleanUtil.init(this.isDisabled));
    }
    if (changes['isError'] || (changes['config'] && this.isError == null && this.currConfig.isError != null)) {
      this.isErrorVal = BooleanUtil.init(this.isError) ?? !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
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

    if (changes['isRequired']) {
      this.prepareFormGroup(this.isRequiredVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.isErrorVal == null) {
      this.isErrorVal = !!this.currConfig.isError;
      this.settingError(this.isErrorVal, this.renderer, this.hostRef);
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

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(value, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
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
      this.onTouched();
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

  /** Closes the overlay panel and focuses the main element. */
  public close(options?: { noAnimation?: boolean }): void {
    if (this.isDisabledVal || !this.isPanelOpen) {
      return;
    }
    // ??
  }

  // ** Private methods **

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  private settingError(error: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-error', !!error);
    HtmlElemUtil.setAttr(renderer, elem, 'err', error ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', !!focus);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  // private settingMultiple(multiple: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
  //   HtmlElemUtil.setClass(renderer, elem, 'gln-multiple', !!multiple);
  //   HtmlElemUtil.setAttr(renderer, elem, 'mul', multiple ? '' : null);
  // }
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
}

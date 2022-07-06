import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
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

import { GlnFrameSizePaddingVerHorRes } from '../directives/gln-frame-size/gln-frame-size-prepare.interface';
import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnBasisFrame } from '../gln-frame/gln-basis-frame.class';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnMenuItemParent, GLN_MENU_ITEM_PARENT } from '../gln-menu-item/gln-menu-item-parent.interface';
import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { SchemeUtil } from '../_utils/scheme.util';

import { GlnSelectConfig } from './gln-select-config.interface';
import { GlnSelectedMenuItems } from './gln-selected-menu-items';

let uniqueIdCounter = 0;

export const GLN_SELECT_CONFIG = new InjectionToken<GlnSelectConfig>('GLN_SELECT_CONFIG');

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
    { provide: GLN_MENU_ITEM_PARENT, useExisting: GlnSelectComponent },
  ],
})
export class GlnSelectComponent
  extends GlnBasisFrame
  implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator, GlnMenuItemParent
{
  // @Input() // #public id = `glns-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSelectConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null = null; // GlnFrameSizeType
  @Input()
  public helperText: string | null = null;
  @Input()
  public hoverColor: string | null = null;
  // @Input() // #public isDisabled: string | null = null;
  @Input()
  public isError: string | null = null;
  @Input()
  public isFixRight: string | null = null;
  @Input()
  public isMultiple: string | null = null;
  @Input()
  public isNoCheckmark: string | null = null;
  @Input()
  public isNoRipple: string | null = null;
  @Input()
  public isReadOnly: string | null = null;
  @Input()
  public isRequired: string | null = null;
  // @Input() // #public isValueInit: string | null = null;
  @Input()
  public label = '';
  @Input()
  public lbShrink: string | null = null;
  // @Input()
  // #public noAnimation: string | boolean | null = null;
  @Input()
  public noIcon: string | null = null;
  @Input()
  public noLabel: string | null = null;
  @Input()
  public ornamLfAlign: string | null = null; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null = null; // OrnamAlign
  @Input()
  public visibleSize = -1;
  @Input()
  public wdFull: string | null = null;

  @Input()
  get value(): unknown | unknown[] | null {
    return this.valueData;
  }
  set value(newValue: unknown | unknown[] | null) {
    // console.log(`set value(${newValue});`); // TODO del;
    if (this.multiple && !Array.isArray(newValue)) {
      throw Error('The value must be an array in multi-select mode.');
    }
    if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
      // Get a list of menu items according to an array of values.
      const newMenuItems = this.selectedItems.getMenuItemsByValues(newValue, this.menuItems);
      // Set the selected menu items to the new list of items.
      this.selectedItems.setSelectionMenuItems(newMenuItems, this.menuItems);
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
  readonly selected: EventEmitter<{ value: unknown | null; values: unknown[] }> = new EventEmitter();
  // @Output() // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter();

  @ViewChild('mainElementRef', { static: true })
  public mainElementRef: ElementRef<HTMLElement> | null = null;

  @ContentChildren(GlnMenuItemComponent)
  public menuItemList!: QueryList<GlnMenuItemComponent>;

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  public currConfig: GlnFrameConfig | null = null;
  // #public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public errors: ValidationErrors | null = null;
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public isBarShowAnimation = false;
  public isFocused = false;
  public isFilled = false;
  // #public isNoAnimation: boolean | null = null; // Binding attribute "noAnimation".
  public isOpen = false;
  // #public isWriteValueInit: boolean | null = null;
  public multiple: boolean | null = null; // Binding attribute "isMultiple". // GlnMenuItemParent
  public required: boolean | null = null; // Binding attribute "isRequired".
  public selectedItems: GlnSelectedMenuItems = new GlnSelectedMenuItems();
  // #public valueInit: boolean | null = null; // Binding attribute "isValueInit".
  public noCheckmark: boolean | null = null; // Binding attribute "isNoCheckmark". // GlnMenuItemParent
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple". // GlnMenuItemParent

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2
  ) {
    super(uniqueIdCounter++, 'glns', hostRef, renderer, changeDetectorRef);
    SchemeUtil.loadingCheck();
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.init(this.isMultiple);
    }
    if (changes.isNoCheckmark) {
      this.noCheckmark = BooleanUtil.init(this.isNoCheckmark);
    }
    if (changes.isNoRipple) {
      this.noRipple = BooleanUtil.init(this.isNoRipple);
    }
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngAfterContentInit(): void {
    // console.log(`AfterContentInit(${this.id});  menuItems.length=${this.menuItems.length} this.valueData=`, this.valueData); // TODO del;
    // Initialized when the value is received via "writeValue()" but the list of menu items is just now.
    if (this.selectedItems.isEmpty && this.menuItems.length > 0) {
      const newValue = this.valueData;
      this.valueData = undefined;
      this.value = newValue;
    }
    super.ngAfterContentInit();
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    // console.log(`writeValue(${this.id}) value=`, value == null ? 'null' : value); // TODO del;
    this.value = value;
    // Execute the base class method.
    super.writeValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
      super.setDisabledState(isDisabled);
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return (this.errors = !this.disabled && this.required && this.isEmpty() ? { required: true } : null);
  }

  // ** Validator - finish **

  // ** Public API **

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId) && !!this.mainElementRef) {
      this.mainElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
      this.focusState(this.renderer, this.hostRef, this.isFocused);
      this.focused.emit();
    }
  }

  public doBlur(): void {
    if (!this.disabled) {
      this.isFocused = false;
      this.focusState(this.renderer, this.hostRef, this.isFocused);
      this.onTouched();
      this.blured.emit();
    }
  }

  public trackByMenuItem(index: number, item: GlnMenuItemComponent): string {
    return item.id;
  }

  // Determine the value of the css variable "frame size".
  public frameChange(event: GlnFrameSizePaddingVerHorRes): void {
    HtmlElemUtil.setProperty(this.hostRef, '--glns-size', NumberUtil.str(event.frameSizeValue)?.concat('px') || null);
  }

  public isEmpty(): boolean {
    return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
  }

  public clear(): void {
    if (!this.disabled && !this.isEmpty()) {
      this.selectedItems.clear();
      // Select the first menu item with the value null.
      const itemNull = !this.multiple ? this.selectedItems.findMenuItemByValue(null, this.menuItems) : null;
      if (itemNull) {
        // Set the selected menu items to the new list of items.
        this.selectedItems.setSelectionMenuItems([itemNull], this.menuItems);
      }
      this.updateValueDataAndIsFilledAndValidity(this.multiple ? [] : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Processing a user-selected menu item. */
  public selectionMenuElement(addMenuItem: GlnMenuItemComponent | null): void {
    const addMenuItems = addMenuItem !== null ? [addMenuItem] : [];
    if (!this.disabled && addMenuItems.length > 0) {
      // Get a new list of menu items.
      const mergeMenuItems: GlnMenuItemComponent[] = this.selectedItems.mergeMenuItems(!!this.multiple, addMenuItems, this.menuItems);
      // Set the selected menu items to the new list of items.
      this.selectedItems.setSelectionMenuItems(mergeMenuItems, this.menuItems);

      const values = this.selectedItems.getValues();
      const value = values.length > 0 ? values[0] : null;
      this.updateValueDataAndIsFilledAndValidity(this.multiple ? values : value); // TODO del; => this.onChange(this.valueData);
      this.changeDetectorRef.markForCheck();

      this.selected.emit({ value: !this.multiple ? value : null, values: this.multiple ? values : [] });

      if (!this.multiple) {
        this.close();
      }
    }
  }

  public togger(): void {
    if (!this.disabled) {
      if (!this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  public open(): void {
    if (!this.disabled && !this.isOpen && !this.isBarShowAnimation) {
      this.isOpen = true;
      this.opened.emit();
      this.changeDetectorRef.markForCheck();
    }
  }

  public close(): void {
    if (!this.disabled && this.isOpen) {
      if (!this.isNoAnimation) {
        this.isBarShowAnimation = true;
      }
      this.isOpen = false;
      this.closed.emit();
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Private API **

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  private updateValueDataAndIsFilledAndValidity(newValueData: unknown | unknown[] | null): void {
    this.valueData = newValueData;
    this.isFilled = !this.isEmpty();
    // Calling the validation method for the new value.
    this.onChange(this.valueData);
  }
}

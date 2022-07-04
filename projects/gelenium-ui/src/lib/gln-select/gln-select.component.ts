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
  ],
})
export class GlnSelectComponent extends GlnBasisFrame implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor, Validator {
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
    if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
      this.setSelectedMenuItemsByValue(!!this.multiple, newValue, this.menuItems);
      this.valueData = newValue;
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
  public multiple: boolean | null = null; // Binding attribute "isMultiple".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public selectedItems: GlnSelectedMenuItems = new GlnSelectedMenuItems();
  // #public valueInit: boolean | null = null; // Binding attribute "isValueInit".

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
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngAfterContentInit(): void {
    // console.log(`AfterContentInit(${this.id});  menuItems.length=${this.menuItems.length}`); // TODO del;

    // if (this.multiple) {
    //   for (let i = 0; i < this.menuItems.length; i++) {
    //     this.menuItems[i].setMultiple(true);
    //   }
    // }
    // Initialization when the value is received via "writeValue()".
    if (this.valueData != null && this.selectedItems.isEmpty) {
      this.setSelectedMenuItemsByValue(!!this.multiple, this.valueData, this.menuItems);
    }
    super.ngAfterContentInit();
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    // console.log(`writeValue(${this.id}) value=${value == null ? 'null' : value}`);

    this.value = value;

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
    this.errors = !this.disabled && this.required && this.selectedItems.isEmpty ? { required: true } : null;
    return this.errors;
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

  public clearSelectedMenuItems(): void {
    if (!this.disabled && !this.selectedItems.isEmpty) {
      this.selectedItems.clear();
      this.isFilled = !this.selectedItems.isEmpty;
      this.changeDetectorRef.markForCheck();
    }
  }

  public selectedMenuElement(addMenuItem: GlnMenuItemComponent | null): void {
    const addMenuItems = addMenuItem !== null ? [addMenuItem] : [];
    if (!this.disabled && addMenuItems.length > 0 && this.selectedItems.updateByElements(!!this.multiple, addMenuItems, this.menuItems)) {
      this.isFilled = !this.selectedItems.isEmpty;
      this.changeDetectorRef.markForCheck();

      const values = this.selectedItems.getValues();
      const value = values.length > 0 ? values[0] : null;
      this.selected.emit({ value: !this.multiple ? value : null, values: this.multiple ? values : [] });
      this.onChange(this.multiple ? values : value);
      if (!this.multiple) {
        this.close();
      }
    }
  }

  public isEmpty(): boolean {
    return this.selectedItems.isEmpty;
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

  private setSelectedMenuItemsByValue(multiple: boolean, newValue: unknown | unknown[] | null, menuItems: GlnMenuItemComponent[]): void {
    if (menuItems.length > 0) {
      if (multiple && !Array.isArray(newValue)) {
        throw Error('The value must be an array in multi-select mode.');
      }
      this.selectedItems.clear();
      const addValues: unknown[] = Array.isArray(newValue) ? newValue : newValue ? [newValue] : [];
      const addMenuItems = this.selectedItems.findMenuItems(addValues, menuItems);
      this.selectedItems.updateByElements(!!multiple, addMenuItems, menuItems);

      this.isFilled = !this.selectedItems.isEmpty;
      this.changeDetectorRef.markForCheck();
    }
  }
}

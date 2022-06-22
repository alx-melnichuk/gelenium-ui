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
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnSelectConfig } from './gln-select-config.interface';

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
export class GlnSelectComponent implements OnChanges, AfterContentInit, ControlValueAccessor, Validator {
  @Input()
  public id = `glns-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSelectConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null = null; // GlnFrameSizeType
  @Input()
  public helperText: string | null = null;
  @Input()
  public isDisabled: string | null = null;
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
  @Input()
  public label = '';
  @Input()
  public lbShrink: string | null = null;
  @Input()
  public noIcon: string | null = null;
  @Input()
  public noLabel: string | null = null;
  @Input()
  public ornamLfAlign: string | null = null; // OrnamAlign
  @Input()
  public ornamRgAlign: string | null = null; // OrnamAlign
  @Input()
  public sizeVisible = -1;

  @Input()
  get value(): unknown | unknown[] | null {
    return this.valueData;
  }
  set value(newValue: unknown | unknown[] | null) {
    if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
      if (this.menuItems.length > 0) {
        this.setSelectedMenuItemsByValue(newValue);
      }
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

  @ViewChild('mainElementRef', { static: true })
  public mainElementRef: ElementRef<HTMLElement> | null = null;

  @ContentChildren(GlnMenuItemComponent)
  public menuItemList!: QueryList<GlnMenuItemComponent>;

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  public defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public currConfig: GlnFrameConfig | null = null;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;

  public multiple: boolean | null = null;

  public isOpen = false;
  public isHide = false;
  public isAnimation = false;
  public selectedMenuItems: GlnMenuItemComponent[] = [];

  private isStopPropagation = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GlnSelectConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isDisabled) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabledState(!!this.disabled);
    }
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.init(this.isMultiple);
    }
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  ngAfterContentInit(): void {
    // Initialization when the value is received via "writeValue()".
    if (this.value != null && this.selectedMenuItems.length === 0 && this.menuItems.length > 0) {
      this.setSelectedMenuItemsByValue(this.valueData);
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(valueInp: any): void {
    this.value = valueInp;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
      this.disabled = isDisabled;
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return !this.disabled && this.required && this.isEmpty() ? { required: true } : null;
  }

  // ** Validator - finish **

  // ** Public API **

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.mainElementRef) {
      this.mainElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.isFocused = true;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.onTouched();
    this.blured.emit();
  }

  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }

  public trackByMenuItem(index: number, item: GlnMenuItemComponent): string {
    return item.id;
  }

  public doAnimationStart(): void {
    this.isAnimation = true;
    this.changeDetectorRef.markForCheck();
  }

  public doAnimationEnd(): void {
    this.isAnimation = false;
    if (this.isOpen && this.isHide) {
      this.isOpen = false;
      this.isHide = false;
      this.closed.emit();
    }
    this.changeDetectorRef.markForCheck();
  }
  // Determine the value of the css variable "frame size".
  public frameChange(event: GlnFrameSizePaddingVerHorRes): void {
    HtmlElemUtil.setProperty(this.hostRef, '--glns-frameSize', NumberUtil.str(event.frameSizeValue)?.concat('px') || null);
  }

  public trigger(): void {
    // There should be no toggles during the animation.
    if (!this.isAnimation) {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }
  public open(): void {
    // You cannot open the panel during animation.
    if (!this.isAnimation && !this.isOpen) {
      this.isOpen = true;
      this.isHide = false;
      this.opened.emit();
      this.changeDetectorRef.markForCheck();
    }
  }
  public close(): void {
    // You cannot close a panel during an animation.
    if (!this.isAnimation && this.isOpen) {
      this.isHide = true;
    }
  }

  public doMousedown(event: Event): void {
    if (!this.isAnimation) {
      if (!this.isOpen) {
        this.isStopPropagation = true;
        this.open();
      }
    }
  }
  public doMouseup(event: Event): void {
    if (this.isStopPropagation) {
      event.stopPropagation();
      this.isStopPropagation = false;
    }
  }

  public clearSelectedMenuItems(): void {
    if (this.selectedMenuItems.length > 0) {
      for (let idx = 0; idx < this.selectedMenuItems.length; idx++) {
        this.selectedMenuItems[idx].setSelected(false);
      }
      this.selectedMenuItems.length = 0;
      this.isFilled = !this.isEmpty();
      this.changeDetectorRef.markForCheck();
    }
  }

  public selectedMenuElement(addMenuItems: GlnMenuItemComponent[]): void {
    if (addMenuItems.length > 0 && this.menuItems.length > 0) {
      this.updateSelectedMenuByElements(addMenuItems, this.menuItems);
      if (this.multiple) {
        const values = this.selectedMenuItems.map((item) => item.value);
        this.selected.emit({ value: null, values });
        this.onChange(values);
      } else {
        const value = this.selectedMenuItems.length > 0 ? this.selectedMenuItems[0].value : null;
        this.selected.emit({ value, values: [] });
        this.onChange(value);
        console.log(`selectedMenuElement() this.close();`); // TODO del;
        this.close();
      }
    }
  }

  public isEmpty(): boolean {
    return this.selectedMenuItems.length === 0;
  }

  // ** Private API **

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  private setSelectedMenuItemsByValue(newValue: unknown | unknown[] | null): void {
    if (this.multiple) {
      if (!Array.isArray(newValue)) {
        throw Error('The value must be an array in multi-select mode.');
      }
      this.clearSelectedMenuItems();
      const addMenuItems: GlnMenuItemComponent[] = [];
      for (let idx = 0; idx < newValue.length; idx++) {
        const menuItem = this.menuItems.find((item) => item.value === newValue[idx]);
        if (menuItem) {
          addMenuItems.push(menuItem);
        }
      }
      this.updateSelectedMenuByElements(addMenuItems, this.menuItems);
    } else {
      this.clearSelectedMenuItems();
      if (newValue) {
        const menuItem = this.menuItems.find((item) => item.value === newValue);
        if (menuItem) {
          const addMenuItems: GlnMenuItemComponent[] = [menuItem];
          this.updateSelectedMenuByElements(addMenuItems, this.menuItems);
        }
      }
    }
  }

  private updateSelectedMenuByElements(updateMenuItems: GlnMenuItemComponent[], menuItems: GlnMenuItemComponent[]): void {
    if (updateMenuItems.length > 0 && menuItems.length > 0) {
      const nextMenuItems: GlnMenuItemComponent[] = this.selectedMenuItems.slice();
      if (this.multiple) {
        for (let idx = 0; idx < updateMenuItems.length; idx++) {
          const updateMenuItem = updateMenuItems[idx];
          const index = nextMenuItems.indexOf(updateMenuItem);
          if (index > -1) {
            updateMenuItem.setSelected(false);
            nextMenuItems.splice(index, 1);
          } else {
            updateMenuItem.setSelected(true);
            nextMenuItems.push(updateMenuItem);
          }
        }
      } else {
        for (let i = 0; i < nextMenuItems.length; i++) {
          nextMenuItems[i].setSelected(false);
        }
        nextMenuItems.length = 0;
        if (updateMenuItems.length > 0 && updateMenuItems[0].value !== null) {
          updateMenuItems[0].setSelected(true);
          nextMenuItems.push(updateMenuItems[0]);
        }
      }
      this.selectedMenuItems = menuItems.filter((item) => nextMenuItems.includes(item));
      this.isFilled = !this.isEmpty();
      this.changeDetectorRef.markForCheck();
    }
  }

  private equalsBuff(buffA: unknown[], buffB: unknown[]): boolean {
    let result = false;
    if (buffA.length > 0 && buffB.length > 0 && buffA.length === buffB.length) {
      result = true;
      for (let i = 0; i < buffA.length && result; i++) {
        result = buffB.indexOf(buffA[i]) > -1;
      }
    }
    return result;
  }
}

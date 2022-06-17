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
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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

import { GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnSelectConfig } from './gln-select-config.interface';
import { GlnMenuItem } from '../gln-menu-item/grn-menu-item.interface';

let identifier = 0;

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
export class GlnSelectComponent implements OnChanges, ControlValueAccessor, Validator, AfterContentInit {
  @Input()
  public id = 'glns_' + ++identifier;
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

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly selected: EventEmitter<GlnMenuItem | null> = new EventEmitter();
  @Output()
  readonly selectedMultiple: EventEmitter<GlnMenuItem[]> = new EventEmitter();

  @ViewChild('buttonElement', { static: true })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild('containerRef', { static: true, read: ViewContainerRef })
  public containerRef!: ViewContainerRef;

  @ContentChildren(GlnMenuItemComponent)
  public menuItemList!: QueryList<GlnMenuItemComponent>;

  public get menuItems(): GlnMenuItemComponent[] {
    return this.menuItemList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnMenuItemComponent[]) {}

  public isOpen = false;

  public selectedMenuItem: GlnMenuItem | null = null;

  public selectedMenuItems: GlnMenuItem[] = [];

  public defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public currConfig: GlnFrameConfig | null = null;
  public innDisabled = false; // Binding attribute "isDisabled".
  public innRequired: boolean | null = null; // Binding attribute "isRequired".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;

  public multiple = false; // ?

  // public innMenuItemMap: GlnMenuItemComponentMap = {};

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
      this.innDisabled = BooleanUtil.value(this.isDisabled);
      this.setDisabledState(this.innDisabled);
    }
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.value(this.isMultiple);
    }
    if (changes.isRequired) {
      this.innRequired = BooleanUtil.init(this.isRequired);
    }

    // if (changes.isRequired) {
    //   this.prepareFormGroup(this.innRequired);
    // }
  }

  public ngAfterContentInit(): void {
    console.log(`a-this.menuItems.length=${this.menuItems.length}`); // TODO del;
    // this.innMenuItemMap = this.getMenuItemMap(this.menuItems, true, this.id);
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(valueInp: any): void {
    console.log('writeValue(); valueInp=', valueInp); // TODO del;

    // const isFilledOld = !!this.formControl.value;
    // this.formControl.setValue(valueInp, { emitEvent: false });
    // this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    // if (isFilledOld !== this.isFilled) {
    //   this.changeDetectorRef.markForCheck();
    // }
    const menuItem = this.findMeniItemByValue(this.menuItems, valueInp);
    if (menuItem !== null) {
      console.log(`writeValue(); menuItem !== null`); // TODO del;
      const isArrayValue = Array.isArray(valueInp);
      if (this.multiple && isArrayValue) {
        this.updateSelectedMenuItems(menuItem);
      } else if (!this.multiple && !isArrayValue) {
        this.updateSelectedMenuItem(menuItem);
      }
    }

    /*if (this.multiple && isArrayValue) {
      const menuItemsMapItem: GlnMenuItemComponentMapItem[] = [];
      const values: unknown[] = isArrayValue ? (valueInp as unknown[]) : [valueInp];
      for (let i = 0; i < values.length; i++) {
        const currItem = this.innMenuItemMap[values[i].toString()];
        if (!!currItem) {
          menuItemsMapItem.push(currItem);
          currItem.menuItem.setSelected(true);
        }
      }
      const oldSelectedValues = this.selectedValues;
      for (let n = 0; n < oldSelectedValues.length; n++) {
        if (!values.includes(oldSelectedValues[n])) {
          const oldItem = this.innMenuItemMap[oldSelectedValues[n].toString()];
          oldItem?.menuItem.setSelected(false);
        }
      }
      const valuesResult: unknown[] = [];
      const labelsResult: string[] = [];
      for (let j = 0; j < menuItemsMapItem.length; j++) {
        valuesResult.push(menuItemsMapItem[j].menuItem.value);
        labelsResult.push(menuItemsMapItem[j].menuItem.label);
      }
      this.selectedValues = valuesResult;
      this.selectedLabels = labelsResult;
      this.changeDetectorRef.markForCheck();
    } else if (!this.multiple && !isArrayValue) {
      // const item = this.innMenuItemMap[String(valueInp)];
      const menuItem = this.findMeniItemByValue(this.menuItems, valueInp);
      if (this.selectedValue !== valueInp) {
        // this.updateContainer(menuItem?.templateRef || null, menuItem?.contextInfo || {});
        // this.selectedValue = valueInp;
        // this.isFilled = !this.isEmpty();
        // console.log(`this.isFilled=${this.isFilled}`); // TODO del;
        // this.changeDetectorRef.markForCheck();
      }
    }*/
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
    if (this.innDisabled !== isDisabled) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
      this.innDisabled = isDisabled;
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return !this.innDisabled && this.innRequired && this.isEmpty() ? { required: true } : null;
  }

  // ** Validator - finish **

  // ** Public API **

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    console.log(`doFocus()`); // TODO del;
    this.isFocused = true;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.focused.emit();
  }

  public doBlur(): void {
    console.log(`doBlur()`); // TODO del;
    this.isFocused = false;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    // this.isFilled = !!this.formControl.value;
    this.onTouched();
    this.blured.emit();
  }

  /*public doInput(event: Event): void { // ??
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
    }
  }*/

  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }

  public selectItemValue(menuItemComp: GlnMenuItemComponent, multiple: boolean): void {
    if (multiple) {
      this.updateSelectedMenuItems(menuItemComp);
      const newValues = this.selectedMenuItems.slice();
      this.selectedMultiple.emit(newValues);
      this.onChange(newValues);
    } else if (this.selectedMenuItem?.value !== menuItemComp.value) {
      this.updateSelectedMenuItem(menuItemComp);
      this.selected.emit(this.selectedMenuItem);
      this.onChange(this.selectedMenuItem);
      this.close();
    }
  }

  public updateSelectedMenuItem(menuItemComp: GlnMenuItemComponent): void {
    const menuItem = menuItemComp.getMenuItem();
    this.selectedMenuItem = menuItem.value ? menuItem : null;
    this.isFilled = !this.isEmpty();
    console.log(`selectedMenuItem=${this.selectedMenuItem}`); // TODO del;
    console.log(`isFilled=${this.isFilled}`); // TODO del;
    this.changeDetectorRef.markForCheck();
  }
  public updateSelectedMenuItems(menuItemComp: GlnMenuItemComponent): void {
    const menuItem = menuItemComp.getMenuItem();
    const idx = this.selectedMenuItems.indexOf(menuItem);
    if (idx === -1) {
      this.selectedMenuItems.push(menuItem);
    } else {
      this.selectedMenuItems.splice(idx, 1);
    }
    this.isFilled = !this.isEmpty();
    console.log(`selectedValues=${this.selectedMenuItems}`); // TODO del;
    console.log(`this.isFilled=${this.isFilled}`); // TODO del;
    this.changeDetectorRef.markForCheck();
  }

  public isEmpty(): boolean {
    console.log(`isEmpty() = `, this.multiple ? this.selectedMenuItems.length === 0 : this.selectedMenuItem === null); // TODO del;
    return this.multiple ? this.selectedMenuItems.length === 0 : this.selectedMenuItem === null;
  }

  public open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.opened.emit();
      this.changeDetectorRef.markForCheck();
    }
  }

  public close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.closed.emit();
      this.changeDetectorRef.markForCheck();
    }
  }

  public trigger(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  // ** Private API **

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  private findMeniItemByValue(menuItems: GlnMenuItemComponent[], value: unknown): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    for (let i = 0; i < menuItems.length && !result; i++) {
      result = menuItems[i].getValue() === value ? menuItems[i] : result;
    }
    return result;
  }

  /*private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }*/

  /*private getMenuItemMap(menuItems: GlnMenuItemComponent[], isCheckUnique: boolean, id: string): GlnMenuItemComponentMap {
    const result: GlnMenuItemComponentMap = {};
    for (let i = 0; i < menuItems.length; i++) {
      const indexStr = String(menuItems[i].value || menuItems[i].label);
      if (isCheckUnique && result[indexStr] !== undefined) {
        console.error(`For GlnSelect "${id}", there is a non-unique value "${indexStr}" in the GlnMenuItem list.`);
      }
      result[indexStr] = { index: i, menuItem: menuItems[i] };
    }
    return result;
  }*/

  // ** Private API **

  /*private updateContainer(templateRef: TemplateRef<unknown> | null, context: unknown): void {
    if (!templateRef) {
      this.containerRef.clear();
    } else {
      this.containerRef.clear();
      this.containerRef.createEmbeddedView(templateRef, context);
    }
  }*/
}

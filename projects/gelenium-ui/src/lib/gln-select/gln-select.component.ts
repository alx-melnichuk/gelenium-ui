import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
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

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { GlnMenuItemPanelComponent } from '../gln-menu-item-panel/gln-menu-item-panel.component';
// import { GlnFrameSizePaddingVerHorRes } from '../directives/gln-frame-size/gln-frame-size-prepare-data.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GrnSelectConfig } from './gln-select-config.interface';

let identifier = 0;

export const GLN_SELECT_CONFIG = new InjectionToken<GrnSelectConfig>('GLN_SELECT_CONFIG');

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
export class GlnSelectComponent implements OnChanges, ControlValueAccessor, Validator, GlnNodeInternalValidator {
  @Input()
  public id = 'glns_' + ++identifier;
  @Input()
  public config: GrnSelectConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null = null; // GlnFrameSizeType
  @Input()
  public helperText: string | null = null;
  @Input()
  public hiddenLabel: string | null = null;
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
  public sizeVisible = 0;

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly selected: EventEmitter<unknown | null> = new EventEmitter();
  @Output()
  readonly selectedMultiple: EventEmitter<unknown[]> = new EventEmitter();

  @ViewChild('buttonElement', { static: true })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild(GlnMenuItemPanelComponent, { static: true })
  public menuPanel: GlnMenuItemPanelComponent | null = null;

  @ViewChild('containerRef', { static: true, read: ViewContainerRef })
  public containerRef!: ViewContainerRef;

  public defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
  public currConfig: GlnFrameConfig | null = null;
  public isDisabled2 = false; // Binding attribute "isDisabled".
  public isRequired2: boolean | null = null; // Binding attribute "isRequired".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public isFocused = false;
  public isFilled = false;

  // public disabled = false; // ?
  // public error = false; // ?
  // public focused = false; // ?
  public fixRight: boolean | null = null; // ?
  public multiple: boolean | null = null; // ?
  // public readonly = false; // ?
  // public required = false; // ?

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SELECT_CONFIG) private rootConfig: GrnSelectConfig | null,
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
      this.isDisabled2 = BooleanUtil.value(this.isDisabled);
      this.setDisabledState(this.isDisabled2);
    }
    if (changes.isFixRight) {
      this.fixRight = BooleanUtil.init(this.isFixRight);
    }
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.init(this.isMultiple);
    }
    if (changes.isRequired) {
      this.isRequired2 = BooleanUtil.init(this.isRequired);
    }

    if (changes.isRequired) {
      this.prepareFormGroup(this.isRequired2);
    }
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(valueInp: any): void {
    const isFilledOld = !!this.formControl.value;
    this.formControl.setValue(valueInp, { emitEvent: false });
    this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
    if (isFilledOld !== this.isFilled) {
      this.changeDetectorRef.markForCheck();
    }
    /*if (!this.menuPanel) {
      return;
    }
    const isArrayValue = Array.isArray(valueInp);
    if (this.multiple && isArrayValue) {
      const menuItemsMapItem: GlnMenuItemComponentMapItem[] = [];
      const values: unknown[] = isArrayValue ? (valueInp as unknown[]) : [valueInp];
      for (let i = 0; i < values.length; i++) {
        const currItem = this.menuPanel.menuItemMap[values[i].toString()];
        if (!!currItem) {
          menuItemsMapItem.push(currItem);
          currItem.menuItem.setSelected(true);
        }
      }
      const oldSelectedValues = this.selectedValues;
      for (let n = 0; n < oldSelectedValues.length; n++) {
        if (!values.includes(oldSelectedValues[n])) {
          const oldItem = this.menuPanel.menuItemMap[oldSelectedValues[n].toString()];
          oldItem?.menuItem.setSelected(false);
        }
      }
      const valuesResult: unknown[] = [];
      const labelsResult: string[] = [];
      for (let j = 0; j < menuItemsMapItem.length; j++) {
        valuesResult.push(menuItemsMapItem[j].menuItem.value);
        labelsResult.push(menuItemsMapItem[j].menuItem.label);
      }
      this.innSelectedValues = valuesResult;
      this.innSelectedLabels = labelsResult;
      this.changeDetectorRef.markForCheck();
    } else if (!this.multiple && !isArrayValue) {
      const item = this.menuPanel.menuItemMap[valueInp.toString()];
      if (this.innSelectedValue !== valueInp) {
        this.updateContainer(item?.menuItem.templateRef || null, item?.menuItem.contextInfo || {});
        this.innSelectedValue = valueInp;
        this.changeDetectorRef.markForCheck();
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
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return !control ? null : this.formControl.errors;
  }

  // ** Validator - finish **

  // ** GrnNodeInternalValidator - start **

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

  // ** GrnNodeInternalValidator - finish **

  // ** Public API **

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocuse(): void {
    this.isFocused = true;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.isFilled = !!this.formControl.value;
    this.onTouched();
    this.blured.emit();
  }

  public doInput(event: Event): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble) {
      this.onChange(this.formControl.value);
    }
  }

  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }

  // ** Private API **

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement>, value: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }

  // ** Private API **

  private updateContainer(templateRef: TemplateRef<unknown> | null, context: unknown): void {
    if (!templateRef) {
      this.containerRef.clear();
    } else {
      this.containerRef.createEmbeddedView(templateRef, context);
    }
  }
}

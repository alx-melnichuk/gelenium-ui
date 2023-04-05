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
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { GlnRadioGroup, GLN_RADIO_GROUP } from '../gln-radio-group/gln-radio-group.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnRadioButtonCheckedUtil } from './gln-radio-button-checked.util';
import { GlnRadioButtonConfig } from './gln-radio-button-config.interface';

import { GlnRadioButton, GLN_RADIO_BUTTON } from './gln-radio-button.interface';

const SIZE: { [key: string]: number } = { little: 30, short: 36, small: 42, middle: 48, wide: 54, large: 60, huge: 66 };

export const GLN_RADIO_BUTTON_CONFIG = new InjectionToken<GlnRadioButtonConfig>('GLN_RADIO_BUTTON_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-button',
  exportAs: 'glnRadioButton',
  templateUrl: './gln-radio-button.component.html',
  styleUrls: ['./gln-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnRadioButtonComponent), multi: true },
    { provide: GLN_RADIO_BUTTON, useExisting: GlnRadioButtonComponent },
  ],
})
export class GlnRadioButtonComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, GlnRadioButton {
  @Input()
  public id: string = `glnrb-${uniqueIdCounter++}`; // interface GlnRadioButton
  @Input()
  public config: GlnRadioButtonConfig | null | undefined;
  @Input()
  public checked: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public name: string = ''; // interface GlnRadioButton
  @Input()
  public value: string | null | undefined; // interface GlnRadioButton
  @Input()
  public size: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge'

  @Output()
  readonly change: EventEmitter<{ value: string | null | undefined; source: GlnRadioButtonComponent }> = new EventEmitter();

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ radioinfo: this.formControl });

  public innChecked: boolean | null | undefined;
  public innDisabled: boolean | null | undefined;
  public currConfig: GlnRadioButtonConfig;
  public sizeVal: number | null = null; // Binding attribute "size".

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_RADIO_BUTTON_CONFIG) private rootConfig: GlnRadioButtonConfig | null,
    @Optional() @Inject(GLN_RADIO_GROUP) public radioGroup: GlnRadioGroup
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-button');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(disabled ?? this.radioGroup?.disabled);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = NumberUtil.converInt(sizeStr, SIZE[sizeStr] || SIZE['middle']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = NumberUtil.converInt(sizeStr, SIZE[sizeStr] || SIZE['middle']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    const checked = BooleanUtil.init(this.checked);
    this.setChecked(!!checked);

    if (this.radioGroup) {
      this.name = this.radioGroup.name;
      // ??
      // this.checked = this.radioGroup.value === this._value;
      // if (this.checked) {
      //   this.radioGroup.selected = this;
      // }
    }
    // If "name" is not specified, then all such elements will be
    // in the same group named "empty string".

    if (this.innDisabled === undefined) {
      this.setDisabled(this.radioGroup?.disabled);
    }
  }

  public ngOnDestroy(): void {
    GlnRadioButtonCheckedUtil.remove(this);
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    const newChecked: boolean = value == this.value;
    console.log(`writeValue   (id=${this.id}; name=${this.name}; value=${value}); newChecked=${newChecked};`); // #
    this.setChecked(newChecked);
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
    this.setDisabled(disabled);
  }

  // ** interface ControlValueAccessor - finish **

  // ** interface GlnRadioButton - start **

  public setChecked(newValue: boolean): void {
    if (this.innChecked !== newValue) {
      console.log(`setChecked   (id=${this.id}; name=${this.name}; newValue=${newValue};`); // #
      this.innChecked = newValue;
      this.settingChecked(this.innChecked, this.renderer, this.hostRef);
      this.formControl.setValue(newValue); // ??

      if (newValue) {
        const previous: GlnRadioButton | undefined = GlnRadioButtonCheckedUtil.findByName(this.name || '');
        console.log(`setChecked   (id=${this.id}; name=${this.name}; !previous=${!previous};`); // #
        previous?.setChecked(false);
        GlnRadioButtonCheckedUtil.add(this);
        this.radioGroup?.setRadioSelected(this);
      } else {
        GlnRadioButtonCheckedUtil.remove(this);
        this.radioGroup?.setRadioSelected(null);
      }
      this.changeDetectorRef.markForCheck();
    }
  }

  public setName(newValue: string): void {
    this.name = newValue;
  }
  // ** interface GlnRadioButton - finish **

  // ** Public methods **

  public doClickByInput(event: Event): void {
    // if (!this.innDisabled && !this.group?.disabled && !this.innReadOnly && !this.group?.readOnly) {
    // this.group.setRadioSelected(this);
    // if (this.touchRipple && !this.innNoRipple && !this.group?.noRipple) {
    //   this.touchRipple.trigger(null, true);
    // }
    // }

    // We stop propagation so that the change event does not pop up and pass its input object.
    event.stopPropagation();
    if (!this.innDisabled /*&& !this.innReadOnly*/) {
      if (!this.innChecked) {
        // const isChangeForGroup: boolean = !!this.radioGroup ? this.value !== this.radioGroup.value : false;
        console.log(`doClickInput (id=${this.id}; name=${this.name}; setChecked(true);`); // #
        this.setChecked(true);
        this.onChange(this.value);
        this.change.emit({ value: this.value, source: this });

        // if (this.radioGroup) {
        //   this.radioGroup._controlValueAccessorChangeFn(this.value);
        //   if (groupValueChanged) {
        //     this.radioGroup._emitChangeEvent();
        //   }
        // }
      }
      if (this.touchRipple /*&& !this.innNoRipple && !this.group?.noRipple*/) {
        this.touchRipple.trigger(null, true);
      }
    }
  }

  // ** Private methods **

  private setDisabled(value: boolean | null | undefined): void {
    if (this.innDisabled !== !!value) {
      this.innDisabled = !!value;
      this.settingDisabled(this.innDisabled, this.renderer, this.hostRef);
      this.changeDetectorRef.markForCheck();
    }
  }
  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    let fontSize: number | null = null;
    if (size > 0) {
      // fontSize*1.75+ 2*(0.625*padding)
      fontSize = Math.round((size / 3) * 1000) / 1000;
    }
    HtmlElemUtil.setProperty(elem, '--glnrb--icon-fn-sz', fontSize?.toString().concat('px'));
  }

  private settingChecked(value: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', !!value);
    HtmlElemUtil.setAttr(renderer, elem, 'che', !!value ? '' : null);
  }
  private settingDisabled(value: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!value);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', value ? '' : null);
  }
}

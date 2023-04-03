import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { GlnRadioButtonGroup, GLN_RADIOBUTTON_GROUP } from '../gln-radio-button/gln-radio-button-group.interface';
import { GlnRadioButton } from '../gln-radio-button/gln-radio-button.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-group',
  templateUrl: './gln-radio-group.component.html',
  styleUrls: ['./gln-radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnRadioGroupComponent), multi: true },
    { provide: GLN_RADIOBUTTON_GROUP, useExisting: GlnRadioGroupComponent },
  ],
})
export class GlnRadioGroupComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, GlnRadioButtonGroup {
  @Input()
  public id = `glnrg-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  get value(): any {
    return this.valueData;
  }
  set value(newValue: any) {
    if (this.valueData !== newValue) {
      this.valueData = newValue;
      // this._updateSelectedRadioFromValue();
      // this._checkSelectedRadioButton();
    }
  }

  @Output()
  readonly selected: EventEmitter<GlnRadioButton> = new EventEmitter();

  // @ContentChildren(forwardRef(() => MatRadioButton), {descendants: true})
  // _radios: QueryList<MatRadioButton>;

  public disabled: boolean | null | undefined; // interface GlnRadioButtonGroup
  // public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public readOnly: boolean | null | undefined; // interface GlnRadioButtonGroup
  // public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public noRipple: boolean | null | undefined; // interface GlnRadioButtonGroup

  private valueData: unknown | null | undefined;
  private selectedRadioButton: GlnRadioButton | null = null;

  constructor(private renderer: Renderer2, public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-group');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'group');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.setDisabled(BooleanUtil.init(this.isDisabled));
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.disabled === null) {
      this.setDisabled(!!this.disabled);
    }
  }

  public ngOnDestroy(): void {
    this.selectedRadioButton = null;
  }

  // ** interface GlnOptionParent - start **

  /** Set the radio button as selected. */
  public setRadioSelected(radioButton: GlnRadioButton | null): void {
    if (radioButton != null && this.selectedRadioButton !== radioButton) {
      Promise.resolve().then(() => {
        this.selected.emit(radioButton);
        if (!!this.selectedRadioButton) {
          this.selectedRadioButton.selected = false;
        }
        this.selectedRadioButton = radioButton;
        this.selectedRadioButton.selected = true;
      });
    }
  }

  // ** interface GlnOptionParent - finish **

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value !== this.valueData) {
      this.valueData = value;
      this.changeDetectorRef.markForCheck();
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
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      this.setDisabled(this.disabled);
    }
  }

  // ** interface ControlValueAccessor - finish **

  // ** Private methods **

  /** Check or uncheck disabled. */
  private setDisabled(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
}

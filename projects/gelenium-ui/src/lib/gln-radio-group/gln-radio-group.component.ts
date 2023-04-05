import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { GlnRadioButtonComponent } from '../gln-radio-button/gln-radio-button.component';
import { GlnRadioButton } from '../gln-radio-button/gln-radio-button.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnRadioGroup, GLN_RADIO_GROUP } from './gln-radio-group.interface';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-group',
  exportAs: 'glnRadioGroup',
  templateUrl: './gln-radio-group.component.html',
  styleUrls: ['./gln-radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_RADIO_GROUP, useExisting: GlnRadioGroupComponent }],
})
export class GlnRadioGroupComponent implements OnChanges, OnInit, AfterContentInit, OnDestroy, GlnRadioGroup {
  @Input()
  public id: string; // interface GlnRadioGroup
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoHover: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public name: string; // interface GlnRadioGroup

  @Output()
  readonly selected: EventEmitter<GlnRadioButton | null> = new EventEmitter();

  @ContentChildren(GlnRadioButtonComponent, { descendants: true })
  public radioItems!: QueryList<GlnRadioButtonComponent>;

  public get radios(): GlnRadioButton[] {
    return (this.radioItems?.toArray() || []) as GlnRadioButton[];
  }
  public set radios(value: GlnRadioButton[]) {}

  public disabled: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isDisabled".
  public noHover: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoHover".
  public noRipple: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoRipple".
  public readOnly: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isReadOnly".
  public selectedRadio: GlnRadioButton | null = null;

  public valueData: string | null | undefined;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef // private ngZone: NgZone
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-group');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'group');
    const uniqueId: number = uniqueIdCounter++;
    this.id = `glnrg-${uniqueId}`;
    this.name = `gln-radio-group-${uniqueId}`;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.setDisabled(BooleanUtil.init(this.isDisabled));
    }
    if (changes['isNoHover']) {
      this.setNoHover(BooleanUtil.init(this.isNoHover));
    }
    if (changes['isNoRipple']) {
      this.setNoRipple(BooleanUtil.init(this.isNoRipple));
    }
    if (changes['isReadOnly']) {
      this.setReadOnly(BooleanUtil.init(this.isReadOnly));
    }
    if (changes['name']) {
      for (let idx = 0; idx < this.radios.length; idx++) {
        this.radios[idx].setName(this.name);
      }
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    if (this.disabled === null) {
      this.setDisabled(!!this.disabled);
    }
  }

  public ngAfterContentInit(): void {
    /*if (this.radios.length > 0 && this.selectedRadio === null && this.valueData !== undefined) {
      for (let idx = 0; idx < this.radios.length && !this.selectedRadio; idx++) {
        if (this.valueData === this.radios[idx].value) {
          this.selectedRadio = this.radios[idx];
          this.selectedRadio.hideAnimation = true;
          this.selectedRadio.selected = true;
          // Update the position once the zone is stable so that the overlay will be fully rendered.
          this.ngZone.onStable.pipe(first()).subscribe(() => {
            if (this.selectedRadio != null) {
              this.selectedRadio.hideAnimation = false;
            }
          });
        }
      }
    }*/
  }

  public ngOnDestroy(): void {
    this.selectedRadio = null;
  }

  // ** interface ControlValueAccessor - start **
  /*
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // public onChange: (val: unknown) => void = () => {};
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // public onTouched: () => void = () => {};

  // public writeValue(value: any): void {
  //   if (value !== this.valueData) {
  //     this.valueData = value;
  //     this.changeDetectorRef.markForCheck();
  //     const newRadio: GlnRadioButton | null = this.getRadioButtonByValue(value, this.radios);
  //     this.updateSelectedRadio(newRadio);
  //   }
  // }
  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  // public registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  // public registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }

  // public setDisabledState(disabled: boolean): void {
  //   this.setDisabled(disabled);
  // }
*/
  // ** interface ControlValueAccessor - finish **

  // ** interface GlnRadioButtonGroup - start **

  /** Set the radio button as selected. */
  public setRadioSelected(newRadio: GlnRadioButton | null): void {
    // if (this.selectedRadio !== newRadio) {
    //   Promise.resolve().then(() => {
    //     this.updateValueData(newRadio != null ? newRadio.value : null);
    //     this.updateSelectedRadio(newRadio);
    //   });
    // }
  }
  // ** interface GlnRadioButtonGroup - finish **

  // ** Public methods **

  /*public getValue(): string | null | undefined {
    return this.valueData;
  }*/

  /*public setValue(newValue: string | null | undefined): void {
    if (newValue !== this.valueData) {
      this.updateValueData(newValue);
      const newRadio: GlnRadioButton | null = this.getRadioButtonByValue(newValue, this.radios);
      this.updateSelectedRadio(newRadio);
    }
  }*/

  // ** Private methods **

  /*private updateValueData(newValue: string | null | undefined): void {
    if (newValue !== this.valueData) {
      this.valueData = newValue;
      this.onChange(this.valueData);
    }
  }*/
  /*private updateSelectedRadio(newRadio: GlnRadioButton | null): void {
    if (newRadio !== this.selectedRadio) {
      if (!!this.selectedRadio) {
        this.selectedRadio.selected = false;
      }
      this.selectedRadio = newRadio;
      if (this.selectedRadio != null) {
        this.selectedRadio.selected = true;
      }
      this.selected.emit(newRadio);
    }
  }*/
  private getRadioButtonByValue(value: string | null | undefined, radios: GlnRadioButton[]): GlnRadioButton | null {
    let result: GlnRadioButton | null = null;
    for (let idx = 0; idx < radios.length && !result; idx++) {
      if (value === radios[idx].value) {
        result = radios[idx];
      }
    }
    return result;
  }
  /** Check or uncheck the "disabled" property. */
  private setDisabled(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "no-hover" property. */
  private setNoHover(value: boolean | null): void {
    if (this.noHover !== !!value) {
      this.noHover = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-hover', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noHov', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "no-ripple" property. */
  private setNoRipple(value: boolean | null | undefined): void {
    if (this.noRipple !== !!value) {
      this.noRipple = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-ripple', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noRip', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "readOnly" property. */
  private setReadOnly(value: boolean | null): void {
    if (this.readOnly !== !!value) {
      this.readOnly = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-readonly', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'rea', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
}

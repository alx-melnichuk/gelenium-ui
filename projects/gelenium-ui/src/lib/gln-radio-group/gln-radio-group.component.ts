import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
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
  public id: string;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoHover: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public name: string; // interface GlnRadioGroup
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end'; // interface GlnRadioGroup
  @Input()
  public size: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge' // interface GlnRadioGroup

  @Output()
  readonly selected: EventEmitter<GlnRadioButton | null> = new EventEmitter();

  @ContentChildren(GlnRadioButtonComponent, { descendants: true })
  public radioItems!: QueryList<GlnRadioButtonComponent>;

  public get radios(): GlnRadioButton[] {
    return (this.radioItems?.toArray() || []) as GlnRadioButton[];
  }
  public set radios(value: GlnRadioButton[]) {}

  public disabled: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isDisabled".
  public noAnimation: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoAnimation".
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
    const properties: Record<string, unknown> = {};
    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      this.settingDisabled(this.disabled, this.renderer, this.hostRef);
      properties['isDisabled'] = this.disabled;
    }
    if (changes['isNoAnimation']) {
      this.setNoAnimation(BooleanUtil.init(this.isNoAnimation));
      properties['isNoAnimation'] = this.noAnimation ? 'true' : null;
    }
    if (changes['isNoHover']) {
      this.setNoHover(BooleanUtil.init(this.isNoHover));
      properties['isNoHover'] = this.noHover ? 'true' : null;
    }
    if (changes['isNoRipple']) {
      this.setNoRipple(BooleanUtil.init(this.isNoRipple));
      properties['isNoRipple'] = this.noRipple ? 'true' : null;
    }
    if (changes['isReadOnly']) {
      this.readOnly = !!BooleanUtil.init(this.isReadOnly);
      this.settingReadOnly(this.readOnly, this.renderer, this.hostRef);
      properties['isReadOnly'] = this.readOnly ? 'true' : null;
    }
    if (changes['name']) {
      properties['name'] = this.name;
    }
    if (changes['position']) {
      properties['position'] = this.position;
    }
    if (changes['size']) {
      properties['size'] = this.size || null;
    }

    this.setPropertiesForItems(properties, this.radios);
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
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

  // ** Protected methods **

  protected setPropertiesForItems(properties: Record<string, unknown>, radios: GlnRadioButton[]): void {
    const keys: string[] = Object.keys(properties);
    if (keys.length > 0 && radios.length > 0) {
      for (let idx = 0; idx < radios.length; idx++) {
        // console.log(`(id=${radios[idx].id}).setProperties(${JSON.stringify(properties)});`); // #
        radios[idx].setProperties(properties);
      }
    }
  }

  // ** Private methods **

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
  /*private setDisabled(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }*/
  private setNoAnimation(value: boolean | null): void {
    if (this.noAnimation !== !!value) {
      this.noAnimation = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noAni', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
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
  private settingDisabled(value: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!value);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', value ? '' : null);
  }
  private settingReadOnly(isReadOnlyVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!isReadOnlyVal);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', isReadOnlyVal ? '' : null);
  }
}

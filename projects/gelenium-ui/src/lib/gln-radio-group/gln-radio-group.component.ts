import {
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
export class GlnRadioGroupComponent implements OnChanges, OnInit, OnDestroy, GlnRadioGroup {
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
  public label: string | null | undefined;
  @Input()
  public name: string; // interface GlnRadioGroup
  @Input()
  public position: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end'; // interface GlnRadioGroup
  @Input()
  public size: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge' // interface GlnRadioGroup

  @Output()
  readonly change: EventEmitter<{ value: string | null | undefined; source: GlnRadioButton | null }> = new EventEmitter();

  @ContentChildren(GlnRadioButtonComponent, { descendants: true })
  public radioItems!: QueryList<GlnRadioButtonComponent>;

  public get radios(): GlnRadioButton[] {
    return (this.radioItems?.toArray() || []) as GlnRadioButton[];
  }
  public set radios(value: GlnRadioButton[]) {}

  public disabled: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isDisabled".
  public isFocused: boolean = false;
  public noAnimation: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoAnimation".
  public noHover: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoHover".
  public noRipple: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isNoRipple".
  public readOnly: boolean | null | undefined; // interface GlnRadioButtonGroup // Binding attribute "isReadOnly".
  public selectedRadio: GlnRadioButton | null = null;

  constructor(private renderer: Renderer2, public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-group');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'group');
    const uniqueId: number = uniqueIdCounter++;
    this.id = `glnrg-${uniqueId}`;
    this.name = `glnrg-${uniqueId}`;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const properties: Record<string, unknown> = {};
    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      this.settingDisabled(this.disabled, this.renderer, this.hostRef);
      properties['isDisabled'] = this.disabled;
    }
    if (changes['isNoAnimation']) {
      this.noAnimation = BooleanUtil.init(this.isNoAnimation);
      this.settingNoAnimation(this.noAnimation, this.renderer, this.hostRef);
      properties['isNoAnimation'] = this.noAnimation ? 'true' : null;
    }
    if (changes['isNoHover']) {
      this.noHover = BooleanUtil.init(this.isNoHover);
      this.settingNoHover(this.noHover, this.renderer, this.hostRef);
      properties['isNoHover'] = this.noHover ? 'true' : null;
    }
    if (changes['isNoRipple']) {
      this.noRipple = BooleanUtil.init(this.isNoRipple);
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
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
      properties['position'] = this.position || null;
    }
    if (changes['size']) {
      properties['size'] = this.size || null;
    }

    this.setPropertiesForItems(properties, this.radios);
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
  }

  public ngOnDestroy(): void {
    this.selectedRadio = null;
  }

  // ** interface GlnRadioButtonGroup - start **

  public setFocus(isFocused: boolean): void {
    if (this.isFocused !== isFocused) {
      this.isFocused = isFocused;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.changeDetectorRef.markForCheck();
    }
  }

  public getRadioList(): GlnRadioButton[] {
    return (this.radioItems?.toArray() || []) as GlnRadioButton[];
  }
  /** Set the radio button as selected. */
  public setSelectedRadio(newRadio: GlnRadioButton | null): void {
    if (this.selectedRadio !== newRadio) {
      this.selectedRadio = newRadio;
      this.change.emit({ value: newRadio?.value, source: newRadio });

      this.changeDetectorRef.markForCheck();
    }
  }
  // ** interface GlnRadioButtonGroup - finish **

  // ** Public methods **

  public doClickByLabel(): void {
    if (!this.disabled && !!this.selectedRadio) {
      this.selectedRadio.focus();
      this.isFocused = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected methods **

  protected setPropertiesForItems(properties: Record<string, unknown>, radios: GlnRadioButton[]): void {
    const keys: string[] = Object.keys(properties);
    if (keys.length > 0 && radios.length > 0) {
      for (let idx = 0; idx < radios.length; idx++) {
        radios[idx].setProperties(properties);
      }
    }
  }

  // ** Private methods **

  private settingDisabled(disabled: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!disabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', disabled ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noAni', noAnimation ? '' : null);
  }
  private settingNoHover(noHover: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-hover', !!noHover);
    HtmlElemUtil.setAttr(renderer, elem, 'noHov', noHover ? '' : null);
  }
  private settingNoRipple(noRipple: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!noRipple);
    HtmlElemUtil.setAttr(renderer, elem, 'noRip', noRipple ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnRadioGroup, GLN_RADIO_GROUP } from '../gln-radio-group/gln-radio-group.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnRadioButton } from './gln-radio-button.interface';

const CSS_PROP_LABEL_FONT_SIZE = '--glnrb--label-fn-sz';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-button',
  exportAs: 'glnRadioButton',
  templateUrl: './gln-radio-button.component.html',
  styleUrls: ['./gln-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnRadioButtonComponent implements OnChanges, OnInit, GlnRadioButton {
  @Input()
  public id: string = `glnrb-${uniqueIdCounter++}`; // interface GlnRadioButton
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public value: string | null | undefined; // interface GlnRadioButton

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  // interface GlnRadioButton
  public get disabled(): boolean | null | undefined {
    return this.innDisabled;
  }
  public set disabled(value: boolean | null | undefined) {
    this.setDisabled(value);
  }
  // interface GlnRadioButton
  public get hideAnimation(): boolean | null | undefined {
    return this.innHideAnimation;
  }
  public set hideAnimation(value: boolean | null | undefined) {
    this.setHideAnimation(value);
  }
  // interface GlnRadioButton
  public get noRipple(): boolean | null | undefined {
    return this.innNoRipple;
  }
  public set noRipple(value: boolean | null | undefined) {
    this.setNoRipple(value);
  }
  // interface GlnRadioButton
  public get readOnly(): boolean | null | undefined {
    return this.innReadOnly;
  }
  public set readOnly(value: boolean | null | undefined) {
    this.setReadOnly(value);
  }
  // interface GlnRadioButton
  public get selected(): boolean | null | undefined {
    return this.innSelected;
  }
  public set selected(value: boolean | null | undefined) {
    this.setSelected(value);
  }

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ radioinfo: this.formControl });

  public innDisabled: boolean | null | undefined;
  public innHideAnimation: boolean | null | undefined;
  public innNoHover: boolean | null | undefined;
  public innNoRipple: boolean | null | undefined;
  public innReadOnly: boolean | null | undefined;
  public innSelected: boolean | null | undefined;

  constructor(
    // interface GlnRadioButton
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_RADIO_GROUP) public group: GlnRadioGroup
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-button');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(disabled ?? this.group?.disabled);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // Defining internal CSS properties.
    this.prepareCssProperties(this.hostRef);

    if (this.innDisabled === undefined) {
      this.setDisabled(this.group?.disabled);
    }
    if (this.innNoHover === undefined) {
      this.setNoHover(this.group?.noHover);
    }
    if (this.innNoRipple === undefined) {
      this.setNoRipple(this.group?.noRipple);
    }
    if (this.innReadOnly === undefined) {
      this.setReadOnly(this.group?.readOnly);
    }
    if (this.innSelected === undefined && !!this.group) {
      this.innSelected = this === this.group.selectedRadio;
    }
    this.setSelected(!!this.innSelected);
  }

  // ** Public methods **

  public doClickByInput(): void {
    if (!this.innDisabled && !this.group?.disabled && !this.innReadOnly && !this.group?.readOnly) {
      this.group.setRadioSelected(this);
      if (this.touchRipple && !this.innNoRipple && !this.group?.noRipple) {
        this.touchRipple.trigger(null, true);
      }
    }
  }
  log(text: string): void {
    console.log(text); // #
  }
  // ** Private methods **

  private prepareCssProperties(hostRef: ElementRef<HTMLElement>): void {
    // Determine the font size of the parent element.
    if (hostRef && hostRef.nativeElement) {
      const hostElement: HTMLElement = hostRef.nativeElement;

      const parentElem: HTMLElement | null = hostRef && hostRef.nativeElement ? hostRef.nativeElement.parentElement : null;
      const parentRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(parentElem);
      const parentFontSize: number = HtmlElemUtil.propertyAsNumber(parentRef, 'font-size');
      if (parentFontSize > 0) {
        hostElement.style.setProperty(CSS_PROP_LABEL_FONT_SIZE, parentFontSize.toString().concat('px'));
      }
    }
  }

  /** Check or uncheck the "disabled" property. */
  private setDisabled(value: boolean | null | undefined): void {
    if (this.innDisabled !== !!value) {
      this.innDisabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "no-ripple" property. */
  private setNoHover(value: boolean | null | undefined): void {
    if (this.innNoHover !== !!value) {
      this.innNoHover = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-hover', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noHov', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "no-ripple" property. */
  private setNoRipple(value: boolean | null | undefined): void {
    if (this.innNoRipple !== !!value) {
      this.innNoRipple = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-ripple', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noRip', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "readonly" property. */
  private setReadOnly(value: boolean | null | undefined): void {
    if (this.innReadOnly !== !!value) {
      this.innReadOnly = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-readonly', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'rea', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck the "selected" property. */
  private setSelected(value: boolean | null | undefined): void {
    if (this.innSelected !== !!value) {
      this.innSelected = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', !!value ? '' : null);
      this.formControl.setValue(value);
      this.changeDetectorRef.markForCheck();
    }
  }
  private setHideAnimation(value: boolean | null | undefined): void {
    if (this.innHideAnimation !== !!value) {
      this.innHideAnimation = !!value;
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'hdAnmInit', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
}

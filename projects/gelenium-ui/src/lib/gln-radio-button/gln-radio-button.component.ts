import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnRadioButtonGroup, GLN_RADIOBUTTON_GROUP } from './gln-radio-button-group.interface';

import { GlnRadioButton } from './gln-radio-button.interface';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-radio-button',
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
  public value: unknown | null | undefined; // interface GlnRadioButton

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
  public innNoRipple: boolean | null | undefined;
  public innReadOnly: boolean | null | undefined;
  public innSelected: boolean | null | undefined;

  constructor(
    // interface GlnRadioButton
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_RADIOBUTTON_GROUP) public group: GlnRadioButtonGroup
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-radio-button');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  @HostListener('click', ['$event'])
  public handlerClick(event: MouseEvent): void {
    console.log(`handlerClick();`); // #
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble && !this.innDisabled && !this.group?.disabled && !this.innReadOnly && !this.group?.readOnly) {
      event.stopPropagation();
      console.log(`this.group.setRadioSelected(this);`); // #
      this.group.setRadioSelected(this);

      if (this.touchRipple && !this.innNoRipple && !this.group?.noRipple) {
        console.log(`this.touchRipple.trigger(null, true);;`); // #
        this.touchRipple.trigger(null, true);
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(disabled ?? this.group?.disabled);
    }
  }
  // disabled?: boolean | null | undefined;
  // noRipple?: boolean | null | undefined;
  // readOnly: boolean | null | undefined;
  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    if (this.innDisabled === undefined) {
      this.setDisabled(this.group?.disabled);
    }
    this.setNoRipple(!!this.innNoRipple);
    this.setReadOnly(!!this.innReadOnly);
    this.setSelected(!!this.innSelected);
  }

  // ** Public methods **

  /*public doClickByLabel(event: MouseEvent): void {
    console.log(`doClickByLabel();`); // #
    // if (!this.isDisabledVal && !this.isReadOnlyVal && !!this.touchRipple && !this.isNoRippleVal) {
    //   this.touchRipple.trigger(event, true);
    // }
    if (!this.innDisabled) {
      this.group.setRadioSelected(this);
    }
  }*/
  log(text: string): void {
    console.log(text); // #
  }
  // ** Private methods **

  /** Check or uncheck disabled. */
  private setDisabled(value: boolean | null | undefined): void {
    if (this.innDisabled !== !!value) {
      this.innDisabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  private setNoRipple(value: boolean | null | undefined): void {
    if (this.innNoRipple !== !!value) {
      this.innNoRipple = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-ripple', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noRip', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  private setReadOnly(value: boolean | null | undefined): void {
    if (this.innReadOnly !== !!value) {
      this.innReadOnly = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-readonly', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'rea', !!value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck selected. */
  private setSelected(value: boolean | null | undefined): void {
    if (this.innSelected !== !!value) {
      this.innSelected = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', !!value ? '' : null);
      this.formControl.setValue(value);
      this.changeDetectorRef.markForCheck();
    }
  }
}

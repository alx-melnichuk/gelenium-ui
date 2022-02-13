import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  GrnSizeBorderRadius,
  GrnSizePaddingHor,
  GrnSizePaddingHorRes,
  GrnSizePaddingVer,
  GrnSizePaddingVerRes,
} from '../directives/grn-size/grn-size.directive';

import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../interfaces/input-exterior.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { InputLabelUtil, PaddingVerRes, TranslateVerRes } from '../utils/input-label.util';
import { NumberUtil } from '../utils/number.util';

@Component({
  selector: 'grn-frame-maket',
  templateUrl: './grn-frame-maket.component.html',
  styleUrls: ['./grn-frame-maket.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameMaketComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: InputExterior | null = null;
  @Input()
  public frameSize: FrameSize | undefined | null;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public hiddenLabel: boolean | null = null;
  @Input()
  public isDisabled: boolean | null = null;
  @Input()
  public isFocused = false;
  @Input()
  public isFilled = false;
  @Input()
  public isError: boolean | null = null;
  @Input()
  public isRequired: boolean | null = null;

  @Output()
  readonly clickFrame: EventEmitter<Event> = new EventEmitter();

  public get isOutlinedExterior(): boolean {
    return InputExteriorUtil.isOutlined(this.innExterior);
  }

  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.middle) || 0;
  public currConfig: GrnFrameInputConfig = {};

  public innExterior: InputExterior | null = null;
  public innFrameSizeValue = 0;
  public innIsLabelShrink: boolean | null = null;
  public innHiddenLabel: boolean | null = null;
  public labelPadding: number | null = null;

  constructor(private hostRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.currConfig = {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-frame-input', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.innExterior = InputExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.innFrameSizeValue = this.createFrameSize(this.frameSize || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
    }
    if (changes.isLabelShrink || (changes.config && this.isLabelShrink == null)) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (changes.hiddenLabel || (changes.config && this.hiddenLabel == null)) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
    if (changes.isDisabled) {
      this.settingDisabled(this.hostRef, this.isDisabled);
    }
    if (changes.isFocused) {
      this.settingFocused(this.hostRef, this.isFocused);
    }
    if (changes.isFilled) {
      this.settingFilled(this.hostRef, this.isFilled);
    }
    if (changes.isError) {
      this.settingError(this.hostRef, this.isError);
    }
    if (changes.label || changes.isRequired) {
      this.settingIndent(this.hostRef, !!this.label || this.isRequired);
    }
  }

  ngOnInit(): void {
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
    }
    if (this.innIsLabelShrink == null) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (this.innHiddenLabel == null) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
  }

  ngAfterContentInit(): void {
    console.log(`ngAfterContentInit()`);
  }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit()`);
  }
  // ** Public API **

  public getOrnamAlign(ornamAlign: OrnamAlign | undefined, isEnd: boolean, exterior: InputExterior | null): string | null {
    let result = null;
    if (ornamAlign != null) {
      if (ornamAlign === OrnamAlign.default) {
        result = OrnamAlign.center.valueOf();
        if (exterior === InputExterior.standard || (exterior === InputExterior.underline && !isEnd)) {
          result = OrnamAlign.flexEnd.valueOf();
        }
      } else {
        result = ornamAlign.valueOf();
      }
    }
    return result;
  }

  public doClickFrame(event: Event): void {
    this.clickFrame.emit(event);
  }

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: InputExterior | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-outlined', InputExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', InputExteriorUtil.isOutlined(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-underline', InputExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-u', InputExteriorUtil.isUnderline(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-standard', InputExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-s', InputExteriorUtil.isStandard(exterior) ? '' : null);
    const isBorder = InputExteriorUtil.isStandard(exterior) || InputExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-border', isBorder);
    HtmlElemUtil.setAttr(this.renderer, elem, 'frm-br', isBorder ? '' : null);
  }

  private createFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.create(frameSizeInp);
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }

  private settingFrameSize(elem: ElementRef<HTMLElement> | undefined, frameSizeValue: number): void {
    HtmlElemUtil.setProperty(elem, '--size', frameSizeValue > 0 ? frameSizeValue + 'px' : null);
  }

  private settingLabelShrink(elem: ElementRef<HTMLElement> | undefined, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(this.renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingHiddenLabel(elem: ElementRef<HTMLElement> | undefined, hiddenLabel: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-hidden-label', hiddenLabel);
    HtmlElemUtil.setAttr(this.renderer, elem, 'hlbl', hiddenLabel ? '' : null);
  }

  private settingDisabled(elem: ElementRef<HTMLElement> | undefined, isDisabled: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-disabled', isDisabled || false);
    HtmlElemUtil.setAttr(this.renderer, elem, 'dis', isDisabled ? '' : null);
  }

  private settingFocused(elem: ElementRef<HTMLElement> | undefined, isFocused: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-focused', isFocused);
    HtmlElemUtil.setAttr(this.renderer, elem, 'foc', isFocused ? '' : null);
  }

  private settingFilled(elem: ElementRef<HTMLElement> | undefined, isFilled: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-filled', isFilled);
    HtmlElemUtil.setAttr(this.renderer, elem, 'fil', isFilled ? '' : null);
  }

  private settingError(elem: ElementRef<HTMLElement> | undefined, isError: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-error', isError || false);
    HtmlElemUtil.setAttr(this.renderer, elem, 'err', isError ? '' : null);
  }

  private settingIndent(elem: ElementRef<HTMLElement> | undefined, isIndent: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-lgn-indent', isIndent || false);
    HtmlElemUtil.setAttr(this.renderer, elem, 'ind', isIndent ? '' : null);
  }
}

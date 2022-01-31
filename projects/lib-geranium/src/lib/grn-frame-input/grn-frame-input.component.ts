import {
  AfterContentInit,
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

import { InputExterior, InputExteriorUtil } from '../interfaces/input-exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { InputLabelUtil, PaddingVertical, TranslateVertical } from '../utils/input-label.util';
import { LabelPaddingUtil } from '../utils/label-padding.util';
import { NumberUtil } from '../utils/number.util';

export const GRN_FRAME_INPUT_CONFIG = new InjectionToken<GrnFrameInputConfig>('GRN_FRAME_INPUT_CONFIG');

@Component({
  selector: 'grn-frame-input',
  exportAs: 'grnFrameInput',
  templateUrl: './grn-frame-input.component.html',
  styleUrls: ['./grn-frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameInputComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: InputExterior | null = null;
  @Input()
  public frameSize: FrameSize | null = null;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public hiddenLabel: boolean | null = null;
  @Input()
  public isDisabled = false;
  @Input()
  public isFocused = false;
  @Input()
  public isFilled = false;
  @Input()
  public isError = false;
  @Input()
  public isRequired = false;

  @Output()
  readonly clickFrame: EventEmitter<Event> = new EventEmitter();

  @ContentChild('grnOrnamentLf', { static: true })
  public grnOrnamentLf: ElementRef<HTMLElement> | undefined;
  @ContentChild('grnOrnamentRg', { static: true })
  public grnOrnamentRg: ElementRef<HTMLElement> | undefined;

  public get isOutlinedExterior(): boolean {
    return InputExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnFrameInputConfig = {};
  public innExterior: InputExterior | null = null;
  public innFrameSizeValue = 0;
  public innIsLabelShrink: boolean | null = null;
  public innHiddenLabel: boolean | null = null;
  public labelPadding = 0;
  public lineHeight = 0;
  public ornamentLfWidth = 0;
  public ornamentRgWidth = 0;

  constructor(
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-frame-input', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isModifyLabelPadding = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.innExterior = InputExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      isModifyLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.innFrameSizeValue = this.createFrameSize(this.frameSize || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innExterior, this.innFrameSizeValue));

      this.labelPadding = LabelPaddingUtil.hor(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setLabelPaddingHor(this.hostRef, this.labelPadding);
      this.settingLabelMaxWidth(this.hostRef, this.getLabelMaxWidth(this.labelPadding));

      if (this.lineHeight > 0) {
        const paddingVertical = InputLabelUtil.paddingVertical(this.innExterior, this.innFrameSizeValue, this.lineHeight);
        this.settingLabelPaddingVer(this.hostRef, paddingVertical);

        const translateVertical = InputLabelUtil.translateVertical(this.innExterior, this.innFrameSizeValue, this.lineHeight);
        this.settingLabelTranslateVer(this.hostRef, translateVertical);

        const maxWidth = this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
        this.settingLabel2MaxWidth(this.hostRef, maxWidth);
      }
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
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-disabled', this.isDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes.isFocused) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-focused', this.isFocused);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'foc', this.isFocused ? '' : null);
    }
    if (changes.isFilled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }
    if (changes.isError) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-error', this.isError);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes.label || changes.isRequired) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-lgn-indent', isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  ngOnInit(): void {
    let isLabelPadding = false;
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      isLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      const borderRadius = this.getBorderRadius(this.innExterior, this.innFrameSizeValue);
      this.settingBorderRadius(this.hostRef, borderRadius);

      this.labelPadding = LabelPaddingUtil.hor(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setLabelPaddingHor(this.hostRef, this.labelPadding);
      this.settingLabelMaxWidth(this.hostRef, this.getLabelMaxWidth(this.labelPadding));
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
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));

    const paddingVertical = InputLabelUtil.paddingVertical(this.innExterior, this.innFrameSizeValue, this.lineHeight);
    this.settingLabelPaddingVer(this.hostRef, paddingVertical);

    const translateVertical = InputLabelUtil.translateVertical(this.innExterior, this.innFrameSizeValue, this.lineHeight);
    this.settingLabelTranslateVer(this.hostRef, translateVertical);

    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    HtmlElemUtil.setProperty(this.hostRef, '--orn-lf', this.ornamentLfWidth > 0 ? this.ornamentLfWidth + 'px' : null);

    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || 0;

    const maxWidth = this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
    this.settingLabel2MaxWidth(this.hostRef, maxWidth);
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
    const frameSize: FrameSize = FrameSizeUtil.convert((frameSizeInp || '').toString() || FrameSize.wide) as FrameSize;
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }

  private settingFrameSize(elem: ElementRef<HTMLElement> | undefined, frameSizeValue: number): void {
    HtmlElemUtil.setProperty(elem, '--size', frameSizeValue > 0 ? frameSizeValue + 'px' : null);
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: string | null): void {
    HtmlElemUtil.setProperty(elem, '--br-rd', borderRadius);
  }

  private settingLabelShrink(elem: ElementRef<HTMLElement> | undefined, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(this.renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingHiddenLabel(elem: ElementRef<HTMLElement> | undefined, hiddenLabel: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-hidden-label', hiddenLabel);
    HtmlElemUtil.setAttr(this.renderer, elem, 'hlbl', hiddenLabel ? '' : null);
  }

  private settingLabelPaddingVer(el: ElementRef<HTMLElement> | undefined, paddingVertical: PaddingVertical): void {
    HtmlElemUtil.setProperty(el, '--lbl-pd-tp', NumberUtil.str(paddingVertical.labelPaddingTop)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl-pd-bt', NumberUtil.str(paddingVertical.labelPaddingBottom)?.concat('px'));
  }

  private settingLabelTranslateVer(el: ElementRef<HTMLElement> | undefined, translateVertical: TranslateVertical): void {
    HtmlElemUtil.setProperty(el, '--lbl-trn-y', NumberUtil.str(translateVertical.labelTranslateY)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl2-trn-y', NumberUtil.str(translateVertical.label2TranslateY)?.concat('px'));
  }

  private setLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number): void {
    HtmlElemUtil.setProperty(elem, '--lbl-pd-lf', NumberUtil.str(labelPadding)?.concat('px'));
  }

  private settingLabelMaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-wd', maxWidth);
  }

  private settingLabel2MaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl2-wd', maxWidth);
  }
  // Max width of the label in a shrink position (in the top).
  private getLabelMaxWidth(labelPadding: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      result = labelPadding === 0 ? '133%' : 'calc(133% - ' + (2.66 * labelPadding).toFixed(2) + 'px)';
    }
    return result;
  }
  // Max width of the label in the unshrink position (in the middle).
  private getLabel2MaxWidth(labelPadding: number | null, ornamentLfWidth: number, ornamentRgWidth: number): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      const value = (ornamentLfWidth > 0 ? ornamentLfWidth : labelPadding) + (ornamentRgWidth > 0 ? ornamentRgWidth : labelPadding);
      result = value === 0 ? '100%' : 'calc(100% - ' + value.toFixed(2) + 'px)';
    }
    return result;
  }

  private getBorderRadius(exterior: InputExterior | null, frameSizeValue: number): string | null {
    let result: string | null = null;
    if (exterior && frameSizeValue > 0) {
      if (exterior === InputExterior.outlined) {
        result = (frameSizeValue / 10).toFixed(2) + 'px';
      } else if (exterior === InputExterior.underline) {
        const value = (frameSizeValue / 10).toFixed(2) + 'px';
        result = value + ' ' + value + ' 0 0';
      }
    }
    return result;
  }
}

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

import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../interfaces/input-exterior.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { InputLabelUtil, PaddingVerRes, TranslateVerRes } from '../utils/input-label.util';
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
  public labelPadding: number | null = null;
  public lineHeight: number | null = null;
  public ornamentLfWidth: number | null = null;
  public ornamentRgWidth: number | null = null;

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
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innExterior, this.innFrameSizeValue));
      this.labelPadding = InputLabelUtil.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
      this.settingLabelMaxWidth(this.hostRef, this.getLabelMaxWidth(this.labelPadding));

      if (this.lineHeight != null) {
        // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
        this.settingLabelPaddingVer(this.hostRef, InputLabelUtil.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
        this.settingLabelTranslateVer(this.hostRef, InputLabelUtil.translateVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
        this.settingLabel2MaxWidth(this.hostRef, this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth));
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
    let isModifyLabelPadding = false;
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      isModifyLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innExterior, this.innFrameSizeValue));
      this.labelPadding = InputLabelUtil.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
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
    // Get the line height from the style set.
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || null;
    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || null;
    this.settingOrnamentLf(this.hostRef, this.ornamentLfWidth);
    // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
    this.settingLabelPaddingVer(this.hostRef, InputLabelUtil.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
    this.settingLabelTranslateVer(this.hostRef, InputLabelUtil.translateVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
    this.settingLabel2MaxWidth(this.hostRef, this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth));
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

  private settingLabelPaddingVer(el: ElementRef<HTMLElement> | undefined, paddingVertical: PaddingVerRes): void {
    HtmlElemUtil.setProperty(el, '--lbl-pd-tp', NumberUtil.str(paddingVertical.labelPaddingTop)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl-pd-bt', NumberUtil.str(paddingVertical.labelPaddingBottom)?.concat('px'));
  }

  private settingLabelTranslateVer(el: ElementRef<HTMLElement> | undefined, translateVertical: TranslateVerRes): void {
    HtmlElemUtil.setProperty(el, '--lbl-trn-y', NumberUtil.str(translateVertical.labelTranslateY)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl2-trn-y', NumberUtil.str(translateVertical.label2TranslateY)?.concat('px'));
  }

  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-pd-lf', NumberUtil.str(labelPadding)?.concat('px'));
  }

  private settingLabelMaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-wd', maxWidth);
  }

  private settingLabel2MaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth2: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl2-wd', maxWidth2);
  }

  private settingOrnamentLf(elem: ElementRef<HTMLElement> | undefined, ornamentLfWidth: number | null): void {
    HtmlElemUtil.setProperty(elem, '--orn-lf', NumberUtil.str(ornamentLfWidth)?.concat('px'));
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
  // Max width of the label in a shrink position (in the top).
  private getLabelMaxWidth(labelPadding: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      result = labelPadding === 0 ? '133%' : 'calc(133% - ' + (2.66 * labelPadding).toFixed(2) + 'px)';
    }
    return result;
  }
  // Max width of the label in the unshrink position (in the middle).
  private getLabel2MaxWidth(labelPadding: number | null, ornamentLfWidth: number | null, ornamentRgWidth: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      const valueLfWidth = ornamentLfWidth != null ? ornamentLfWidth : labelPadding;
      const valueRgWidth = ornamentRgWidth != null ? ornamentRgWidth : labelPadding;
      const value = valueLfWidth + valueRgWidth;
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

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

import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { LabelPaddingUtil } from '../utils/label-padding.util';

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
  public exterior: Exterior | null = null;
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
  public grnOrnamentLf: ElementRef | undefined;
  @ContentChild('grnOrnamentRg', { static: true })
  public grnOrnamentRg: ElementRef | undefined;

  public get isOutlinedExterior(): boolean {
    return ExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnFrameInputConfig = {};
  public innExterior: Exterior | null = null;
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
    let isLabelPadding = false;
    let isConfigFirstChange = false;
    if (changes.config) {
      console.log('Frame.OnChanges config=', this.config);
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
      isConfigFirstChange = changes.config.firstChange;
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      console.log('Frame.OnChanges exterior=', this.exterior);
      this.innExterior = this.updateExterior(this.exterior || this.currConfig.exterior || null);
      isLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      console.log('Frame.OnChanges frameSize=', this.frameSize);
      this.innFrameSizeValue = this.updateFrameSize(this.frameSize || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      console.log('Frame.OnChanges LabelPadding  exterior=', this.innExterior, ' frameSize=', this.frameSize); // TODO !!!
      this.labelPadding = this.updateLabelPadding(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setPropertyLabelPaddingHor(this.labelPadding);
      const eFirst = changes.exterior?.firstChange;
      const fFirst = changes.frameSize?.firstChange;
      console.log(`Frame.OnChanges LabelPadding  cFirChan=${isConfigFirstChange} exteriorFirChan=${eFirst} frameSizeFirChan=${fFirst}`);
      if (!(isConfigFirstChange || changes.exterior?.firstChange || changes.frameSize?.firstChange)) {
        this.setPropertyLabelPaddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight);
        this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
      }
    }
    if (changes.isLabelShrink || (changes.config && this.isLabelShrink == null)) {
      this.innIsLabelShrink = this.updateLabelShrink(this.isLabelShrink, this.currConfig.isLabelShrink);
    }
    if (changes.hiddenLabel || (changes.config && this.hiddenLabel == null)) {
      this.innHiddenLabel = this.updateHiddenLabel(this.hiddenLabel, this.currConfig.hiddenLabel);
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
      console.log('Frame.OnInit exterior=', this.innExterior);
      this.innExterior = this.updateExterior(this.currConfig.exterior || null);
      isLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      console.log('Frame.OnInit frameSize=', this.frameSize);
      this.innFrameSizeValue = this.updateFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      this.labelPadding = this.updateLabelPadding(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setPropertyLabelPaddingHor(this.labelPadding);
    }
    if (this.innIsLabelShrink == null) {
      this.innIsLabelShrink = this.updateLabelShrink(this.isLabelShrink, this.currConfig.isLabelShrink);
    }
    if (this.innHiddenLabel == null) {
      this.innHiddenLabel = this.updateHiddenLabel(this.hiddenLabel, this.currConfig.hiddenLabel);
    }
  }

  ngAfterContentInit(): void {
    console.log('');
    console.log('Frame.AfterContentInit() start'); // TODO del;
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    this.setPropertyLabelPaddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight);

    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    HtmlElemUtil.setProperty(this.hostRef, '--orn-lf', this.ornamentLfWidth > 0 ? this.ornamentLfWidth + 'px' : null);

    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || 0;
    this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
    console.log('Frame.AfterContentInit() finish'); // TODO del;
    console.log('');
  }

  // ** Public API **

  public getOrnamAlign(ornamAlign: OrnamAlign | undefined, isEnd: boolean, exterior: Exterior | null): string | null {
    let result = null;
    if (ornamAlign != null) {
      if (ornamAlign === OrnamAlign.default) {
        result = OrnamAlign.center.valueOf();
        if (exterior === Exterior.standard || (exterior === Exterior.underline && !isEnd)) {
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

  private updateExterior(exterior: Exterior | null): Exterior {
    const result: Exterior = ExteriorUtil.create(exterior);
    console.log('Frame.updateExterior() exterior=', result); // TODO del;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-outlined', ExteriorUtil.isOutlined(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-o', ExteriorUtil.isOutlined(result) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-underline', ExteriorUtil.isUnderline(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-u', ExteriorUtil.isUnderline(result) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-standard', ExteriorUtil.isStandard(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-s', ExteriorUtil.isStandard(result) ? '' : null);
    const isBorder = ExteriorUtil.isStandard(result) || ExteriorUtil.isUnderline(result);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-border', isBorder);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'frm-br', isBorder ? '' : null);
    return result;
  }

  private updateFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.create(frameSizeInp);
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--size', frameSizeValue > 0 ? frameSizeValue + 'px' : null);
    console.log(`Frame.updateFrameSizeValue() frameSize=${frameSize} frameSizeValue=${frameSizeValue}`); // TODO del;
    return frameSizeValue;
  }

  private updateLabelPadding(exterior: Exterior, frameSizeValue: number, labelPd?: number): number {
    HtmlElemUtil.setProperty(this.hostRef, '--br-rd', this.getBorderRadius(exterior, frameSizeValue));
    const result = labelPd != null && labelPd > 0 ? labelPd : LabelPaddingUtil.hor(frameSizeValue, exterior);
    console.log(`Frame.updateLabelPadding() result=${result}`); // TODO del;
    return result;
  }

  private updateLabelShrink(isLabelShrinkInp: boolean | null, configIsLabelShrink?: boolean): boolean {
    const result = this.createBoolean(isLabelShrinkInp, configIsLabelShrink != null ? configIsLabelShrink : false);
    console.log('Frame.updateLabelShrink() isLabelShrink=', result); // TODO del;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-shrink', result);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shr', result ? '' : null);
    return result;
  }

  private updateHiddenLabel(hiddenLabelInp: boolean | null, configHiddenLabel?: boolean): boolean {
    const result = this.createBoolean(hiddenLabelInp, configHiddenLabel != null ? configHiddenLabel : false);
    console.log('Frame.updateHiddenLabel() hiddenLabel=', result); // TODO del;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-hidden-label', result);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'hlbl', result ? '' : null);
    return result;
  }

  private setPropertyLabelPaddingVer(exterior: Exterior | null, frameSizeValue: number, lineHeight: number): void {
    console.log(`Frame.setPropertyLabelPaddingVer() lineHeight=${lineHeight}`);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-tp', LabelPaddingUtil.ver(true, exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-bt', LabelPaddingUtil.ver(false, exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-trn-y', this.getLabelTranslateY(exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-trn-y', this.getLabel2TranslateY(exterior, frameSizeValue, lineHeight));
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    console.log('Frame.setPropertyLabelPaddingHor() labelPadding=', labelPadding); // TODO del;
    const labelPaddingPx = labelPadding != null ? labelPadding + 'px' : labelPadding;
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-lf', labelPaddingPx);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-wd', this.getLabelMaxWidth(labelPadding));
  }

  private setPropertyLabel2Padding(labelPadding: number, ornamentLfWidth: number, ornamentRgWidth: number): void {
    console.log(
      'setPropertyLabel2Padding() labelPadding=',
      labelPadding,
      ' ornamentLfWidth=',
      ornamentLfWidth,
      ' ornamentRgWidth=',
      ornamentRgWidth
    );
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-wd', this.getLabel2MaxWidth(labelPadding, ornamentLfWidth, ornamentRgWidth));
  }
  // Determines the y transform value at the shrink position (top).
  private getLabelTranslateY(exterior: Exterior | null, frameSizeValue: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight > 0) {
      result = '-1.5px';
      if (exterior === Exterior.outlined) {
        result = ((-0.75 * lineHeight) / 2).toFixed(2) + 'px'; // # -8.28px
      } else if (exterior === Exterior.underline) {
        result = (((frameSizeValue - lineHeight) * 0.757524 - lineHeight * 0.5) * 0.45).toFixed(2) + 'px'; // # 6,0742314
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  private getLabel2TranslateY(exterior: Exterior | null, frameSizeValue: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight > 0) {
      result = ((frameSizeValue - lineHeight) * (Exterior.standard === exterior ? 0.75 : 0.5)).toFixed(2) + 'px';
    }
    return result;
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

  private getBorderRadius(exterior: Exterior | null, frameSizeValue: number): string | null {
    let result: string | null = null;
    if (exterior && frameSizeValue > 0) {
      if (exterior === Exterior.outlined) {
        result = (frameSizeValue / 10).toFixed(2) + 'px';
      } else if (exterior === Exterior.underline) {
        const value = (frameSizeValue / 10).toFixed(2) + 'px';
        result = value + ' ' + value + ' 0 0';
      }
    }
    return result;
  }

  private createBoolean(value: boolean | null, defaultValue: boolean): boolean {
    return value != null ? value : defaultValue;
  }
}

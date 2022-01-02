import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  public exterior: Exterior | null = null; //+
  @Input()
  public frameSize: FrameSize | null = null; //+
  @Input()
  public isLabelShrink: boolean | null = null; //+
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
    return ExteriorUtil.isOutlined(this.exterior);
  }

  public frameSizeValue = 0;
  public lineHeight = 0;
  public labelPadding = 0;
  public ornamentLfWidth = 0;
  public ornamentRgWidth = 0;
  public currConfig: GrnFrameInputConfig = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-frame-input', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior) {
      console.log('OnChanges exterior=', this.exterior);
      this.updateExterior(this.exterior || this.currConfig.exterior || null);
    }
    if (changes.frameSize) {
      console.log('OnChanges frameSize=', this.frameSize);
      this.updateFrameSize(this.frameSize || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
    }
    if ((changes.exterior || changes.frameSize) && this.exterior && this.frameSizeValue > 0) {
      console.log('OnChanges exterior || frameSize  exterior=', this.exterior, ' frameSize=', this.frameSize);
      this.labelPadding = this.updateLabelPadding(this.exterior, this.frameSizeValue, this.currConfig);
      this.setPropertyLabelPaddingHor(this.labelPadding);
      if (!(changes.exterior || changes.frameSize).firstChange) {
        this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeValue, this.lineHeight);
        this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
      }
    }
    if (changes.isLabelShrink) {
      this.updateLabelShrink(this.isLabelShrink != null ? this.isLabelShrink : this.currConfig.isLabelShrink || false);
    }
    if (changes.hiddenLabel) {
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.currConfig.hiddenLabel || false);
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
    const isExterior = !!this.exterior;
    const isFrameSize = !!this.frameSize;
    // exterior?: Exterior;
    if (this.exterior == null) {
      console.log('OnInit exterior=', this.exterior);
      this.updateExterior(this.currConfig.exterior || null);
    }
    // frameSize?: FrameSize;
    // frameSizeValue?: number;
    if (this.frameSize == null) {
      console.log('OnInit frameSize=', this.frameSize);
      this.updateFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
    }
    if ((!isExterior || !isFrameSize) && this.exterior && this.frameSizeValue > 0) {
      this.labelPadding = this.updateLabelPadding(this.exterior, this.frameSizeValue, this.currConfig);
      this.setPropertyLabelPaddingHor(this.labelPadding);
    }
    // isLabelShrink?: boolean;
    if (this.isLabelShrink == null) {
      this.updateLabelShrink(this.currConfig.isLabelShrink || false);
    }
    // hiddenLabel?: boolean;
    if (this.hiddenLabel == null) {
      this.hiddenLabel = this.currConfig.hiddenLabel || false;
    }
    // oLabelPd?: number; // px
    // uLabelPd?: number; // px
    // sLabelPd?: number; // px
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit() start'); // TODO del;
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeValue, this.lineHeight);

    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    HtmlElemUtil.setProperty(this.hostRef, '--orn-lf', this.ornamentLfWidth > 0 ? this.ornamentLfWidth + 'px' : null);

    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || 0;
    this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
    console.log('AfterContentInit() finish'); // TODO del;
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

  private createBoolean(value: boolean | null, defaultValue: boolean): boolean {
    return value != null ? value : defaultValue;
  }

  private updateExterior(exterior: Exterior | null): void {
    console.log('#updateExterior() exterior=', exterior); // TODO del;
    this.exterior = ExteriorUtil.create(exterior);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-outlined', ExteriorUtil.isOutlined(this.exterior));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-o', ExteriorUtil.isOutlined(this.exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-underline', ExteriorUtil.isUnderline(this.exterior));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-u', ExteriorUtil.isUnderline(this.exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-standard', ExteriorUtil.isStandard(this.exterior));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ext-s', ExteriorUtil.isStandard(this.exterior) ? '' : null);
    const isBorder = ExteriorUtil.isStandard(this.exterior) || ExteriorUtil.isUnderline(this.exterior);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-border', isBorder);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'frm-br', isBorder ? '' : null);
  }
  private updateFrameSize(frameSize: FrameSize | null, frameSizeValue: number | undefined): void {
    console.log('#updateFrameSize() frameSize=', frameSize, ' frameSizeValue=', frameSizeValue); // TODO del;
    this.frameSize = FrameSizeUtil.create(frameSize);
    this.frameSizeValue = FrameSizeUtil.getValue(this.frameSize) || 0;
    if (frameSize === null && frameSizeValue && frameSizeValue > 0) {
      this.frameSizeValue = frameSizeValue;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--size', this.frameSizeValue > 0 ? this.frameSizeValue + 'px' : null);
  }
  private updateLabelPadding(exterior: Exterior, frameSizeValue: number, currConfig: GrnFrameInputConfig): number {
    console.log('#updateLabelPadding()'); // TODO del;
    HtmlElemUtil.setProperty(this.hostRef, '--br-rd', this.getBorderRadius(exterior, frameSizeValue));
    this.changeDetectorRef.markForCheck();
    return LabelPaddingUtil.hor(frameSizeValue, exterior, currConfig) || 0;
  }
  private updateLabelShrink(isLabelShrink: boolean | null): void {
    console.log('#updateLabelShrink() isLabelShrink=', isLabelShrink); // TODO del;
    this.isLabelShrink = this.createBoolean(isLabelShrink, false);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-shrink', !!this.isLabelShrink);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shr', this.isLabelShrink ? '' : null);
  }

  private setPropertyLabelPaddingVer(exterior: Exterior | null, frameSizeValue: number, lineHeight: number): void {
    console.log('setPropertyLabelPaddingVer() exterior=', exterior, ' frameSizeVal=', frameSizeValue, ' lineHeight=', lineHeight);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-tp', LabelPaddingUtil.ver(true, exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-bt', LabelPaddingUtil.ver(false, exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-trn-y', this.getLabelTranslateY(exterior, frameSizeValue, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-trn-y', this.getLabel2TranslateY(exterior, frameSizeValue, lineHeight));
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    console.log('setPropertyLabelPaddingHor() labelPadding=', labelPadding); // TODO del;
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
}

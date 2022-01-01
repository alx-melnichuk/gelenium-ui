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
export class GrnFrameInputComponent implements OnChanges, AfterContentInit {
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
    return ExteriorUtil.isOutlined(this.exterior);
  }

  public frameSizeVal = 0;
  public lineHeight = 0;
  public labelPadding = 0;
  public ornamentLfWidth = 0;
  public ornamentRgWidth = 0;
  public actualConfig: GrnFrameInputConfig | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.actualConfig = this.initConfig(this.rootConfig || {});
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-frame-input', true);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.actualConfig = this.initConfig({ ...(this.rootConfig || {}), ...(this.config || {}) });
    }
    if (changes.exterior) {
      this.exterior = ExteriorUtil.create(this.exterior, this.actualConfig?.exterior || null);
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
    if (changes.frameSize) {
      this.frameSize = FrameSizeUtil.create(this.frameSize, this.actualConfig?.frameSize || null);
      this.frameSizeVal = FrameSizeUtil.getValue(this.frameSize) || 0;
      HtmlElemUtil.setProperty(this.hostRef, '--size', this.frameSizeVal > 0 ? this.frameSizeVal + 'px' : null);
    }
    if ((changes.exterior || changes.frameSize) && this.exterior && this.frameSizeVal > 0) {
      HtmlElemUtil.setProperty(this.hostRef, '--br-rd', this.getBorderRadius(this.exterior, this.frameSizeVal));
      this.labelPadding = LabelPaddingUtil.hor(this.frameSizeVal, this.exterior, this.actualConfig) || 0;
      this.changeDetectorRef.markForCheck();
      this.setPropertyLabelPaddingHor(this.labelPadding);
      this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeVal, this.lineHeight);
      this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
    }
    if (changes.isLabelShrink) {
      this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.actualConfig?.isLabelShrink);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-shrink', !!this.isLabelShrink);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shr', this.isLabelShrink ? '' : null);
    }
    if (changes.hiddenLabel) {
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.actualConfig?.hiddenLabel);
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

  ngAfterContentInit(): void {
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeVal, this.lineHeight);

    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    HtmlElemUtil.setProperty(this.hostRef, '--orn-lf', this.ornamentLfWidth > 0 ? this.ornamentLfWidth + 'px' : null);

    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || 0;
    this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
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

  private createBoolean(value: boolean | null, defaultValue: boolean | undefined): boolean | null {
    return value != null ? value : defaultValue != null ? defaultValue : value;
  }

  private initConfig(config: GrnFrameInputConfig | null): GrnFrameInputConfig | null {
    if (config != null) {
      this.exterior = ExteriorUtil.create(this.exterior, config?.exterior || null);
      this.frameSize = FrameSizeUtil.create(this.frameSize, config?.frameSize || null);
      this.isLabelShrink = this.createBoolean(this.isLabelShrink, config?.isLabelShrink);
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, config?.hiddenLabel);
    }
    return config;
  }
  private initConfig2(config: GrnFrameInputConfig): GrnFrameInputConfig {
    console.log('#initConfig() start'); // TODO del;
    // exterior?: Exterior;
    this.updateExterior(ExteriorUtil.create(this.exterior || null, config.exterior || null));
    // frameSize?: FrameSize;
    // frameSizeVal?: number;
    this.updateFrameSize(FrameSizeUtil.create(this.frameSize, config.frameSize || null), config.frameSizeVal);
    if (this.exterior && this.frameSizeVal > 0) {
      this.updateExteriorAndFrameSize(this.exterior, this.frameSizeVal);
    }
    // isLabelShrink?: boolean;
    // hiddenLabel?: boolean;
    // ornamLfAlign?: OrnamAlign;
    // ornamRgAlign?: OrnamAlign;
    // // For "outlined" mode.
    // oLabelPd?: number; // px
    // // For "underline" mode.
    // uLabelPd?: number; // px
    // // For "standard" mode.
    // sLabelPd?: number; // px

    this.isLabelShrink = this.createBoolean(this.isLabelShrink, config?.isLabelShrink);
    this.hiddenLabel = this.createBoolean(this.hiddenLabel, config?.hiddenLabel);

    console.log('#initConfig() finish'); // TODO del;
    return config;
  }

  private updateExterior(exterior: Exterior): void {
    console.log('#updateExterior()'); // TODO del;
    this.exterior = exterior;
    // this.exterior = ExteriorUtil.create(this.exterior, this.actualConfig?.exterior || null);
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
  private updateFrameSize(frameSize: FrameSize | null, frameSizeVal: number | undefined): void {
    console.log('#updateFrameSize()'); // TODO del;
    this.frameSize = frameSize; // FrameSizeUtil.create(this.frameSize, this.actualConfig?.frameSize || null);
    this.frameSizeVal = FrameSizeUtil.getValue(this.frameSize) || 0;
    if (frameSizeVal && frameSizeVal > 0) {
      this.frameSizeVal = frameSizeVal;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--size', this.frameSizeVal > 0 ? this.frameSizeVal + 'px' : null);
  }
  private updateExteriorAndFrameSize(exterior: Exterior, frameSizeVal: number): void {
    console.log('#updateExteriorAndFrameSize()'); // TODO del;
    HtmlElemUtil.setProperty(this.hostRef, '--br-rd', this.getBorderRadius(exterior, frameSizeVal));
    this.labelPadding = LabelPaddingUtil.hor(frameSizeVal, exterior, this.actualConfig) || 0;
    this.changeDetectorRef.markForCheck();
    this.setPropertyLabelPaddingHor(this.labelPadding);
    this.setPropertyLabelPaddingVer(exterior, frameSizeVal, this.lineHeight);
    this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
  }

  private setPropertyLabelPaddingVer(exterior: Exterior | null, frameSizeVal: number, lineHeight: number): void {
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-tp', LabelPaddingUtil.ver(true, exterior, frameSizeVal, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-bt', LabelPaddingUtil.ver(false, exterior, frameSizeVal, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-trn-y', this.getLabelTranslateY(exterior, frameSizeVal, lineHeight));
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-trn-y', this.getLabel2TranslateY(exterior, frameSizeVal, lineHeight));
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    const labelPaddingPx = labelPadding != null ? labelPadding + 'px' : labelPadding;
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-lf', labelPaddingPx);
    HtmlElemUtil.setProperty(this.hostRef, '--lbl-wd', this.getLabelMaxWidth(labelPadding));
  }

  private setPropertyLabel2Padding(labelPadding: number, ornamentLfWidth: number, ornamentRgWidth: number): void {
    HtmlElemUtil.setProperty(this.hostRef, '--lbl2-wd', this.getLabel2MaxWidth(labelPadding, ornamentLfWidth, ornamentRgWidth));
  }

  // Determines the y transform value at the shrink position (top).
  private getLabelTranslateY(exterior: Exterior | null, frameSizeVal: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSizeVal > 0 && lineHeight > 0) {
      result = '-1.5px';
      if (exterior === Exterior.outlined) {
        result = ((-0.75 * lineHeight) / 2).toFixed(2) + 'px'; // # -8.28px
      } else if (exterior === Exterior.underline) {
        result = (((frameSizeVal - lineHeight) * 0.757524 - lineHeight * 0.5) * 0.45).toFixed(2) + 'px'; // # 6,0742314
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  private getLabel2TranslateY(exterior: Exterior | null, frameSizeVal: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSizeVal > 0 && lineHeight > 0) {
      result = ((frameSizeVal - lineHeight) * (Exterior.standard === exterior ? 0.75 : 0.5)).toFixed(2) + 'px';
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

  private getBorderRadius(exterior: Exterior | null, frameSizeVal: number): string | null {
    let result: string | null = null;
    if (exterior && frameSizeVal > 0) {
      if (exterior === Exterior.outlined) {
        result = (frameSizeVal / 10).toFixed(2) + 'px';
      } else if (exterior === Exterior.underline) {
        const value = (frameSizeVal / 10).toFixed(2) + 'px';
        result = value + ' ' + value + ' 0 0';
      }
    }
    return result;
  }
}

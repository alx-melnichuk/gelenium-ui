import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonExterior, ButtonExteriorUtil } from '../interfaces/button-exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnButtonConfig } from '../interfaces/grn-button-config.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { NumberUtil } from '../utils/number.util';

export const GRN_BUTTON_CONFIG = new InjectionToken<GrnButtonConfig>('GRN_BUTTON_CONFIG');

@Component({
  selector: 'grn-button',
  templateUrl: './grn-button.component.html',
  styleUrls: ['./grn-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnButtonComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public config: GrnButtonConfig | null = null;
  @Input()
  public exterior: string | null = null; // ButtonExteriorType
  @Input()
  public frameSize: string | null = null; // FrameSizeType
  @Input()
  public isDisabled: string | null = null;

  @ViewChild('buttonElement')
  public buttonElementRef: ElementRef<HTMLElement> | undefined;

  public get isText(): boolean {
    return ButtonExteriorUtil.isText(this.innExterior);
  }
  public get isContained(): boolean {
    return ButtonExteriorUtil.isContained(this.innExterior);
  }
  public get isOutlined(): boolean {
    return ButtonExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnButtonConfig = {};
  public innExterior: ButtonExterior | null = null;
  public exterior2: ButtonExterior | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;
  public labelPadding: number | null = null;
  public lineHeight: number | null = null;

  public innRippleColor: string | null = null;
  public innIsDisabled: boolean | null = null; // ?

  constructor(
    @Optional() @Inject(GRN_BUTTON_CONFIG) private rootConfig: GrnButtonConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-button', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isModifyLabelPadding = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = ButtonExteriorUtil.convert(this.exterior);
      this.innExterior = ButtonExteriorUtil.create(this.exterior2 || this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      this.innRippleColor = this.getRippleColor(this.innExterior);
      isModifyLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      this.innFrameSizeValue = this.createFrameSize(this.frameSize2 || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innFrameSizeValue));
      this.labelPadding = this.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);

      if (this.lineHeight != null) {
        // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
        this.settingLabelPaddingVer(this.hostRef, this.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
      }
    }
    if (changes.isDisabled) {
      this.innIsDisabled = this.isDisabled === '' || this.isDisabled === 'true';
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  ngOnInit(): void {
    let isModifyLabelPadding = false;
    if (this.innExterior === null) {
      this.innExterior = ButtonExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      this.innRippleColor = this.getRippleColor(this.innExterior);
      isModifyLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innFrameSizeValue));
      this.labelPadding = this.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
    }
    if (this.innIsDisabled === null) {
      this.innIsDisabled = false;
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  ngAfterContentInit(): void {
    // Get the line height from the style set.
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    console.log('lineHeightPx=', lineHeightPx);
    // // Get the width of the ornament block.
    // this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || null;
    // this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || null;
    // this.settingOrnamentLf(this.hostRef, this.ornamentLfWidth);
    // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
    this.settingLabelPaddingVer(this.hostRef, this.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
    // this.settingLabelTranslateVer(this.hostRef, InputLabelUtil.translateVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
    // this.settingLabel2MaxWidth(this.hostRef, this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth));
  }

  // ** Public API **

  public doClick(event: any): void {
    console.log('doClick()');
  }

  // ** Private API **

  private getRippleColor(exterior: ButtonExterior | null): string | null {
    return ButtonExteriorUtil.isText(exterior) || ButtonExteriorUtil.isOutlined(exterior) ? 'rgba(25, 118, 210, 0.3)' : null;
  }
  // Get left/right padding for the GrnFrameInpu element.
  private paddingLfRg(exterior: ButtonExterior, frameSizeVal: number, configLabelPd: number | undefined): number | null {
    let result: number | null = configLabelPd || null;
    if (frameSizeVal > 0 && (!result || result <= 0)) {
      if (exterior === ButtonExterior.text) {
        result = 8; // Math.round(100 * 0.2045 * frameSizeVal) / 100; // 9px
      } else if (exterior === ButtonExterior.contained) {
        result = 16; // Math.round(100 * 0.3636 * frameSizeVal) / 100; // 16px
      } else if (exterior === ButtonExterior.outlined) {
        result = 15; // Math.round(100 * 0.3409 * frameSizeVal) / 100; // 15px
      }
    }
    return result;
  }
  private paddingVer(exterior: ButtonExterior | null, frameSize: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      result = (frameSize - lineHeight) / 2;
      if (exterior === ButtonExterior.outlined) {
        result--;
      }
    }
    return result;
  }
  private getBorderRadius(frameSizeValue: number): string | null {
    let result: string | null = null;
    if (frameSizeValue > 0) {
      result = (frameSizeValue / 10).toFixed(2) + 'px';
    }
    return result;
  }

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: ButtonExterior | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-text', ButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-t', ButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-contained', ButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-c', ButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-outlined', ButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', ButtonExteriorUtil.isOutlined(exterior) ? '' : null);
  }

  private createFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.convert((frameSizeInp || '').toString()) || FrameSize.small;
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }

  private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--pd-hor', NumberUtil.str(labelPadding)?.concat('px'));
  }

  private settingLabelPaddingVer(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-pd-ver', NumberUtil.str(labelPadding)?.concat('px'));
  }

  private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: string | null): void {
    HtmlElemUtil.setProperty(elem, '--br-rd', borderRadius);
  }

  private settingIsDisabled(elem: ElementRef<HTMLElement> | undefined, isDisabled: boolean): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'disabled', isDisabled ? '' : null);
  }
}

import {
  AfterContentInit,
  AfterViewInit,
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

export const GRN_BUTTON_CONFIG = new InjectionToken<GrnButtonConfig>('GRN_BUTTON_CONFIG');

@Component({
  selector: 'grn-button',
  templateUrl: './grn-button.component.html',
  styleUrls: ['./grn-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnButtonComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
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

  public currConfig: GrnButtonConfig = {};
  public innExterior: ButtonExterior | null = null;
  public exterior2: ButtonExterior | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;
  public innIsDisabled: boolean | null = null;
  public innRippleColor: string | null = null;
  // public labelPadding = 0;
  public lineHeight = 0;

  constructor(
    @Optional() @Inject(GRN_BUTTON_CONFIG) private rootConfig: GrnButtonConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isLabelPadding = false;
    let isConfigFirstChange = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
      isConfigFirstChange = changes.config.firstChange;
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = ButtonExteriorUtil.convert(this.exterior);
      this.innExterior = ButtonExteriorUtil.create(this.exterior2 || this.currConfig.exterior || null);
      this.settingExterior(this.buttonElementRef, this.innExterior);
      isLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      const configFrameSizeValue = this.currConfig.frameSizeValue;
      this.innFrameSizeValue = this.createFrameSize(this.frameSize2 || this.currConfig.frameSize || null, configFrameSizeValue);
      this.settingFrameSize(this.buttonElementRef, this.innFrameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // const borderRadius = this.getBorderRadius(this.innExterior, this.innFrameSizeValue);
      // this.settingBorderRadius(this.hostRef, borderRadius);
      // this.labelPadding = LabelPaddingUtil.hor(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      // this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
      if (this.lineHeight > 0) {
        const labelPaddingVer = this.createLabelPaddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight);
        this.settingLabelPaddingVer(this.hostRef, labelPaddingVer);
        // this.settingLabel2Padding(this.hostRef, this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
      }
    }
    if (changes.isDisabled) {
      this.innIsDisabled = this.isDisabled === '' || this.isDisabled === 'true';
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  ngOnInit(): void {
    let isLabelPadding = false;
    if (this.innExterior === null) {
      this.innExterior = ButtonExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.buttonElementRef, this.innExterior);
      isLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.buttonElementRef, this.innFrameSizeValue);
      isLabelPadding = true;
    }
    if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // this.labelPadding = this.updateLabelPadding(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      // this.setPropertyLabelPaddingHor(this.labelPadding);
    }
    if (this.innIsDisabled === null) {
      this.innIsDisabled = false;
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  ngAfterContentInit(): void {
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    console.log('lineHeightPx=', lineHeightPx);
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    this.setPropertyLabelPaddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight);
  }

  ngAfterViewInit(): void {
    if (this.innExterior) {
      this.settingExterior(this.buttonElementRef, this.innExterior);
    }
    if (this.innFrameSizeValue > 0) {
      this.settingFrameSize(this.hostRef, this.innFrameSizeValue);
    }
    if (this.innIsDisabled !== null) {
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  // ** Public API **

  public doClick(event: any): void {
    console.log('doClick()');
  }

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: ButtonExterior | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-text', ButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-t', ButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-contained', ButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-c', ButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-outlined', ButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', ButtonExteriorUtil.isOutlined(exterior) ? '' : null);
    this.innRippleColor = null;
    if (ButtonExteriorUtil.isText(exterior) || ButtonExteriorUtil.isOutlined(exterior)) {
      this.innRippleColor = 'rgba(25, 118, 210, 0.3)';
    }
  }

  private createFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.convert((frameSizeInp || '').toString() || FrameSize.small) as FrameSize;
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }

  private settingFrameSize(elem: ElementRef<HTMLElement> | undefined, frameSizeValue: number): void {
    HtmlElemUtil.setProperty(elem, '--size', frameSizeValue > 0 ? frameSizeValue + 'px' : null);
  }

  private settingIsDisabled(elem: ElementRef<HTMLElement> | undefined, isDisabled: boolean): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'disabled', isDisabled ? '' : null);
  }

  private setPropertyLabelPaddingVer(exterior: ButtonExterior | null, frameSizeValue: number, lineHeight: number): void {
    if (exterior != null && frameSizeValue > 0 && lineHeight > 0) {
      const borderRadius = (frameSizeValue / 10).toFixed(2) + 'px';
      HtmlElemUtil.setProperty(this.hostRef, '--br-rd', borderRadius);
      HtmlElemUtil.setProperty(this.hostRef, '--lbl-pd-ver', this.createLabelPaddingVer(exterior, frameSizeValue, lineHeight));
    }
  }

  private createLabelPaddingVer(exterior: ButtonExterior | null, frameSize: number, lineHeight: number): string | null {
    let result: number | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      result = (frameSize - lineHeight) / 2;
      if (exterior === ButtonExterior.outlined) {
        result--;
      }
    }
    return result != null ? String(result) + 'px' : null;
  }

  private settingLabelPaddingVer(elem: ElementRef<HTMLElement> | undefined, labelPadding: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-pd-ver', labelPadding);
  }
}

import {
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
export class GrnButtonComponent implements OnChanges, OnInit, AfterViewInit {
  @Input()
  public config: GrnButtonConfig | null = null;
  @Input()
  public exterior: string | null = null; // ButtonExteriorType
  @Input()
  public frameSize: string | null = null; // FrameSizeType
  @Input()
  public isDisabled = false;

  @ViewChild('buttonElement')
  public buttonElementRef: ElementRef<HTMLElement> | undefined;

  public currConfig: GrnButtonConfig = {};
  public innExterior: ButtonExterior | null = null;
  public exterior2: ButtonExterior | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;

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
      this.innExterior = this.createExterior(this.exterior2 || this.currConfig.exterior || null);
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

    /*if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      this.labelPadding = this.updateLabelPadding(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setPropertyLabelPaddingHor(this.labelPadding);
      if (!(isConfigFirstChange || changes.exterior?.firstChange || changes.frameSize?.firstChange)) {
        this.setPropertyLabelPaddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight);
        this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
      }
    }*/
  }

  ngOnInit(): void {
    let isLabelPadding = false;
    if (this.innExterior == null) {
      this.exterior2 = ButtonExteriorUtil.convert(this.exterior);
      this.innExterior = this.createExterior(this.currConfig.exterior || null);
      this.settingExterior(this.buttonElementRef, this.innExterior);
      isLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      this.settingFrameSize(this.buttonElementRef, this.innFrameSizeValue);
      isLabelPadding = true;
    }
    // if (isLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
    //   this.labelPadding = this.updateLabelPadding(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
    //   this.setPropertyLabelPaddingHor(this.labelPadding);
    // }
  }

  ngAfterViewInit(): void {
    if (this.innExterior) {
      this.settingExterior(this.buttonElementRef, this.innExterior);
    }
    if (this.innFrameSizeValue > 0) {
      this.settingFrameSize(this.buttonElementRef, this.innFrameSizeValue);
    }
  }

  // ** Public API **

  public doClick(event: any): void {
    console.log('doClick()');
  }

  // ** Private API **

  private createExterior(exterior: ButtonExterior | null): ButtonExterior {
    return ButtonExteriorUtil.create(exterior);
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
}

import {
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
  ViewEncapsulation,
} from '@angular/core';

import { ButtonShape, ButtonShapeUtil } from '../interfaces/button-shape.interface';
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
export class GrnButtonComponent implements OnChanges, OnInit {
  @Input()
  public config: GrnButtonConfig | null = null;
  @Input()
  public btnShape: string | null = null; // ButtonShapeType
  @Input()
  public frameSize: string | null = null; // FrameSizeType
  @Input()
  public isDisabled = false;

  public currConfig: GrnButtonConfig = {};
  public innBtnShape: ButtonShape | null = null;
  public btnShape2: ButtonShape | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;

  constructor(
    @Optional() @Inject(GRN_BUTTON_CONFIG) private rootConfig: GrnButtonConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-button', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isLabelPadding = false;
    let isConfigFirstChange = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
      isConfigFirstChange = changes.config.firstChange;
    }
    if (changes.btnShape || (changes.config && !this.btnShape)) {
      this.btnShape2 = ButtonShapeUtil.convert(this.btnShape);
      this.innBtnShape = this.updateBtnShape(this.btnShape2 || this.currConfig.btnShape || null);
      isLabelPadding = true;
    }

    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      const configFrameSizeValue = this.currConfig.frameSizeValue;
      this.innFrameSizeValue = this.updateFrameSize(this.frameSize2 || this.currConfig.frameSize || null, configFrameSizeValue);
      isLabelPadding = true;
    }

    /*if (isLabelPadding && this.innBtnShape && this.innFrameSizeValue > 0) {
      this.labelPadding = this.updateLabelPadding(this.innBtnShape, this.innFrameSizeValue, this.currConfig.labelPd);
      this.setPropertyLabelPaddingHor(this.labelPadding);
      if (!(isConfigFirstChange || changes.exterior?.firstChange || changes.frameSize?.firstChange)) {
        this.setPropertyLabelPaddingVer(this.innBtnShape, this.innFrameSizeValue, this.lineHeight);
        this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
      }
    }*/
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private updateBtnShape(btnShape: ButtonShape | null): ButtonShape {
    const result: ButtonShape = ButtonShapeUtil.create(btnShape);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gb-text', ButtonShapeUtil.isText(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shp-t', ButtonShapeUtil.isText(result) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gb-contained', ButtonShapeUtil.isContained(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shp-c', ButtonShapeUtil.isContained(result) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gb-outlined', ButtonShapeUtil.isOutlined(result));
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shp-o', ButtonShapeUtil.isOutlined(result) ? '' : null);
    return result;
  }

  private updateFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.create(frameSizeInp);
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    HtmlElemUtil.setProperty(this.hostRef, '--size', frameSizeValue > 0 ? frameSizeValue + 'px' : null);
    return frameSizeValue;
  }
}

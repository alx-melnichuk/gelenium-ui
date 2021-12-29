import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
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
import { OrnamAlign } from '../interfaces/ornam-align.interface';

import { GrnFrameInputConfig } from './grn-frame-input.interface';

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
  public inputId = '';
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
  public helperText: string | null = null;
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
  public get isUnderlineExterior(): boolean {
    return ExteriorUtil.isUnderline(this.exterior);
  }
  public get isStandardExterior(): boolean {
    return ExteriorUtil.isStandard(this.exterior);
  }

  public frameSizeVal = 0;
  public lineHeight = 0;
  public labelPadding = 0;
  public ornamentLfWidth = 0;
  public ornamentRgWidth = 0;
  public actualConfig: GrnFrameInputConfig | null = null;

  constructor(
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.actualConfig = this.initConfig(this.rootConfig || {});
    this.setClass(this.hostRef, 'grn-frame-input', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      const config = { ...(this.rootConfig || {}), ...(this.config || {}) };
      this.actualConfig = this.initConfig(config);
    }
    if (changes.exterior) {
      this.exterior = ExteriorUtil.create(this.exterior, this.actualConfig?.exterior || null);
      this.setAttrAndClass(this.hostRef, 'gfi-outlined', 'ext-o', ExteriorUtil.isOutlined(this.exterior) ? '' : null);
      this.setAttrAndClass(this.hostRef, 'gfi-underline', 'ext-u', ExteriorUtil.isUnderline(this.exterior) ? '' : null);
      this.setAttrAndClass(this.hostRef, 'gfi-standard', 'ext-s', ExteriorUtil.isStandard(this.exterior) ? '' : null);
      const isBorder = ExteriorUtil.isStandard(this.exterior) || ExteriorUtil.isUnderline(this.exterior);
      this.setAttrAndClass(this.hostRef, 'gfi-border', 'frm-br', isBorder ? '' : null);
    }
    if (changes.frameSize) {
      this.frameSize = FrameSizeUtil.create(this.frameSize, this.actualConfig?.frameSize || null);
      this.frameSizeVal = FrameSizeUtil.getValue(this.frameSize) || 0;
      this.setProperty(this.hostRef, '--size', this.frameSizeVal > 0 ? this.frameSizeVal + 'px' : null);
    }
    if (changes.exterior || changes.frameSize) {
      this.setProperty(this.hostRef, '--br-rd', this.getBorderRadius(this.exterior, this.frameSizeVal));
      this.labelPadding = this.getLabelPadding(this.frameSizeVal, this.exterior, this.actualConfig) || 0;
      this.setPropertyLabelPaddingHor(this.labelPadding);
      this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeVal, this.lineHeight);
      this.setPropertyLabel2Padding(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth);
    }
    if (changes.isLabelShrink) {
      this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.actualConfig?.isLabelShrink);
      this.setAttrAndClass(this.hostRef, 'gfi-shrink', 'shr', this.isLabelShrink ? '' : null);
    }
    if (changes.hiddenLabel) {
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.actualConfig?.hiddenLabel);
    }
    if (changes.isDisabled) {
      this.setAttrAndClass(this.hostRef, 'gfi-disabled', 'dis', this.isDisabled ? '' : null);
    }
    if (changes.isFocused) {
      this.setAttrAndClass(this.hostRef, 'gfi-focused', 'foc', this.isFocused ? '' : null);
    }
    if (changes.isFilled) {
      this.setAttrAndClass(this.hostRef, 'gfi-filled', 'fil', this.isFilled ? '' : null);
    }
    if (changes.isError) {
      this.setAttrAndClass(this.hostRef, 'gfi-error', 'err', this.isError ? '' : null);
    }
    // public helperText: string | null = null;
    if (changes.label || changes.isRequired) {
      this.setAttrAndClass(this.hostRef, 'gfi-lgn-indent', 'ind', !!this.label || this.isRequired ? '' : null);
    }
  }

  ngAfterContentInit(): void {
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    this.setPropertyLabelPaddingVer(this.exterior, this.frameSizeVal, this.lineHeight);

    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || 0;
    this.setProperty(this.hostRef, '--orn-lf', this.ornamentLfWidth > 0 ? this.ornamentLfWidth + 'px' : null);

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

  private setAttribute(element: ElementRef | undefined, attributeName: string, attributeValue: string | null): void {
    if (element && element.nativeElement && attributeName) {
      if (attributeValue != null) {
        this.renderer.setAttribute(element.nativeElement, attributeName, attributeValue);
      } else {
        this.renderer.removeAttribute(element.nativeElement, attributeName);
      }
    }
  }

  private setProperty(element: ElementRef | undefined, propertyName: string, propertyValue: string | null): void {
    if (element && element.nativeElement && propertyName) {
      (element.nativeElement as HTMLElement).style.setProperty(propertyName, propertyValue);
    }
  }

  private setClass(element: ElementRef | undefined, className: string, isAdd: boolean): void {
    if (element && element.nativeElement && className) {
      if (isAdd) {
        this.renderer.addClass(element.nativeElement, className);
      } else {
        this.renderer.removeClass(element.nativeElement, className);
      }
    }
  }

  private setAttrAndClass(element: ElementRef | undefined, className: string, attrName: string, attrValue: string | null): void {
    if (element && element.nativeElement && attrName && className) {
      if (attrValue != null) {
        this.renderer.setAttribute(element.nativeElement, attrName, attrValue);
        this.renderer.addClass(element.nativeElement, className);
      } else {
        this.renderer.removeAttribute(element.nativeElement, attrName);
        this.renderer.removeClass(element.nativeElement, className);
      }
    }
  }

  private setPropertyLabelPaddingVer(exterior: Exterior | null, frameSize: number, lineHeight: number): void {
    this.setProperty(this.hostRef, '--lbl-pd-tp', this.getLabelPaddingVer(true, exterior, frameSize, lineHeight));
    this.setProperty(this.hostRef, '--lbl-pd-bt', this.getLabelPaddingVer(false, exterior, frameSize, lineHeight));
    this.setProperty(this.hostRef, '--lbl-trn-y', this.getLabelTranslateY(exterior, frameSize, lineHeight));
    this.setProperty(this.hostRef, '--lbl2-trn-y', this.getLabel2TranslateY(exterior, frameSize, lineHeight));
  }

  private setPropertyLabelPaddingHor(labelPadding: number): void {
    const labelPaddingPx = labelPadding != null ? labelPadding + 'px' : labelPadding;
    this.setProperty(this.hostRef, '--lbl-pd-lf', labelPaddingPx);
    this.setProperty(this.hostRef, '--lbl-wd', this.getLabelMaxWidth(labelPadding));
  }

  private setPropertyLabel2Padding(labelPadding: number, ornamentLfWidth: number, ornamentRgWidth: number): void {
    this.setProperty(this.hostRef, '--lbl2-wd', this.getLabel2MaxWidth(labelPadding, ornamentLfWidth, ornamentRgWidth));
  }

  // Determines the y transform value at the shrink position (top).
  private getLabelTranslateY(exterior: Exterior | null, frameSize: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      result = '-1.5px';
      if (exterior === Exterior.outlined) {
        result = ((-0.75 * lineHeight) / 2).toFixed(2) + 'px'; // # -8.28px
      } else if (exterior === Exterior.underline) {
        result = (((frameSize - lineHeight) * 0.757524 - lineHeight * 0.5) * 0.45).toFixed(2) + 'px'; // # 6,0742314
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  private getLabel2TranslateY(exterior: Exterior | null, frameSize: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      result = ((frameSize - lineHeight) * (Exterior.standard === exterior ? 0.75 : 0.5)).toFixed(2) + 'px';
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

  private getLabelPadding(frameSizeVal: number, exterior: Exterior | null, config: GrnFrameInputConfig | null): number | null {
    let result: number | null = null;
    if (frameSizeVal > 0 && !!exterior) {
      switch (exterior) {
        case Exterior.outlined:
          result = config?.oLabelPd || Math.round(100 * 0.25 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.25*var(--size)); // TODO #2
          break;
        case Exterior.underline:
          result = config?.uLabelPd || Math.round(100 * 0.21428 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.21428*var(--size));// TODO #2
          break;
        case Exterior.standard:
          result = config?.sLabelPd || 0; // --lbl-pd: 0px;// TODO #2
          break;
      }
    }
    return result;
  }

  private getLabelPaddingVer(isTop: boolean, exterior: Exterior | null, frameSize: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      switch (exterior) {
        case Exterior.outlined:
          result = String(((frameSize - lineHeight) / 2).toFixed(2)) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))/2)
          break;
        case Exterior.underline:
          result = String(((frameSize - lineHeight) * (isTop ? 0.75 : 0.25)).toFixed(2)) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
        case Exterior.standard:
          result = String(((frameSize - lineHeight) * (isTop ? 0.75 : 0.25)).toFixed(2)) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
      }
    }
    return result;
  }

  private getBorderRadius(exterior: Exterior | null, frameSize: number): string | null {
    let result: string | null = null;
    if (exterior && frameSize > 0) {
      if (exterior === Exterior.outlined) {
        result = (frameSize / 10).toFixed(2) + 'px';
      } else if (exterior === Exterior.underline) {
        const value = (frameSize / 10).toFixed(2) + 'px';
        result = value + ' ' + value + ' 0 0';
      }
    }
    return result;
  }
}

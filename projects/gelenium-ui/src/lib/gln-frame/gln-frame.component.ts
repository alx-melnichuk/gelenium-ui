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

import { GlnFrameConfig } from '../_interfaces/gln-frame-config.interface';
import { GlnInputExterior, GlnInputExteriorUtil } from '../_interfaces/gln-input-exterior.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { HtmlSettingUtil } from '../_utils/html-setting.util';

export const GLN_FRAME_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_FRAME_CONFIG');

@Component({
  selector: 'gln-frame',
  exportAs: 'glnFrame',
  templateUrl: './gln-frame.component.html',
  styleUrls: ['./gln-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnFrameComponent implements OnChanges, OnInit {
  @Input()
  public label = '';
  @Input()
  public exterior: string | null = null; // InputExteriorType
  @Input()
  public config: GlnFrameConfig | null = null;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public hiddenLabel: boolean | null = null;
  @Input()
  public isDisabled: boolean | null = null;
  @Input()
  public isFilled = false;
  @Input()
  public isError: boolean | null = null;
  @Input()
  public isRequired: boolean | null = null;
  @Input()
  public wdFull: string | null = null;

  public get isOutlinedExterior(): boolean {
    return GlnInputExterior.outlined === this.exterior;
  }
  public get isUnderlineExterior(): boolean {
    return GlnInputExterior.underline === this.exterior;
  }
  public get isStandardExterior(): boolean {
    return GlnInputExterior.standard === this.exterior;
  }

  public currConfig: GlnFrameConfig | null = null;
  public innIsLabelShrink: boolean | null = null;
  public innHiddenLabel: boolean | null = null;
  public innExterior: GlnInputExterior | null = null;

  constructor(
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.exterior) {
      this.innExterior = GlnInputExteriorUtil.convert(this.exterior);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (changes.isLabelShrink || (changes.config && this.isLabelShrink == null)) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (changes.hiddenLabel || (changes.config && this.hiddenLabel == null)) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig?.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
    if (changes.isDisabled) {
      HtmlSettingUtil.disabled(this.renderer, this.hostRef, this.isDisabled);
    }
    if (changes.isFilled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnf-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }
    if (changes.isError) {
      HtmlSettingUtil.error(this.renderer, this.hostRef, this.isError);
    }
    if (changes.label || changes.isRequired) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnf-lgn-indent', isIndent || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  ngOnInit(): void {
    if (this.innIsLabelShrink == null) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (this.innHiddenLabel == null) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig?.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement>, exterior: GlnInputExterior | null): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'dcr-br', '');

    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-outlined', GlnInputExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', GlnInputExteriorUtil.isOutlined(exterior) ? '' : null);

    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-underline', GlnInputExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-u', GlnInputExteriorUtil.isUnderline(exterior) ? '' : null);

    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-standard', GlnInputExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-s', GlnInputExteriorUtil.isStandard(exterior) ? '' : null);

    const isBorder = GlnInputExteriorUtil.isStandard(exterior) || GlnInputExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-border', isBorder);
  }

  private settingLabelShrink(elem: ElementRef<HTMLElement>, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(this.renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingHiddenLabel(elem: ElementRef<HTMLElement>, hiddenLabel: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'glnf-hidden-label', hiddenLabel);
    HtmlElemUtil.setAttr(this.renderer, elem, 'hd-lb', hiddenLabel ? '' : null);
  }
}

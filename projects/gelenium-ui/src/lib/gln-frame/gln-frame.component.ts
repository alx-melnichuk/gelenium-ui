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

import { GlnFrameExterior, GlnFrameExteriorUtil } from './gln-frame-exterior.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnFrameConfig } from './gln-frame-config.interface';

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
  public config: GlnFrameConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnFrameExteriorType
  @Input()
  public hoverColor: boolean | null = null;
  @Input()
  public isDisabled: boolean | null = null;
  @Input()
  public isError: boolean | null = null;
  @Input()
  public isFilled = false;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public isRequired: boolean | null = null;
  @Input()
  public label = '';
  @Input()
  public noLabel: boolean | null = null;

  public get isOutlinedExterior(): boolean {
    return GlnFrameExterior.outlined === this.exterior;
  }
  public get isUnderlineExterior(): boolean {
    return GlnFrameExterior.underline === this.exterior;
  }
  public get isStandardExterior(): boolean {
    return GlnFrameExterior.standard === this.exterior;
  }

  public currConfig: GlnFrameConfig | null = null;
  public hoverFocus: boolean | null = null;
  public labelShrink: boolean | null = null;
  public hideLabel: boolean | null = null;
  public frameExterior: GlnFrameExterior | null = null;

  constructor(
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.exterior) {
      this.frameExterior = GlnFrameExteriorUtil.convert(this.exterior);
      this.settingExterior(this.renderer, this.hostRef, this.frameExterior);
    }
    if (changes.hoverColor || (changes.config && this.hoverColor == null)) {
      this.hoverFocus = this.hoverColor != null ? this.hoverColor : !!this.currConfig?.hoverColor;
      this.settingHoverFocusColor(this.renderer, this.hostRef, this.hoverFocus);
    }
    if (changes.isLabelShrink || (changes.config && this.isLabelShrink == null)) {
      this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
    }
    if (changes.noLabel || (changes.config && this.noLabel == null)) {
      this.hideLabel = this.noLabel != null ? this.noLabel : !!this.currConfig?.noLabel;
      this.settingNoLabel(this.renderer, this.hostRef, this.hideLabel);
    }
    if (changes.isDisabled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabled || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes.isFilled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnf-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }
    if (changes.isError) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', this.isError || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes.label || changes.isRequired) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnf-lgn-indent', isIndent || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    if (this.hoverFocus == null) {
      this.hoverFocus = this.hoverColor != null ? this.hoverColor : !!this.currConfig?.hoverColor;
      this.settingHoverFocusColor(this.renderer, this.hostRef, this.hoverFocus);
    }
    if (this.labelShrink == null) {
      this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
    }
    if (this.hideLabel == null) {
      this.hideLabel = this.noLabel != null ? this.noLabel : !!this.currConfig?.noLabel;
      this.settingNoLabel(this.renderer, this.hostRef, this.hideLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private settingExterior(renderer: Renderer2, elem: ElementRef<HTMLElement>, exterior: GlnFrameExterior | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'dcr-br', '');

    HtmlElemUtil.setClass(renderer, elem, 'glnf-outlined', GlnFrameExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', GlnFrameExteriorUtil.isOutlined(exterior) ? '' : null);

    HtmlElemUtil.setClass(renderer, elem, 'glnf-underline', GlnFrameExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', GlnFrameExteriorUtil.isUnderline(exterior) ? '' : null);

    HtmlElemUtil.setClass(renderer, elem, 'glnf-standard', GlnFrameExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', GlnFrameExteriorUtil.isStandard(exterior) ? '' : null);

    const isBorder = GlnFrameExteriorUtil.isStandard(exterior) || GlnFrameExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(renderer, elem, 'glnf-bottom-frame', isBorder);
  }

  private settingHoverFocusColor(renderer: Renderer2, elem: ElementRef<HTMLElement>, hoverColor: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnf-hover-color', hoverColor);
    HtmlElemUtil.setAttr(renderer, elem, 'hfc', hoverColor ? '' : null);
  }

  private settingLabelShrink(renderer: Renderer2, elem: ElementRef<HTMLElement>, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnf-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingNoLabel(renderer: Renderer2, elem: ElementRef<HTMLElement>, noLabel: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnf-no-label', noLabel);
    HtmlElemUtil.setAttr(renderer, elem, 'no-lb', noLabel ? '' : null);
  }
}

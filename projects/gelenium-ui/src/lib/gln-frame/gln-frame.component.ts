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
  public config: GlnFrameConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public isDisabled: boolean | null | undefined;
  @Input()
  public isError: boolean | null | undefined;
  @Input()
  public isFilled = false;
  @Input()
  public isHoverColor: boolean | null | undefined;
  @Input()
  public isLabelShrink: boolean | null | undefined;
  @Input()
  public isNoAnimation: boolean | null | undefined;
  @Input()
  public isNoLabel: boolean | null | undefined;
  @Input()
  public isRequired: boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

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
  public frameExterior: GlnFrameExterior | null = null;
  public hoverColor: boolean | null = null;
  public labelShrink: boolean | null = null;
  public noAnimation: boolean | null = null;
  public noLabel: boolean | null = null;

  constructor(
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['exterior']) {
      this.frameExterior = GlnFrameExteriorUtil.convert(this.exterior || null);
      this.settingExterior(this.renderer, this.hostRef, this.frameExterior);
    }
    if (changes['isHoverColor'] || (changes['config'] && this.isHoverColor == null)) {
      this.hoverColor = this.isHoverColor != null ? this.isHoverColor : !!this.currConfig?.isHoverColor;
      this.settingHoverColor(this.renderer, this.hostRef, this.hoverColor);
    }
    if (changes['isLabelShrink'] || (changes['config'] && this.isLabelShrink == null)) {
      this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null)) {
      this.noAnimation = this.isNoAnimation != null ? this.isNoAnimation : !!this.currConfig?.isNoAnimation;
      this.settingNoAnimation(this.renderer, this.hostRef, this.noAnimation);
    }
    if (changes['isNoLabel'] || (changes['config'] && this.isNoLabel == null)) {
      this.noLabel = this.isNoLabel != null ? this.isNoLabel : !!this.currConfig?.isNoLabel;
      this.settingNoLabel(this.renderer, this.hostRef, this.noLabel);
    }
    if (changes['isDisabled']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!this.isDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes['isFilled']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }
    if (changes['isError']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', !!this.isError);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes['label'] || changes['isRequired']) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    if (this.hoverColor == null) {
      this.hoverColor = this.isHoverColor != null ? this.isHoverColor : !!this.currConfig?.isHoverColor;
      this.settingHoverColor(this.renderer, this.hostRef, this.hoverColor);
    }
    if (this.labelShrink == null) {
      this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig?.isLabelShrink;
      this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
    }
    if (this.noAnimation == null) {
      this.noAnimation = this.isNoAnimation != null ? this.isNoAnimation : !!this.currConfig?.isNoAnimation;
      this.settingNoAnimation(this.renderer, this.hostRef, this.noAnimation);
    }
    if (this.noLabel == null) {
      this.noLabel = this.isNoLabel != null ? this.isNoLabel : !!this.currConfig?.isNoLabel;
      this.settingNoLabel(this.renderer, this.hostRef, this.noLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private settingExterior(renderer: Renderer2, elem: ElementRef<HTMLElement>, exterior: GlnFrameExterior | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', GlnFrameExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', GlnFrameExteriorUtil.isOutlined(exterior) ? '' : null);

    HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', GlnFrameExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', GlnFrameExteriorUtil.isUnderline(exterior) ? '' : null);

    HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', GlnFrameExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', GlnFrameExteriorUtil.isStandard(exterior) ? '' : null);

    const isBorder = GlnFrameExteriorUtil.isStandard(exterior) || GlnFrameExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isBorder);
  }

  private settingHoverColor(renderer: Renderer2, elem: ElementRef<HTMLElement>, isHoverColor: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-hover-color', isHoverColor);
    HtmlElemUtil.setAttr(renderer, elem, 'hfc', isHoverColor ? '' : null);
  }

  private settingLabelShrink(renderer: Renderer2, elem: ElementRef<HTMLElement>, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingNoAnimation(renderer: Renderer2, elem: ElementRef<HTMLElement>, isNoAnimation: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', isNoAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noAnm', isNoAnimation ? '' : null);
  }

  private settingNoLabel(renderer: Renderer2, elem: ElementRef<HTMLElement>, noLabel: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-no-label', noLabel);
    HtmlElemUtil.setAttr(renderer, elem, 'no-lb', noLabel ? '' : null);
  }
}

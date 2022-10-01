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

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnFrameExterior, GlnFrameExteriorUtil } from './gln-frame-exterior.interface';
import { GlnFrameConfig } from './gln-frame-config.interface';

export const ATR_FR_HIDE_ANIMATION_INIT = 'hdAnmInit';

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
  public isAttrHideAnimation: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isFilled = false;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoLabel: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

  public get isOutlinedExterior(): boolean {
    return GlnFrameExterior.outlined === this.frameExterior;
  }
  public get isUnderlineExterior(): boolean {
    return GlnFrameExterior.underline === this.frameExterior;
  }
  public get isStandardExterior(): boolean {
    return GlnFrameExterior.standard === this.frameExterior;
  }

  public attrHideAnimation: boolean | null = null; // Binding attribute "isAttrHideAnimation".
  public currConfig: GlnFrameConfig;
  public frameExterior: GlnFrameExterior | null = null;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['exterior']) {
      // You cannot take a value only from the config, since values from the directives
      // glnFrameExteriorInput, glnFrameSize are used for rendering.
      // --glnfre-pd-shr: 33.25px; // glnFrameExteriorInput
      // --glnfre-trn-y: -8.62px;  // glnFrameExteriorInput
      // --glnfre-trn2-y: 13.5px;  // glnFrameExteriorInput
      // --glnfrs-br-rd: 5px;      // glnFrameSize
      // --glnfrs-pd-lf: 12.5px;   // glnFrameSize
      // --glnfrs-pd-rg: 12.5px;   // glnFrameSize
      // --glnfrs-pd-tp: 13.5px;   // glnFrameSize
      // --glnfrs-pd-bt: 13.5px;   // glnFrameSize
      this.frameExterior = GlnFrameExteriorUtil.convert(this.exterior || null);
      this.settingExterior(this.renderer, this.hostRef, this.frameExterior);
    }

    if (changes['isAttrHideAnimation']) {
      this.attrHideAnimation = !!BooleanUtil.init(this.isAttrHideAnimation);
      if (this.attrHideAnimation) {
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_FR_HIDE_ANIMATION_INIT, '');
      } else {
        Promise.resolve().then(() => {
          HtmlElemUtil.setAttr(this.renderer, this.hostRef, ATR_FR_HIDE_ANIMATION_INIT, null);
        });
      }
    }
    if (changes['isDisabled']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!this.isDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes['isError']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', !!this.isError);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes['isFilled']) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }

    if (changes['isLabelShrink'] || (changes['config'] && this.labelShrink == null && this.currConfig.isLabelShrink != null)) {
      this.settingLabelShrink(BooleanUtil.init(this.isLabelShrink) ?? (this.currConfig.isLabelShrink || null));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.noAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.settingNoAnimation(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
    }
    if (changes['isNoLabel'] || (changes['config'] && this.noLabel == null && this.currConfig.isNoLabel != null)) {
      this.settingNoLabel(BooleanUtil.init(this.isNoLabel) ?? (this.currConfig.isNoLabel || null));
    }

    if (changes['label'] || changes['isRequired']) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    if (this.labelShrink == null && this.currConfig.isLabelShrink != null) {
      this.settingLabelShrink(this.currConfig.isLabelShrink);
    }
    if (this.noAnimation == null && this.currConfig.isNoAnimation != null) {
      this.settingNoAnimation(this.currConfig.isNoAnimation);
    }
    if (this.noLabel == null && this.currConfig.isNoLabel != null) {
      this.settingNoLabel(this.currConfig.isNoLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private settingExterior(renderer: Renderer2, elem: ElementRef<HTMLElement>, exterior: GlnFrameExterior | null): void {
    const isOutlined = GlnFrameExteriorUtil.isOutlined(exterior);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
    const isUnderline = GlnFrameExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', isUnderline);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', isUnderline ? '' : null);
    const isStandard = GlnFrameExteriorUtil.isStandard(exterior);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', isStandard);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', isStandard ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isStandard || isUnderline);
  }

  private settingLabelShrink(labelShrink: boolean | null): void {
    this.labelShrink = labelShrink;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-shrink', !!labelShrink);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'shr', labelShrink ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null): void {
    this.noAnimation = noAnimation;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', noAnimation ? '' : null);
  }
  private settingNoLabel(noLabel: boolean | null): void {
    this.noLabel = noLabel;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-no-label', !!noLabel);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'nolab', noLabel ? '' : null);
  }
}

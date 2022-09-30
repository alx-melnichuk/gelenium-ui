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

import { GlnBaseProperties, GlnProperty } from '../_interface/gln-base-properties';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnFrameExterior, GlnFrameExteriorUtil } from './gln-frame-exterior.interface';
import { GlnFrameConfig } from './gln-frame-config.interface';

export const CLS_FR_LABEL_SHRINK = 'glnfr-shrink';
export const ATR_FR_LABEL_SHRINK = 'shr';
export const CLS_FR_NO_LABEL = 'glnfr-no-label';
export const ATR_FR_NO_LABEL = 'nolab';

export const GLN_FRAME_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_FRAME_CONFIG');

@Component({
  selector: 'gln-frame',
  exportAs: 'glnFrame',
  templateUrl: './gln-frame.component.html',
  styleUrls: ['./gln-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnFrameComponent extends GlnBaseProperties implements OnChanges, OnInit {
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

  public currConfig: GlnFrameConfig | null = null;
  public frameExterior: GlnFrameExterior | null = null;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".

  constructor(
    hostRef: ElementRef<HTMLElement>, // public hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2, // protected renderer: Renderer2
    @Optional() @Inject(GLN_FRAME_CONFIG) private rootConfig: GlnFrameConfig | null
  ) {
    super(hostRef, renderer);
    this.currConfig = this.rootConfig;
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
    // Checking and handle the 'isLabelShrink' parameter.
    super.onChangesProperty(changes, 'isLabelShrink', this.currConfig as GlnProperty, CLS_FR_LABEL_SHRINK, ATR_FR_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    super.onChangesProperty(changes, 'isNoAnimation', this.currConfig as GlnProperty);
    // Checking and handle the 'isNoLabel' parameter.
    super.onChangesProperty(changes, 'isNoLabel', this.currConfig as GlnProperty, CLS_FR_NO_LABEL, ATR_FR_NO_LABEL);

    if (changes['label'] || changes['isRequired']) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    // Checking and handle the 'isLabelShrink' parameter.
    super.onInitProperty('isLabelShrink', this.currConfig as GlnProperty, CLS_FR_LABEL_SHRINK, ATR_FR_LABEL_SHRINK);
    // Checking and handle the 'isNoAnimation' parameter.
    super.onInitProperty('isNoAnimation', this.currConfig as GlnProperty);
    // Checking and handle the 'isNoLabel' parameter.
    super.onInitProperty('isNoLabel', this.currConfig as GlnProperty, CLS_FR_NO_LABEL, ATR_FR_NO_LABEL);
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
}

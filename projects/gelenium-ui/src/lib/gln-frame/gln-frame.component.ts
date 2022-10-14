import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnFrameExterior, GlnFrameExteriorUtil } from './gln-frame-exterior.interface';
import { GlnFrameConfig } from './gln-frame-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from './gln-frame-size.interface';
import { GlnFrameCssParams, GlnFrameUtil } from './gln-frame.util';

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
  public cssElementRef: ElementRef<HTMLElement> = this.hostRef;
  @Input()
  public exterior: string | null | undefined; // GlnFrameExteriorType
  @Input()
  public frameSize: string | null | undefined; // GlnFrameSizeType
  @Input()
  public isAttrHideAnimation: string | boolean | null | undefined;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isFilled: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

  @Output()
  readonly changeCssParams: EventEmitter<{ css: GlnFrameCssParams }> = new EventEmitter();

  public get isOutlinedExterior(): boolean {
    return GlnFrameExterior.outlined === this.exteriorVal;
  }
  public get isUnderlineExterior(): boolean {
    return GlnFrameExterior.underline === this.exteriorVal;
  }
  public get isStandardExterior(): boolean {
    return GlnFrameExterior.standard === this.exteriorVal;
  }
  public get lineHeight(): number {
    return this.lineHeightInn;
  }

  public attrHideAnimation: boolean | null = null; // Binding attribute "isAttrHideAnimation".
  public currConfig: GlnFrameConfig;
  public cssBorderRadius: string | null = null;
  public cssPaddingBottom: string | null = null;
  public cssPaddingLeft: string | null = null;
  public cssPaddingRight: string | null = null;
  public cssPaddingShrink: string | null = null;
  public cssPaddingTop: string | null = null;
  public cssTranslateY: string | null = null;
  public cssTranslateY2: string | null = null;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public exteriorVal: GlnFrameExterior | null = null; // Binding attribute "exterior".
  public error: boolean | null = null; // Binding attribute "isError".
  public filled: boolean | null = null; // Binding attribute "isFilled".
  public frameSizeVal: GlnFrameSize | null = null; // Binding attribute "frameSize".
  public frameSizeValue: number = 0;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public required: boolean | null = null; // Binding attribute "isRequired".

  private lineHeightInn: number = 0;

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

    let isUpdateCssParams = false;
    if (changes['exterior'] || (changes['config'] && this.exterior == null && this.currConfig.exterior != null)) {
      this.exteriorVal = GlnFrameExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (changes['frameSize'] || (changes['config'] && this.frameSize == null && this.currConfig.frameSize != null)) {
      const frameSizeStr = this.frameSize || this.currConfig.frameSize || null;
      this.frameSizeValue = GlnFrameSizeUtil.getSizeValue(frameSizeStr);
      this.frameSizeVal = GlnFrameSizeUtil.create(frameSizeStr);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.cssElementRef);
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
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['isError']) {
      this.error = !!BooleanUtil.init(this.isError);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', this.error);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.error ? '' : null);
    }
    if (changes['isFilled']) {
      this.filled = !!BooleanUtil.init(this.isFilled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.filled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.filled ? '' : null);
    }

    if (changes['isLabelShrink'] || (changes['config'] && this.isLabelShrink == null && this.currConfig.isLabelShrink != null)) {
      this.labelShrink = BooleanUtil.init(this.isLabelShrink) ?? !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.labelShrink, this.renderer, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.noAnimation = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.noAnimation, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.required = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }

    if (changes['label'] || changes['isRequired']) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  public ngOnInit(): void {
    let isUpdateCssParams = false;
    if (this.exteriorVal == null) {
      this.exteriorVal = GlnFrameExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (this.frameSizeValue === 0) {
      this.frameSizeValue = GlnFrameSizeUtil.getSizeValue(this.currConfig.frameSize);
      this.frameSizeVal = GlnFrameSizeUtil.create(this.currConfig.frameSize || null);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.frameSizeValue, this.getLineHeight(), this.cssElementRef);
    }

    if (this.labelShrink == null) {
      this.labelShrink = !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.labelShrink, this.renderer, this.hostRef);
    }
    if (this.noAnimation == null) {
      this.noAnimation = !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.noAnimation, this.renderer, this.hostRef);
    }
    if (this.required == null) {
      this.required = !!this.currConfig.isRequired;
      this.settingRequired(this.required, this.renderer, this.hostRef);
    }
  }

  // ** Public API **

  // ** Private API **

  private getLineHeight(): number {
    if (this.lineHeightInn === 0) {
      this.lineHeightInn = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height').replace('px', ''));
    }
    return this.lineHeightInn;
  }

  private updateCssParams(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    const css: GlnFrameCssParams = {
      ...GlnFrameUtil.getCssHorParams(exteriorVal, frameSizeValue),
      ...GlnFrameUtil.getCssVerParams(exteriorVal, frameSizeValue, lineHeight),
    };

    HtmlElemUtil.setProperty(elem, '--glnfrs--br-rd', (this.cssBorderRadius = css.borderRadius));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-lf', (this.cssPaddingLeft = css.paddingLeft));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-rg', (this.cssPaddingRight = css.paddingRight));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-shr', (this.cssPaddingShrink = css.paddingShrink));

    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-bt', (this.cssPaddingBottom = css.paddingBottom));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-tp', (this.cssPaddingTop = css.paddingTop));
    HtmlElemUtil.setProperty(elem, '--glnfrs--trn-y', (this.cssTranslateY = css.translateY));
    HtmlElemUtil.setProperty(elem, '--glnfrs--trn2-y', (this.cssTranslateY2 = css.translateY2));

    this.changeCssParams.emit({ css });
  }

  private settingExterior(exteriorVal: GlnFrameExterior | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    const isOutlined = GlnFrameExteriorUtil.isOutlined(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
    const isUnderline = GlnFrameExteriorUtil.isUnderline(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', isUnderline);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', isUnderline ? '' : null);
    const isStandard = GlnFrameExteriorUtil.isStandard(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', isStandard);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', isStandard ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isStandard || isUnderline);
  }
  private settingLabelShrink(labelShrink: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-shrink', !!labelShrink);
    HtmlElemUtil.setAttr(renderer, elem, 'shr', labelShrink ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noani', noAnimation ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
}

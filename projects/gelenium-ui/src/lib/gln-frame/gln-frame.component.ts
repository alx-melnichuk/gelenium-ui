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

import { GlnFrameConfig } from './gln-frame-config.interface';
import { GlnFrameUtil } from './gln-frame.util';

const EXTERIOR: { [key: string]: string } = { outlined: 'outlined', underline: 'underline', standard: 'standard' };
const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

const CSS_ATTR_HIDE_ANIMATION_INIT = 'hdAnmInit';
const CSS_PROP_BORDER_RADIUS = '--glnfrs--br-rd';
const CSS_PROP_PADDING_LEFT = '--glnfrs--pd-lf';
const CSS_PROP_PADDING_RIGHT = '--glnfrs--pd-rg';
const CSS_PROP_PADDING_SHRINK = '--glnfrs--pd-shr';
const CSS_PROP_PADDING_BOTTOM = '--glnfrs--pd-bt';
const CSS_PROP_PADDING_TOP = '--glnfrs--pd-tp';
const CSS_PROP_PADDING_TRN_Y = '--glnfrs--trn-y';
const CSS_PROP_PADDING_TRN2_Y = '--glnfrs--trn2-y';

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
  public exterior: string | null | undefined; // 'outlined' | 'underline' | 'standard'
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
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  public get isOutlinedExterior(): boolean {
    return this.exteriorVal === EXTERIOR['outlined'];
  }
  public get isUnderlineExterior(): boolean {
    return this.exteriorVal === EXTERIOR['underline'];
  }
  public get isStandardExterior(): boolean {
    return this.exteriorVal === EXTERIOR['standard'];
  }
  public get lineHeight(): number {
    return this.lineHeightInn;
  }
  public get noAnimation(): boolean | null {
    // Used in GlnSelect.
    return this.isNoAnimationVal;
  }

  public currConfig: GlnFrameConfig;
  public cssBorderRadius: string | null = null;
  public cssPaddingBottom: string | null = null;
  public cssPaddingLeft: string | null = null;
  public cssPaddingRight: string | null = null;
  public cssPaddingShrink: string | null = null;
  public cssPaddingTop: string | null = null;
  public cssTranslateY: string | null = null;
  public cssTranslateY2: string | null = null;
  public exteriorVal: string | null = null; // Binding attribute "exterior".
  public isAttrHideAnimationVal: boolean | null = null; // Binding attribute "isAttrHideAnimation".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isErrorVal: boolean | null = null; // Binding attribute "isError".
  public isFilledVal: boolean | null = null; // Binding attribute "isFilled".
  public isLabelShrinkVal: boolean | null = null; // Binding attribute "isLabelShrink".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public sizeVal: number | null = null; // Binding attribute "size".

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
      this.exteriorVal = EXTERIOR[this.exterior || this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.convertSize(sizeStr, SIZE[sizeStr] || SIZE['middle']);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.cssElementRef);
    }

    if (changes['isAttrHideAnimation']) {
      this.isAttrHideAnimationVal = !!BooleanUtil.init(this.isAttrHideAnimation);
      if (this.isAttrHideAnimationVal) {
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HIDE_ANIMATION_INIT, '');
      } else {
        Promise.resolve().then(() => {
          HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HIDE_ANIMATION_INIT, null);
        });
      }
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabledVal);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabledVal ? '' : null);
    }
    if (changes['isError']) {
      this.isErrorVal = !!BooleanUtil.init(this.isError);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', this.isErrorVal);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isErrorVal ? '' : null);
    }
    if (changes['isFilled']) {
      this.isFilledVal = !!BooleanUtil.init(this.isFilled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.isFilledVal);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilledVal ? '' : null);
    }

    if (changes['isLabelShrink'] || (changes['config'] && this.isLabelShrink == null && this.currConfig.isLabelShrink != null)) {
      this.isLabelShrinkVal = BooleanUtil.init(this.isLabelShrink) ?? !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.isLabelShrinkVal, this.renderer, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = BooleanUtil.init(this.isNoAnimation) ?? !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
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
      this.exteriorVal = EXTERIOR[this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.convertSize(sizeStr, SIZE[sizeStr] || SIZE['middle']);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.cssElementRef);
    }

    if (this.isLabelShrinkVal == null) {
      this.isLabelShrinkVal = !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.isLabelShrinkVal, this.renderer, this.hostRef);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!this.currConfig.isNoAnimation;
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
  }

  // ** Public methods **

  // ** Private methods **

  private getLineHeight(): number {
    if (this.lineHeightInn === 0) {
      this.lineHeightInn = HtmlElemUtil.propertyAsNumber(this.hostRef, 'line-height');
    }
    return this.lineHeightInn;
  }

  private convertSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private updateCssParams(exteriorVal: string, size: number | null, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    let css: { [key: string]: string | undefined } = {};
    if (size != null && size > 0 && lineHeight > 0) {
      css = {
        ...css,
        ...GlnFrameUtil.getCssHorParams(exteriorVal, size),
        ...GlnFrameUtil.getCssVerParams(exteriorVal, size, lineHeight),
      };
    }

    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, (this.cssBorderRadius = css['borderRadius'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_LEFT, (this.cssPaddingLeft = css['paddingLeft'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_RIGHT, (this.cssPaddingRight = css['paddingRight'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_SHRINK, (this.cssPaddingShrink = css['paddingShrink'] || null));

    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_BOTTOM, (this.cssPaddingBottom = css['paddingBottom'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_TOP, (this.cssPaddingTop = css['paddingTop'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_TRN_Y, (this.cssTranslateY = css['translateY'] || null));
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_TRN2_Y, (this.cssTranslateY2 = css['translateY2'] || null));
  }

  private settingExterior(exteriorVal: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    const isOutlined = exteriorVal === EXTERIOR['outlined'];
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
    const isUnderline = exteriorVal === EXTERIOR['underline'];
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', isUnderline);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-u', isUnderline ? '' : null);
    const isStandard = exteriorVal === EXTERIOR['standard'];
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', isStandard);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-s', isStandard ? '' : null);
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isStandard || isUnderline);
  }
  private settingLabelShrink(labelShrink: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-shrink', !!labelShrink);
    HtmlElemUtil.setAttr(renderer, elem, 'shr', labelShrink ? '' : null);
  }
  private settingNoAnimation(noAnimation: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noani', noAnimation ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnfr-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
}

import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnButtonConfig } from './gln-button-config.interface';
import { GlnLinkDirective } from './gln-link.directive';
import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnButtonExterior, GlnButtonExteriorUtil } from './gln-button-exterior.interface';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

const CSS_PROP_BORDER_RADIUS = '--glnbtf--br-rd';
const CSS_PROP_PADDING_LEFT = '--glnbtf--pd-lf';
const CSS_PROP_PADDING_RIGHT = '--glnbtf--pd-rg';
const CSS_PROP_PADDING_TOP = '--glnbtf--pd-tp';
const CSS_PROP_PADDING_BOTTOM = '--glnbtf--pd-bt';
const CSS_PROP_SIZE = '--glnbt--size';

export const GLN_BUTTON_CONFIG = new InjectionToken<GlnButtonConfig>('GLN_BUTTON_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-button',
  exportAs: 'glnButton',
  templateUrl: './gln-button.component.html',
  styleUrls: ['./gln-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnButtonComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public id = `glnbt-${uniqueIdCounter++}`;
  @Input()
  public config: GlnButtonConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // GlnButtonExteriorType
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public ornamLfAlign: string | null | undefined; // OrnamAlignType
  @Input()
  public ornamRgAlign: string | null | undefined; // OrnamAlignType
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild('buttonElementRef', { static: false })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  @ContentChild(GlnLinkDirective, { static: true })
  public linkElement: GlnLinkDirective | null = null;

  public currConfig: GlnButtonConfig;
  public cssBorderRadius: number | null = null;
  public cssPaddingBottom: number | null = null;
  public cssPaddingLeft: number | null = null;
  public cssPaddingRight: number | null = null;
  public cssPaddingTop: number | null = null;
  public exteriorVal: GlnButtonExterior | null = null; // Binding attribute "exterior".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isFocused = false;
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public sizeVal: number | null = null; // Binding attribute "size".

  private lineHeight: number = 0;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_BUTTON_CONFIG) private rootConfig: GlnButtonConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-button', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    let isUpdateCssParams = false;
    if (changes['exterior'] || (changes['config'] && this.exterior == null && this.currConfig.exterior != null)) {
      this.exteriorVal = GlnButtonExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.hostRef);
    }

    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabledVal || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabledVal ? '' : null);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.isNoRippleVal = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (changes['ornamLfAlign'] || (changes['config'] && this.ornamLfAlign == null && this.currConfig.ornamLfAlign != null)) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamLfAlign || this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (changes['ornamRgAlign'] || (changes['config'] && this.ornamRgAlign == null && this.currConfig.ornamRgAlign != null)) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.ornamRgAlign || this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    let isUpdateCssParams = false;
    if (this.exteriorVal == null) {
      this.exteriorVal = GlnButtonExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.hostRef);
    }

    if (this.isNoRippleVal == null) {
      this.isNoRippleVal = !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (this.ornamLfAlignVal == null) {
      this.ornamLfAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamLfAlign || null);
      this.settingOrnamLfAlign(this.ornamLfAlignVal, this.renderer, this.hostRef);
    }
    if (this.ornamRgAlignVal == null) {
      this.ornamRgAlignVal = GlnFrameOrnamAlignUtil.create(this.currConfig.ornamRgAlign || null);
      this.settingOrnamRgAlign(this.ornamRgAlignVal, this.renderer, this.hostRef);
    }
  }

  public ngAfterContentInit(): void {
    if (this.linkElement?.templateRef) {
      // Add the required properties for the hyperlink element.
      HtmlElemUtil.setAttr(this.renderer, this.linkElement.templateRef, 'linkClear', '');
      HtmlElemUtil.setClass(this.renderer, this.linkElement.templateRef, 'glnbt-label', true);
    }
  }

  // ** Public methods **

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  public doClick(event: MouseEvent): void {
    if (!!event && !event.cancelBubble && !this.isDisabledVal && this.linkElement && this.touchRipple) {
      this.touchRipple.touchRipple(event);
    }
  }

  public focus(): void {
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.isDisabledVal) {
      this.isFocused = true;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.focused.emit();
    }
  }

  public doBlur(): void {
    if (!this.isDisabledVal) {
      this.isFocused = false;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.blured.emit();
    }
  }

  // ** Private methods **

  private getLineHeight(): number {
    if (this.lineHeight === 0) {
      this.lineHeight = HtmlElemUtil.propertyAsNumber(this.hostRef, 'line-height');
    }
    return this.lineHeight;
  }

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private updateCssParams(exterior: GlnButtonExterior, size: number | null, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    let borderRadius: number | null = null;
    let paddingLeft: number | null = null;
    let paddingTop: number | null = null;
    if (size != null && size > 0 && lineHeight > 0) {
      borderRadius = Math.round(0.1 * size * 100) / 100;
      const param = (size - lineHeight) / 2;
      if (exterior === GlnButtonExterior.contained) {
        paddingLeft = Math.round(0.3636 * size * 100) / 100;
        paddingTop = param;
      } else if (exterior === GlnButtonExterior.outlined) {
        paddingLeft = Math.round(0.3409 * size * 100) / 100;
        paddingTop = param - 1;
      } else if (exterior === GlnButtonExterior.text) {
        paddingLeft = Math.round(0.2045 * size * 100) / 100;
        paddingTop = param;
      }
    }

    this.cssBorderRadius = borderRadius;
    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, this.cssBorderRadius?.toString().concat('px') || null);

    this.cssPaddingLeft = paddingLeft != null ? paddingLeft - 0.5 : null;
    this.cssPaddingRight = paddingLeft != null ? paddingLeft + 0.5 : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_LEFT, this.cssPaddingLeft?.toString().concat('px') || null);
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_RIGHT, this.cssPaddingRight?.toString().concat('px') || null);

    this.cssPaddingTop = paddingTop != null ? paddingTop + 0.5 : null;
    this.cssPaddingBottom = paddingTop != null ? paddingTop - 0.5 : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_TOP, this.cssPaddingTop?.toString().concat('px') || null);
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_BOTTOM, this.cssPaddingBottom?.toString().concat('px') || null);
  }

  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
  }

  private settingExterior(exteriorVal: GlnButtonExterior | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    const isText = GlnButtonExteriorUtil.isText(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-text', isText);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-t', isText ? '' : null);
    const isContained = GlnButtonExteriorUtil.isContained(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-contained', isContained);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-c', isContained ? '' : null);
    const isOutlined = GlnButtonExteriorUtil.isOutlined(exteriorVal);
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
  }
  private settingFocus(focus: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', focus || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', focus ? '' : null);
  }
  private settingNoRipple(noRipple: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-ripple', !!noRipple);
    HtmlElemUtil.setAttr(renderer, elem, 'norip', noRipple ? '' : null);
  }
  private settingOrnamLfAlign(ornamLfAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }
}

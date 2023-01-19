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
import { NumberUtil } from '../_utils/number.util';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

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
  public size: number | string | null | undefined; // GlnFrameSizeType

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly changeCssParams: EventEmitter<void> = new EventEmitter();

  @ViewChild('buttonElementRef', { static: false })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild('wrapElementRef', { read: ElementRef<HTMLDivElement>, static: true })
  public wrapElementRef!: ElementRef<HTMLDivElement>;

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  @ContentChild(GlnLinkDirective, { static: true })
  public linkElement: GlnLinkDirective | null = null;

  public currConfig: GlnButtonConfig;
  public cssBorderRadius: string | null = null;
  public cssPaddingBottom: string | null = null;
  public cssPaddingLeft: string | null = null;
  public cssPaddingRight: string | null = null;
  public cssPaddingTop: string | null = null;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public exteriorVal: GlnButtonExterior | null = null; // Binding attribute "exterior".
  public isFocused = false;
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple".
  public ornamLfAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamLfAlign".
  public ornamRgAlignVal: GlnFrameOrnamAlign | null = null; // Binding attribute "ornamRgAlign".
  public sizeVal: number | null = null;

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
      const prmStr: string = (this.size || this.currConfig.size || '').toString();
      const prmNum3: number = Number.parseFloat(prmStr);
      this.sizeVal = !Number.isNaN(prmNum3) && prmNum3 > 0 ? prmNum3 : SIZE[prmStr] || SIZE['small'];
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.wrapElementRef);
    }

    if (changes['isDisabled']) {
      this.disabled = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null && this.currConfig.isNoRipple != null)) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
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
      const prmStr: string = (this.currConfig.size || '').toString();
      const prmNum3: number = Number.parseFloat(prmStr);
      this.sizeVal = !Number.isNaN(prmNum3) && prmNum3 > 0 ? prmNum3 : SIZE[prmStr] || SIZE['small'];
      isUpdateCssParams = true;
    }
    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.wrapElementRef);
    }

    if (this.noRipple == null) {
      this.noRipple = !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.noRipple, this.renderer, this.hostRef);
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
    if (!!event && !event.cancelBubble && !this.disabled && this.linkElement && this.touchRipple) {
      this.touchRipple.touchRipple(event);
    }
  }

  public focus(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
      this.settingFocus(this.isFocused, this.renderer, this.hostRef);
      this.focused.emit();
    }
  }

  public doBlur(): void {
    if (!this.disabled) {
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

  private updateCssParams(exterior: GlnButtonExterior, size: number | null, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    let borderRadius: number | null = null;
    let paddingLeft: number | null = null;
    let paddingTop: number | null = null;
    if (size != null && size > 0 && lineHeight > 0) {
      borderRadius = NumberUtil.roundTo100(0.1 * size);
      const param = (size - lineHeight) / 2;
      if (exterior === GlnButtonExterior.contained) {
        paddingLeft = NumberUtil.roundTo100(0.3636 * size);
        paddingTop = param;
      } else if (exterior === GlnButtonExterior.outlined) {
        paddingLeft = NumberUtil.roundTo100(0.3409 * size);
        paddingTop = param - 1;
      } else if (exterior === GlnButtonExterior.text) {
        paddingLeft = NumberUtil.roundTo100(0.2045 * size);
        paddingTop = param;
      }
    }
    HtmlElemUtil.setProperty(elem, '--glnfrs--br-rd', (this.cssBorderRadius = NumberUtil.str(borderRadius)?.concat('px') || null));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-lf', (this.cssPaddingLeft = NumberUtil.str(paddingLeft)?.concat('px') || null));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-rg', (this.cssPaddingRight = this.cssPaddingLeft));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-tp', (this.cssPaddingTop = NumberUtil.str(paddingTop)?.concat('px') || null));
    HtmlElemUtil.setProperty(elem, '--glnfrs--pd-bt', (this.cssPaddingBottom = this.cssPaddingTop));

    this.changeCssParams.emit();
  }

  private settingExterior(exteriorVal: GlnButtonExterior | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
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
  private settingOrnamLfAlign(ornamLfAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-lft', ornamLfAlign?.toString());
  }
  private settingOrnamRgAlign(ornamRgAlign: GlnFrameOrnamAlign | null, renderer: Renderer2, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(renderer, elem, 'orn-rgh', ornamRgAlign?.toString());
  }
}

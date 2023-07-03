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
import { ChangeUtil } from '../_utils/change.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnButtonConfig } from './gln-button-config.interface';
import { GlnLinkDirective } from './gln-link.directive';
import { GlnButtonUtil } from './gln-button.util';

const EXTERIOR: { [key: string]: string } = { outlined: 'outlined', contained: 'contained', text: 'text' };
const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

const CSS_PROP_BORDER_RADIUS = '--glnbtf--br-rd';
const CSS_PROP_PADDING_LEFT = '--glnbtf--pd-lf';
const CSS_PROP_PADDING_RIGHT = '--glnbtf--pd-rg';
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
  public exterior: string | null | undefined; // 'outlined', 'contained', 'text'
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoRipple: string | boolean | null | undefined;
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
  public cssPaddingLeft: number | null = null;
  public cssPaddingRight: number | null = null;
  public exteriorVal: string | null = null; // Binding attribute "exterior".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isFocused = false;
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
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
    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    let isUpdateCssParams = false;
    if (!!changes['exterior'] || ChangeUtil.check(changes['config'], 'exterior')) {
      this.exteriorVal = EXTERIOR[this.exterior || this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (!!changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabledVal || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabledVal ? '' : null);
    }
    if (!!changes['isNoRipple'] || ChangeUtil.check(changes['config'], 'isNoRipple')) {
      this.isNoRippleVal = BooleanUtil.init(this.isNoRipple) ?? !!this.currConfig.isNoRipple;
      this.settingNoRipple(this.isNoRippleVal, this.renderer, this.hostRef);
    }
    if (!!changes['size'] || ChangeUtil.check(changes['config'], 'size')) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.convertSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
      isUpdateCssParams = true;
    }

    if (isUpdateCssParams && this.exteriorVal) {
      this.updateCssParams(this.exteriorVal, this.sizeVal, this.getLineHeight(), this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    let isUpdateCssParams = false;
    if (this.exteriorVal == null) {
      this.exteriorVal = EXTERIOR[this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
      isUpdateCssParams = true;
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.convertSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
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
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble && !this.isDisabledVal && this.linkElement && this.touchRipple) {
      this.touchRipple.trigger(event);
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

  private convertSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private updateCssParams(exterior: string, size: number | null, lineHeight: number, elem: ElementRef<HTMLElement>): void {
    // Get css parameters for the button.
    const { borderRadius, paddingLeft } = GlnButtonUtil.getCssParams(exterior, size, lineHeight);

    this.cssBorderRadius = borderRadius || null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_BORDER_RADIUS, this.cssBorderRadius?.toString().concat('px') || null);

    this.cssPaddingLeft = paddingLeft || null;
    this.cssPaddingRight = paddingLeft || null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_LEFT, this.cssPaddingLeft?.toString().concat('px') || null);
    HtmlElemUtil.setProperty(elem, CSS_PROP_PADDING_RIGHT, this.cssPaddingRight?.toString().concat('px') || null);
  }

  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
  }

  private settingExterior(exteriorVal: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    const isText = exteriorVal === EXTERIOR['text'];
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-text', isText);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-t', isText ? '' : null);
    const isContained = exteriorVal === EXTERIOR['contained'];
    HtmlElemUtil.setClass(renderer, elem, 'glnbt-contained', isContained);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-c', isContained ? '' : null);
    const isOutlined = exteriorVal === EXTERIOR['outlined'];
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
}

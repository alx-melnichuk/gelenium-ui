import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { GrnTouchRippleComponent } from '../grn-touch-ripple/grn-touch-ripple.component';

import { ButtonExterior, ButtonExteriorUtil } from '../_interfaces/button-exterior.interface';
import { FrameSize, FrameSizeUtil } from '../_interfaces/frame-size.interface';
import { GrnButtonConfig } from '../_interfaces/grn-button-config.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GrnLinkDirective } from './grn-link.directive';

export const GRN_BUTTON_CONFIG = new InjectionToken<GrnButtonConfig>('GRN_BUTTON_CONFIG');

let identifier = 0;

@Component({
  selector: 'grn-button',
  exportAs: 'grnButton',
  templateUrl: './grn-button.component.html',
  styleUrls: ['./grn-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnButtonComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public id = 'grn_button_' + ++identifier;
  @Input()
  public config: GrnButtonConfig | undefined;
  @Input()
  public exterior: string | undefined; // ButtonExteriorType
  @Input()
  public frameSize: string | undefined; // FrameSizeType
  @Input()
  public isDisabled: string | undefined; // +

  @ViewChild('buttonElement')
  public buttonElementRef: ElementRef<HTMLElement> | undefined;
  @ViewChild(GrnTouchRippleComponent)
  public touchRipple: GrnTouchRippleComponent | undefined;
  @ContentChild(GrnLinkDirective, { static: true })
  public linkElement: GrnLinkDirective | undefined;

  public defaultExterior = ButtonExterior.text;
  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.small) || 0;
  public currConfig: GrnButtonConfig = {};
  public innExterior: ButtonExterior | undefined;
  public isFocused = false;
  public innIsDisabled: boolean | null = null;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(GRN_BUTTON_CONFIG) private rootConfig: GrnButtonConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-button', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      const innExteriorOld = this.innExterior;
      this.innExterior = ButtonExteriorUtil.convert(this.exterior) || this.currConfig.exterior || this.defaultExterior;
      if (innExteriorOld !== this.innExterior) {
        this.settingExterior(this.hostRef, this.innExterior);
        // console.log(`@C this.innExterior=${this.innExterior}`);
      }
    }
    if (changes.isDisabled) {
      this.innIsDisabled = BooleanUtil.init(this.isDisabled || null);
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled || false);
    }
  }

  ngOnInit(): void {
    if (!this.innExterior) {
      this.innExterior = this.currConfig.exterior || this.defaultExterior;
      this.settingExterior(this.hostRef, this.innExterior);
      // console.log(`@I this.innExterior=${this.innExterior}`);
    }
  }

  ngAfterContentInit(): void {
    // Add the required properties for the hyperlink element.
    this.settingLink(this.linkElement?.templateRef);
  }

  // ** Public API **

  public doClick(event: MouseEvent): void {
    if (!!event && !event.cancelBubble && this.linkElement && this.touchRipple) {
      this.touchRipple.touchRipple(event);
    }
  }

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.settingFocused(this.hostRef, (this.isFocused = true));
  }

  public doBlur(): void {
    this.settingFocused(this.hostRef, (this.isFocused = false));
  }

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: ButtonExterior | undefined): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-text', ButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-t', ButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-contained', ButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-c', ButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-outlined', ButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', ButtonExteriorUtil.isOutlined(exterior) ? '' : null);
  }

  private settingIsDisabled(elem: ElementRef<HTMLElement> | undefined, isDisabled: boolean): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'disabled', isDisabled ? '' : null);
  }

  private settingLink(elem: ElementRef<HTMLElement> | undefined): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'linkClear', '');
    HtmlElemUtil.setAttr(this.renderer, elem, 'btn-pd-ver', '');
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-label', true);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-elem-pd-hor', true);
  }

  private settingFocused(elem: ElementRef<HTMLElement> | undefined, isFocused: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-focused', isFocused);
    HtmlElemUtil.setAttr(this.renderer, elem, 'foc', isFocused ? '' : null);
  }
}

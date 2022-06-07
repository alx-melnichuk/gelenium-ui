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
  Optional,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';

import { GlnFrameSize, GlnFrameSizeUtil } from '../_interfaces/gln-frame-size.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { HtmlSettingUtil } from '../_utils/html-setting.util';

import { GlnButtonConfig } from './gln-button-config.interface';
import { GlnLinkDirective } from './gln-link.directive';

export const GLN_BUTTON_CONFIG = new InjectionToken<GlnButtonConfig>('GLN_BUTTON_CONFIG');

let identifier = 0;

@Component({
  selector: 'gln-button',
  exportAs: 'glnButton',
  templateUrl: './gln-button.component.html',
  styleUrls: ['./gln-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnButtonComponent implements OnChanges, AfterContentInit {
  @Input()
  public id = 'glnb_' + ++identifier;
  @Input()
  public config: GlnButtonConfig | null = null;
  @Input()
  public exterior: string | null = null; // GlnButtonExteriorType
  @Input()
  public frameSize: string | null = null; // GlnFrameSizeType
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public isNoRipple: string | null = null;

  @ViewChild('buttonElement', { static: true })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  @ContentChild(GlnLinkDirective, { static: true })
  public linkElement: GlnLinkDirective | null = null;

  public defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.small) || 0;
  public currConfig: GlnButtonConfig | null = null;
  public isFocused = false;
  public isDisabled2: boolean | null = null; // Binding attribute "isDisabled".
  public isNoRipple2: boolean | null = null; // Binding attribute "isNoRipple".

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(GLN_BUTTON_CONFIG) private rootConfig: GlnButtonConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-button', true);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isDisabled) {
      this.isDisabled2 = BooleanUtil.init(this.isDisabled);
      HtmlSettingUtil.disabled(this.renderer, this.hostRef, this.isDisabled2);
    }
    if (changes.isNoRipple) {
      this.isNoRipple2 = BooleanUtil.init(this.isNoRipple);
    }
  }

  ngAfterContentInit(): void {
    if (this.linkElement?.templateRef) {
      // Add the required properties for the hyperlink element.
      this.settingLink(this.linkElement.templateRef);
    }
  }

  // ** Public API **

  public doClick(event: MouseEvent): void {
    if (!!event && !event.cancelBubble && this.linkElement && this.touchRipple && !this.isNoRipple2) {
      this.touchRipple.touchRipple(event);
    }
  }

  public focus(): void {
    if (isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
      this.buttonElementRef.nativeElement.focus();
    }
  }

  public doFocus(): void {
    this.isFocused = true;
    HtmlSettingUtil.focused(this.renderer, this.hostRef, this.isFocused);
  }

  public doBlur(): void {
    this.isFocused = false;
    HtmlSettingUtil.focused(this.renderer, this.hostRef, this.isFocused);
  }

  // ** Private API **

  private settingLink(elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'linkClear', '');
    HtmlElemUtil.setClass(this.renderer, elem, 'glnb-label', true);
    HtmlElemUtil.setClass(this.renderer, elem, 'glnb-elem-pd-hor', true);
  }
}

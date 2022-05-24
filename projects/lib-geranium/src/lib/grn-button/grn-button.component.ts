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

import { GrnTouchRippleComponent } from '../grn-touch-ripple/grn-touch-ripple.component';

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
export class GrnButtonComponent implements OnChanges, AfterContentInit {
  @Input()
  public id = 'grn_button_' + ++identifier;
  @Input()
  public config: GrnButtonConfig | null = null;
  @Input()
  public exterior: string | null = null; // ButtonExteriorType
  @Input()
  public frameSize: string | null = null; // FrameSizeType
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public isNoRipple: string | null = null;

  @ViewChild('buttonElement', { static: true })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild(GrnTouchRippleComponent, { static: false })
  public touchRipple: GrnTouchRippleComponent | null = null;

  @ContentChild(GrnLinkDirective, { static: true })
  public linkElement: GrnLinkDirective | null = null;

  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.small) || 0;
  public currConfig: GrnButtonConfig | null = null;
  public isFocused = false;
  public isDisabled2: boolean | null = null; // Binding attribute "isDisabled".
  public isNoRipple2: boolean | null = null; // Binding attribute "isNoRipple".

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(GRN_BUTTON_CONFIG) private rootConfig: GrnButtonConfig | null,
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-button', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes.isDisabled) {
      this.isDisabled2 = BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gb-disabled', this.isDisabled2 || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled2 ? '' : null);
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
    this.settingFocused(this.hostRef, (this.isFocused = true));
  }

  public doBlur(): void {
    this.settingFocused(this.hostRef, (this.isFocused = false));
  }

  // ** Private API **

  private settingFocused(elem: ElementRef<HTMLElement> | null, isFocused: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-focused', isFocused);
    HtmlElemUtil.setAttr(this.renderer, elem, 'foc', isFocused ? '' : null);
  }

  private settingLink(elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setAttr(this.renderer, elem, 'linkClear', '');
    HtmlElemUtil.setAttr(this.renderer, elem, 'btn-pd-ver', '');
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-label', true);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-elem-pd-hor', true);
  }
}

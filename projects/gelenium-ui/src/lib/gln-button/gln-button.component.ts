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
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';

import { GlnFrameSize, GlnFrameSizeUtil } from '../gln-frame/gln-frame-size.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnButtonConfig } from './gln-button-config.interface';
import { GlnLinkDirective } from './gln-link.directive';

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
export class GlnButtonComponent implements OnChanges, AfterContentInit {
  @Input()
  public id = `glnb-${uniqueIdCounter++}`;
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

  @Output()
  readonly focused: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly blured: EventEmitter<void> = new EventEmitter();

  @ViewChild('buttonElement', { static: true })
  public buttonElementRef: ElementRef<HTMLElement> | null = null;

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  @ContentChild(GlnLinkDirective, { static: true })
  public linkElement: GlnLinkDirective | null = null;

  public defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.small) || 0;
  public currConfig: GlnButtonConfig | null = null;
  public disabled: boolean | null = null; // Binding attribute "isDisabled".

  public isFocused = false;
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple".

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
      this.disabled = BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
    }
    if (changes.isNoRipple) {
      this.noRipple = BooleanUtil.init(this.isNoRipple);
    }
  }

  ngAfterContentInit(): void {
    if (this.linkElement?.templateRef) {
      // Add the required properties for the hyperlink element.
      HtmlElemUtil.setAttr(this.renderer, this.linkElement.templateRef, 'linkClear', '');
      HtmlElemUtil.setClass(this.renderer, this.linkElement.templateRef, 'glnb-label', true);
      HtmlElemUtil.setClass(this.renderer, this.linkElement.templateRef, 'glnb-pd-hor', true);
    }
  }

  // ** Public API **

  public doClick(event: MouseEvent): void {
    if (!!event && !event.cancelBubble && this.linkElement && this.touchRipple && !this.noRipple) {
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
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.focused.emit();
  }

  public doBlur(): void {
    this.isFocused = false;
    this.focusState(this.renderer, this.hostRef, this.isFocused);
    this.blured.emit();
  }

  // ** Private API **

  private focusState(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, value: boolean | null): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
    HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
  }
}

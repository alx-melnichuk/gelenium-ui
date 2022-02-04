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
import { GrnTouchRippleComponent } from '../grn-touch-ripple/grn-touch-ripple.component';

import { ButtonExterior, ButtonExteriorUtil } from '../interfaces/button-exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnButtonConfig } from '../interfaces/grn-button-config.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';

import { GrnLinkDirective } from './grn-link.directive';
import { GrnFrameSizeValue, GrnFrameSizeValueAndLineHeight, GrnSizeDirective } from './grn-size.directive';

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

  @Output()
  readonly clickData: EventEmitter<Event> = new EventEmitter();

  @ViewChild('buttonElement')
  public buttonElementRef: ElementRef<HTMLElement> | undefined;
  @ViewChild(GrnTouchRippleComponent)
  public touchRipple: GrnTouchRippleComponent | undefined;
  @ContentChild(GrnLinkDirective, { static: true })
  public linkElement: GrnLinkDirective | undefined;
  @ViewChild(GrnSizeDirective)
  public sizeDir: GrnSizeDirective | undefined;

  public get isText(): boolean {
    return ButtonExteriorUtil.isText(this.innExterior);
  }
  public get isContained(): boolean {
    return ButtonExteriorUtil.isContained(this.innExterior);
  }
  public get isOutlined(): boolean {
    return ButtonExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnButtonConfig = {}; // +
  public innExterior: ButtonExterior | undefined; // +
  // public exterior2: ButtonExterior | null = null;
  public innFrameSize: FrameSize | undefined;
  public innFrameSizeValue = 0;
  // public frameSize2: FrameSize | null = null;

  public isFocused = false; // +
  public innIsDisabled: boolean | null = null; // +

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
    let isExterior = false;
    let isFrameSize = false;
    let isFrameSizeValue = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
      const cfgExterior = this.currConfig.exterior;
      isExterior = !this.exterior && !!cfgExterior && this.innExterior !== cfgExterior;
      const cfgFrameSize = this.currConfig.frameSize;
      isFrameSize = !this.frameSize && !!cfgFrameSize && this.innFrameSize !== cfgFrameSize;
      const cfgFrameSizeValue = this.currConfig.frameSizeValue;
      isFrameSizeValue = !this.frameSize && !cfgFrameSize && !!cfgFrameSizeValue && this.innFrameSizeValue !== cfgFrameSizeValue;
      // this.currConfig.labelPd
    }
    if (changes.exterior || isExterior) {
      const exterior = ButtonExteriorUtil.convert(this.exterior || this.currConfig.exterior?.toString());
      this.innExterior = exterior || ButtonExterior.text;
      console.log(`this.innExterior=${this.innExterior} isModifyExterior=${isExterior}`);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (changes.frameSize || isFrameSize || isFrameSizeValue) {
      const frameSize = FrameSizeUtil.convert(this.frameSize || this.currConfig.frameSize?.toString());
      this.innFrameSize = frameSize || FrameSize.small;
      this.innFrameSizeValue =
        FrameSizeUtil.getValue(frameSize) || this.currConfig.frameSizeValue || FrameSizeUtil.getValue(this.innFrameSize) || 0;
      console.log(`this.frameSize=${this.frameSize}`);
      console.log(`this.innFrameSize=${this.innFrameSize}`);
      console.log(`this.innFrameSizeValue=${this.innFrameSizeValue}`);
    }
    if (this.sizeDir && isExterior) {
      console.log('sizeDir.modifyProperties();');
      this.sizeDir.modifyProperties();
    }
    if (changes.isDisabled) {
      this.innIsDisabled = this.isDisabled === '' || this.isDisabled === 'true'; // +
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled); // +
    }
  }

  ngOnInit(): void {
    if (!this.innExterior) {
      this.innExterior = ButtonExteriorUtil.create(this.currConfig.exterior || null);
      console.log(`@@this.innExterior=${this.innExterior}`);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (!this.innFrameSize) {
      this.innFrameSize = FrameSizeUtil.create(this.currConfig.frameSize || FrameSize.small);
      console.log(`@@this.innFrameSize=${this.innFrameSize}`);
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = FrameSizeUtil.getValue(this.innFrameSize || this.currConfig.frameSizeValue) || 0;
      console.log(`@@this.innFrameSizeValue=${this.innFrameSizeValue}`);
    }
  }

  ngAfterContentInit(): void {
    // // Get the width of the ornament block.
    // this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || null;
    // this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || null;
    // this.settingOrnamentLf(this.hostRef, this.ornamentLfWidth);

    this.settingLink(this.linkElement?.templateRef);
  }

  // ** Public API **
  public doClick(event: MouseEvent): void {
    if (!!event && !event.cancelBubble) {
      if (this.linkElement && this.touchRipple) {
        this.touchRipple.touchRipple(event);
      }
      this.clickData.emit(event);
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
  // ** Methods for interacting with GrnSizeDirective. **
  public getSizeBorderRadius: GrnFrameSizeValue = (frameSizeValue: number): number => {
    const borderRadiusRatio = 0.1;
    return frameSizeValue > 0 ? Math.round(100 * borderRadiusRatio * frameSizeValue) / 100 : 0;
  };
  public getSizePaddingHor: GrnFrameSizeValue = (frameSizeValue: number): number => {
    let result = this.currConfig.labelPd || 0;
    const exterior = this.innExterior;
    if (frameSizeValue > 0 && result <= 0 && exterior) {
      let ratioValue = 0.2045;
      if (exterior === ButtonExterior.contained) {
        ratioValue = 0.3636;
      } else if (exterior === ButtonExterior.outlined) {
        ratioValue = 0.3409;
      }
      result = Math.round(100 * ratioValue * frameSizeValue) / 100;
    }
    // console.log(`getSizePaddingHor(frameSizeValue:${frameSizeValue})=${result} labelPd=${this.currConfig.labelPd}`);
    return result;
  };
  public getSizePaddingVer: GrnFrameSizeValueAndLineHeight = (frameSizeValue: number, lineHeight: number): number => {
    let result = 0;
    const exterior = this.innExterior;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      result = (frameSizeValue - lineHeight) / 2;
      if (exterior === ButtonExterior.outlined) {
        result--;
      }
    }
    // console.log(`getSizePaddingVer(frameSizeValue:${frameSizeValue})=${result} lineHeight=${lineHeight}`);
    return result;
  };

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
  }

  private settingFocused(elem: ElementRef<HTMLElement> | undefined, isFocused: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-focused', isFocused);
    HtmlElemUtil.setAttr(this.renderer, elem, 'foc', isFocused ? '' : null);
  }
}

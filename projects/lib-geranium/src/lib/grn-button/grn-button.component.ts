import { GrnButtonSizeDirective } from './grn-button-size.directive';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
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
import { NumberUtil } from '../utils/number.util';
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
export class GrnButtonComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
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

  @Output()
  readonly clickData: EventEmitter<Event> = new EventEmitter();

  @ViewChild('buttonElement')
  public buttonElementRef: ElementRef<HTMLElement> | undefined;
  @ViewChild(GrnTouchRippleComponent)
  public touchRipple: GrnTouchRippleComponent | undefined;
  @ContentChild(GrnLinkDirective, { static: true })
  public linkElement: GrnLinkDirective | undefined;
  @ViewChild(GrnButtonSizeDirective)
  public buttonSizeDir: GrnButtonSizeDirective | undefined;

  public get isText(): boolean {
    return ButtonExteriorUtil.isText(this.innExterior);
  }
  public get isContained(): boolean {
    return ButtonExteriorUtil.isContained(this.innExterior);
  }
  public get isOutlined(): boolean {
    return ButtonExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnButtonConfig = {};
  public innExterior: ButtonExterior | null = null;
  public exterior2: ButtonExterior | null = null;
  public innFrameSizeValue = 0;
  public frameSize2: FrameSize | null = null;
  public labelPadding: number | null = null;
  public lineHeight: number | null = null;

  public isFocused = false;

  public innRippleColor: string | null = null;
  public innIsDisabled: boolean | null = null; // ?

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
    let isModifyLabelPadding = false;
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.exterior2 = ButtonExteriorUtil.convert(this.exterior);
      this.innExterior = ButtonExteriorUtil.create(this.exterior2 || this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      this.innRippleColor = this.getRippleColor(this.innExterior);
      isModifyLabelPadding = true;
    }
    if (changes.frameSize || (changes.config && !this.frameSize)) {
      this.frameSize2 = FrameSizeUtil.convert(this.frameSize);
      this.innFrameSizeValue = this.createFrameSize(this.frameSize2 || this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // Determine new parameter values that depend on: innExterior, innFrameSizeValue.
      // # remove to GrnFrameSize
      // # this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innFrameSizeValue)); // #
      // # this.labelPadding = this.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      // # this.settingLabelPaddingHor(this.hostRef, this.labelPadding);

      if (this.lineHeight != null) {
        // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
        this.settingLabelPaddingVer(this.hostRef, this.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));
      }
    }
    if (changes.isDisabled) {
      this.innIsDisabled = this.isDisabled === '' || this.isDisabled === 'true';
      this.settingIsDisabled(this.buttonElementRef, this.innIsDisabled);
    }
  }

  ngOnInit(): void {
    let isModifyLabelPadding = false;
    if (this.innExterior === null) {
      this.innExterior = ButtonExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
      this.innRippleColor = this.getRippleColor(this.innExterior);
      isModifyLabelPadding = true;
    }
    if (this.innFrameSizeValue === 0) {
      this.innFrameSizeValue = this.createFrameSize(this.currConfig.frameSize || null, this.currConfig.frameSizeValue);
      isModifyLabelPadding = true;
    }
    if (isModifyLabelPadding && this.innExterior && this.innFrameSizeValue > 0) {
      // # this.settingBorderRadius(this.hostRef, this.getBorderRadius(this.innFrameSizeValue));
      // # this.labelPadding = this.paddingLfRg(this.innExterior, this.innFrameSizeValue, this.currConfig.labelPd);
      // # this.settingLabelPaddingHor(this.hostRef, this.labelPadding);
    }
  }

  ngAfterContentInit(): void {
    // Get the line height from the style set.
    const lineHeightPx = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('line-height');
    this.lineHeight = Number(lineHeightPx.replace('px', ''));
    console.log('lineHeightPx=', lineHeightPx);
    // // Get the width of the ornament block.
    // this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || null;
    // this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || null;
    // this.settingOrnamentLf(this.hostRef, this.ornamentLfWidth);
    // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
    this.settingLabelPaddingVer(this.hostRef, this.paddingVer(this.innExterior, this.innFrameSizeValue, this.lineHeight));

    this.settingLink(this.linkElement?.templateRef);
    console.log('ngAfterContentInit(); buttonSizeDir != null - ', this.buttonSizeDir != null);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit(); buttonSizeDir != null - ', this.buttonSizeDir != null);
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

  // ** Private API **

  private getRippleColor(exterior: ButtonExterior | null): string | null {
    return ButtonExteriorUtil.isText(exterior) || ButtonExteriorUtil.isOutlined(exterior) ? 'rgba(25, 118, 210, 0.3)' : null;
  }
  // Get left/right padding for the GrnFrameInpu element.
  // # remove to GrnFrameSize
  // private paddingLfRg(exterior: ButtonExterior, frameSizeVal: number, configLabelPd: number | undefined): number | null {
  //   let result: number | null = configLabelPd || null;
  //   if (frameSizeVal > 0 && (!result || result <= 0)) {
  //     if (exterior === ButtonExterior.contained) {
  //       result = Math.round(100 * 0.3636 * frameSizeVal) / 100; // 16px
  //     } else if (exterior === ButtonExterior.outlined) {
  //       result = Math.round(100 * 0.3409 * frameSizeVal) / 100; // 15px
  //     } else if (exterior === ButtonExterior.text) {
  //       result = Math.round(100 * 0.2045 * frameSizeVal) / 100; // 9px
  //     }
  //   }
  //   return result;
  // }
  private paddingVer(exterior: ButtonExterior | null, frameSize: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      result = (frameSize - lineHeight) / 2;
      if (exterior === ButtonExterior.outlined) {
        result--;
      }
    }
    return result;
  }
  // # remove to GrnFrameSize
  // private getBorderRadius(frameSizeValue: number): string | null {
  //   let result: string | null = null;
  //   if (frameSizeValue > 0) {
  //     result = Math.round(100 * (frameSizeValue / 10)) / 100 + 'px';
  //   }
  //   return result;
  // }

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: ButtonExterior | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-text', ButtonExteriorUtil.isText(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-t', ButtonExteriorUtil.isText(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-contained', ButtonExteriorUtil.isContained(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-c', ButtonExteriorUtil.isContained(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gb-outlined', ButtonExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', ButtonExteriorUtil.isOutlined(exterior) ? '' : null);
  }
  // # remove to GrnFrameSize
  private createFrameSize(frameSizeInp: FrameSize | null, frameSizeValueInp?: number): number {
    const frameSize: FrameSize = FrameSizeUtil.convert((frameSizeInp || '').toString()) || FrameSize.small;
    let frameSizeValue = FrameSizeUtil.getValue(frameSize) || 0;
    if (frameSizeInp === null && frameSizeValueInp && frameSizeValueInp > 0) {
      frameSizeValue = frameSizeValueInp;
    }
    return frameSizeValue;
  }
  // # remove to GrnFrameSize
  // private settingLabelPaddingHor(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
  //   HtmlElemUtil.setProperty(elem, '--lbl-pd-hor', NumberUtil.str(labelPadding)?.concat('px'));
  // }

  private settingLabelPaddingVer(elem: ElementRef<HTMLElement> | undefined, labelPadding: number | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-pd-ver', NumberUtil.str(labelPadding)?.concat('px'));
  }
  // # remove to GrnFrameSize
  // private settingBorderRadius(elem: ElementRef<HTMLElement> | undefined, borderRadius: string | null): void {
  //   HtmlElemUtil.setProperty(elem, '--br-rd', borderRadius);
  // }

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

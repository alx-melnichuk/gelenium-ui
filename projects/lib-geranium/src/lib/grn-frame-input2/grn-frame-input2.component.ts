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

import { GrnFrameInputConfig } from '../_interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../_interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

export const GRN_FRAME_INPUT2_CONFIG = new InjectionToken<GrnFrameInputConfig>('GRN_FRAME_INPUT2_CONFIG');

@Component({
  selector: 'grn-frame-input2',
  templateUrl: './grn-frame-input2.component.html',
  styleUrls: ['./grn-frame-input2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameInput2Component implements OnChanges, OnInit {
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: InputExterior | null = null;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public hiddenLabel: boolean | null = null;
  @Input()
  public isDisabled: boolean | null = null;
  @Input()
  public isFocused = false;
  @Input()
  public isFilled = false;
  @Input()
  public isError: boolean | null = null;
  @Input()
  public isRequired: boolean | null = null;

  public get isOutlinedExterior(): boolean {
    return InputExteriorUtil.isOutlined(this.innExterior);
  }

  public currConfig: GrnFrameInputConfig = {};
  public innExterior: InputExterior | null = null;
  public innIsLabelShrink: boolean | null = null;
  public innHiddenLabel: boolean | null = null;

  constructor(
    @Optional() @Inject(GRN_FRAME_INPUT2_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'grn-frame-input', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.innExterior = InputExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (changes.isLabelShrink || (changes.config && this.isLabelShrink == null)) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (changes.hiddenLabel || (changes.config && this.hiddenLabel == null)) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
    if (changes.isDisabled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-disabled', this.isDisabled || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes.isFocused) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-focused', this.isFocused);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'foc', this.isFocused ? '' : null);
    }
    if (changes.isFilled) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-filled', this.isFilled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
    }
    if (changes.isError) {
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-error', this.isError || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
    }
    if (changes.label || changes.isRequired) {
      const isIndent = !!this.label || this.isRequired;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gfi-lgn-indent', isIndent || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
    }
  }

  ngOnInit(): void {
    if (this.innExterior == null) {
      this.innExterior = InputExteriorUtil.create(this.currConfig.exterior || null);
      this.settingExterior(this.hostRef, this.innExterior);
    }
    if (this.innIsLabelShrink == null) {
      this.innIsLabelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!this.currConfig.isLabelShrink;
      this.settingLabelShrink(this.hostRef, this.innIsLabelShrink);
    }
    if (this.innHiddenLabel == null) {
      this.innHiddenLabel = this.hiddenLabel != null ? this.hiddenLabel : !!this.currConfig.hiddenLabel;
      this.settingHiddenLabel(this.hostRef, this.innHiddenLabel);
    }
  }

  // ** Public API **

  // ** Private API **

  private settingExterior(elem: ElementRef<HTMLElement> | undefined, exterior: InputExterior | null): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-outlined', InputExteriorUtil.isOutlined(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-o', InputExteriorUtil.isOutlined(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-underline', InputExteriorUtil.isUnderline(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-u', InputExteriorUtil.isUnderline(exterior) ? '' : null);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-standard', InputExteriorUtil.isStandard(exterior));
    HtmlElemUtil.setAttr(this.renderer, elem, 'ext-s', InputExteriorUtil.isStandard(exterior) ? '' : null);
    const isBorder = InputExteriorUtil.isStandard(exterior) || InputExteriorUtil.isUnderline(exterior);
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-border', isBorder);
    HtmlElemUtil.setAttr(this.renderer, elem, 'frm-br', isBorder ? '' : null);
  }

  private settingLabelShrink(elem: ElementRef<HTMLElement> | undefined, isLabelShrink: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-shrink', isLabelShrink);
    HtmlElemUtil.setAttr(this.renderer, elem, 'shr', isLabelShrink ? '' : null);
  }

  private settingHiddenLabel(elem: ElementRef<HTMLElement> | undefined, hiddenLabel: boolean): void {
    HtmlElemUtil.setClass(this.renderer, elem, 'gfi-hidden-label', hiddenLabel);
    HtmlElemUtil.setAttr(this.renderer, elem, 'hlbl', hiddenLabel ? '' : null);
  }
}

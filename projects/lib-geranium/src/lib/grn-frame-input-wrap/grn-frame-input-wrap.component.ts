import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  GrnSizeBorderRadius,
  GrnSizePaddingHor,
  GrnSizePaddingHorRes,
  GrnSizePaddingVer,
  GrnSizePaddingVerRes,
} from '../directives/grn-size/grn-size.directive';
import { GRN_FRAME_INPUT2_CONFIG } from '../grn-frame-input2/grn-frame-input2.component';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';
import { InputExterior, InputExteriorUtil } from '../interfaces/input-exterior.interface';
import { HtmlElemUtil } from '../utils/html-elem.util';
import { InputLabelUtil, TranslateVerRes } from '../utils/input-label.util';
import { NumberUtil } from '../utils/number.util';

@Component({
  selector: 'grn-frame-input-wrap',
  templateUrl: './grn-frame-input-wrap.component.html',
  styleUrls: ['./grn-frame-input-wrap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameInputWrapComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public wdFull: string | null = null;
  @Input()
  public label = '';
  @Input()
  public config: GrnFrameInputConfig | null = null;
  @Input()
  public exterior: InputExterior | null = null;
  @Input()
  public frameSize: FrameSize | undefined | null;
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

  @Output()
  readonly clickFrame: EventEmitter<Event> = new EventEmitter();

  @ContentChild('grnOrnamentLf', { static: true })
  public grnOrnamentLf: ElementRef<HTMLElement> | undefined;
  @ContentChild('grnOrnamentRg', { static: true })
  public grnOrnamentRg: ElementRef<HTMLElement> | undefined;

  public defaultFrameSize = FrameSizeUtil.getValue(FrameSize.middle) || 0;
  public currConfig: GrnFrameInputConfig = {};

  public innExterior: InputExterior | null = null;
  public labelPadding: number | null = null;
  public ornamentLfWidth: number | null = null;
  public ornamentRgWidth: number | null = null;

  constructor(
    @Optional() @Inject(GRN_FRAME_INPUT2_CONFIG) private rootConfig: GrnFrameInputConfig | null,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    console.log();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.currConfig = { ...(this.rootConfig || {}), ...(this.config || {}) };
    }
    if (changes.exterior || (changes.config && !this.exterior)) {
      this.innExterior = InputExteriorUtil.create(this.exterior || this.currConfig.exterior || null);
    }
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterContentInit(): void {
    // Get the width of the ornament block.
    this.ornamentLfWidth = this.grnOrnamentLf?.nativeElement.offsetWidth || null;
    this.ornamentRgWidth = this.grnOrnamentRg?.nativeElement.offsetWidth || null;
    this.settingOrnamentLf(this.hostRef, this.ornamentLfWidth);
    console.log(`ngAfterContentInit() ornLfWidth=${this.ornamentLfWidth}`);
  }

  // ** Public API **

  // ** Methods for interacting with GrnSizeDirective. **

  public getSizeBorderRadius: GrnSizeBorderRadius = (frameSizeValue: number): string => {
    let result = '';
    const exterior = this.innExterior;
    if (exterior && frameSizeValue > 0) {
      const radius = '' + Math.round(100 * (frameSizeValue / 10)) / 100 + 'px';
      if (exterior === InputExterior.outlined) {
        result = radius;
      } else if (exterior === InputExterior.underline) {
        result = radius + ' ' + radius + ' 0px 0px';
      }
    }
    return result;
  };
  public getSizePaddingHor: GrnSizePaddingHor = (frameSizeValue: number): GrnSizePaddingHorRes => {
    let result = this.currConfig.labelPd || 0;
    const exterior = this.innExterior;
    if (frameSizeValue > 0 && result <= 0 && exterior) {
      result = InputLabelUtil.paddingLfRg(exterior, frameSizeValue, this.currConfig.labelPd) || 0;
    }
    this.labelPadding = result;
    console.log(`getSizePaddingHor(frameSizeValue:${frameSizeValue})=${result} conf.labelPd=${this.currConfig.labelPd}`);
    this.settingLabelMaxWidth(this.hostRef, this.getLabelMaxWidth(this.labelPadding));
    // Determine new parameter values that depend on: innExterior, innFrameSizeValue, lineHeight.
    this.settingLabel2MaxWidth(this.hostRef, this.getLabel2MaxWidth(this.labelPadding, this.ornamentLfWidth, this.ornamentRgWidth));

    return { left: result, right: result };
  };
  public getSizePaddingVer: GrnSizePaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes => {
    let labelPaddingTop = 0;
    let labelPaddingBottom = 0;
    const exterior = this.innExterior;
    if (frameSizeValue > 0 && lineHeight > 0 && exterior) {
      const res = InputLabelUtil.paddingVer(exterior, frameSizeValue, lineHeight);
      labelPaddingTop = res.labelPaddingTop || 0;
      labelPaddingBottom = res.labelPaddingBottom || 0;
    }
    console.log(`getSizePaddingVer(frameSizeValue:${frameSizeValue})={${labelPaddingTop}, ${labelPaddingBottom}} lineHeight=${lineHeight}`);
    this.settingLabelTranslateVer(this.hostRef, InputLabelUtil.translateVer(exterior, frameSizeValue, lineHeight));
    return { top: labelPaddingTop, bottom: labelPaddingBottom };
  };
  // ** - **

  // Private API **

  // Max width of the label in a shrink position (in the top).
  private getLabelMaxWidth(labelPadding: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      result = labelPadding === 0 ? '133%' : 'calc(133% - ' + Math.round(100 * 2.66 * labelPadding) / 100 + 'px)';
    }
    return result;
  }
  // Max width of the label in the unshrink position (in the middle).
  private getLabel2MaxWidth(labelPadding: number | null, ornamentLfWidth: number | null, ornamentRgWidth: number | null): string | null {
    let result: string | null = null;
    if (labelPadding != null && labelPadding > -1) {
      const valueLfWidth = ornamentLfWidth != null ? ornamentLfWidth : labelPadding;
      const valueRgWidth = ornamentRgWidth != null ? ornamentRgWidth : labelPadding;
      const value = valueLfWidth + valueRgWidth;
      result = value === 0 ? '100%' : 'calc(100% - ' + Math.round(100 * value) / 100 + 'px)';
    }
    return result;
  }

  private settingLabelTranslateVer(el: ElementRef<HTMLElement> | undefined, translateVertical: TranslateVerRes): void {
    HtmlElemUtil.setProperty(el, '--lbl-trn-y', NumberUtil.str(translateVertical.labelTranslateY)?.concat('px'));
    HtmlElemUtil.setProperty(el, '--lbl2-trn-y', NumberUtil.str(translateVertical.label2TranslateY)?.concat('px'));
  }

  private settingLabelMaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl-wd', maxWidth);
  }

  private settingLabel2MaxWidth(elem: ElementRef<HTMLElement> | undefined, maxWidth2: string | null): void {
    HtmlElemUtil.setProperty(elem, '--lbl2-wd', maxWidth2);
  }

  private settingOrnamentLf(elem: ElementRef<HTMLElement> | undefined, ornamentLfWidth: number | null): void {
    HtmlElemUtil.setProperty(elem, '--orn-lf', NumberUtil.str(ornamentLfWidth)?.concat('px'));
  }
}

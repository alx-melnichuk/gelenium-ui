import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';

import { GrnFrameInputConfig } from './grn-frame-input.interface';

export const GRN_FRAME_INPUT_CONFIG = new InjectionToken<GrnFrameInputConfig>('GRN_FRAME_INPUT_CONFIG');

@Component({
  selector: 'grn-frame-input',
  exportAs: 'grnFrameInput',
  templateUrl: './grn-frame-input.component.html',
  styleUrls: ['./grn-frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameInputComponent implements OnChanges, AfterViewInit {
  @Input()
  public inputId = '';
  @Input()
  public label = '';
  @Input()
  public exterior: Exterior | null = null;
  @Input()
  public isRequired = false;
  @Input()
  public isDisabled = false;
  @Input()
  public isFocused = false;
  @Input()
  public isFilled = false;
  @Input()
  public isLabelShrink: boolean | null = null;
  @Input()
  public hiddenLabel: boolean | null = null;
  @Input()
  public isError = false;
  @Input()
  public helperText: string | null = null;
  @Input()
  public frameSize: FrameSize | null = null;

  @ContentChild('grnOrnament', { static: true })
  public grnOrnament: ElementRef | undefined;
  @ContentChild('grnOrnamentEnd', { static: true })
  public grnOrnamentEnd: ElementRef | undefined;

  @HostBinding('class.Grn-palette')
  public get getGrnPalette(): boolean {
    return true;
  }
  @HostBinding('style.--gfi-size')
  public get frameSizeValue(): string | null {
    return this.frameSizeVal > 0 ? this.frameSizeVal + 'px' : null;
  }
  @HostBinding('style.--gfi-o-lbl2-pd-lf')
  public get labelOPaddingLeft(): string | null {
    return this.ornamentWidth > 0 ? this.ornamentWidth + 'px' : null;
  }
  @HostBinding('style.--gfi-u-lbl2-pd-lf')
  public get labelUPaddingLeft(): string | null {
    return this.ornamentWidth > 0 ? this.ornamentWidth + 'px' : null;
  }
  @HostBinding('style.--gfi-s-lbl2-pd-lf')
  public get labelSPaddingLeft(): string | null {
    return this.ornamentWidth > 0 ? this.ornamentWidth + 'px' : null;
  }
  @HostBinding('style.--gfi-o-lbl2-pd-rg')
  public get label2OPaddingLeft(): string | null {
    return this.ornamentEndWidth > 0 ? this.ornamentEndWidth + 'px' : null;
  }
  @HostBinding('style.--gfi-u-lbl2-pd-rg')
  public get label2UPaddingLeft(): string | null {
    return this.ornamentEndWidth > 0 ? this.ornamentEndWidth + 'px' : null;
  }
  @HostBinding('style.--gfi-s-lbl2-pd-rg')
  public get label2SPaddingLeft(): string | null {
    return this.ornamentEndWidth > 0 ? this.ornamentEndWidth + 'px' : null;
  }

  public get isOutlinedExterior(): boolean {
    return ExteriorUtil.isOutlined(this.exterior);
  }
  public get isUnderlineExterior(): boolean {
    return ExteriorUtil.isUnderline(this.exterior);
  }
  public get isStandardExterior(): boolean {
    return ExteriorUtil.isStandard(this.exterior);
  }
  public get isLabelShrinkValue(): boolean {
    return !!(this.isFocused || this.isFilled || this.isLabelShrink);
  }
  public isMouseEnter = false;
  public frameSizeVal = 0;
  public ornamentWidth = 0;
  public ornamentEndWidth = 0;

  constructor(
    @Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private config: GrnFrameInputConfig | null,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.exterior = ExteriorUtil.create(this.exterior, this.config?.exterior || null);
    this.frameSize = FrameSizeUtil.create(this.frameSize, this.config?.frameSize || null);
    this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.config?.isLabelShrink);
    this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.config?.hiddenLabel);
  }

  @HostListener('mouseenter')
  public eventMouseEnter(): void {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public eventMouseLeave(): void {
    this.isMouseEnter = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exterior) {
      this.exterior = ExteriorUtil.create(this.exterior, this.config?.exterior || null);
    }
    if (changes.frameSize) {
      this.frameSize = FrameSizeUtil.create(this.frameSize, this.config?.frameSize || null);
      this.frameSizeVal = FrameSizeUtil.getValue(this.frameSize) || 0;
    }
    if (changes.isLabelShrink) {
      this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.config?.isLabelShrink);
    }
    if (changes.hiddenLabel) {
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.config?.hiddenLabel);
    }
  }

  ngAfterViewInit(): void {
    this.ornamentWidth = this.grnOrnament?.nativeElement.offsetWidth || 0;
    this.ornamentEndWidth = this.grnOrnamentEnd?.nativeElement.offsetWidth || 0;
  }

  // ** Public API **

  public paletteMode(isError: boolean, isFocused: boolean, isDisabled: boolean, isMouseEnter: boolean): string {
    let result = 'def';
    if (isError) {
      result = 'err';
      if (isMouseEnter && !isFocused && !isDisabled) {
        result = 'hov-err';
      }
    } else {
      if (isFocused) {
        result = 'foc';
      } else if (isDisabled) {
        result = 'dis';
      } else if (isMouseEnter) {
        result = 'hov';
      }
    }
    return result;
  }

  public paletteModeBg(isError: boolean, isFocused: boolean, isDisabled: boolean, isMouseEnter: boolean): string {
    let result = 'def';
    if (isError) {
      result = 'err';
      if (isMouseEnter && !isFocused && !isDisabled) {
        result = 'hov-err';
      } else if (isDisabled) {
        result = 'dis';
      }
    } else {
      if (isFocused) {
        result = 'foc';
      } else if (isDisabled) {
        result = 'dis';
      } else if (isMouseEnter) {
        result = 'hov';
      }
    }
    return result;
  }

  public paletteHelperText(isError: boolean, isDisabled: boolean): string {
    let result = 'def';
    if (isError) {
      result = 'err';
    } else if (isDisabled) {
      result = 'dis';
    }
    return result;
  }

  // ** Private API **

  private createBoolean(value: boolean | null, defaultValue: boolean | undefined): boolean | null {
    return value != null ? value : defaultValue != null ? defaultValue : value;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
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
export class GrnFrameInputComponent implements OnChanges {
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

  @HostBinding('class.Grn-palette')
  public get getGrnPalette(): boolean {
    return true;
  }

  @HostBinding('style')
  public get getStyle(): string | null {
    const value = FrameSizeUtil.getValue(this.frameSize);
    return value != null ? '--gfi-size: ' + value + 'px;' : '';
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@Optional() @Inject(GRN_FRAME_INPUT_CONFIG) private config: GrnFrameInputConfig | null) {
    this.exterior = ExteriorUtil.create(this.exterior, this.config?.exterior || null);
    this.frameSize = FrameSizeUtil.create(this.frameSize, this.config?.frameSize || null);
    this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.config?.isLabelShrink);
    this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.config?.hiddenLabel);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exterior) {
      this.exterior = ExteriorUtil.create(this.exterior, this.config?.exterior || null);
    }
    if (changes.frameSize) {
      this.frameSize = FrameSizeUtil.create(this.frameSize, this.config?.frameSize || null);
    }
    if (changes.isLabelShrink) {
      this.isLabelShrink = this.createBoolean(this.isLabelShrink, this.config?.isLabelShrink);
    }
    if (changes.hiddenLabel) {
      this.hiddenLabel = this.createBoolean(this.hiddenLabel, this.config?.hiddenLabel);
    }
  }

  @HostListener('mouseenter')
  public eventMouseEnter(): void {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public eventMouseLeave(): void {
    this.isMouseEnter = false;
  }

  // ** Public API **

  public getClassPalette(prefix: string, isError: boolean, isFocused: boolean, isDisabled: boolean, isMouseEnter: boolean): string {
    let result = 'default';
    if (isError) {
      result = 'error';
      if (isMouseEnter && !isFocused && !isDisabled) {
        result = 'mouse-error';
      }
    } else {
      if (isFocused) {
        result = 'focused';
      } else if (isDisabled) {
        result = 'disabled';
      } else if (isMouseEnter) {
        result = 'mouse';
      }
    }
    return prefix + result;
  }

  public getClassPaletteBg(prefix: string, isError: boolean, isFocused: boolean, isDisabled: boolean, isMouseEnter: boolean): string {
    let result = 'default';
    if (isError) {
      result = 'error';
      if (isMouseEnter && !isFocused && !isDisabled) {
        result = 'mouse-error';
      } else if (isDisabled) {
        result = 'disabled';
      }
    } else {
      if (isFocused) {
        result = 'focused';
      } else if (isDisabled) {
        result = 'disabled';
      } else if (isMouseEnter) {
        result = 'mouse';
      }
    }
    return prefix + result;
  }

  public getClassForHelperText(isError: boolean, isDisabled: boolean): string {
    let result = 'plt-clr-default';
    if (isError) {
      result = 'plt-clr-error';
    } else if (isDisabled) {
      result = 'plt-clr-disabled';
    }
    return result;
  }

  // ** Private API **

  private createBoolean(value: boolean | null, defaultValue: boolean | undefined): boolean | null {
    return value != null ? value : defaultValue != null ? defaultValue : value;
  }
}

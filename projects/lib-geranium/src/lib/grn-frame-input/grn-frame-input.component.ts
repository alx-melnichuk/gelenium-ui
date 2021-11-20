import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Exterior, ExteriorUtil } from '../interfaces/exterior.interface';
import { FrameSize, FrameSizeUtil } from '../interfaces/frame-size.interface';

@Component({
  selector: 'grn-frame-input',
  exportAs: 'grnFrameInput',
  templateUrl: './grn-frame-input.component.html',
  styleUrls: ['./grn-frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnFrameInputComponent implements OnInit {
  @Input()
  public inputId = '';
  @Input()
  public label = '';
  @Input()
  public exterior: Exterior = Exterior.standard;
  @Input()
  public isRequired = false;
  @Input()
  public isDisabled = false;
  @Input()
  public isFocused = false;
  @Input()
  public isFilled = false;
  @Input()
  public isLabelShrink = false;
  @Input()
  public hiddenLabel = false;
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
    return value != null ? '--gfi-base-size: ' + value + 'px;' : '';
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

  public isMouseEnter = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostListener('mouseenter')
  public eventMouseEnter(): void {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public eventMouseLeave(): void {
    this.isMouseEnter = false;
  }

  ngOnInit(): void {
    if (!this.frameSize) {
      this.frameSize = FrameSize.sizeWide;
    }
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
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ExteriorValue, ExteriorValueUtil } from '../grn-input/grn-input.interface';
import { FrameSize } from './grn-frame-input.interface';

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
  public exterior: ExteriorValue = ExteriorValue.standard;
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
    const value = this.getValueByFrameSize(this.frameSize);
    return value != null ? '--gfi-base-size: ' + value + 'px;' : '';
  }

  public get isOutlinedExterior(): boolean {
    return ExteriorValueUtil.isOutlined(this.exterior);
  }
  public get isUnderlineExterior(): boolean {
    return ExteriorValueUtil.isUnderline(this.exterior);
  }
  public get isStandardExterior(): boolean {
    return ExteriorValueUtil.isStandard(this.exterior);
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

  public getValueByFrameSize(frameSize: FrameSize | null): number | null {
    let result: number | null = null;
    switch (frameSize) {
      case FrameSize.sizeShort:
        result = 38;
        break;
      case FrameSize.sizeSmall:
        result = 44;
        break;
      case FrameSize.sizeMiddle:
        result = 50;
        break;
      case FrameSize.sizeWide:
        result = 56;
        break;
      case FrameSize.sizeLarge:
        result = 62;
        break;
      case FrameSize.sizeHuge:
        result = 68;
        break;
    }
    return result;
  }
}

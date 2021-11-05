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

  @Output()
  readonly clickFrame: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.Grn-palette')
  public get getGrnPalette(): boolean {
    return true;
  }

  @HostBinding('class')
  public get getClass(): string | null {
    return this.getClassForFrameSize(this.frameSize, 'gfi-size-');
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

  @HostListener('click')
  public eventClickFrame(): void {
    console.log();
    this.clickFrame.emit();
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
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

  public getClassForFrameSize(frameSize: FrameSize | null, prefix = 'gfi-sz-'): string {
    let result = 'wide';
    switch (frameSize) {
      case FrameSize.sizeShort:
        result = 'short';
        break;
      case FrameSize.sizeSmall:
        result = 'small';
        break;
      case FrameSize.sizeMiddle:
        result = 'middle';
        break;
      case FrameSize.sizeWide:
        result = 'wide';
        break;
      case FrameSize.sizeLarge:
        result = 'large';
        break;
      case FrameSize.sizeHuge:
        result = 'huge';
        break;
    }
    return prefix + result;
  }
}

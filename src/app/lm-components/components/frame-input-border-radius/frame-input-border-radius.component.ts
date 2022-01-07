import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from 'src/app/constants/labels';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-frame-input-config.interface';

@Component({
  selector: 'app-frame-input-border-radius',
  templateUrl: './frame-input-border-radius.component.html',
  styleUrls: ['./frame-input-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputBorderRadiusComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = CN_LABEL_OUTLINED;
  @Input()
  public labelUnderline = CN_LABEL_UNDERLINE;
  @Input()
  public labelStandard = CN_LABEL_STANDARD;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup05: FormGroup = new FormGroup({
    input05a: new FormControl('Demo Size Short', []),
    input05b: new FormControl('Demo Size Small', []),
    input05c: new FormControl('Demo Size Middle', []),
    input05d: new FormControl('Demo Size Wide', []),
    input05e: new FormControl('Demo Size Large', []),
    input05f: new FormControl('Demo Size Huge', []),
  });
  public configOutlinedShort: GrnFrameInputConfig = {
    labelPd: 21.66, // 0.57*FrameSizeValue.short
  };
  public configOutlinedSmall: GrnFrameInputConfig = {
    labelPd: 25.08, // 0.57*FrameSizeValue.small
  };
  public configOutlinedMiddle: GrnFrameInputConfig = {
    labelPd: 28.5, // 0.57*FrameSizeValue.middle
  };
  public configOutlinedWide: GrnFrameInputConfig = {
    labelPd: 31.92, // 0.57*FrameSizeValue.wide
  };
  public configOutlinedLarge: GrnFrameInputConfig = {
    labelPd: 35.34, // 0.57*FrameSizeValue.large
  };
  public configOutlinedHuge: GrnFrameInputConfig = {
    labelPd: 38.76, // 0.57*FrameSizeValue.huge
  };

  public configUnderlineShort: GrnFrameInputConfig = {
    labelPd: 15.2, // 0.4*FrameSizeValue.short
  };
  public configUnderlineSmall: GrnFrameInputConfig = {
    labelPd: 17.6, // 0.4*FrameSizeValue.small
  };
  public configUnderlineMiddle: GrnFrameInputConfig = {
    labelPd: 20, // 0.4*FrameSizeValue.middle
  };
  public configUnderlineWide: GrnFrameInputConfig = {
    labelPd: 22.4, // 0.4*FrameSizeValue.wide
  };
  public configUnderlineLarge: GrnFrameInputConfig = {
    labelPd: 24.8, // 0.4*FrameSizeValue.large
  };
  public configUnderlineHuge: GrnFrameInputConfig = {
    labelPd: 27.2, // 0.4*FrameSizeValue.huge
  };

  public exterior05 = 'outlined';
  public isHiddenLabel = false;
  public borderRadius = 50;
  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;

  public formGroup06: FormGroup = new FormGroup({
    input06a: new FormControl('Demo - A', []),
    input06b: new FormControl('Demo - B', []),
    input06c: new FormControl('Demo - C', []),
    input06d: new FormControl('Demo - D', []),
    input06e: new FormControl('Demo - E', []),
    input06f: new FormControl('Demo - F', []),
    input06h: new FormControl('Demo - H', []),
    input06i: new FormControl('Demo - I', []),
    input06j: new FormControl('Demo - J', []),
    input06k: new FormControl('Demo - K', []),
    input06l: new FormControl('Demo - L', []),
  });
  public configOutlined: GrnFrameInputConfig = {
    labelPd: 20.72, // 0.37*FrameSizeValue.wide
  };
  public configUnderline: GrnFrameInputConfig = {
    labelPd: 20.72, // 0.37*FrameSizeValue.wide
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostBinding('style')
  public get getClass(): string | null {
    return '--fibr-border-radius: ' + this.borderRadius + ';';
  }

  public inputBorderRadius(event: MatSliderChange): void {
    if (!!event && event.value != null) {
      this.borderRadius = event.value;
    }
  }
}

import { ChangeDetectionStrategy, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from 'src/app/constants/labels';

import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/grn-frame-input/grn-frame-input.interface';
import { Exterior } from 'projects/lib-geranium/src/lib/interfaces/exterior.interface';
import { FrameSize } from 'projects/lib-geranium/src/lib/interfaces/frame-size.interface';
import { GRN_FRAME_INPUT_CONFIG } from 'projects/lib-geranium/src/lib/grn-frame-input/grn-frame-input.component';

const grnFrameInputConfigDefault: GrnFrameInputConfig = {
  // exterior: Exterior.underline,
  exterior: Exterior.outlined,
  frameSize: FrameSize.wide,
  // frameSize: FrameSize.large,
  // isLabelShrink: true,
  // hiddenLabel: true,
};
@Component({
  selector: 'app-input-ornaments',
  templateUrl: './input-ornaments.component.html',
  styleUrls: ['./input-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GRN_FRAME_INPUT_CONFIG, useValue: grnFrameInputConfigDefault }],
})
export class InputOrnamentsComponent {
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

  public minLength05 = 4;
  public maxLength05 = 15;
  public controls05 = {
    input05a: new FormControl('' /*'thirty'*/, []),
    input05b: new FormControl('thirty', []),
    input05c: new FormControl('one', [Validators.required, Validators.minLength(this.minLength05), Validators.maxLength(this.maxLength05)]),
    input05d: new FormControl('five hundred ninety eight', [
      Validators.required,
      Validators.minLength(this.minLength05),
      Validators.maxLength(this.maxLength05),
    ]),
    input05e: new FormControl('thirty', [Validators.required]),
    input05f: new FormControl('thirty', [Validators.required]),
  };
  public formGroup05: FormGroup = new FormGroup(this.controls05);
  public exterior05 = 'outlined';
  public isBtnEyeCrossed05e = false;
  public isBtnEyeCrossed05f = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CN_LABEL_CSS, CN_LABEL_HTML, CN_LABEL_SHOW_SOURCE, CN_LABEL_TS } from 'src/app/constants/labels';

import { GRN_FRAME_INPUT_CONFIG } from 'projects/lib-geranium/src/lib/grn-frame-input/grn-frame-input.component';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/grn-frame-input/grn-frame-input.interface';
import { Exterior } from 'projects/lib-geranium/src/lib/interfaces/exterior.interface';
import { FrameSize } from 'projects/lib-geranium/src/lib/interfaces/frame-size.interface';
import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

const grnFrameInputConfigDefault: GrnFrameInputConfig = {
  exterior: Exterior.outlined,
  frameSize: FrameSize.small,
};

@Component({
  selector: 'app-frame-input-config',
  templateUrl: './frame-input-config.component.html',
  styleUrls: ['./frame-input-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GRN_FRAME_INPUT_CONFIG, useValue: grnFrameInputConfigDefault }],
})
export class FrameInputConfigComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
  public formGroup07: FormGroup = new FormGroup({
    input07a: new FormControl('', []),
    input07b: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

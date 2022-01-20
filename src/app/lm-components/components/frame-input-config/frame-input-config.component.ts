import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

import { GRN_FRAME_INPUT_CONFIG } from 'projects/lib-geranium/src/lib/grn-frame-input/grn-frame-input.component';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-frame-input-config.interface';
import { Exterior } from 'projects/lib-geranium/src/lib/interfaces/exterior.interface';
import { FrameSize } from 'projects/lib-geranium/src/lib/interfaces/frame-size.interface';
import { UrlComponents } from '../../constants/url-components.constants';

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
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME_INPUT');
  public formGroup07: FormGroup = new FormGroup({
    input07a: new FormControl('', []),
    input07b: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

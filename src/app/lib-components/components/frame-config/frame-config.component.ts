import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { GlnFrameSize, GlnFrameConfig, GlnFrameExterior, GLN_FRAME_CONFIG } from 'gelenium-ui';

const glnFrameConfigDefault: GlnFrameConfig = {
  exterior: GlnFrameExterior.outlined,
  frameSize: GlnFrameSize.small,
};

@Component({
  selector: 'app-frame-config',
  templateUrl: './frame-config.component.html',
  styleUrls: ['./frame-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_FRAME_CONFIG, useValue: glnFrameConfigDefault }],
})
export class FrameConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlFrame1 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME1');
  public urlFrame2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME2');

  public formGroup07: FormGroup = new FormGroup({
    model07a: new FormControl('', []),
    model07b: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

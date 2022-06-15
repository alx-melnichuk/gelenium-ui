import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

import { GlnFrameSize, GlnFrameConfig, GlnFrameExterior, GLN_FRAME_CONFIG } from 'gelenium-ui';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

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

  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');
  public formGroup07: FormGroup = new FormGroup({
    input07a: new FormControl('', []),
    input07b: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

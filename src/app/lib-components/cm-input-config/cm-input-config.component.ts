import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

import { GlnInputConfig, GLN_INPUT_CONFIG } from 'gelenium-ui';

const glnInputConfigDefault: GlnInputConfig = {
  exterior: 'outlined',
  frameSize: 'small',
};

@Component({
  selector: 'app-cm-input-config',
  templateUrl: './cm-input-config.component.html',
  styleUrls: ['./cm-input-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_INPUT_CONFIG, useValue: glnInputConfigDefault }],
})
export class CmInputConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  public formGroup07: FormGroup = new FormGroup({
    model07a: new FormControl('', []),
    model07b: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

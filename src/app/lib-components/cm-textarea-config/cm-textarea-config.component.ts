import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

import { GlnTextareaConfig, GLN_TEXTAREA_CONFIG } from 'gelenium-ui';

const glnTextareaConfigDefault: GlnTextareaConfig = {
  exterior: 'outlined',
  size: 'small',
};

@Component({
  selector: 'app-cm-textarea-config',
  templateUrl: './cm-textarea-config.component.html',
  styleUrls: ['./cm-textarea-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_TEXTAREA_CONFIG, useValue: glnTextareaConfigDefault }],
})
export class CmTextareaConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmTextarea = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TEXTAREA');
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  public formGroup07: FormGroup = new FormGroup({
    model07a: new FormControl('', []),
    model07b: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

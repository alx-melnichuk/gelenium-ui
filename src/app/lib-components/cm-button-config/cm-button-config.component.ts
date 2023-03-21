import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { GlnButtonConfig, GLN_BUTTON_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnButtonConfigDefault: GlnButtonConfig = {
  exterior: 'text',
  size: 'middle',
};

@Component({
  selector: 'app-cm-button-config',
  templateUrl: './cm-button-config.component.html',
  styleUrls: ['./cm-button-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_BUTTON_CONFIG, useValue: glnButtonConfigDefault }],
})
export class CmButtonConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmButton = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_BUTTON');
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

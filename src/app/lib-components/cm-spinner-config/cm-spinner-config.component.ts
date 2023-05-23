import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnSpinnerConfig, GLN_SPINNER_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnSpinnerConfigDefault: GlnSpinnerConfig = {
  size: 'short',
};

@Component({
  selector: 'app-cm-spinner-config',
  templateUrl: './cm-spinner-config.component.html',
  styleUrls: ['./cm-spinner-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_SPINNER_CONFIG, useValue: glnSpinnerConfigDefault }],
})
export class CmSpinnerConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmSpinner = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SPINNER');

  public isNoAnimation08a: boolean = true;

  constructor() {}
}

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnPaginationConfig, GLN_PAGINATION_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnPaginationConfigDefault: GlnPaginationConfig = {
  count: 11,
  countNearby: 2,
  exterior: 'outlined',
  size: 'small',
};

@Component({
  selector: 'app-cm-pagination-config',
  templateUrl: './cm-pagination-config.component.html',
  styleUrls: ['./cm-pagination-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_PAGINATION_CONFIG, useValue: glnPaginationConfigDefault }],
})
export class CmPaginationConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmPagination = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');

  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public page08a: number = 6;
  public page08b: number = 6;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

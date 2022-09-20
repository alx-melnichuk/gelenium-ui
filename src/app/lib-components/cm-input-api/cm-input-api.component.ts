import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-input-api',
  templateUrl: './cm-input-api.component.html',
  styleUrls: ['./cm-input-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputApiComponent {
  public urlCmInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

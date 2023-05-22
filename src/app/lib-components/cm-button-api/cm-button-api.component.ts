import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-button-api',
  templateUrl: './cm-button-api.component.html',
  styleUrls: ['./cm-button-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmButtonApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmButton = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_BUTTON');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

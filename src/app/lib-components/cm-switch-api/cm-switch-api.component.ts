import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-switch-api',
  templateUrl: './cm-switch-api.component.html',
  styleUrls: ['./cm-switch-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSwitchApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmSwitch = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  constructor() {}
}

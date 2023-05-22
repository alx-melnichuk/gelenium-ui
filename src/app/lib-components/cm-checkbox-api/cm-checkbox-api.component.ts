import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-checkbox-api',
  templateUrl: './cm-checkbox-api.component.html',
  styleUrls: ['./cm-checkbox-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCheckboxApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmCheckbox = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-spinner-api',
  templateUrl: './cm-spinner-api.component.html',
  styleUrls: ['./cm-spinner-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSpinnerApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmSpinner = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SPINNER');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

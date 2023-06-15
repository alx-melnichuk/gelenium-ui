import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-snackbar-api',
  templateUrl: './cm-snackbar-api.component.html',
  styleUrls: ['./cm-snackbar-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSnackbarApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmSnackbar = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SNACKBAR');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

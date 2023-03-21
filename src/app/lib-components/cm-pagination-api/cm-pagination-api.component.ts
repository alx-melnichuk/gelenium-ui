import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-pagination-api',
  templateUrl: './cm-pagination-api.component.html',
  styleUrls: ['./cm-pagination-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationApiComponent {
  public urlCmPagination = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

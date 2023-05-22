import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-infinite-scroll-api',
  templateUrl: './cm-infinite-scroll-api.component.html',
  styleUrls: ['./cm-infinite-scroll-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInfiniteScrollApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmInfiniteScroll =
    this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INFINITE_SCROLL');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

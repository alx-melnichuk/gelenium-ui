import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-infinite-scroll-api',
  templateUrl: './cm-infinite-scroll-api.component.html',
  styleUrls: ['./cm-infinite-scroll-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInfiniteScrollApiComponent {
  public urlCmInfiniteScroll = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_INFINITE_SCROLL');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

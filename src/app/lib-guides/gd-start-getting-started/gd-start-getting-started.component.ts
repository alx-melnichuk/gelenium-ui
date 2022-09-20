import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-gd-start-getting-started',
  templateUrl: './gd-start-getting-started.component.html',
  styleUrls: ['./gd-start-getting-started.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdStartGettingStartedComponent {
  public urlGdStart = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_GUIDES_START');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

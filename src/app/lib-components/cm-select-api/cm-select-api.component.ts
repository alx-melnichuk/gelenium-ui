import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-select-api',
  templateUrl: './cm-select-api.component.html',
  styleUrls: ['./cm-select-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectApiComponent {
  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlCmSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_SELECT');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

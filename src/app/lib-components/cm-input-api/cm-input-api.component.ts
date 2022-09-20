import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-input-api',
  templateUrl: './cm-input-api.component.html',
  styleUrls: ['./cm-input-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputApiComponent {
  public urlCmInput = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_INPUT');
  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-frame-api',
  templateUrl: './cm-frame-api.component.html',
  styleUrls: ['./cm-frame-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameApiComponent {
  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

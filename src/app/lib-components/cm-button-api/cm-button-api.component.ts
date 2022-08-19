import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-button-api',
  templateUrl: './cm-button-api.component.html',
  styleUrls: ['./cm-button-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmButtonApiComponent {
  public urlCmButton = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_BUTTON');
  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

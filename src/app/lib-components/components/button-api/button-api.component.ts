import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-button-api',
  templateUrl: './button-api.component.html',
  styleUrls: ['./button-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonApiComponent {
  public urlButton2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_BUTTON');
  public urlFrame1 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

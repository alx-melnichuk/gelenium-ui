import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-input-api',
  templateUrl: './input-api.component.html',
  styleUrls: ['./input-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputApiComponent {
  public urlInput = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_INPUT');
  public urlFrame2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

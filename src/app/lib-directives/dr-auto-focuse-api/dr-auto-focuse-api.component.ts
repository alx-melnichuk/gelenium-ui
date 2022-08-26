import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-dr-auto-focuse-api',
  templateUrl: './dr-auto-focuse-api.component.html',
  styleUrls: ['./dr-auto-focuse-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrAutoFocuseApiComponent {
  public urlDrAutoFocuse = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_AUTO_FOCUSE');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

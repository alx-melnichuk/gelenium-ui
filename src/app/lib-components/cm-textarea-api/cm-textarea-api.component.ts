import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-textarea-api',
  templateUrl: './cm-textarea-api.component.html',
  styleUrls: ['./cm-textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTextareaApiComponent {
  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlCmTextarea = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_TEXTAREA');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

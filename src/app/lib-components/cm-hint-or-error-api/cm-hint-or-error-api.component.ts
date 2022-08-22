import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-hint-or-error-api',
  templateUrl: './cm-hint-or-error-api.component.html',
  styleUrls: ['./cm-hint-or-error-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmHintOrErrorApiComponent {
  public urlCmHintOrError = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_HINT_OR_ERROR');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

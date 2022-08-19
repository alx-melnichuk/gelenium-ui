import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-hint-or-error-api',
  templateUrl: './hint-or-error-api.component.html',
  styleUrls: ['./hint-or-error-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintOrErrorApiComponent {
  public urlHintOrError = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_HINT_OR_ERROR');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

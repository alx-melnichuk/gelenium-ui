import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-dr-regex-check-api',
  templateUrl: './dr-regex-check-api.component.html',
  styleUrls: ['./dr-regex-check-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexCheckApiComponent {
  public urlDrRegexCheck = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_REGEX_CHECK');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

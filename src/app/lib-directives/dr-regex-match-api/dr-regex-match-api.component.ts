import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-dr-regex-match-api',
  templateUrl: './dr-regex-match-api.component.html',
  styleUrls: ['./dr-regex-match-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexMatchApiComponent {
  public urlDrRegexMatch = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_DIRECTIVES_REGEX_MATCH');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

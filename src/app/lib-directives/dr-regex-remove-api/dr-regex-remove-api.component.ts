import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-dr-regex-remove-api',
  templateUrl: './dr-regex-remove-api.component.html',
  styleUrls: ['./dr-regex-remove-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexRemoveApiComponent {
  public urlDrRegexRemove = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_REGEX_REMOVE');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-dr-regex-check-api',
  templateUrl: './dr-regex-check-api.component.html',
  styleUrls: ['./dr-regex-check-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexCheckApiComponent {
  public urlDrRegexCheck = '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_REGEX_CHECK');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

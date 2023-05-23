import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-dr-regex-match-api',
  templateUrl: './dr-regex-match-api.component.html',
  styleUrls: ['./dr-regex-match-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexMatchApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlDrRegexMatch = this.baseRef + '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_REGEX_MATCH');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

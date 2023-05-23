import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-dr-regex-remove-api',
  templateUrl: './dr-regex-remove-api.component.html',
  styleUrls: ['./dr-regex-remove-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexRemoveApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlDrRegexRemove = this.baseRef + '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_REGEX_REMOVE');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

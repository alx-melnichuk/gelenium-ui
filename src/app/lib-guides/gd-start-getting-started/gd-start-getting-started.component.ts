import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-gd-start-getting-started',
  templateUrl: './gd-start-getting-started.component.html',
  styleUrls: ['./gd-start-getting-started.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdStartGettingStartedComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlGdStart = this.baseRef + '/' + RouterConfig.get('URL_GUIDES') + '/' + RouterConfig.get('URL_GUIDES_START');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

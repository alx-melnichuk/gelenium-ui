import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-dr-auto-focuse-api',
  templateUrl: './dr-auto-focuse-api.component.html',
  styleUrls: ['./dr-auto-focuse-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrAutoFocuseApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlDrAutoFocuse = this.baseRef + '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_AUTO_FOCUSE');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

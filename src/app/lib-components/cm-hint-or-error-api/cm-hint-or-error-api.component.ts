import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-hint-or-error-api',
  templateUrl: './cm-hint-or-error-api.component.html',
  styleUrls: ['./cm-hint-or-error-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmHintOrErrorApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmHintOrError =
    this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_HINT_OR_ERROR');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

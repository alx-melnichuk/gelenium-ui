import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-tooltip-api',
  templateUrl: './cm-tooltip-api.component.html',
  styleUrls: ['./cm-tooltip-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTooltipApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmTooltip = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

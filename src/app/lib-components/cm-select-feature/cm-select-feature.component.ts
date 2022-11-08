import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-select-feature',
  templateUrl: './cm-select-feature.component.html',
  styleUrls: ['./cm-select-feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectFeatureComponent {
  public urlCmSelect = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

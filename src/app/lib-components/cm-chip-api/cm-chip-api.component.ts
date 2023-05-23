import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-chip-api',
  templateUrl: './cm-chip-api.component.html',
  styleUrls: ['./cm-chip-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmChipApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmChip = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHIP');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

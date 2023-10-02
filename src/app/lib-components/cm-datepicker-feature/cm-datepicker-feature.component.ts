import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-datepicker-feature',
  templateUrl: './cm-datepicker-feature.component.html',
  styleUrls: ['./cm-datepicker-feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmDatepickerFeatureComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmDatepicker = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_DATEPICKER');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

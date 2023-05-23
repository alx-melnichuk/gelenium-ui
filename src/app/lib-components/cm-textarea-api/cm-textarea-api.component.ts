import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-textarea-api',
  templateUrl: './cm-textarea-api.component.html',
  styleUrls: ['./cm-textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTextareaApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlCmTextarea = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TEXTAREA');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

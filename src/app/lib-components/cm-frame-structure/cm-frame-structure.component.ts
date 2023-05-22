import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-frame-structure',
  templateUrl: './cm-frame-structure.component.html',
  styleUrls: ['./cm-frame-structure.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameStructureComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

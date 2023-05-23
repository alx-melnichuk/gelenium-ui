import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-pagination-ornaments',
  templateUrl: './cm-pagination-ornaments.component.html',
  styleUrls: ['./cm-pagination-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationOrnamentsComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmPagination = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');

  public exterior05a = 'outlined';
  public page05a: number = 1;
  public page05b: number = 1;
  public page05c: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

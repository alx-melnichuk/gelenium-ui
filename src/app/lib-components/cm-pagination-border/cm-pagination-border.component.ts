import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-pagination-border',
  templateUrl: './cm-pagination-border.component.html',
  styleUrls: ['./cm-pagination-border.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationBorderComponent {
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

  public exterior04a = 'outlined';
  public page04a: number = 1;
  public page04b: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

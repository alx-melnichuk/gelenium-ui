import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-pagination-size',
  templateUrl: './cm-pagination-size.component.html',
  styleUrls: ['./cm-pagination-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationSizeComponent {
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

  public urlCmPagination = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');

  public exterior03a = 'outlined';
  public page03a: number = 1;
  public page03b: number = 1;
  public page03c: number = 1;
  public page03d: number = 1;
  public page03e: number = 1;
  public page03f: number = 1;

  public exterior03b = 'outlined';
  public page03h: number = 1;
  public page03i: number = 1;
  public page03j: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

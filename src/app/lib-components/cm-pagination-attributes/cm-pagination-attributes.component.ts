import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-pagination-attributes',
  templateUrl: './cm-pagination-attributes.component.html',
  styleUrls: ['./cm-pagination-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationAttributesComponent {
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

  public exterior02a = 'outlined';
  public page02a: number = 1;
  public page02b: number = 1;
  public page02c: number = 1;
  public page02d: number = 1;
  public exterior02b = 'outlined';
  public page02f: number = 6;
  public page02g: number = 6;
  public page02h: number = 6;
  public page02i: number = 6;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

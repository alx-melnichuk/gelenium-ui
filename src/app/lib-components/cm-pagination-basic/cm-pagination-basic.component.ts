import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-pagination-basic',
  templateUrl: './cm-pagination-basic.component.html',
  styleUrls: ['./cm-pagination-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmPaginationBasicComponent {
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

  public isShowBasic = true;
  public isShowAttributes = true;
  public isShowSize = true;
  public isShowBorder = true;

  // Page: "Basic" 01
  public page01a: number = 1;
  public page01b: number = 1;

  // Page: "Attributes" 02
  public exterior02a = 'outlined';
  public page02a: number = 1;
  public page02b: number = 1;
  public page02c: number = 1;
  public page02d: number = 1;

  // Page: "Size" 03
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

  // Page: "Border" 04
  public exterior04a = 'outlined';
  public page04a: number = 1;
  public page04b: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

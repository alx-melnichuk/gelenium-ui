import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GlnSnackbar2Service } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-snackbar-basic',
  templateUrl: './cm-snackbar-basic.component.html',
  styleUrls: ['./cm-snackbar-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSnackbarBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSnackbar = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SNACKBAR');

  // Page: Basic01
  isShowBasic01 = true;
  idxBasic01 = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private snackbar2Service: GlnSnackbar2Service) {}

  public clickDemo1(): void {
    this.snackbar2Service.open(`message Demo-${this.idxBasic01++}`);
  }
}

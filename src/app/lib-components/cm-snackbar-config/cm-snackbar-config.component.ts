import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GlnSnackbarService } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-snackbar-config',
  templateUrl: './cm-snackbar-config.component.html',
  styleUrls: ['./cm-snackbar-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSnackbarConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSnackbar = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SNACKBAR');

  public config08 = { horizontal: 'left', vertical: 'top' };

  constructor(private snackbarService: GlnSnackbarService) {}

  public clickConfig(message: string, config: any): void {
    this.snackbarService.open(message, '', config);
  }
}

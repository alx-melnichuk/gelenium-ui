import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnSnackbarService } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-snackbar-attributes',
  templateUrl: './cm-snackbar-attributes.component.html',
  styleUrls: ['./cm-snackbar-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSnackbarAttributesComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSnackbar = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SNACKBAR');

  public transition02gList: string[] = ['grow', 'fade', 'blur', 'slide', 'slide-dw', 'slide-lf', 'slide-rg', 'turn', 'turn-y'];
  public transition02g: string = this.transition02gList[0];

  constructor(private snackbarService: GlnSnackbarService) {}

  public clickTypical(message: string, action: string = '', config: any): void {
    this.snackbarService.open(message, action, config);
  }

  public clickPosition(message: string, action: string = '', config: any): void {
    this.snackbarService.open(message, action, config);
  }

  public getValue02g(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }
  public clickTransition(message: string, config: any): void {
    this.snackbarService.open(message, '', config);
  }

  public clickAction(message: string, action: string, config: any): void {
    this.snackbarService.open(message, action, config).result.then((response) => {
      // response=undefined - When closing by the "close" button.
      // response=UNDO      - When closing by the "action" button.
      console.log(`simple action response=${response}`);
    });
  }
}

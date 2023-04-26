import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GlnSnackbar2Ref, GlnSnackbar2Service } from 'gelenium-ui';

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
  idxBasic02 = 1;
  public msgType01List: string[] = ['default', 'error', 'warning', 'info', 'success'];
  public msgType01a: string = this.msgType01List[0];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private snackbar2Service: GlnSnackbar2Service) {}

  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }

  public clickDemo1(msgType01a: string): void {
    const idx: number = this.idxBasic01++;
    const snackbar2Ref: GlnSnackbar2Ref<unknown> = this.snackbar2Service.open(`message Demo-${idx}`, undefined, {
      data: { msgType: msgType01a },
    });
    snackbar2Ref.result
      .then((response) => {
        console.log(`1_resolve(${idx} response=${response});`); // #
      })
      .catch(() => {
        console.log(`1_reject(${idx});`); // #
      });
  }

  public clickDemo2(): void {
    const idx: number = this.idxBasic02++;
    const snackbar2Ref: GlnSnackbar2Ref<unknown> = this.snackbar2Service.open(`message Demo-${idx}`, 'action1', {
      data: { msgType: 'success', isNoClose: true },
      duration: 4000,
      horizontal: 'right',
      vertical: 'top',
    });
    snackbar2Ref.result
      .then((response) => {
        console.log(`2_resolve(${idx} response=${response});`); // #
      })
      .catch(() => {
        console.log(`2_reject(${idx});`); // #
      });
  }
}

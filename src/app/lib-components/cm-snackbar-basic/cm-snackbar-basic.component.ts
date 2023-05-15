import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { GlnSnackbarRef, GlnSnackbarService } from 'gelenium-ui';

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
  public urlPlSnackbar = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SNACKBAR');

  // Page: Basic01
  isShowBasic01 = true;

  // TODO demostartion 'action'
  // Page: Custom05
  isShowCustom05 = true;
  public snackbarRefTemplate: GlnSnackbarRef<EmbeddedViewRef<any>> | null = null;

  idxBasic01 = 1;
  idxBasic02 = 1;

  public msgType01List: string[] = ['default', 'error', 'warning', 'info', 'success'];
  public msgType01a: string = this.msgType01List[0];

  public transition01aList: string[] = ['grow', 'fade', 'blur', 'slide', 'slide-dw', 'slide-lf', 'slide-rg', 'turn', 'turn-y'];
  public transition01a: string = this.transition01aList[0];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private snackbarService: GlnSnackbarService, private viewContainerRef: ViewContainerRef) {
    console.log(`CmSnackbarBasic();`); //#
    // setTimeout(() => {
    //   console.log(`CmSnackbarBasic(); GlnSnackbarOpenUtil.closeAll();`); //#
    //   GlnSnackbarOpenUtil.closeAll();
    // }, 6000);
  }

  // Page: Basic01
  public clickSimple(): void {
    this.snackbarService.open('simple notification !').result.then((response) => {
      console.log(`simple response=${response}`);
    });
  }

  // Page: Custom05
  public clickTemplate(template: TemplateRef<any>, context: Record<string, unknown> | null): void {
    this.snackbarService.openFromTemplate(template, { data: context }).result.then((response) => {
      console.log(`Template response=${response}`);
    });
  }
}

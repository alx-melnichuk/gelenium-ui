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

  // Page: Basic01
  isShowBasic01 = true;
  // Page: Attrib01
  isShowAttrib01 = true;
  // Page: Attrib02
  isShowAttrib02 = false; // # true;
  // Page: Attrib03
  isShowAttrib03 = false; // # true;
  public transition02gList: string[] = ['grow', 'fade', 'blur', 'slide', 'slide-dw', 'slide-lf', 'slide-rg', 'turn', 'turn-y'];
  public transition02g: string = this.transition02gList[0];

  // TODO demostartion 'action'
  // Page: Custom05
  isShowCustom05 = true;
  public snackbarRefTemplate: GlnSnackbarRef<EmbeddedViewRef<any>> | null = null;

  // Page: Config08
  isShowConfig08 = false; // # true;
  public config08 = { horizontal: 'left', vertical: 'top' };

  idxBasic01 = 1;
  idxBasic02 = 1;

  public msgType01List: string[] = ['default', 'error', 'warning', 'info', 'success'];
  public msgType01a: string = this.msgType01List[0];

  public transition01aList: string[] = ['grow', 'fade', 'blur', 'slide', 'slide-dw', 'slide-lf', 'slide-rg', 'turn', 'turn-y'];
  public transition01a: string = this.transition01aList[0];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private snackbarService: GlnSnackbarService, private viewContainerRef: ViewContainerRef) {
    console.log(`CmSnackbarBasic();`); //#
  }

  // Page: Basic01
  public clickSimple(): void {
    this.snackbarService.open('simple notification !').result.then((response) => {
      console.log(`simple response=${response}`);
    });
  }

  // Page: Attrib01
  public clickTypical(message: string, action: string = '', config: any): void {
    this.snackbarService.open(message, action, config);
  }

  // Page: Attrib02
  public clickPosition(message: string, action: string = '', config: any): void {
    this.snackbarService.open(message, action, config);
  }

  // Page: Attrib03
  public getValue02g(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }

  public clickTransition(message: string, config: any): void {
    this.snackbarService.open(message, '', config);
  }

  // Page: Custom05
  public clickTemplate(template: TemplateRef<any>, context: Record<string, unknown> | null): void {
    this.snackbarService.openFromTemplate(template, { data: context }).result.then((response) => {
      console.log(`Template response=${response}`);
    });
  }

  public clickMUI(message: string, action: string | undefined, config: any): void {
    this.snackbarService.open(message, action, config);
  }

  // Page: Config08
  public clickConfig(message: string, config: any): void {
    this.snackbarService.open(message, '', config);
  }

  // ** OLD **

  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }

  public clickDemo1(msgType01a: string, transition01a: string): void {
    const idx: number = this.idxBasic01++;
    const snackbarRef: GlnSnackbarRef<unknown> = this.snackbarService.open(`message Demo-${idx}`, undefined, {
      data: { msgType: msgType01a },
      transition: transition01a,
    });
    snackbarRef.result
      .then((response) => {
        console.log(`1_resolve(${idx} response=${response});`); // #
      })
      .catch(() => {
        console.log(`1_reject(${idx});`); // #
      });
  }

  public clickDemo2(): void {
    const idx: number = this.idxBasic02++;
    const snackbarRef: GlnSnackbarRef<unknown> = this.snackbarService.open(`message Demo-${idx}`, 'action1', {
      data: { msgType: 'success', isNoClose: true },
      duration: 4000,
      horizontal: 'right',
      vertical: 'top',
    });
    snackbarRef.result
      .then((response) => {
        console.log(`2_resolve(${idx} response=${response});`); // #
      })
      .catch(() => {
        console.log(`2_reject(${idx});`); // #
      });
  }
}

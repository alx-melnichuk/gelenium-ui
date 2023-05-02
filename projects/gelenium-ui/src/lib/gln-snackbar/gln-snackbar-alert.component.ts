import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { GLN_SNACKBAR_DATA } from './gln-snackbar-config.interface';
import { GlnSnackbarReference } from './gln-snackbar-reference';

export interface GlnSnackbarAlert {
  data: { message: string; action?: string; msgType?: string; isNoClose?: boolean };
  snackbarRef: GlnSnackbarReference<GlnSnackbarAlert>;
  action: () => void;
  hasAction: boolean;
}

@Component({
  selector: 'gln-snackbar-alert',
  exportAs: 'glnSnackbarAlert',
  templateUrl: './gln-snackbar-alert.component.html',
  styleUrls: ['./gln-snackbar-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarAlertComponent implements GlnSnackbarAlert {
  /** Data that was injected into the snack bar. */
  public data: { message: string; action?: string; msgType?: string; isNoClose?: boolean };
  public hasError: boolean = false;
  public hasWarning: boolean = false;
  public hasInfo: boolean = false;
  public hasSuccess: boolean = false;
  public hasClose: boolean = false;

  /** If the action button should be shown. */
  public get hasAction(): boolean {
    return !!this.data.action;
  }
  public set hasAction(value: boolean) {}

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(GLN_SNACKBAR_DATA) data: any,
    public snackbarRef: GlnSnackbarReference<GlnSnackbarAlertComponent>
  ) {
    this.data = data;

    this.hasError = data.msgType === 'error';
    this.hasSuccess = data.msgType === 'success';
    this.hasInfo = data.msgType === 'info';
    this.hasWarning = data.msgType === 'warning';
    this.hasClose = !data.isNoClose;

    this.renderer.setAttribute(this.hostRef.nativeElement, 'mg-' + this.data.msgType || 'default', '');
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    console.log(`GlnSnackbarAlert.action(${this.data.action})`); // #
    this.snackbarRef.close(this.data.action);
  }

  public close(): void {
    console.log(`GlnSnackbarAlert.action()`); // #
    this.snackbarRef.close();
  }
}

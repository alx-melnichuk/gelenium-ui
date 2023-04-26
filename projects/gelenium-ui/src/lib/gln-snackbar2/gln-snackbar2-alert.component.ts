import { ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { GLN_SNACKBAR2_DATA } from './gln-snackbar2-config.interface';
import { GlnSnackbar2Ref } from './gln-snackbar2-ref';

export type GlnSnackbarAlertIcon = 'error' | 'warning' | 'info' | 'success';

export interface GlnSnackbar2Alert {
  data: { message: string; action?: string; msgType?: string; isNoClose?: boolean };
  snackbarRef: GlnSnackbar2Ref<GlnSnackbar2Alert>;
  action: () => void;
  hasAction: boolean;
}

@Component({
  selector: 'gln-snackbar2-alert',
  exportAs: 'glnSnackbar2Alert',
  templateUrl: './gln-snackbar2-alert.component.html',
  styleUrls: ['./gln-snackbar2-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbar2AlertComponent implements GlnSnackbar2Alert {
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
    @Inject(GLN_SNACKBAR2_DATA) data: any,
    public snackbarRef: GlnSnackbar2Ref<GlnSnackbar2AlertComponent>
  ) {
    this.data = data;

    this.hasError = data.msgType === 'error';
    this.hasSuccess = data.msgType === 'success';
    this.hasInfo = data.msgType === 'info';
    this.hasWarning = data.msgType === 'warning';
    this.hasClose = !data.isNoClose;

    this.renderer.setAttribute(this.hostRef.nativeElement, 'mt-' + this.data.msgType || 'default', '');
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    console.log(`GlnSnackbar2Alert.action(${this.data.action})`); // #
    this.snackbarRef.close(this.data.action);
  }

  public close(): void {
    console.log(`GlnSnackbar2Alert.action()`); // #
    this.snackbarRef.close();
  }
}

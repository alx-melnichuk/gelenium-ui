import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { GLN_SNACKBAR_DATA } from './gln-snackbar-config.interface';
import { GlnSnackbarRef } from './gln-snackbar-reference';
import { GlnSnackbarUtil } from './gln-snackbar.util';

export interface GlnSnackbarParams {
  message: string;
  action?: string;
  msgType?: string;
  isInvert?: boolean;
  isNoClose?: boolean;
}

@Component({
  selector: 'gln-snackbar',
  exportAs: 'glnSnackbar',
  templateUrl: './gln-snackbar.component.html',
  styleUrls: ['./gln-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarComponent implements OnInit {
  /** Data that was injected into the snackbar. */
  @Input('params')
  public data: GlnSnackbarParams;
  public hasError: boolean = false;
  public hasWarning: boolean = false;
  public hasInfo: boolean = false;
  public hasSuccess: boolean = false;
  public hasClose: boolean = false;

  public get hasAction(): boolean {
    return !!this.data.action;
  }
  public set hasAction(value: boolean) {}

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    @Inject(GLN_SNACKBAR_DATA) @Optional() data?: any,
    @Optional() public snackbarRef?: GlnSnackbarRef<GlnSnackbarComponent>
  ) {
    this.data = data || { message: '' };
  }

  public ngOnInit(): void {
    this.hasError = this.data.msgType === 'error';
    this.hasSuccess = this.data.msgType === 'success';
    this.hasInfo = this.data.msgType === 'info';
    this.hasWarning = this.data.msgType === 'warning';
    this.hasClose = !this.data.isNoClose;
    GlnSnackbarUtil.settingCssColor(this.data.msgType, this.hostRef);
    if (this.data.isInvert) {
      this.hostRef.nativeElement.setAttribute('glnsb-invert', '');
    }
  }

  /** Causes the snackbar to close. */
  public action(): void {
    this.snackbarRef?.close(this.data.action);
  }
  /** Causes the snackbar to close with an action. */
  public close(): void {
    this.snackbarRef?.close(undefined);
  }
}

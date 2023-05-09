import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { GLN_SNACKBAR_DATA } from './gln-snackbar-config.interface';
import { GlnSnackbarRef } from './gln-snackbar-reference';
import { GlnSnackbarUtil } from './gln-snackbar.util';

export interface GlnSnackbarParams {
  message: string;
  action?: string;
  msgType?: string;
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
  /** Data that was injected into the snack bar. */
  @Input('params')
  public data: GlnSnackbarParams;
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
    @Inject(GLN_SNACKBAR_DATA) @Optional() data?: any,
    @Optional() public snackbarRef?: GlnSnackbarRef<GlnSnackbarComponent>
  ) {
    this.data = data || { message: '' };
  }

  public ngOnInit(): void {
    console.log(`data=`, this.data); // #
    this.hasError = this.data.msgType === 'error';
    this.hasSuccess = this.data.msgType === 'success';
    this.hasInfo = this.data.msgType === 'info';
    this.hasWarning = this.data.msgType === 'warning';
    this.hasClose = !this.data.isNoClose;

    this.renderer.setAttribute(this.hostRef.nativeElement, 'sn-' + (this.data.msgType || 'default'), '');
    GlnSnackbarUtil.settingCssColor(this.data.msgType, this.hostRef);
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    console.log(`GlnSnackbarAlert.action(${this.data.action})`); // #
    this.snackbarRef?.close(this.data.action);
  }

  public close(): void {
    console.log(`GlnSnackbarAlert.action()`); // #
    this.snackbarRef?.close(undefined);
  }
}

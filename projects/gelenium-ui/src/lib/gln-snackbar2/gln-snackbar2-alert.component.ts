import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { GLN_SNACKBAR2_DATA } from './gln-snackbar2-config.interface';
import { GlnSnackbar2Ref } from './gln-snackbar2-ref';

export interface GlnSnackbar2Alert {
  data: { message: string; action: string };
  snackbarRef: GlnSnackbar2Ref<GlnSnackbar2Alert>;
  action: () => void;
  hasAction: boolean;
}

@Component({
  selector: 'gln-snackbar2-alert',
  templateUrl: './gln-snackbar2-alert.component.html',
  styleUrls: ['./gln-snackbar2-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbar2AlertComponent implements GlnSnackbar2Alert {
  /** Data that was injected into the snack bar. */
  public data: { message: string; action: string };
  public hasError: boolean = false;
  public hasWarning: boolean = false;
  public hasInfo: boolean = false;
  public hasSuccess: boolean = false;

  constructor(
    // { provide: GlnSnackbar2Ref, useValue: snackbarRef },
    // { provide: GLN_SNACKBAR2_DATA, useValue: config.data },

    public snackbarRef: GlnSnackbar2Ref<GlnSnackbar2AlertComponent>,
    @Inject(GLN_SNACKBAR2_DATA) data: any
  ) {
    this.data = data;
    console.log(`GlnSnackbar2Alert() data=`, data); // #
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    console.log(`GlnSnackbar2Alert.action()`); // #
    this.snackbarRef.dismissWithAction();
  }

  /** If the action button should be shown. */
  public get hasAction(): boolean {
    return !!this.data.action;
  }
  public set hasAction(value: boolean) {}
}

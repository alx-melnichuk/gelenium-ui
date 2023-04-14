import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef } from '../gln-snackbar/gln-snackbar-ref';
import { MAT_SNACKBAR1_DATA } from '../gln-snackbar/snack-bar-config';

/**
 * Interface for a simple snack bar component that has a message and a single action.
 */
export interface TextOnlySnackBar {
  data: { message: string; action: string };
  snackBarRef: MatSnackBarRef<TextOnlySnackBar>;
  action: () => void;
  hasAction: boolean;
}

@Component({
  selector: 'gln-snackbar-text',
  templateUrl: './gln-snackbar-text.component.html',
  styleUrls: ['./gln-snackbar-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarTextComponent implements OnInit, TextOnlySnackBar {
  /** Data that was injected into the snack bar. */
  data: { message: string; action: string };

  constructor(public snackBarRef: MatSnackBarRef<GlnSnackbarTextComponent>, @Inject(MAT_SNACKBAR1_DATA) data: any) {
    this.data = data;
  }

  ngOnInit(): void {}

  /** Performs the action on the snack bar. */
  action(): void {
    this.snackBarRef.dismissWithAction();
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.action;
  }
}

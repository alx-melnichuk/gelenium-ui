import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnSnackbarAlertComponent } from './gln-snackbar-alert.component';

@NgModule({
  declarations: [GlnSnackbarAlertComponent],
  imports: [CommonModule],
  exports: [GlnSnackbarAlertComponent],
  entryComponents: [GlnSnackbarAlertComponent],
})
export class GlnSnackbarAlertModule {}

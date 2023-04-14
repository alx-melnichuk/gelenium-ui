import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbarAlertModule } from '../gln-snackbar-alert/gln-snackbar-alert.module';
import { GlnSnackbarContainerModule } from '../gln-snackbar-container/gln-snackbar-container.module';
import { GlnSnackbarTextModule } from '../gln-snackbar-text/gln-snackbar-text.module';

import { GlnSnackbarComponent } from './gln-snackbar.component';

@NgModule({
  declarations: [GlnSnackbarComponent],
  imports: [CommonModule, OverlayModule, GlnSnackbarAlertModule, GlnSnackbarContainerModule, GlnSnackbarTextModule],
  exports: [GlnSnackbarComponent],
})
export class GlnSnackbarModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbarComponent } from './gln-snackbar.component';

@NgModule({
  declarations: [GlnSnackbarComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbarComponent],
})
export class GlnSnackbarModule {}

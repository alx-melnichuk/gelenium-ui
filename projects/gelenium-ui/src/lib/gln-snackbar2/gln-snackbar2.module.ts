import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbar2AlertComponent } from './gln-snackbar2-alert.component';

@NgModule({
  declarations: [GlnSnackbar2AlertComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbar2AlertComponent],
})
export class GlnSnackbar2Module {}

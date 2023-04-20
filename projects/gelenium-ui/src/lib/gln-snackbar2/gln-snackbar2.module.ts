import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbar2AlertComponent } from './gln-snackbar2-alert.component';
import { GlnSnackbar2ContainerComponent } from './gln-snackbar2-container.component';

@NgModule({
  declarations: [GlnSnackbar2AlertComponent, GlnSnackbar2ContainerComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbar2AlertComponent, GlnSnackbar2ContainerComponent],
})
export class GlnSnackbar2Module {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {OverlayModule} from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';

@NgModule({
  declarations: [GlnSnackbarContainerComponent],
  imports: [CommonModule, PortalModule],
  exports: [GlnSnackbarContainerComponent],
})
export class GlnSnackbarContainerModule {}

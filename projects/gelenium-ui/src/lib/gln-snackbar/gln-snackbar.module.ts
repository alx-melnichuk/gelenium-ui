import { inject, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';
import { GlnSnackbarAlertComponent } from './gln-snackbar-alert.component';
import { GlnSnackbarUtil } from './gln-snackbar.util';

@NgModule({
  declarations: [GlnSnackbarAlertComponent, GlnSnackbarContainerComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbarAlertComponent, GlnSnackbarContainerComponent],
})
export class GlnSnackbarModule {
  constructor() {
    GlnSnackbarUtil.injector = inject(Injector);
  }
}

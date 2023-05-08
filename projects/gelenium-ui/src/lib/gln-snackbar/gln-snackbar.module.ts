import { inject, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbarBoxComponent } from './gln-snackbar-box.component';
import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';
import { GlnSnackbarUtil } from './gln-snackbar.util';

@NgModule({
  declarations: [GlnSnackbarBoxComponent, GlnSnackbarContainerComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbarBoxComponent, GlnSnackbarContainerComponent],
})
export class GlnSnackbarModule {
  constructor() {
    GlnSnackbarUtil.injector = inject(Injector);
  }
}

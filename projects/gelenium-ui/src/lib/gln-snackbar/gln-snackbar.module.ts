import { inject, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';
import { GlnSnackbarComponent } from './gln-snackbar.component';
import { GlnSnackbarUtil } from './gln-snackbar.util';

@NgModule({
  declarations: [GlnSnackbarContainerComponent, GlnSnackbarComponent],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSnackbarContainerComponent, GlnSnackbarComponent],
  entryComponents: [GlnSnackbarComponent],
})
export class GlnSnackbarModule {
  constructor() {
    GlnSnackbarUtil.injector = inject(Injector);
  }
}

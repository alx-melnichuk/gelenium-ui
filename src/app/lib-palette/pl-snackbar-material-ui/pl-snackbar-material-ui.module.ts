import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { PlSnackbarMaterialUiComponent } from './pl-snackbar-material-ui.component';

@NgModule({
  declarations: [PlSnackbarMaterialUiComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [PlSnackbarMaterialUiComponent],
})
export class PlSnackbarMaterialUiModule {}

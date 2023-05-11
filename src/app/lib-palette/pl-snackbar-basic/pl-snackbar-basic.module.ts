import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { PlSnackbarBasicComponent } from './pl-snackbar-basic.component';

@NgModule({
  declarations: [PlSnackbarBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [PlSnackbarBasicComponent],
})
export class PlSnackbarBasicModule {}

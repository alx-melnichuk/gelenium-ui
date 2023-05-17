import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { PlSnackbarBootstrapComponent } from './pl-snackbar-bootstrap.component';

@NgModule({
  declarations: [PlSnackbarBootstrapComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [PlSnackbarBootstrapComponent],
})
export class PlSnackbarBootstrapModule {}

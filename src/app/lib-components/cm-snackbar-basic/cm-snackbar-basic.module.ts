import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { CmSnackbarBasicComponent } from './cm-snackbar-basic.component';

@NgModule({
  declarations: [CmSnackbarBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [CmSnackbarBasicComponent],
})
export class CmSnackbarBasicModule {}

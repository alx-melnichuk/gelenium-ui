import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { CmSnackbarConfigComponent } from './cm-snackbar-config.component';

@NgModule({
  declarations: [CmSnackbarConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [CmSnackbarConfigComponent],
})
export class CmSnackbarConfigModule {}

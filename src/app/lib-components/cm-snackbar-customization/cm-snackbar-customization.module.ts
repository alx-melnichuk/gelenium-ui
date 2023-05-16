import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { CmSnackbarCustomizationComponent } from './cm-snackbar-customization.component';

@NgModule({
  declarations: [CmSnackbarCustomizationComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [CmSnackbarCustomizationComponent],
})
export class CmSnackbarCustomizationModule {}

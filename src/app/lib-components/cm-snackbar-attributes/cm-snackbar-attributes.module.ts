import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbarModule } from 'gelenium-ui';

import { CmSnackbarAttributesComponent } from './cm-snackbar-attributes.component';

@NgModule({
  declarations: [CmSnackbarAttributesComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbarModule],
  exports: [CmSnackbarAttributesComponent],
})
export class CmSnackbarAttributesModule {}

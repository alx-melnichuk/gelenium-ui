import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSnackbar2Module } from 'gelenium-ui';

import { CmSnackbarBasicComponent } from './cm-snackbar-basic.component';

@NgModule({
  declarations: [CmSnackbarBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSnackbar2Module],
  exports: [CmSnackbarBasicComponent],
})
export class CmSnackbarBasicModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSnackbarBasicModule } from '../cm-snackbar-basic/cm-snackbar-basic.module';

import { CmSnackbarComponent } from './cm-snackbar.component';
import { CmSnackbarRoutingModule } from './cm-snackbar-routing.module';

@NgModule({
  declarations: [CmSnackbarComponent],
  imports: [CommonModule, CmSnackbarBasicModule, CmSnackbarRoutingModule],
  exports: [CmSnackbarComponent],
})
export class CmSnackbarModule {}

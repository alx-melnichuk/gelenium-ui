import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSnackbarBasicModule } from '../cm-snackbar-basic/cm-snackbar-basic.module';
import { CmSnackbarAttributesModule } from '../cm-snackbar-attributes/cm-snackbar-attributes.module';
import { CmSnackbarConfigModule } from '../cm-snackbar-config/cm-snackbar-config.module';
import { CmSnackbarApiModule } from '../cm-snackbar-api/cm-snackbar-api.module';

import { CmSnackbarComponent } from './cm-snackbar.component';
import { CmSnackbarRoutingModule } from './cm-snackbar-routing.module';

@NgModule({
  declarations: [CmSnackbarComponent],
  imports: [
    CommonModule,
    CmSnackbarBasicModule,
    CmSnackbarAttributesModule,
    CmSnackbarConfigModule,
    CmSnackbarApiModule,
    CmSnackbarRoutingModule,
  ],
  exports: [CmSnackbarComponent],
})
export class CmSnackbarModule {}

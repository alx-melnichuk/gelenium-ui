import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlSnackbarBasicModule } from '../pl-snackbar-basic/pl-snackbar-basic.module';
import { PlSnackbarBootstrapModule } from '../pl-snackbar-bootstrap/pl-snackbar-bootstrap.module';
import { PlSnackbarMaterialUiModule } from '../pl-snackbar-material-ui/pl-snackbar-material-ui.module';

import { PlSnackbarComponent } from './pl-snackbar.component';
import { PlSnackbarRoutingModule } from './pl-snackbar-routing.module';

@NgModule({
  declarations: [PlSnackbarComponent],
  imports: [CommonModule, PlSnackbarBasicModule, PlSnackbarBootstrapModule, PlSnackbarMaterialUiModule, PlSnackbarRoutingModule],
  exports: [PlSnackbarComponent],
})
export class PlSnackbarModule {}

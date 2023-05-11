import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlSnackbarComponent } from './pl-snackbar.component';

const routes: Routes = [{ path: '', component: PlSnackbarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlSnackbarRoutingModule {}

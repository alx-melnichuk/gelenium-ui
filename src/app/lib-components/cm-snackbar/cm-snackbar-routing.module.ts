import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmSnackbarComponent } from './cm-snackbar.component';

const routes: Routes = [{ path: '', component: CmSnackbarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmSnackbarRoutingModule {}

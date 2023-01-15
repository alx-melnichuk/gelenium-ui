import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmSpinnerComponent } from './cm-spinner.component';

const routes: Routes = [{ path: '', component: CmSpinnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmSpinnerRoutingModule {}

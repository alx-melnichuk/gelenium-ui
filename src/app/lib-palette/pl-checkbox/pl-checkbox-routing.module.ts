import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlCheckboxComponent } from './pl-checkbox.component';

const routes: Routes = [{ path: '', component: PlCheckboxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlCheckboxRoutingModule {}

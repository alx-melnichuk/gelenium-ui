import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmCheckboxComponent } from './cm-checkbox.component';

const routes: Routes = [{ path: '', component: CmCheckboxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmCheckboxRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmDatepickerComponent } from './cm-datepicker.component';

const routes: Routes = [{ path: '', component: CmDatepickerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmDatepickerRoutingModule {}

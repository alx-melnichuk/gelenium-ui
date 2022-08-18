import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlSelectComponent } from './pl-select.component';

const routes: Routes = [{ path: '', component: PlSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlSelectRoutingModule {}

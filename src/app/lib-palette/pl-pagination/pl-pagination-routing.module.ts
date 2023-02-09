import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlPaginationComponent } from './pl-pagination.component';

const routes: Routes = [{ path: '', component: PlPaginationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlPaginationRoutingModule {}

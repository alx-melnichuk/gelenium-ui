import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmPaginationComponent } from './cm-pagination.component';

const routes: Routes = [{ path: '', component: CmPaginationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmPaginationRoutingModule {}

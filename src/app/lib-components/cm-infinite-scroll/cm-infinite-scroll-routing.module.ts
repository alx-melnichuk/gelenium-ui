import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmInfiniteScrollComponent } from './cm-infinite-scroll.component';

const routes: Routes = [{ path: '', component: CmInfiniteScrollComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmInfiniteScrollRoutingModule {}

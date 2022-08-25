import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GdStartComponent } from './gd-start.component';

const routes: Routes = [{ path: '', component: GdStartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GdStartRoutingModule {}

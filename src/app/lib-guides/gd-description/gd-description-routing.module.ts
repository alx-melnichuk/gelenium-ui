import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GdDescriptionComponent } from './gd-description.component';

const routes: Routes = [{ path: '', component: GdDescriptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GdDescriptionRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlButtonComponent } from './pl-button.component';

const routes: Routes = [{ path: '', component: PlButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlButtonRoutingModule {}

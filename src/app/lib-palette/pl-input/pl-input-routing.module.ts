import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlInputComponent } from './pl-input.component';

const routes: Routes = [{ path: '', component: PlInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlInputRoutingModule {}

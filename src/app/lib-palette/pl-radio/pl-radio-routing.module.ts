import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlRadioComponent } from './pl-radio.component';

const routes: Routes = [{ path: '', component: PlRadioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlRadioRoutingModule {}

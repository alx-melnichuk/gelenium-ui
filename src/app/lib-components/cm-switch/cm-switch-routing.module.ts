import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmSwitchComponent } from './cm-switch.component';

const routes: Routes = [{ path: '', component: CmSwitchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmSwitchRoutingModule {}

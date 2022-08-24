import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrAutoFocuseComponent } from './dr-auto-focuse.component';

const routes: Routes = [{ path: '', component: DrAutoFocuseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrAutoFocuseRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoFocuseComponent } from './auto-focuse.component';

const routes: Routes = [{ path: '', component: AutoFocuseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoFocuseRoutingModule {}

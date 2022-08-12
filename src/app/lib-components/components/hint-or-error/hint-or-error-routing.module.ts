import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HintOrErrorComponent } from './hint-or-error.component';

const routes: Routes = [{ path: '', component: HintOrErrorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HintOrErrorRoutingModule {}

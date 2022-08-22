import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmInputComponent } from './cm-input.component';

const routes: Routes = [{ path: '', component: CmInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmInputRoutingModule {}

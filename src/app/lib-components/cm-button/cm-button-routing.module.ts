import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmButtonComponent } from './cm-button.component';

const routes: Routes = [{ path: '', component: CmButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmButtonRoutingModule {}

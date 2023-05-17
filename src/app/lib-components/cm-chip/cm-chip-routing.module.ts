import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmChipComponent } from './cm-chip.component';

const routes: Routes = [{ path: '', component: CmChipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmChipRoutingModule {}

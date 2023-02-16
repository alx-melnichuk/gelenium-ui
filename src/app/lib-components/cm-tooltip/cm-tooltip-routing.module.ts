import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmTooltipComponent } from './cm-tooltip.component';

const routes: Routes = [{ path: '', component: CmTooltipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmTooltipRoutingModule {}

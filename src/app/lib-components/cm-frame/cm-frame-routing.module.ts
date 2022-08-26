import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmFrameComponent } from './cm-frame.component';

const routes: Routes = [{ path: '', component: CmFrameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmFrameRoutingModule {}

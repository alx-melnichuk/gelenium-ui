import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlFrameComponent } from './pl-frame.component';

const routes: Routes = [{ path: '', component: PlFrameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlFrameRoutingModule {}

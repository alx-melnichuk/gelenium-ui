import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrRegexRemoveComponent } from './dr-regex-remove.component';

const routes: Routes = [{ path: '', component: DrRegexRemoveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrRegexRemoveRoutingModule {}

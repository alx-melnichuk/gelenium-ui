import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegexRemoveComponent } from './regex-remove.component';

const routes: Routes = [{ path: '', component: RegexRemoveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegexRemoveRoutingModule {}

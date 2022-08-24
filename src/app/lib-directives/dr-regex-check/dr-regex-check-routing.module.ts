import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrRegexCheckComponent } from './dr-regex-check.component';

const routes: Routes = [{ path: '', component: DrRegexCheckComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrRegexCheckRoutingModule {}

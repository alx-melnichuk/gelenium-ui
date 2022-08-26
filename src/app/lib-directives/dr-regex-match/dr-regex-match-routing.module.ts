import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrRegexMatchComponent } from './dr-regex-match.component';

const routes: Routes = [{ path: '', component: DrRegexMatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrRegexMatchRoutingModule {}

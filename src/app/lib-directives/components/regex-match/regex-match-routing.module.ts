import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegexMatchComponent } from './regex-match.component';

const routes: Routes = [{ path: '', component: RegexMatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegexMatchRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegexCheckComponent } from './regex-check.component';

const routes: Routes = [{ path: '', component: RegexCheckComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegexCheckRoutingModule {}

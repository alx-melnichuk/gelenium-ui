import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmHintOrErrorComponent } from './cm-hint-or-error.component';

const routes: Routes = [{ path: '', component: CmHintOrErrorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmHintOrErrorRoutingModule {}

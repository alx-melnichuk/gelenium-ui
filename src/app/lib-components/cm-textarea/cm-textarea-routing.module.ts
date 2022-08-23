import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmTextareaComponent } from './cm-textarea.component';

const routes: Routes = [{ path: '', component: CmTextareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmTextareaRoutingModule {}

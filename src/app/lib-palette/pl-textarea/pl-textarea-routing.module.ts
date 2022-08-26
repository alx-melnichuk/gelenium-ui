import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlTextareaComponent } from './pl-textarea.component';

const routes: Routes = [{ path: '', component: PlTextareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlTextareaRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmRadioComponent } from './cm-radio.component';

const routes: Routes = [{ path: '', component: CmRadioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmRadioRoutingModule {}

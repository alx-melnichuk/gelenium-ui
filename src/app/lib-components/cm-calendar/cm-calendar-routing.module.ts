import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmCalendarComponent } from './cm-calendar.component';

const routes: Routes = [{ path: '', component: CmCalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmCalendarRoutingModule {}

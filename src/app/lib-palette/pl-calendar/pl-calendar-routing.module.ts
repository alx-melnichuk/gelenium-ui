import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlCalendarComponent } from './pl-calendar.component';

const routes: Routes = [{ path: '', component: PlCalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlCalendarRoutingModule {}

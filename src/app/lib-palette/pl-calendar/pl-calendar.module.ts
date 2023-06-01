import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlCalendarBasicModule } from '../pl-calendar-basic/pl-calendar-basic.module';
import { PlCalendarBootstrapModule } from '../pl-calendar-bootstrap/pl-calendar-bootstrap.module';
import { PlCalendarMaterialUiModule } from '../pl-calendar-material-ui/pl-calendar-material-ui.module';

import { PlCalendarComponent } from './pl-calendar.component';
import { PlCalendarRoutingModule } from './pl-calendar-routing.module';

@NgModule({
  declarations: [PlCalendarComponent],
  imports: [CommonModule, PlCalendarBasicModule, PlCalendarBootstrapModule, PlCalendarMaterialUiModule, PlCalendarRoutingModule],
  exports: [PlCalendarComponent],
})
export class PlCalendarModule {}

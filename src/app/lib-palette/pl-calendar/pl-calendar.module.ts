import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlCalendarBasicModule } from '../pl-calendar-basic/pl-calendar-basic.module';

import { PlCalendarComponent } from './pl-calendar.component';
import { PlCalendarRoutingModule } from './pl-calendar-routing.module';

@NgModule({
  declarations: [PlCalendarComponent],
  imports: [CommonModule, PlCalendarBasicModule, PlCalendarRoutingModule],
  exports: [PlCalendarComponent],
})
export class PlCalendarModule {}

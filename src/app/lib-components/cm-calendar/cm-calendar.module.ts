import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmCalendarBasicModule } from '../cm-calendar-basic/cm-calendar-basic.module';
import { CmCalendarAttributesModule } from '../cm-calendar-attributes/cm-calendar-attributes.module';

import { CmCalendarComponent } from './cm-calendar.component';
import { CmCalendarRoutingModule } from './cm-calendar-routing.module';

@NgModule({
  declarations: [CmCalendarComponent],
  imports: [CommonModule, CmCalendarBasicModule, CmCalendarAttributesModule, CmCalendarRoutingModule],
  exports: [CmCalendarComponent],
})
export class CmCalendarModule {}

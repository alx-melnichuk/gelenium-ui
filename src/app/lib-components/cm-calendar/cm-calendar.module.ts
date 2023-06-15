import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmCalendarBasicModule } from '../cm-calendar-basic/cm-calendar-basic.module';
import { CmCalendarAttributesModule } from '../cm-calendar-attributes/cm-calendar-attributes.module';
import { CmCalendarSizeModule } from '../cm-calendar-size/cm-calendar-size.module';
import { CmCalendarConfigModule } from '../cm-calendar-config/cm-calendar-config.module';
import { CmCalendarApiModule } from '../cm-calendar-api/cm-calendar-api.module';

import { CmCalendarComponent } from './cm-calendar.component';
import { CmCalendarRoutingModule } from './cm-calendar-routing.module';

@NgModule({
  declarations: [CmCalendarComponent],
  imports: [
    CommonModule,
    CmCalendarBasicModule,
    CmCalendarAttributesModule,
    CmCalendarSizeModule,
    CmCalendarConfigModule,
    CmCalendarApiModule,
    CmCalendarRoutingModule,
  ],
  exports: [CmCalendarComponent],
})
export class CmCalendarModule {}

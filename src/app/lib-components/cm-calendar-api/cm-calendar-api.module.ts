import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmCalendarApiComponent } from './cm-calendar-api.component';

@NgModule({
  declarations: [CmCalendarApiComponent],
  imports: [CommonModule],
  exports: [CmCalendarApiComponent],
})
export class CmCalendarApiModule {}

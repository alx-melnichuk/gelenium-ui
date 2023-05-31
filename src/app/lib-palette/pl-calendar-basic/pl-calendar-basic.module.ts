import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnDatepickerModule, GlnColorModule } from 'gelenium-ui';

import { PlCalendarBasicComponent } from './pl-calendar-basic.component';

@NgModule({
  declarations: [PlCalendarBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnDatepickerModule, GlnColorModule],
  exports: [PlCalendarBasicComponent],
})
export class PlCalendarBasicModule {}

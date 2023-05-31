import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnDatepickerModule } from 'gelenium-ui';

import { PlCalendarBootstrapComponent } from './pl-calendar-bootstrap.component';

@NgModule({
  declarations: [PlCalendarBootstrapComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnDatepickerModule],
  exports: [PlCalendarBootstrapComponent],
})
export class PlCalendarBootstrapModule {}

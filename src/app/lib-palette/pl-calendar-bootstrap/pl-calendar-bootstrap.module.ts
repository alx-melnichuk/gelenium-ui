import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { PlCalendarBootstrapComponent } from './pl-calendar-bootstrap.component';

@NgModule({
  declarations: [PlCalendarBootstrapComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [PlCalendarBootstrapComponent],
})
export class PlCalendarBootstrapModule {}

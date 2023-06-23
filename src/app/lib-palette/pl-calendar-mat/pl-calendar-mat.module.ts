import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { PlCalendarMatComponent } from './pl-calendar-mat.component';

@NgModule({
  declarations: [PlCalendarMatComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [PlCalendarMatComponent],
})
export class PlCalendarMatModule {}

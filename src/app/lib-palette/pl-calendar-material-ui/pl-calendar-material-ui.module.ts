import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { PlCalendarMaterialUiComponent } from './pl-calendar-material-ui.component';

@NgModule({
  declarations: [PlCalendarMaterialUiComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [PlCalendarMaterialUiComponent],
})
export class PlCalendarMaterialUiModule {}

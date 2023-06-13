import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { CmCalendarSizeComponent } from './cm-calendar-size.component';

@NgModule({
  declarations: [CmCalendarSizeComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [CmCalendarSizeComponent],
})
export class CmCalendarSizeModule {}

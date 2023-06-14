import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { CmCalendarConfigComponent } from './cm-calendar-config.component';

@NgModule({
  declarations: [CmCalendarConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [CmCalendarConfigComponent],
})
export class CmCalendarConfigModule {}

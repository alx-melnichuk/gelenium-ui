import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { CmCalendarBasicComponent } from './cm-calendar-basic.component';

@NgModule({
  declarations: [CmCalendarBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [CmCalendarBasicComponent],
})
export class CmCalendarBasicModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCalendarModule } from 'gelenium-ui';

import { CmCalendarAttributesComponent } from './cm-calendar-attributes.component';

@NgModule({
  declarations: [CmCalendarAttributesComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnCalendarModule],
  exports: [CmCalendarAttributesComponent],
})
export class CmCalendarAttributesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import {
  GlnCalendarModule,
  GlnColorModule, // GlnColorModule only for page: Palette.
} from 'gelenium-ui';

import { CmCalendarBasicComponent } from './cm-calendar-basic.component';

@NgModule({
  declarations: [CmCalendarBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCalendarModule, GlnColorModule],
  exports: [CmCalendarBasicComponent],
})
export class CmCalendarBasicModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnCalendarComponent } from './gln-calendar.component';

@NgModule({
  declarations: [GlnCalendarComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [GlnCalendarComponent],
})
export class GlnCalendarModule {}

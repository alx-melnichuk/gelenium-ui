import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnDatepickerComponent } from './gln-datepicker.component';
import { GlnCalendarComponent } from './gln-calendar.component';

@NgModule({
  declarations: [GlnDatepickerComponent, GlnCalendarComponent],
  imports: [CommonModule, OverlayModule, ReactiveFormsModule, GlnFrameModule, GlnHintOrErrorModule],
  exports: [GlnDatepickerComponent, GlnCalendarComponent],
})
export class GlnDatepickerModule {}

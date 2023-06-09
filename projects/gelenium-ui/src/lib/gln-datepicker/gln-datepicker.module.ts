import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnCalendarModule } from '../gln-calendar/gln-calendar.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnDatepickerComponent } from './gln-datepicker.component';

@NgModule({
  declarations: [GlnDatepickerComponent],
  imports: [CommonModule, OverlayModule, ReactiveFormsModule, GlnCalendarModule, GlnFrameModule, GlnHintOrErrorModule],
  exports: [GlnDatepickerComponent],
})
export class GlnDatepickerModule {}

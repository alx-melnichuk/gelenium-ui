import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnInputComponent } from './gln-input.component';

@NgModule({
  declarations: [GlnInputComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnFrameModule, GlnHintOrErrorModule],
  exports: [GlnInputComponent],
})
export class GlnInputModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnColorModule } from '../directives/gln-color/gln-color.module';
import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnInputComponent } from './gln-input.component';

@NgModule({
  declarations: [GlnInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GlnColorModule,
    GlnFrameExteriorInputModule,
    GlnFrameModule,
    GlnFrameOrnamentModule,
    GlnFrameSizeModule,
    GlnHintOrErrorModule,
  ],
  exports: [GlnInputComponent],
})
export class GlnInputModule {}

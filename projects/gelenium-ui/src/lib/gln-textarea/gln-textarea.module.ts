import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GlnColorModule } from '../directives/gln-color/gln-color.module'; // Required for: color="primary"
import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnTextareaComponent } from './gln-textarea.component';

@NgModule({
  declarations: [GlnTextareaComponent],
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
  exports: [GlnTextareaComponent],
})
export class GlnTextareaModule {}

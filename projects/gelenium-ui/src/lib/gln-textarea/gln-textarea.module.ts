import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';

import { GlnTextareaComponent } from './gln-textarea.component';

@NgModule({
  declarations: [GlnTextareaComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnFrameModule, GlnFrameOrnamentModule, GlnHintOrErrorModule],
  exports: [GlnTextareaComponent],
})
export class GlnTextareaModule {}

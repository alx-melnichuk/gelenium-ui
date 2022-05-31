import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnFrameExteriorInputModule } from '../directives/grn-frame-exterior-input/grn-frame-exterior-input.module';
import { GrnFrameModule } from '../grn-frame/grn-frame.module';
import { GrnFrameOrnamentModule } from '../directives/grn-frame-ornament/grn-frame-ornament.module';
import { GrnFrameSizeModule } from '../directives/grn-frame-size/grn-frame-size.module';
import { GrnHintOrErrorModule } from '../grn-hint-or-error/grn-hint-or-error.module';

import { GrnTextareaComponent } from './grn-textarea.component';

@NgModule({
  declarations: [GrnTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GrnFrameExteriorInputModule,
    GrnFrameModule,
    GrnFrameOrnamentModule,
    GrnFrameSizeModule,
    GrnHintOrErrorModule,
  ],
  exports: [GrnTextareaComponent],
})
export class GrnTextareaModule {}

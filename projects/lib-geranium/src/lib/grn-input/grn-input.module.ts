import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';
import { GrnHintOrErrorModule } from '../grn-hint-or-error/grn-hint-or-error.module';

import { GrnInputComponent } from './grn-input.component';

@NgModule({
  declarations: [GrnInputComponent],
  imports: [CommonModule, ReactiveFormsModule, GrnFrameInputModule, GrnHintOrErrorModule],
  exports: [GrnInputComponent],
})
export class GrnInputModule {}

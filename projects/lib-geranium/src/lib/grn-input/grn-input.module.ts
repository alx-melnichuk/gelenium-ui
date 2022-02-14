import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';
import { GrnFrameInput2Module } from '../grn-frame-input2/grn-frame-input2.module';
import { GrnHintOrErrorModule } from '../grn-hint-or-error/grn-hint-or-error.module';

import { GrnInputComponent } from './grn-input.component';

@NgModule({
  declarations: [GrnInputComponent],
  imports: [CommonModule, ReactiveFormsModule, GrnFrameInputModule, GrnFrameInput2Module, GrnHintOrErrorModule],
  exports: [GrnInputComponent],
})
export class GrnInputModule {}

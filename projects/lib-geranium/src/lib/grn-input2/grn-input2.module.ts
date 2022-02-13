import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnSizeModule } from '../directives/grn-size/grn-size.module';
import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';
import { GrnFrameInput2Module } from '../grn-frame-input2/grn-frame-input2.module';
import { GrnFrameInputWrapModule } from '../grn-frame-input-wrap/grn-frame-input-wrap.module';
import { GrnHintOrErrorModule } from '../grn-hint-or-error/grn-hint-or-error.module';

import { GrnInput2Component } from './grn-input2.component';

@NgModule({
  declarations: [GrnInput2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GrnFrameInputModule,
    GrnFrameInput2Module,
    GrnSizeModule,
    GrnFrameInputWrapModule,
    GrnHintOrErrorModule,
  ],
  exports: [GrnInput2Component],
})
export class GrnInput2Module {}

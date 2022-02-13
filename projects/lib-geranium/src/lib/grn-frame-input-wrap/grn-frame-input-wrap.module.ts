import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnSizeModule } from '../directives/grn-size/grn-size.module';
import { GrnFrameInput2Module } from '../grn-frame-input2/grn-frame-input2.module';

import { GrnFrameInputWrapComponent } from './grn-frame-input-wrap.component';

@NgModule({
  declarations: [GrnFrameInputWrapComponent],
  imports: [CommonModule, GrnSizeModule, GrnFrameInput2Module],
  exports: [GrnFrameInputWrapComponent],
})
export class GrnFrameInputWrapModule {}

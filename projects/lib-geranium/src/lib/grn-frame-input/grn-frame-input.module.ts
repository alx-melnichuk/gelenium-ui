import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameSizeModule } from '../directives/grn-frame-size/grn-frame-size.module';

import { GrnFrameInputComponent } from './grn-frame-input.component';

@NgModule({
  declarations: [GrnFrameInputComponent],
  imports: [CommonModule, GrnFrameSizeModule],
  exports: [GrnFrameInputComponent],
})
export class GrnFrameInputModule {}

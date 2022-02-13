import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameInput2Component } from './grn-frame-input2.component';
import { GrnSizeModule } from '../directives/grn-size/grn-size.module';

@NgModule({
  declarations: [GrnFrameInput2Component],
  imports: [CommonModule, GrnSizeModule],
  exports: [GrnFrameInput2Component],
})
export class GrnFrameInput2Module {}

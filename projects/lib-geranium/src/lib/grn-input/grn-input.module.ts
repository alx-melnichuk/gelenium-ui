import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';
import { GrnFrameSizeModule } from '../directives/grn-frame-size/grn-frame-size.module';
import { GrnRegexModule } from '../directives/grn-regex/grn-regex.module';

import { GrnInputComponent } from './grn-input.component';

@NgModule({
  declarations: [GrnInputComponent],
  imports: [CommonModule, ReactiveFormsModule, GrnFrameInputModule, GrnRegexModule, GrnFrameSizeModule],
  exports: [GrnInputComponent],
})
export class GrnInputModule {}

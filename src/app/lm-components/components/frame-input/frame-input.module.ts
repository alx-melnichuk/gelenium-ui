import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameInputBasicModule } from '../frame-input-basic/frame-input-basic.module';
import { FrameInputFrameSizeModule } from '../frame-input-frame-size/frame-input-frame-size.module';
import { FrameInputLabelModule } from '../frame-input-label/frame-input-label.module';
import { FrameInputHelperTextModule } from '../frame-input-helper-text/frame-input-helper-text.module';
import { FrameInputBorderRadiusModule } from '../frame-input-border-radius/frame-input-border-radius.module';

import { FrameInputComponent } from './frame-input.component';

@NgModule({
  declarations: [FrameInputComponent],
  imports: [
    CommonModule,
    FrameInputBasicModule,
    FrameInputFrameSizeModule,
    FrameInputLabelModule,
    FrameInputHelperTextModule,
    FrameInputBorderRadiusModule,
  ],
  exports: [FrameInputComponent],
})
export class FrameInputModule {}

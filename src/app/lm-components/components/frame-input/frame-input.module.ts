import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameInputBasicModule } from '../frame-input-basic/frame-input-basic.module';
import { FrameInputFrameSizeModule } from '../frame-input-frame-size/frame-input-frame-size.module';
import { FrameInputLabelModule } from '../frame-input-label/frame-input-label.module';
import { FrameInputHelperTextModule } from '../frame-input-helper-text/frame-input-helper-text.module';
import { FrameInputBorderRadiusModule } from '../frame-input-border-radius/frame-input-border-radius.module';
import { FrameInputPaletteModule } from '../frame-input-palette/frame-input-palette.module';
import { FrameInputConfigModule } from '../frame-input-config/frame-input-config.module';
import { FrameInputApiModule } from '../frame-input-api/frame-input-api.module';

import { FrameInputComponent } from './frame-input.component';
import { UrlComponents } from '../../constants/url-components.constants';

UrlComponents.add('URL_FRAME_INPUT', 'frame-input');

@NgModule({
  declarations: [FrameInputComponent],
  imports: [
    CommonModule,
    FrameInputBasicModule,
    FrameInputFrameSizeModule,
    FrameInputLabelModule,
    FrameInputHelperTextModule,
    FrameInputBorderRadiusModule,
    FrameInputPaletteModule,
    FrameInputConfigModule,
    FrameInputApiModule,
  ],
  exports: [FrameInputComponent],
})
export class FrameInputModule {}

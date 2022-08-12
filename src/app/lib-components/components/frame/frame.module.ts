import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameBasicModule } from '../frame-basic/frame-basic.module';
import { FrameAttributesModule } from '../frame-attributes/frame-attributes.module';
import { FrameSizeModule } from '../frame-size/frame-size.module';
import { FrameLabelModule } from '../frame-label/frame-label.module';
import { FrameHelperTextModule } from '../frame-helper-text/frame-helper-text.module';
import { FrameBorderRadiusModule } from '../frame-border-radius/frame-border-radius.module';
import { FramePaletteModule } from '../frame-palette/frame-palette.module';
import { FramePalette2Module } from '../frame-palette2/frame-palette2.module';
import { FramePalette3Module } from '../frame-palette3/frame-palette3.module';
import { FrameFeatureModule } from '../frame-feature/frame-feature.module';
import { FrameStructureModule } from '../frame-structure/frame-structure.module';
import { FrameConfigModule } from '../frame-config/frame-config.module';
import { FrameApiModule } from '../frame-api/frame-api.module';

import { FrameComponent } from './frame.component';
import { FrameRoutingModule } from './frame-routing.module';

@NgModule({
  declarations: [FrameComponent],
  imports: [
    CommonModule,
    FrameBasicModule,
    FrameAttributesModule,
    FrameSizeModule,
    FrameLabelModule,
    FrameHelperTextModule,
    FrameBorderRadiusModule,
    FramePaletteModule,
    FramePalette2Module,
    FramePalette3Module,
    FrameFeatureModule,
    FrameStructureModule,
    FrameConfigModule,
    FrameApiModule,
    FrameRoutingModule,
  ],
  exports: [FrameComponent],
})
export class FrameModule {}

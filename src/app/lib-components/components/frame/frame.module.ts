import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FramePaletteModule } from '../frame-palette/frame-palette.module';
import { FramePalette2Module } from '../frame-palette2/frame-palette2.module';
import { FramePalette3Module } from '../frame-palette3/frame-palette3.module';

import { FrameComponent } from './frame.component';
import { FrameRoutingModule } from './frame-routing.module';

@NgModule({
  declarations: [FrameComponent],
  imports: [CommonModule, FramePaletteModule, FramePalette2Module, FramePalette3Module, FrameRoutingModule],
  exports: [FrameComponent],
})
export class FrameModule {}

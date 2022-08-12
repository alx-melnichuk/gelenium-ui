import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { FramePaletteModule } from '../frame-palette/frame-palette.module';
import { FramePalette2Module } from '../frame-palette2/frame-palette2.module';
import { FramePalette3Module } from '../frame-palette3/frame-palette3.module';
import { FrameFeatureModule } from '../frame-feature/frame-feature.module';
import { FrameStructureModule } from '../frame-structure/frame-structure.module';
import { FrameConfigModule } from '../frame-config/frame-config.module';
import { FrameApiModule } from '../frame-api/frame-api.module';

import { Frame2Component } from './frame2.component';

UrlComponents.add('URL_FRAME2', 'frame2');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME2');
const siteUrls: SiteUrl[] = [
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Feature', url, fragment: 'Feature' },
  { label: 'Structure', url, fragment: 'Structure' },
  { label: 'Config', url, fragment: 'Config' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Frame part 2', { label: 'Frame part 2', siteUrls });

@NgModule({
  declarations: [Frame2Component],
  imports: [
    CommonModule,
    FramePaletteModule,
    FramePalette2Module,
    FramePalette3Module,
    FrameFeatureModule,
    FrameStructureModule,
    FrameConfigModule,
    FrameApiModule,
  ],
  exports: [Frame2Component],
})
export class Frame2Module {}

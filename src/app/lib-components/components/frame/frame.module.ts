import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

import { FrameBasicModule } from '../frame-basic/frame-basic.module';
import { FrameSizeModule } from '../frame-size/frame-size.module';
import { FrameLabelModule } from '../frame-label/frame-label.module';
import { FrameHelperTextModule } from '../frame-helper-text/frame-helper-text.module';
import { FrameBorderRadiusModule } from '../frame-border-radius/frame-border-radius.module';
import { FramePaletteModule } from '../frame-palette/frame-palette.module';
import { FrameConfigModule } from '../frame-config/frame-config.module';
import { FrameStructureModule } from '../frame-structure/frame-structure.module';
import { FrameApiModule } from '../frame-api/frame-api.module';

import { FrameComponent } from './frame.component';

UrlComponents.add('URL_FRAME', 'frame');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Frame size', url, fragment: 'FrameSize' },
  { label: 'Label', url, fragment: 'Label' },
  { label: 'Helper text', url, fragment: 'HelperText' },
  { label: 'Border radius', url, fragment: 'BorderRadius' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Structure', url, fragment: 'Structure' },
  { label: 'Config', url, fragment: 'Config' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Frame', { label: 'Frame', siteUrls });

@NgModule({
  declarations: [FrameComponent],
  imports: [
    CommonModule,
    FrameBasicModule,
    FrameSizeModule,
    FrameLabelModule,
    FrameHelperTextModule,
    FrameBorderRadiusModule,
    FramePaletteModule,
    FrameStructureModule,
    FrameConfigModule,
    FrameApiModule,
  ],
  exports: [FrameComponent],
})
export class FrameModule {}

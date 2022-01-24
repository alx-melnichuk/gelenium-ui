import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

import { FrameInputBasicModule } from '../frame-input-basic/frame-input-basic.module';
import { FrameInputFrameSizeModule } from '../frame-input-frame-size/frame-input-frame-size.module';
import { FrameInputLabelModule } from '../frame-input-label/frame-input-label.module';
import { FrameInputHelperTextModule } from '../frame-input-helper-text/frame-input-helper-text.module';
import { FrameInputBorderRadiusModule } from '../frame-input-border-radius/frame-input-border-radius.module';
import { FrameInputPaletteModule } from '../frame-input-palette/frame-input-palette.module';
import { FrameInputConfigModule } from '../frame-input-config/frame-input-config.module';
import { FrameInputApiModule } from '../frame-input-api/frame-input-api.module';

import { FrameInputComponent } from './frame-input.component';

UrlComponents.add('URL_FRAME_INPUT', 'frame-input');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME_INPUT');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Frame size', url, fragment: 'FrameSize' },
  { label: 'Label', url, fragment: 'Label' },
  { label: 'Helper text', url, fragment: 'HelperText' },
  { label: 'Border radius', url, fragment: 'BorderRadius' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Config', url, fragment: 'Config' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'FrameInput', { order: 0, expanded: false, label: 'FrameInput', siteUrls });

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

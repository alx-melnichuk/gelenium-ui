import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { FrameBasicModule } from '../frame-basic/frame-basic.module';
import { FrameAttributesModule } from '../frame-attributes/frame-attributes.module';
import { FrameSizeModule } from '../frame-size/frame-size.module';
import { FrameLabelModule } from '../frame-label/frame-label.module';
import { FrameHelperTextModule } from '../frame-helper-text/frame-helper-text.module';
import { FrameBorderRadiusModule } from '../frame-border-radius/frame-border-radius.module';

import { Frame1Component } from './frame1.component';

UrlComponents.add('URL_FRAME1', 'frame1');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME1');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Frame size', url, fragment: 'FrameSize' },
  { label: 'Label', url, fragment: 'Label' },
  { label: 'Helper text', url, fragment: 'HelperText' },
  { label: 'Border radius', url, fragment: 'BorderRadius' },
];
SiteMenuUtil.addItem('Components', 'Frame part 1', { label: 'Frame part 1', siteUrls });

@NgModule({
  declarations: [Frame1Component],
  imports: [
    CommonModule,
    FrameBasicModule,
    FrameAttributesModule,
    FrameSizeModule,
    FrameLabelModule,
    FrameHelperTextModule,
    FrameBorderRadiusModule,
  ],
  exports: [Frame1Component],
})
export class Frame1Module {}

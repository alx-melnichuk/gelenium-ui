import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { ButtonBasicModule } from '../button-basic/button-basic.module';
import { ButtonAttributesModule } from '../button-attributes/button-attributes.module';
import { ButtonSizeModule } from '../button-size/button-size.module';
import { ButtonBorderRadiusModule } from '../button-border-radius/button-border-radius.module';

import { Button1Component } from './button1.component';

UrlComponents.add('URL_BUTTON1', 'button1');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON1');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Size', url, fragment: 'Size' },
  { label: 'Border Radius', url, fragment: 'BorderRadius' },
];
SiteMenuUtil.addItem('Components', 'Button part 1', { label: 'Button part 1', siteUrls });

@NgModule({
  declarations: [Button1Component],
  imports: [CommonModule, ButtonBasicModule, ButtonAttributesModule, ButtonSizeModule, ButtonBorderRadiusModule],
  exports: [Button1Component],
})
export class Button1Module {}

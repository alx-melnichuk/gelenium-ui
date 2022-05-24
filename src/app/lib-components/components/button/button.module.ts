import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

import { ButtonComponent } from './button.component';

import { ButtonBasicModule } from '../button-basic/button-basic.module';
import { ButtonAttributesModule } from '../button-attributes/button-attributes.module';
import { ButtonSizeModule } from '../button-size/button-size.module';
import { ButtonBorderRadiusModule } from '../button-border-radius/button-border-radius.module';
import { ButtonOrnamentsModule } from '../button-ornaments/button-ornaments.module';
import { ButtonPaletteModule } from '../button-palette/button-palette.module';

UrlComponents.add('URL_BUTTON', 'button');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Size', url, fragment: 'Size' },
  { label: 'Border Radius', url, fragment: 'BorderRadius' },
  { label: 'Ornaments', url, fragment: 'Ornaments' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Button', { label: 'Button', siteUrls });

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    ButtonBasicModule,
    ButtonAttributesModule,
    ButtonSizeModule,
    ButtonBorderRadiusModule,
    ButtonOrnamentsModule,
    ButtonPaletteModule,
  ],
  exports: [ButtonComponent],
})
export class ButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from '../../../lib-core/constants/site-menu';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { ButtonOrnamentsModule } from '../button-ornaments/button-ornaments.module';
import { ButtonPaletteModule } from '../button-palette/button-palette.module';
import { ButtonPalette2Module } from '../button-palette2/button-palette2.module';
import { ButtonPalette3Module } from '../button-palette3/button-palette3.module';
import { ButtonConfigModule } from '../button-config/button-config.module';
import { ButtonApiModule } from '../button-api/button-api.module';

import { Button2Component } from './button2.component';

UrlComponents.add('URL_BUTTON2', 'button2');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON2');
const siteUrls: SiteUrl[] = [
  { label: 'Ornaments', url, fragment: 'Ornaments' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Config', url, fragment: 'Config' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Button part 2', { label: 'Button part 2', siteUrls });

@NgModule({
  declarations: [Button2Component],
  imports: [
    CommonModule,
    ButtonOrnamentsModule,
    ButtonPaletteModule,
    ButtonPalette2Module,
    ButtonPalette3Module,
    ButtonConfigModule,
    ButtonApiModule,
  ],
  exports: [Button2Component],
})
export class Button2Module {}

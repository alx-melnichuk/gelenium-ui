import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

import { ButtonComponent } from './button.component';

import { ButtonBasicModule } from '../button-basic/button-basic.module';
import { ButtonAttributesModule } from '../button-attributes/button-attributes.module';

UrlComponents.add('URL_BUTTON', 'button');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Button', { label: 'Button', siteUrls });

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, ButtonBasicModule, ButtonAttributesModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}

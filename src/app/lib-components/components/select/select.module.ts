import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from '../../../lib-core/constants/site-menu';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { SelectBasicModule } from '../select-basic/select-basic.module';
import { SelectAttributesModule } from '../select-attributes/select-attributes.module';
import { SelectApiModule } from '../select-api/select-api.module';

import { SelectComponent } from './select.component';

UrlComponents.add('URL_SELECT', 'select');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_SELECT');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  // { label: 'Validation', url, fragment: 'Validation' },
  // { label: 'Numerical value', url, fragment: 'NumericalValue' },
  // { label: 'Ornaments', url, fragment: 'Ornaments' },
  // { label: 'Item size', url, fragment: 'ItemSize' },
  // { label: 'Helper text', url, fragment: 'HelperText' },
  // { label: 'Border radius', url, fragment: 'BorderRadius' },
  // { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Select', { label: 'Select', siteUrls });

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    SelectBasicModule,
    SelectAttributesModule,
    // InputValidationModule,
    // InputNumericalModule,
    // InputOrnamentsModule,
    SelectApiModule,
  ],
  exports: [SelectComponent],
})
export class SelectModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { InputBasicModule } from '../input-basic/input-basic.module';
import { InputAttributesModule } from '../input-attributes/input-attributes.module';
import { InputValidationModule } from '../input-validation/input-validation.module';
import { InputNumericalModule } from '../input-numerical/input-numerical.module';
import { InputOrnamentsModule } from '../input-ornaments/input-ornaments.module';
import { InputApiModule } from '../input-api/input-api.module';

import { InputComponent } from './input.component';

UrlComponents.add('URL_INPUT', 'input');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_INPUT');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Validation', url, fragment: 'Validation' },
  { label: 'Numerical value', url, fragment: 'NumericalValue' },
  { label: 'Ornaments', url, fragment: 'Ornaments' },
  { label: 'Item size', url, fragment: 'ItemSize' },
  { label: 'Helper text', url, fragment: 'HelperText' },
  { label: 'Border radius', url, fragment: 'BorderRadius' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Config', url, fragment: 'Config' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Input', { label: 'Input', siteUrls });

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    InputBasicModule,
    InputAttributesModule,
    InputValidationModule,
    InputNumericalModule,
    InputOrnamentsModule,
    InputApiModule,
  ],
})
export class InputModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

import { TextareaBasicModule } from '../textarea-basic/textarea-basic.module';
import { TextareaAttributesModule } from '../textarea-attributes/textarea-attributes.module';
import { TextareaValidationModule } from '../textarea-validation/textarea-validation.module';
import { TextareaCapabilityModule } from '../textarea-capability/textarea-capability.module';
import { TextareaOrnamentsModule } from '../textarea-ornaments/textarea-ornaments.module';
import { TextareaApiModule } from '../textarea-api/textarea-api.module';

import { TextareaComponent } from './textarea.component';

UrlComponents.add('URL_TEXTAREA', 'textarea');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_TEXTAREA');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Attributes', url, fragment: 'Attributes' },
  { label: 'Validation', url, fragment: 'Validation' },
  { label: 'Capability', url, fragment: 'Capability' },
  { label: 'Ornaments', url, fragment: 'Ornaments' },
  { label: 'Item size', url, fragment: 'ItemSize' },
  { label: 'Helper text', url, fragment: 'HelperText' },
  { label: 'Border radius', url, fragment: 'BorderRadius' },
  { label: 'Palette', url, fragment: 'Palette' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'Textarea', { label: 'Textarea', siteUrls });

@NgModule({
  declarations: [TextareaComponent],
  imports: [
    CommonModule,
    TextareaBasicModule,
    TextareaAttributesModule,
    TextareaValidationModule,
    TextareaCapabilityModule,
    TextareaOrnamentsModule,
    TextareaApiModule,
  ],
  exports: [TextareaComponent],
})
export class TextareaModule {}

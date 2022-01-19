import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaBasicModule } from '../textarea-basic/textarea-basic.module';
import { TextareaAttributesModule } from '../textarea-attributes/textarea-attributes.module';
import { TextareaValidationModule } from '../textarea-validation/textarea-validation.module';
import { TextareaCapabilityModule } from '../textarea-capability/textarea-capability.module';
import { TextareaOrnamentsModule } from '../textarea-ornaments/textarea-ornaments.module';
import { TextareaApiModule } from '../textarea-api/textarea-api.module';
import { UrlComponents } from '../../constants/url-components.constants';

import { TextareaComponent } from './textarea.component';

UrlComponents.add('URL_TEXTAREA', 'textarea');

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

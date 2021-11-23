import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaBasicModule } from '../textarea-basic/textarea-basic.module';
import { TextareaAttributesModule } from '../textarea-attributes/textarea-attributes.module';
import { TextareaValidationModule } from '../textarea-validation/textarea-validation.module';

import { TextareaComponent } from './textarea.component';

@NgModule({
  declarations: [TextareaComponent],
  imports: [CommonModule, TextareaBasicModule, TextareaAttributesModule, TextareaValidationModule],
  exports: [TextareaComponent],
})
export class TextareaModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmTextareaBasicModule } from '../cm-textarea-basic/cm-textarea-basic.module';
import { CmTextareaAttributesModule } from '../cm-textarea-attributes/cm-textarea-attributes.module';
import { CmTextareaValidationModule } from '../cm-textarea-validation/cm-textarea-validation.module';
import { CmTextareaCapabilityModule } from '../cm-textarea-capability/cm-textarea-capability.module';
import { CmTextareaOrnamentsModule } from '../cm-textarea-ornaments/cm-textarea-ornaments.module';
import { CmTextareaApiModule } from '../cm-textarea-api/cm-textarea-api.module';

import { CmTextareaComponent } from './cm-textarea.component';
import { CmTextareaRoutingModule } from './cm-textarea-routing.module';

@NgModule({
  declarations: [CmTextareaComponent],
  imports: [
    CommonModule,
    CmTextareaBasicModule,
    CmTextareaAttributesModule,
    CmTextareaValidationModule,
    CmTextareaCapabilityModule,
    CmTextareaOrnamentsModule,
    CmTextareaApiModule,
    CmTextareaRoutingModule,
  ],
  exports: [CmTextareaComponent],
})
export class CmTextareaModule {}

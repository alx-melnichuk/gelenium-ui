import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectBasicModule } from '../select-basic/select-basic.module';
import { SelectAttributesModule } from '../select-attributes/select-attributes.module';
import { SelectValidationModule } from '../select-validation/select-validation.module';
import { SelectGroupModule } from '../select-group/select-group.module';
import { SelectTriggerModule } from '../select-trigger/select-trigger.module';
import { SelectOrnamentsModule } from '../select-ornaments/select-ornaments.module';
import { SelectConfigModule } from '../select-config/select-config.module';
import { SelectApiModule } from '../select-api/select-api.module';

import { SelectComponent } from './select.component';
import { SelectRoutingModule } from './select-routing.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    SelectBasicModule,
    SelectAttributesModule,
    SelectValidationModule,
    SelectGroupModule,
    SelectTriggerModule,
    SelectOrnamentsModule,
    SelectConfigModule,
    SelectApiModule,
    SelectRoutingModule,
  ],
  exports: [SelectComponent],
})
export class SelectModule {}

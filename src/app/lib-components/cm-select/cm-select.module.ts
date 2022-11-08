import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSelectBasicModule } from '../cm-select-basic/cm-select-basic.module';
import { CmSelectAttributesModule } from '../cm-select-attributes/cm-select-attributes.module';
import { CmSelectValidationModule } from '../cm-select-validation/cm-select-validation.module';
import { CmSelectGroupModule } from '../cm-select-group/cm-select-group.module';
import { CmSelectTriggerModule } from '../cm-select-trigger/cm-select-trigger.module';
import { CmSelectOrnamentsModule } from '../cm-select-ornaments/cm-select-ornaments.module';
import { CmSelectFeatureModule } from '../cm-select-feature/cm-select-feature.module';
import { CmSelectConfigModule } from '../cm-select-config/cm-select-config.module';
import { CmSelectApiModule } from '../cm-select-api/cm-select-api.module';

import { CmSelectComponent } from './cm-select.component';
import { CmSelectRoutingModule } from './cm-select-routing.module';

@NgModule({
  declarations: [CmSelectComponent],
  imports: [
    CommonModule,
    CmSelectBasicModule,
    CmSelectAttributesModule,
    CmSelectValidationModule,
    CmSelectGroupModule,
    CmSelectTriggerModule,
    CmSelectOrnamentsModule,
    CmSelectFeatureModule,
    CmSelectConfigModule,
    CmSelectApiModule,
    CmSelectRoutingModule,
  ],
  exports: [CmSelectComponent],
})
export class CmSelectModule {}

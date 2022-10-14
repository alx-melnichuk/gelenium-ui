import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmInputBasicModule } from '../cm-input-basic/cm-input-basic.module';
import { CmInputAttributesModule } from '../cm-input-attributes/cm-input-attributes.module';
import { CmInputValidationModule } from '../cm-input-validation/cm-input-validation.module';
import { CmInputNumericalModule } from '../cm-input-numerical/cm-input-numerical.module';
import { CmInputOrnamentsModule } from '../cm-input-ornaments/cm-input-ornaments.module';
import { CmInputConfigModule } from '../cm-input-config/cm-input-config.module';
import { CmInputApiModule } from '../cm-input-api/cm-input-api.module';

import { CmInputComponent } from './cm-input.component';
import { CmInputRoutingModule } from './cm-input-routing.module';

@NgModule({
  declarations: [CmInputComponent],
  imports: [
    CommonModule,
    CmInputBasicModule,
    CmInputAttributesModule,
    CmInputValidationModule,
    CmInputNumericalModule,
    CmInputOrnamentsModule,
    CmInputConfigModule,
    CmInputApiModule,
    CmInputRoutingModule,
  ],
  exports: [CmInputComponent],
})
export class CmInputModule {}

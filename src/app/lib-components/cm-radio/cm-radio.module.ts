import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmRadioBasicModule } from '../cm-radio-basic/cm-radio-basic.module';
import { CmRadioAttributesModule } from '../cm-radio-attributes/cm-radio-attributes.module';
import { CmRadioSizeModule } from '../cm-radio-size/cm-radio-size.module';
import { CmRadioConfigModule } from '../cm-radio-config/cm-radio-config.module';
import { CmRadioApiModule } from '../cm-radio-api/cm-radio-api.module';

import { CmRadioComponent } from './cm-radio.component';
import { CmRadioRoutingModule } from './cm-radio-routing.module';

@NgModule({
  declarations: [CmRadioComponent],
  imports: [
    CommonModule,
    CmRadioBasicModule,
    CmRadioAttributesModule,
    CmRadioSizeModule,
    CmRadioConfigModule,
    CmRadioApiModule,
    CmRadioRoutingModule,
  ],
  exports: [CmRadioComponent],
})
export class CmRadioModule {}

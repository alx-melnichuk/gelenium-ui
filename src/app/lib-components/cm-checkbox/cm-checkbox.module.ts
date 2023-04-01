import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmCheckboxBasicModule } from '../cm-checkbox-basic/cm-checkbox-basic.module';
import { CmCheckboxAttributesModule } from '../cm-checkbox-attributes/cm-checkbox-attributes.module';
import { CmCheckboxSizeModule } from '../cm-checkbox-size/cm-checkbox-size.module';
import { CmCheckboxConfigModule } from '../cm-checkbox-config/cm-checkbox-config.module';
import { CmCheckboxApiModule } from '../cm-checkbox-api/cm-checkbox-api.module';

import { CmCheckboxComponent } from './cm-checkbox.component';
import { CmCheckboxRoutingModule } from './cm-checkbox-routing.module';

@NgModule({
  declarations: [CmCheckboxComponent],
  imports: [
    CommonModule,
    CmCheckboxBasicModule,
    CmCheckboxAttributesModule,
    CmCheckboxSizeModule,
    CmCheckboxConfigModule,
    CmCheckboxApiModule,
    CmCheckboxRoutingModule,
  ],
  exports: [CmCheckboxComponent],
})
export class CmCheckboxModule {}

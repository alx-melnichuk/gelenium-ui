import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmButtonBasicModule } from '../cm-button-basic/cm-button-basic.module';
import { CmButtonAttributesModule } from '../cm-button-attributes/cm-button-attributes.module';
import { CmButtonSizeModule } from '../cm-button-size/cm-button-size.module';
import { CmButtonBorderRadiusModule } from '../cm-button-border-radius/cm-button-border-radius.module';
import { CmButtonOrnamentsModule } from '../cm-button-ornaments/cm-button-ornaments.module';
import { CmButtonConfigModule } from '../cm-button-config/cm-button-config.module';
import { CmButtonApiModule } from '../cm-button-api/cm-button-api.module';

import { CmButtonComponent } from './cm-button.component';
import { CmButtonRoutingModule } from './cm-button-routing.module';

@NgModule({
  declarations: [CmButtonComponent],
  imports: [
    CommonModule,
    CmButtonBasicModule,
    CmButtonAttributesModule,
    CmButtonSizeModule,
    CmButtonBorderRadiusModule,
    CmButtonOrnamentsModule,
    CmButtonConfigModule,
    CmButtonApiModule,
    CmButtonRoutingModule,
  ],
  exports: [CmButtonComponent],
})
export class CmButtonModule {}

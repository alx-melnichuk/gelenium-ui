import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmChipBasicModule } from '../cm-chip-basic/cm-chip-basic.module';
import { CmChipAttributesModule } from '../cm-chip-attributes/cm-chip-attributes.module';
import { CmChipSizeModule } from '../cm-chip-size/cm-chip-size.module';
import { CmChipOrnamentsModule } from '../cm-chip-ornaments/cm-chip-ornaments.module';
import { CmChipPalleteModule } from '../cm-chip-pallete/cm-chip-pallete.module';
import { CmChipConfigModule } from '../cm-chip-config/cm-chip-config.module';
import { CmChipApiModule } from '../cm-chip-api/cm-chip-api.module';

import { CmChipComponent } from './cm-chip.component';
import { CmChipRoutingModule } from './cm-chip-routing.module';

@NgModule({
  declarations: [CmChipComponent],
  imports: [
    CommonModule,
    CmChipBasicModule,
    CmChipAttributesModule,
    CmChipSizeModule,
    CmChipOrnamentsModule,
    CmChipPalleteModule,
    CmChipConfigModule,
    CmChipApiModule,
    CmChipRoutingModule,
  ],
  exports: [CmChipComponent],
})
export class CmChipModule {}

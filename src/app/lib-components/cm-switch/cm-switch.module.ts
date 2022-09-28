import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSwitchBasicModule } from '../cm-switch-basic/cm-switch-basic.module';
import { CmSwitchAttributesModule } from '../cm-switch-attributes/cm-switch-attributes.module';
import { CmSwitchCustomizationModule } from '../cm-switch-customization/cm-switch-customization.module';
import { CmSwitchPaletteModule } from '../cm-switch-palette/cm-switch-palette.module';
import { CmSwitchSizeModule } from '../cm-switch-size/cm-switch-size.module';

import { CmSwitchComponent } from './cm-switch.component';
import { CmSwitchRoutingModule } from './cm-switch-routing.module';

@NgModule({
  declarations: [CmSwitchComponent],
  imports: [
    CommonModule,
    CmSwitchBasicModule,
    CmSwitchAttributesModule,
    CmSwitchSizeModule,
    CmSwitchPaletteModule,
    CmSwitchCustomizationModule,
    CmSwitchRoutingModule,
  ],
  exports: [CmSwitchComponent],
})
export class CmSwitchModule {}

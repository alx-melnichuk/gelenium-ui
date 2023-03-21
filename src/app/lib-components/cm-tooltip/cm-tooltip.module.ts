import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmTooltipBasicModule } from '../cm-tooltip-basic/cm-tooltip-basic.module';

import { CmTooltipAttributesModule } from '../cm-tooltip-attributes/cm-tooltip-attributes.module';
import { CmTooltipCustomizationModule } from '../cm-tooltip-customization/cm-tooltip-customization.module';
import { CmTooltipFeatureModule } from '../cm-tooltip-feature/cm-tooltip-feature.module';
import { CmTooltipConfigModule } from '../cm-tooltip-config/cm-tooltip-config.module';
import { CmTooltipApiModule } from '../cm-tooltip-api/cm-tooltip-api.module';

import { CmTooltipComponent } from './cm-tooltip.component';
import { CmTooltipRoutingModule } from './cm-tooltip-routing.module';

@NgModule({
  declarations: [CmTooltipComponent],
  imports: [
    CommonModule,
    CmTooltipBasicModule,
    CmTooltipAttributesModule,
    CmTooltipCustomizationModule,
    CmTooltipFeatureModule,
    CmTooltipConfigModule,
    CmTooltipApiModule,
    CmTooltipRoutingModule,
  ],
  exports: [CmTooltipComponent],
})
export class CmTooltipModule {}

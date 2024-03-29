import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTooltipModule } from 'gelenium-ui';

import { CmTooltipFeatureComponent } from './cm-tooltip-feature.component';

@NgModule({
  declarations: [CmTooltipFeatureComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnTooltipModule],
  exports: [CmTooltipFeatureComponent],
})
export class CmTooltipFeatureModule {}

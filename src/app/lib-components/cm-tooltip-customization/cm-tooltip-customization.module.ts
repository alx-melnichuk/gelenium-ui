import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTooltipModule } from 'gelenium-ui';

import { CmTooltipCustomizationComponent } from './cm-tooltip-customization.component';

@NgModule({
  declarations: [CmTooltipCustomizationComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTooltipModule],
  exports: [CmTooltipCustomizationComponent],
})
export class CmTooltipCustomizationModule {}

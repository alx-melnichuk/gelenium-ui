import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTooltipModule } from 'gelenium-ui';

import { CmTooltipAttributesComponent } from './cm-tooltip-attributes.component';

@NgModule({
  declarations: [CmTooltipAttributesComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnTooltipModule],
  exports: [CmTooltipAttributesComponent],
})
export class CmTooltipAttributesModule {}

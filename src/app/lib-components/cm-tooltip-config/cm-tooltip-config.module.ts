import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTooltipModule } from 'gelenium-ui';

import { CmTooltipConfigComponent } from './cm-tooltip-config.component';

@NgModule({
  declarations: [CmTooltipConfigComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTooltipModule],
  exports: [CmTooltipConfigComponent],
})
export class CmTooltipConfigModule {}

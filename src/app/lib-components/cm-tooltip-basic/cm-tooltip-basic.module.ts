import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTooltip3Module, GlnTooltipModule } from 'gelenium-ui';

import { CmTooltipBasicComponent } from './cm-tooltip-basic.component';

@NgModule({
  declarations: [CmTooltipBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTooltipModule, GlnTooltip3Module],
  exports: [CmTooltipBasicComponent],
})
export class CmTooltipBasicModule {}

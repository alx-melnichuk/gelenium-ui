import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmTooltipBasicModule } from '../cm-tooltip-basic/cm-tooltip-basic.module';

import { CmTooltipComponent } from './cm-tooltip.component';
import { CmTooltipRoutingModule } from './cm-tooltip-routing.module';

@NgModule({
  declarations: [CmTooltipComponent],
  imports: [CommonModule, CmTooltipBasicModule, CmTooltipRoutingModule],
  exports: [CmTooltipComponent],
})
export class CmTooltipModule {}

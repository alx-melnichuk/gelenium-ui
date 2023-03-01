import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnTooltipComponent } from './gln-tooltip.component';
import { GlnTooltipDirective } from './gln-tooltip.directive';
import { GlnOverflowChildDirective } from './gln-overflow-child.directive';

@NgModule({
  declarations: [GlnTooltipComponent, GlnTooltipDirective, GlnOverflowChildDirective],
  imports: [CommonModule, OverlayModule],
  exports: [GlnTooltipComponent, GlnTooltipDirective, GlnOverflowChildDirective],
  entryComponents: [GlnTooltipComponent],
})
export class GlnTooltipModule {}

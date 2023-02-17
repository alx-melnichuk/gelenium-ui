import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnTooltipComponent } from './gln-tooltip.component';
import { GlnTooltip2Directive } from './gln-tooltip2.directive';

@NgModule({
  declarations: [GlnTooltipComponent, GlnTooltip2Directive],
  imports: [CommonModule, OverlayModule],
  exports: [GlnTooltipComponent, GlnTooltip2Directive],
  entryComponents: [GlnTooltipComponent],
})
export class GlnTooltipModule {}

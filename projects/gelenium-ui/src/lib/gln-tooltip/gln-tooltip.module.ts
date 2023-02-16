import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnTooltipComponent } from './gln-tooltip.component';
import { GlnTooltipDirective } from './gln-tooltip.directive';

@NgModule({
  declarations: [GlnTooltipComponent, GlnTooltipDirective],
  imports: [CommonModule, OverlayModule],
  exports: [GlnTooltipComponent, GlnTooltipDirective],
  entryComponents: [GlnTooltipComponent],
})
export class GlnTooltipModule {}

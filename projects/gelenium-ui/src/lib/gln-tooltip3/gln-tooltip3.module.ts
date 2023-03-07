import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnTooltip3Directive } from './gln-tooltip3.directive';
import { GlnTooltip3BlockComponent } from './gln-tooltip3-block.component';

@NgModule({
  declarations: [GlnTooltip3Directive, GlnTooltip3BlockComponent],
  imports: [CommonModule],
  exports: [GlnTooltip3Directive, GlnTooltip3BlockComponent],
  entryComponents: [GlnTooltip3BlockComponent],
})
export class GlnTooltip3Module {}

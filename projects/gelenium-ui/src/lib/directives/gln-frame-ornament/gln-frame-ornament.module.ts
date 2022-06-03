import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameOrnamentDirective } from './gln-frame-ornament.directive';

@NgModule({
  declarations: [GlnFrameOrnamentDirective],
  imports: [CommonModule],
  exports: [GlnFrameOrnamentDirective],
})
export class GlnFrameOrnamentModule {}

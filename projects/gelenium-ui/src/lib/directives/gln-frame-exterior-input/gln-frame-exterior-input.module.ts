import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameExteriorInputDirective } from './gln-frame-exterior-input.directive';

@NgModule({
  declarations: [GlnFrameExteriorInputDirective],
  imports: [CommonModule],
  exports: [GlnFrameExteriorInputDirective],
})
export class GlnFrameExteriorInputModule {}

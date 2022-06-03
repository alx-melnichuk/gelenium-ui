import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameExteriorButtonDirective } from './gln-frame-exterior-button.directive';

@NgModule({
  declarations: [GlnFrameExteriorButtonDirective],
  imports: [CommonModule],
  exports: [GlnFrameExteriorButtonDirective],
})
export class GlnFrameExteriorButtonModule {}

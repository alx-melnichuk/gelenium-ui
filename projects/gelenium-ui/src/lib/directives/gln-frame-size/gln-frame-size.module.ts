import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameSizeDirective } from './gln-frame-size.directive';

@NgModule({
  declarations: [GlnFrameSizeDirective],
  imports: [CommonModule],
  exports: [GlnFrameSizeDirective],
})
export class GlnFrameSizeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnColorDirective } from './gln-color.directive';

@NgModule({
  declarations: [GlnColorDirective],
  imports: [CommonModule],
  exports: [GlnColorDirective],
})
export class GlnColorModule {}

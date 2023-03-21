import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOrnamentLeftDirective } from './gln-ornament-left.directive';
import { GlnOrnamentRightDirective } from './gln-ornament-right.directive';

@NgModule({
  declarations: [GlnOrnamentLeftDirective, GlnOrnamentRightDirective],
  imports: [CommonModule],
  exports: [GlnOrnamentLeftDirective, GlnOrnamentRightDirective],
})
export class GlnOrnamentModule {}

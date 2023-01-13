import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnHighlightPipe } from './gln-highlight.pipe';

@NgModule({
  declarations: [GlnHighlightPipe],
  imports: [CommonModule],
  exports: [GlnHighlightPipe],
})
export class GlnHighlightModule {}

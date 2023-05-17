import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnChipComponent } from './gln-chip.component';

@NgModule({
  declarations: [GlnChipComponent],
  imports: [CommonModule, GlnTouchRippleModule],
  exports: [GlnChipComponent],
})
export class GlnChipModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnTouchRippleModule } from '../grn-touch-ripple/grn-touch-ripple.module';

import { GrnButtonComponent } from './grn-button.component';

@NgModule({
  declarations: [GrnButtonComponent],
  imports: [CommonModule, GrnTouchRippleModule],
  exports: [GrnButtonComponent],
})
export class GrnButtonModule {}

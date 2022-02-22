import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameExteriorInputDirective } from './grn-frame-exterior-input.directive';

@NgModule({
  declarations: [GrnFrameExteriorInputDirective],
  imports: [CommonModule],
  exports: [GrnFrameExteriorInputDirective],
})
export class GrnFrameExteriorInputModule {}

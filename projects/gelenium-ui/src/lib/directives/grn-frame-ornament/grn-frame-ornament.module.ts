import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameOrnamentDirective } from './grn-frame-ornament.directive';

@NgModule({
  declarations: [GrnFrameOrnamentDirective],
  imports: [CommonModule],
  exports: [GrnFrameOrnamentDirective],
})
export class GrnFrameOrnamentModule {}

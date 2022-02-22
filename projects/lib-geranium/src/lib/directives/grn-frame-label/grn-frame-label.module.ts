import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameLabelDirective } from './grn-frame-label.directive';

@NgModule({
  declarations: [GrnFrameLabelDirective],
  imports: [CommonModule],
  exports: [GrnFrameLabelDirective],
})
export class GrnFrameLabelModule {}

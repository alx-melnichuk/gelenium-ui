import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameExteriorButtonDirective } from './grn-frame-exterior-button.directive';

@NgModule({
  declarations: [GrnFrameExteriorButtonDirective],
  imports: [CommonModule],
  exports: [GrnFrameExteriorButtonDirective],
})
export class GrnFrameExteriorButtonModule {}

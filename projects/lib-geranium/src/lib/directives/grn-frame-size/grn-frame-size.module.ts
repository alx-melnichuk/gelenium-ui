import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameSizeDirective } from './grn-frame-size.directive';

@NgModule({
  declarations: [GrnFrameSizeDirective],
  imports: [CommonModule],
  exports: [GrnFrameSizeDirective],
})
export class GrnFrameSizeModule {}

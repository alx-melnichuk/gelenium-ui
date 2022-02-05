import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnSizeDirective } from './grn-size.directive';

@NgModule({
  declarations: [GrnSizeDirective],
  imports: [CommonModule],
  exports: [GrnSizeDirective],
})
export class GrnSizeModule {}

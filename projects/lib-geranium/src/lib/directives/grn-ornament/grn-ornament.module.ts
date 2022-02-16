import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnOrnamentDirective } from './grn-ornament.directive';

@NgModule({
  declarations: [GrnOrnamentDirective],
  imports: [CommonModule],
  exports: [GrnOrnamentDirective],
})
export class GrnOrnamentModule {}

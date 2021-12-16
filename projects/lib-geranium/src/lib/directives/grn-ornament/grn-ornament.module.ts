import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnOrnamentDirective } from './grn-ornament.directive';
import { GrnOrnamentEndDirective } from './grn-ornament-end.directive';

@NgModule({
  declarations: [GrnOrnamentDirective, GrnOrnamentEndDirective],
  imports: [CommonModule],
  exports: [GrnOrnamentDirective, GrnOrnamentEndDirective],
})
export class GrnOrnamentModule {}

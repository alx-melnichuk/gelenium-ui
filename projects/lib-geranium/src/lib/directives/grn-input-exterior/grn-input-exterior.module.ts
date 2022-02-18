import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnInputExteriorDirective } from './grn-input-exterior.directive';

@NgModule({
  declarations: [GrnInputExteriorDirective],
  imports: [CommonModule],
  exports: [GrnInputExteriorDirective],
})
export class GrnInputExteriorModule {}

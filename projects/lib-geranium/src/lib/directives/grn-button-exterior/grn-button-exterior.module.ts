import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnButtonExteriorDirective } from './grn-button-exterior.directive';

@NgModule({
  declarations: [GrnButtonExteriorDirective],
  imports: [CommonModule],
  exports: [GrnButtonExteriorDirective],
})
export class GrnButtonExteriorModule {}

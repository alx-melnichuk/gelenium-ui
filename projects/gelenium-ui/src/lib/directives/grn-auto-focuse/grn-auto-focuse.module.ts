import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnAutoFocuseDirective } from './grn-auto-focuse.directive';
import { GrnAutoFocuseOwnerDirective } from './grn-auto-focuse-owner.directive';

@NgModule({
  declarations: [GrnAutoFocuseDirective, GrnAutoFocuseOwnerDirective],
  imports: [CommonModule],
  exports: [GrnAutoFocuseDirective, GrnAutoFocuseOwnerDirective],
})
export class GrnAutoFocuseModule {}

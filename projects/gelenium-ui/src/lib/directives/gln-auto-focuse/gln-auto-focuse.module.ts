import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnAutoFocuseDirective } from './gln-auto-focuse.directive';
import { GlnAutoFocuseOwnerDirective } from './gln-auto-focuse-owner.directive';

@NgModule({
  declarations: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective],
  imports: [CommonModule],
  exports: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective],
})
export class GlnAutoFocuseModule {}

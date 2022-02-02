import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnTouchRippleModule } from '../grn-touch-ripple/grn-touch-ripple.module';

import { GrnButtonComponent } from './grn-button.component';
import { GrnLinkDirective } from './grn-link.directive';

@NgModule({
  declarations: [GrnButtonComponent, GrnLinkDirective],
  imports: [CommonModule, GrnTouchRippleModule],
  exports: [GrnButtonComponent, GrnLinkDirective],
})
export class GrnButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnTouchRippleModule } from '../grn-touch-ripple/grn-touch-ripple.module';

import { GrnButtonComponent } from './grn-button.component';
import { GrnSizeDirective } from './grn-size.directive';
import { GrnLinkDirective } from './grn-link.directive';

@NgModule({
  declarations: [GrnButtonComponent, GrnLinkDirective, GrnSizeDirective],
  imports: [CommonModule, GrnTouchRippleModule],
  exports: [GrnButtonComponent, GrnLinkDirective, GrnSizeDirective],
})
export class GrnButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnButtonExteriorModule } from '../directives/grn-button-exterior/grn-button-exterior.module';
import { GrnSizeModule } from '../directives/grn-size/grn-size.module';
import { GrnTouchRippleModule } from '../grn-touch-ripple/grn-touch-ripple.module';

import { GrnButtonComponent } from './grn-button.component';
import { GrnLinkDirective } from './grn-link.directive';

@NgModule({
  declarations: [GrnButtonComponent, GrnLinkDirective],
  imports: [CommonModule, GrnButtonExteriorModule, GrnSizeModule, GrnTouchRippleModule],
  exports: [GrnButtonComponent, GrnLinkDirective],
})
export class GrnButtonModule {}

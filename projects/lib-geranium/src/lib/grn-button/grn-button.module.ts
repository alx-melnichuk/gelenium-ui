import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnFrameExteriorButtonModule } from '../directives/grn-frame-exterior-button/grn-frame-exterior-button.module';
import { GrnFrameSizeModule } from '../directives/grn-frame-size/grn-frame-size.module';
import { GrnTouchRippleModule } from '../grn-touch-ripple/grn-touch-ripple.module';

import { GrnButtonComponent } from './grn-button.component';
import { GrnLinkDirective } from './grn-link.directive';

@NgModule({
  declarations: [GrnButtonComponent, GrnLinkDirective],
  imports: [CommonModule, GrnFrameExteriorButtonModule, GrnFrameSizeModule, GrnTouchRippleModule],
  exports: [GrnButtonComponent, GrnLinkDirective],
})
export class GrnButtonModule {}

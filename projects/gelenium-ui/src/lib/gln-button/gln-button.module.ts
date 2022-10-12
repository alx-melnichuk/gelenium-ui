import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnButtonComponent } from './gln-button.component';
import { GlnLinkDirective } from './gln-link.directive';

@NgModule({
  declarations: [GlnButtonComponent, GlnLinkDirective],
  imports: [CommonModule, GlnFrameOrnamentModule, GlnTouchRippleModule],
  exports: [GlnButtonComponent, GlnLinkDirective],
})
export class GlnButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnFrameExteriorButtonModule } from '../directives/gln-frame-exterior-button/gln-frame-exterior-button.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnButtonComponent } from './gln-button.component';
import { GlnLinkDirective } from './gln-link.directive';

@NgModule({
  declarations: [GlnButtonComponent, GlnLinkDirective],
  imports: [CommonModule, GlnFrameExteriorButtonModule, GlnFrameSizeModule, GlnTouchRippleModule],
  exports: [GlnButtonComponent, GlnLinkDirective],
})
export class GlnButtonModule {
  constructor() {
    console.log(`GlnButtonModule();`);
  }
}

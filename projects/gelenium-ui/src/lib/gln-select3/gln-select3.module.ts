import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { GlnDropdownComponent } from './gln-dropdown.component';
import { GlnOption3Component } from './gln-option3.component';
import { GlnOverlayOrigin } from './gln-overlay-origin.directive';
import { GlnSelect3Component } from './gln-select3.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER } from './gln-select3.providers';

@NgModule({
  declarations: [GlnSelect3Component, GlnDropdownComponent, GlnOption3Component, GlnOverlayOrigin],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [GlnSelect3Component, GlnDropdownComponent, GlnOption3Component, GlnOverlayOrigin],
  providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER],
})
export class GlnSelect3Module {}

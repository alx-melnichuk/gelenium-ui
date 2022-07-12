import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnDropdownComponent } from './gln-dropdown.component';
import { GlnOption3Component } from './gln-option3.component';
import { GlnSelect3Component } from './gln-select3.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER } from './gln-select3.providers';

@NgModule({
  declarations: [GlnSelect3Component, GlnDropdownComponent, GlnOption3Component],
  imports: [CommonModule, OverlayModule],
  exports: [GlnSelect3Component, GlnDropdownComponent, GlnOption3Component],
  providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER],
})
export class GlnSelect3Module {}

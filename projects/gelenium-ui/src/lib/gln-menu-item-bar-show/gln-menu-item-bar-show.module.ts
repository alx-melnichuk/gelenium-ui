import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnMenuItemBarModule } from '../gln-menu-item-bar/gln-menu-item-bar.module';

import { GlnMenuItemBarShowComponent } from './gln-menu-item-bar-show.component';

@NgModule({
  declarations: [GlnMenuItemBarShowComponent],
  imports: [CommonModule, GlnMenuItemBarModule],
  exports: [GlnMenuItemBarShowComponent],
})
export class GlnMenuItemBarShowModule {}

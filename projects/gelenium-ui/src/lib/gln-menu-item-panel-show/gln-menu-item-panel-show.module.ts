import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnMenuItemPanelModule } from '../gln-menu-item-panel/gln-menu-item-panel.module';

import { GlnMenuItemPanelShowComponent } from './gln-menu-item-panel-show.component';

@NgModule({
  declarations: [GlnMenuItemPanelShowComponent],
  imports: [CommonModule, GlnMenuItemPanelModule],
  exports: [GlnMenuItemPanelShowComponent],
})
export class GlnMenuItemPanelShowModule {}

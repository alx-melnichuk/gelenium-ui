import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { PlButtonMaterialUiComponent } from './pl-button-material-ui.component';

@NgModule({
  declarations: [PlButtonMaterialUiComponent],
  imports: [CommonModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [PlButtonMaterialUiComponent],
})
export class PlButtonMaterialUiModule {}

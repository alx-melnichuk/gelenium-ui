import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnPaginationModule } from 'gelenium-ui';

import { PlPaginationMaterialUiComponent } from './pl-pagination-material-ui.component';

@NgModule({
  declarations: [PlPaginationMaterialUiComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnPaginationModule],
  exports: [PlPaginationMaterialUiComponent],
})
export class PlPaginationMaterialUiModule {}

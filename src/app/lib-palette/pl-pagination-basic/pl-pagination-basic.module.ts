import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnPaginationModule } from 'gelenium-ui';

import { PlPaginationBasicComponent } from './pl-pagination-basic.component';

@NgModule({
  declarations: [PlPaginationBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnPaginationModule],
  exports: [PlPaginationBasicComponent],
})
export class PlPaginationBasicModule {}

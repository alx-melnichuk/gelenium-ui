import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { CmPaginationBorderComponent } from './cm-pagination-border.component';

@NgModule({
  declarations: [CmPaginationBorderComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [CmPaginationBorderComponent],
})
export class CmPaginationBorderModule {}

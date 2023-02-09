import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { CmPaginationSizeComponent } from './cm-pagination-size.component';

@NgModule({
  declarations: [CmPaginationSizeComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [CmPaginationSizeComponent],
})
export class CmPaginationSizeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { CmPaginationConfigComponent } from './cm-pagination-config.component';

@NgModule({
  declarations: [CmPaginationConfigComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [CmPaginationConfigComponent],
})
export class CmPaginationConfigModule {}

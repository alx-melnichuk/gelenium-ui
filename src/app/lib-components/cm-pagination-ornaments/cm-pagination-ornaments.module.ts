import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { CmPaginationOrnamentsComponent } from './cm-pagination-ornaments.component';

@NgModule({
  declarations: [CmPaginationOrnamentsComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [CmPaginationOrnamentsComponent],
})
export class CmPaginationOrnamentsModule {}

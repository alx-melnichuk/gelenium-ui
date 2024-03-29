import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { CmPaginationBasicComponent } from './cm-pagination-basic.component';

@NgModule({
  declarations: [CmPaginationBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [CmPaginationBasicComponent],
})
export class CmPaginationBasicModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnPaginationModule } from 'gelenium-ui';

import { PlPaginationBootstrapComponent } from './pl-pagination-bootstrap.component';

@NgModule({
  declarations: [PlPaginationBootstrapComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnPaginationModule],
  exports: [PlPaginationBootstrapComponent],
})
export class PlPaginationBootstrapModule {}

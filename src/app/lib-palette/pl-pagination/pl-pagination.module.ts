import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlPaginationBasicModule } from '../pl-pagination-basic/pl-pagination-basic.module';
import { PlPaginationBootstrapModule } from '../pl-pagination-bootstrap/pl-pagination-bootstrap.module';
import { PlPaginationMaterialUiModule } from '../pl-pagination-material-ui/pl-pagination-material-ui.module';

import { PlPaginationComponent } from './pl-pagination.component';
import { PlPaginationRoutingModule } from './pl-pagination-routing.module';

@NgModule({
  declarations: [PlPaginationComponent],
  imports: [CommonModule, PlPaginationBasicModule, PlPaginationBootstrapModule, PlPaginationMaterialUiModule, PlPaginationRoutingModule],
  exports: [PlPaginationComponent],
})
export class PlPaginationModule {}

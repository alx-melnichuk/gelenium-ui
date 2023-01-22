import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmPaginationBasicModule } from '../cm-pagination-basic/cm-pagination-basic.module';

import { CmPaginationComponent } from './cm-pagination.component';
import { CmPaginationRoutingModule } from './cm-pagination-routing.module';

@NgModule({
  declarations: [CmPaginationComponent],
  imports: [CommonModule, CmPaginationBasicModule, CmPaginationRoutingModule],
  exports: [CmPaginationComponent],
})
export class CmPaginationModule {}

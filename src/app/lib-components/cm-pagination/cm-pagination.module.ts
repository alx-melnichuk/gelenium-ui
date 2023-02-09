import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmPaginationBasicModule } from '../cm-pagination-basic/cm-pagination-basic.module';
import { CmPaginationAttributesModule } from '../cm-pagination-attributes/cm-pagination-attributes.module';
import { CmPaginationSizeModule } from '../cm-pagination-size/cm-pagination-size.module';
import { CmPaginationBorderModule } from '../cm-pagination-border/cm-pagination-border.module';
import { CmPaginationOrnamentsModule } from '../cm-pagination-ornaments/cm-pagination-ornaments.module';
import { CmPaginationConfigModule } from '../cm-pagination-config/cm-pagination-config.module';
import { CmPaginationApiModule } from '../cm-pagination-api/cm-pagination-api.module';

import { CmPaginationComponent } from './cm-pagination.component';
import { CmPaginationRoutingModule } from './cm-pagination-routing.module';

@NgModule({
  declarations: [CmPaginationComponent],
  imports: [
    CommonModule,
    CmPaginationBasicModule,
    CmPaginationAttributesModule,
    CmPaginationSizeModule,
    CmPaginationBorderModule,
    CmPaginationOrnamentsModule,
    CmPaginationConfigModule,
    CmPaginationApiModule,
    CmPaginationRoutingModule,
  ],
  exports: [CmPaginationComponent],
})
export class CmPaginationModule {}

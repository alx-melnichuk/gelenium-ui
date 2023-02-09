import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmPaginationApiComponent } from './cm-pagination-api.component';

@NgModule({
  declarations: [CmPaginationApiComponent],
  imports: [CommonModule],
  exports: [CmPaginationApiComponent],
})
export class CmPaginationApiModule {}

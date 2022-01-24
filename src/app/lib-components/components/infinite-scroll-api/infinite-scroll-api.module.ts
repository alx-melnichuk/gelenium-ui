import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollApiComponent } from './infinite-scroll-api.component';

@NgModule({
  declarations: [InfiniteScrollApiComponent],
  imports: [CommonModule],
  exports: [InfiniteScrollApiComponent],
})
export class InfiniteScrollApiModule {}

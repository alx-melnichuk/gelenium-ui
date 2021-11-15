import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnInfiniteScrollModule } from 'projects/lib-geranium/src/lib/grn-infinite-scroll/grn-infinite-scroll.module';

import { InfiniteScrollComponent } from './infinite-scroll.component';

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, GrnInfiniteScrollModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}

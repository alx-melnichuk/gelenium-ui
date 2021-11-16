import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnInfiniteScrollModule } from 'projects/lib-geranium/src/lib/grn-infinite-scroll/grn-infinite-scroll.module';

import { InfiniteScrollOptionalComponent } from './infinite-scroll-optional.component';

@NgModule({
  declarations: [InfiniteScrollOptionalComponent],
  imports: [CommonModule, GrnInfiniteScrollModule],
  exports: [InfiniteScrollOptionalComponent],
})
export class InfiniteScrollOptionalModule {}

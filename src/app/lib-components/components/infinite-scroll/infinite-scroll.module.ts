import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollBasicModule } from '../infinite-scroll-basic/infinite-scroll-basic.module';
import { InfiniteScrollOptionalModule } from '../infinite-scroll-optional/infinite-scroll-optional.module';
import { InfiniteScrollApiModule } from '../infinite-scroll-api/infinite-scroll-api.module';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { InfiniteScrollRoutingModule } from './infinite-scroll-routing.module';

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, InfiniteScrollBasicModule, InfiniteScrollOptionalModule, InfiniteScrollApiModule, InfiniteScrollRoutingModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmInfiniteScrollBasicModule } from '../cm-infinite-scroll-basic/cm-infinite-scroll-basic.module';
import { CmInfiniteScrollOptionalModule } from '../cm-infinite-scroll-optional/cm-infinite-scroll-optional.module';
import { CmInfiniteScrollApiModule } from '../cm-infinite-scroll-api/cm-infinite-scroll-api.module';

import { CmInfiniteScrollComponent } from './cm-infinite-scroll.component';
import { CmInfiniteScrollRoutingModule } from './cm-infinite-scroll-routing.module';

@NgModule({
  declarations: [CmInfiniteScrollComponent],
  imports: [
    CommonModule,
    CmInfiniteScrollBasicModule,
    CmInfiniteScrollOptionalModule,
    CmInfiniteScrollApiModule,
    CmInfiniteScrollRoutingModule,
  ],
  exports: [CmInfiniteScrollComponent],
})
export class CmInfiniteScrollModule {}

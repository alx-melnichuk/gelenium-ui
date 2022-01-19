import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { InfiniteScrollBasicModule } from '../infinite-scroll-basic/infinite-scroll-basic.module';
import { InfiniteScrollOptionalModule } from '../infinite-scroll-optional/infinite-scroll-optional.module';
import { InfiniteScrollApiModule } from '../infinite-scroll-api/infinite-scroll-api.module';
import { UrlComponents } from '../../constants/url-components.constants';

UrlComponents.add('URL_INFINITE_SCROLL', 'infinite-scroll');

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, InfiniteScrollBasicModule, InfiniteScrollOptionalModule, InfiniteScrollApiModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}

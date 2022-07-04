import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from '../../../lib-core/constants/site-menu';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { InfiniteScrollBasicModule } from '../infinite-scroll-basic/infinite-scroll-basic.module';
import { InfiniteScrollOptionalModule } from '../infinite-scroll-optional/infinite-scroll-optional.module';
import { InfiniteScrollApiModule } from '../infinite-scroll-api/infinite-scroll-api.module';

import { InfiniteScrollComponent } from './infinite-scroll.component';

UrlComponents.add('URL_INFINITE_SCROLL', 'infinite-scroll');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_INFINITE_SCROLL');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Optional', url, fragment: 'Optional' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Components', 'InfiniteScroll', { label: 'InfiniteScroll', siteUrls });

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, InfiniteScrollBasicModule, InfiniteScrollOptionalModule, InfiniteScrollApiModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}

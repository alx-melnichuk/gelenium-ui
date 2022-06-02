import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInfiniteScrollModule } from 'projects/gelenium-ui/src/lib/grn-infinite-scroll/grn-infinite-scroll.module';

import { InfiniteScrollBasicComponent } from './infinite-scroll-basic.component';

@NgModule({
  declarations: [InfiniteScrollBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GrnInfiniteScrollModule],
  exports: [InfiniteScrollBasicComponent],
})
export class InfiniteScrollBasicModule {}

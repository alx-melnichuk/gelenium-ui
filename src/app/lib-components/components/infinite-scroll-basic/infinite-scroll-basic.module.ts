import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInfiniteScrollModule } from 'gelenium-ui';

import { InfiniteScrollBasicComponent } from './infinite-scroll-basic.component';

@NgModule({
  declarations: [InfiniteScrollBasicComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInfiniteScrollModule],
  exports: [InfiniteScrollBasicComponent],
})
export class InfiniteScrollBasicModule {}

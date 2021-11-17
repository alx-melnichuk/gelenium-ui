import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInfiniteScrollModule } from 'projects/lib-geranium/src/lib/grn-infinite-scroll/grn-infinite-scroll.module';

import { InfiniteScrollOptionalComponent } from './infinite-scroll-optional.component';

@NgModule({
  declarations: [InfiniteScrollOptionalComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GrnInfiniteScrollModule],
  exports: [InfiniteScrollOptionalComponent],
})
export class InfiniteScrollOptionalModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInfiniteScrollModule } from 'projects/gelenium-ui/src/lib/gln-infinite-scroll/gln-infinite-scroll.module';

import { InfiniteScrollOptionalComponent } from './infinite-scroll-optional.component';

@NgModule({
  declarations: [InfiniteScrollOptionalComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInfiniteScrollModule],
  exports: [InfiniteScrollOptionalComponent],
})
export class InfiniteScrollOptionalModule {}

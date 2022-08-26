import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInfiniteScrollModule } from 'gelenium-ui';

import { CmInfiniteScrollOptionalComponent } from './cm-infinite-scroll-optional.component';

@NgModule({
  declarations: [CmInfiniteScrollOptionalComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInfiniteScrollModule],
  exports: [CmInfiniteScrollOptionalComponent],
})
export class CmInfiniteScrollOptionalModule {}

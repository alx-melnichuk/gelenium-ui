import { NgModule } from '@angular/core';

import { GrnRegexModule } from 'projects/lib-geranium/src/lib/directives/grn-regex/grn-regex.module';

import { GrnFrameInputModule } from './grn-frame-input/grn-frame-input.module';
import { GrnInfiniteScrollModule } from './grn-infinite-scroll/grn-infinite-scroll.module';
import { GrnTextareaModule } from './grn-textarea/grn-textarea.module';
import { GrnTouchRippleModule } from './grn-touch-ripple/grn-touch-ripple.module';
import { GrnInputModule } from './grn-input/grn-input.module';

@NgModule({
  declarations: [],
  imports: [GrnRegexModule, GrnFrameInputModule, GrnInfiniteScrollModule, GrnInputModule, GrnTextareaModule, GrnTouchRippleModule],
  exports: [],
})
export class LibGeraniumModule {}

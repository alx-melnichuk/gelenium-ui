import { NgModule } from '@angular/core';

import { GrnRegexModule } from 'projects/gelenium-ui/src/lib/directives/grn-regex/grn-regex.module';

import { GrnFrameModule } from './grn-frame/grn-frame.module';
import { GrnInfiniteScrollModule } from './grn-infinite-scroll/grn-infinite-scroll.module';
import { GrnTextareaModule } from './grn-textarea/grn-textarea.module';
import { GrnTouchRippleModule } from './grn-touch-ripple/grn-touch-ripple.module';
import { GrnInputModule } from './grn-input/grn-input.module';

@NgModule({
  declarations: [],
  imports: [GrnRegexModule, GrnFrameModule, GrnInfiniteScrollModule, GrnInputModule, GrnTextareaModule, GrnTouchRippleModule],
  exports: [],
})
export class LibGeraniumModule {}

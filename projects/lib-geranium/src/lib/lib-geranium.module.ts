import { NgModule } from '@angular/core';

import { GrnRegexModule } from 'projects/lib-geranium/src/lib/directives/grn-regex/grn-regex.module';

import { GrnFrameInputModule } from './grn-frame-input/grn-frame-input.module';
import { GrnFrameInput2Module } from './grn-frame-input2/grn-frame-input2.module';
import { GrnFrameInputWrapModule } from './grn-frame-input-wrap/grn-frame-input-wrap.module';
import { GrnInfiniteScrollModule } from './grn-infinite-scroll/grn-infinite-scroll.module';
import { GrnInputModule } from './grn-input/grn-input.module';
import { GrnTextareaModule } from './grn-textarea/grn-textarea.module';
import { GrnTouchRippleModule } from './grn-touch-ripple/grn-touch-ripple.module';
import { GrnFrameMaketModule } from './grn-frame-maket/grn-frame-maket.module';
import { GrnInput2Module } from './grn-input2/grn-input2.module';

@NgModule({
  declarations: [],
  imports: [
    GrnRegexModule,
    GrnFrameMaketModule,
    GrnFrameInputModule,
    GrnFrameInput2Module, // TODO del;
    GrnFrameInputWrapModule, // TODO del;
    GrnInfiniteScrollModule,
    GrnInputModule,
    GrnInput2Module, // TODO ?
    GrnTextareaModule,
    GrnTouchRippleModule,
  ],
  exports: [],
})
export class LibGeraniumModule {}

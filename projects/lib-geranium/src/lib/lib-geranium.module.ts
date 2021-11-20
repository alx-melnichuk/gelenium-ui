import { NgModule } from '@angular/core';

import { LibDirectivesModule } from './directives/lib-directives.module';
import { GrnFrameInputModule } from './grn-frame-input/grn-frame-input.module';
import { GrnInfiniteScrollModule } from './grn-infinite-scroll/grn-infinite-scroll.module';
import { GrnInputModule } from './grn-input/grn-input.module';
import { GrnTextareaModule } from './grn-textarea/grn-textarea.module';

@NgModule({
  declarations: [],
  imports: [LibDirectivesModule, GrnFrameInputModule, GrnInfiniteScrollModule, GrnInputModule, GrnTextareaModule],
  exports: [],
})
export class LibGeraniumModule {}

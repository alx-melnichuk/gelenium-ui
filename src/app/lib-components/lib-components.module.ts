import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from './components/button/button.module';
import { FrameInputModule } from '../lib-components/components/frame-input/frame-input.module';
import { HintOrErrorModule } from '../lib-components/components/hint-or-error/hint-or-error.module';
import { InfiniteScrollModule } from '../lib-components/components/infinite-scroll/infinite-scroll.module';
import { InputModule } from '../lib-components/components/input/input.module';
import { TextareaModule } from '../lib-components/components/textarea/textarea.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonModule, FrameInputModule, HintOrErrorModule, InfiniteScrollModule, InputModule, TextareaModule],
})
export class LibComponentsModule {}

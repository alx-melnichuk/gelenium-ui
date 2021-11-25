import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { LmComponentsRoutingModule } from './lm-components-routing.module';
import { LmComponentsComponent } from './lm-components.component';
import { FrameInputModule } from './components/frame-input/frame-input.module';
import { InputModule } from './components/input/input.module';
import { InfiniteScrollModule } from './components/infinite-scroll/infinite-scroll.module';
import { TextareaModule } from './components/textarea/textarea.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    LmComponentsRoutingModule,
    FrameInputModule,
    InputModule,
    InfiniteScrollModule,
    TextareaModule,
  ],
})
export class LmComponentsModule {}

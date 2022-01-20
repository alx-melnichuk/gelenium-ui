import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { LmComponentsComponent } from './lm-components.component';
import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';
import { FrameInputModule } from './components/frame-input/frame-input.module';
import { HintOrErrorModule } from './components/hint-or-error/hint-or-error.module';
import { InfiniteScrollModule } from './components/infinite-scroll/infinite-scroll.module';
import { InputModule } from './components/input/input.module';
import { TextareaModule } from './components/textarea/textarea.module';
// This module should be the last one.
import { LmComponentsRoutingModule } from './lm-components-routing.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    SiteSchemeModule,
    FrameInputModule,
    HintOrErrorModule,
    InfiniteScrollModule,
    InputModule,
    TextareaModule,
    LmComponentsRoutingModule,
  ],
})
export class LmComponentsModule {
  constructor() {
    console.log('LmComponentsModule();');
  }
}

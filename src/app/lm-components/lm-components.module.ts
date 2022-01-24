import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';
import { FrameInputModule } from '../lib-components/components/frame-input/frame-input.module';
import { HintOrErrorModule } from '../lib-components/components/hint-or-error/hint-or-error.module';
import { InfiniteScrollModule } from '../lib-components/components/infinite-scroll/infinite-scroll.module';
import { InputModule } from '../lib-components/components/input/input.module';
import { TextareaModule } from '../lib-components/components/textarea/textarea.module';

import { LmComponentsComponent } from './lm-components.component';
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

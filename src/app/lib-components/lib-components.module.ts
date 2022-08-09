import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Button1Module } from './components/button1/button1.module';
import { Button2Module } from './components/button2/button2.module';
import { Frame1Module } from './components/frame1/frame1.module';
import { Frame2Module } from './components/frame2/frame2.module';
import { HintOrErrorModule } from '../lib-components/components/hint-or-error/hint-or-error.module';
import { InfiniteScrollModule } from '../lib-components/components/infinite-scroll/infinite-scroll.module';
import { InputModule } from '../lib-components/components/input/input.module';
import { SelectModule } from './components/select/select.module';
import { TextareaModule } from '../lib-components/components/textarea/textarea.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Button1Module,
    Button2Module,
    Frame1Module,
    Frame2Module,
    HintOrErrorModule,
    InfiniteScrollModule,
    InputModule,
    SelectModule,
    TextareaModule,
  ],
})
export class LibComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaBasicModule } from '../textarea-basic/textarea-basic.module';

import { TextareaComponent } from './textarea.component';

@NgModule({
  declarations: [TextareaComponent],
  imports: [CommonModule, TextareaBasicModule],
  exports: [TextareaComponent],
})
export class TextareaModule {}

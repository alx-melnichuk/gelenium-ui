import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaApiComponent } from './textarea-api.component';

@NgModule({
  declarations: [TextareaApiComponent],
  imports: [CommonModule],
  exports: [TextareaApiComponent],
})
export class TextareaApiModule {}

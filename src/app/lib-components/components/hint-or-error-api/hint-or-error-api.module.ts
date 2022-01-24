import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintOrErrorApiComponent } from './hint-or-error-api.component';

@NgModule({
  declarations: [HintOrErrorApiComponent],
  imports: [CommonModule],
  exports: [HintOrErrorApiComponent],
})
export class HintOrErrorApiModule {}

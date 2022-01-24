import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintOrErrorBasicComponent } from './hint-or-error-basic.component';

@NgModule({
  declarations: [HintOrErrorBasicComponent],
  imports: [CommonModule],
  exports: [HintOrErrorBasicComponent],
})
export class HintOrErrorBasicModule {}

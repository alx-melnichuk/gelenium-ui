import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintOrErrorComponent } from './hint-or-error.component';
import { HintOrErrorBasicModule } from '../hint-or-error-basic/hint-or-error-basic.module';
import { HintOrErrorApiModule } from '../hint-or-error-api/hint-or-error-api.module';
import { HintOrErrorRoutingModule } from './hint-or-error-routing.module';

@NgModule({
  declarations: [HintOrErrorComponent],
  imports: [CommonModule, HintOrErrorBasicModule, HintOrErrorApiModule, HintOrErrorRoutingModule],
  exports: [HintOrErrorComponent],
})
export class HintOrErrorModule {}

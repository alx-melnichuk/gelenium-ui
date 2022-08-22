import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmHintOrErrorBasicModule } from '../cm-hint-or-error-basic/cm-hint-or-error-basic.module';
import { CmHintOrErrorApiModule } from '../cm-hint-or-error-api/cm-hint-or-error-api.module';
import { CmHintOrErrorRoutingModule } from './cm-hint-or-error-routing.module';

import { CmHintOrErrorComponent } from './cm-hint-or-error.component';

@NgModule({
  declarations: [CmHintOrErrorComponent],
  imports: [CommonModule, CmHintOrErrorBasicModule, CmHintOrErrorApiModule, CmHintOrErrorRoutingModule],

  exports: [CmHintOrErrorComponent],
})
export class CmHintOrErrorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintOrErrorComponent } from './hint-or-error.component';
import { HintOrErrorBasicModule } from '../hint-or-error-basic/hint-or-error-basic.module';
import { HintOrErrorApiModule } from '../hint-or-error-api/hint-or-error-api.module';
import { UrlComponents } from '../../constants/url-components.constants';

UrlComponents.add('URL_HINT_OR_ERROR', 'hint-or-error');

@NgModule({
  declarations: [HintOrErrorComponent],
  imports: [CommonModule, HintOrErrorBasicModule, HintOrErrorApiModule],
  exports: [HintOrErrorComponent],
})
export class HintOrErrorModule {}

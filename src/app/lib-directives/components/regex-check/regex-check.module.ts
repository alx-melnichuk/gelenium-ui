import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexCheckBasicModule } from '../regex-check-basic/regex-check-basic.module';
import { RegexCheckApiModule } from '../regex-check-api/regex-check-api.module';

import { RegexCheckComponent } from './regex-check.component';
import { RegexCheckRoutingModule } from './regex-check-routing.module';

@NgModule({
  declarations: [RegexCheckComponent],
  imports: [CommonModule, RegexCheckBasicModule, RegexCheckApiModule, RegexCheckRoutingModule],
  exports: [RegexCheckComponent],
})
export class RegexCheckModule {}

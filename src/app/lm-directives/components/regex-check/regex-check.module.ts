import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexCheckBasicModule } from '../regex-check-basic/regex-check-basic.module';
import { RegexCheckComponent } from './regex-check.component';

@NgModule({
  declarations: [RegexCheckComponent],
  imports: [CommonModule, RegexCheckBasicModule],
  exports: [RegexCheckComponent],
})
export class RegexCheckModule {}

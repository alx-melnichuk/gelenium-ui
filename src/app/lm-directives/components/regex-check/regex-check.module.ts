import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexCheckBasicModule } from '../regex-check-basic/regex-check-basic.module';
import { RegexCheckApiModule } from '../regex-check-api/regex-check-api.module';
import { UrlDirectives } from '../../constants/url-directives.constants';

import { RegexCheckComponent } from './regex-check.component';

UrlDirectives.add('URL_REGEX_CHECK', 'regex-check');

@NgModule({
  declarations: [RegexCheckComponent],
  imports: [CommonModule, RegexCheckBasicModule, RegexCheckApiModule],
  exports: [RegexCheckComponent],
})
export class RegexCheckModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexMatchBasicModule } from '../regex-match-basic/regex-match-basic.module';
import { RegexMatchApiModule } from '../regex-match-api/regex-match-api.module';
import { UrlDirectives } from '../../constants/url-directives.constants';

import { RegexMatchComponent } from './regex-match.component';

UrlDirectives.add('URL_REGEX_MATCH', 'regex-match');

@NgModule({
  declarations: [RegexMatchComponent],
  imports: [CommonModule, RegexMatchBasicModule, RegexMatchApiModule],
  exports: [RegexMatchComponent],
})
export class RegexMatchModule {}

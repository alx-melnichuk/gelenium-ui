import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlDirectives } from 'src/app/lm-directives/constants/url-directives.constants';

import { RegexCheckBasicModule } from '../regex-check-basic/regex-check-basic.module';
import { RegexCheckApiModule } from '../regex-check-api/regex-check-api.module';

import { RegexCheckComponent } from './regex-check.component';

UrlDirectives.add('URL_REGEX_CHECK', 'regex-check');

const url = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_CHECK');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexCheck', { label: 'RegexCheck', siteUrls });

@NgModule({
  declarations: [RegexCheckComponent],
  imports: [CommonModule, RegexCheckBasicModule, RegexCheckApiModule],
  exports: [RegexCheckComponent],
})
export class RegexCheckModule {}

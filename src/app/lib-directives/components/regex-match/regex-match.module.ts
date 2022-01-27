import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlDirectives } from 'src/app/lm-directives/constants/url-directives.constants';

import { RegexMatchBasicModule } from '../regex-match-basic/regex-match-basic.module';
import { RegexMatchApiModule } from '../regex-match-api/regex-match-api.module';

import { RegexMatchComponent } from './regex-match.component';

UrlDirectives.add('URL_REGEX_MATCH', 'regex-match');

const url = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_MATCH');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Directives', 'RegexMatch', { label: 'RegexMatch', siteUrls });

@NgModule({
  declarations: [RegexMatchComponent],
  imports: [CommonModule, RegexMatchBasicModule, RegexMatchApiModule],
  exports: [RegexMatchComponent],
})
export class RegexMatchModule {}

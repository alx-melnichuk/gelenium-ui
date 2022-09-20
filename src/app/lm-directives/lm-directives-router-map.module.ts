import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlUtil } from '../lib-core/utils/url.util';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Directives' partition.

UrlUtil.add('URL_DIRECTIVES', 'directives');

// ** Menu for "AutoFocuse". **

UrlUtil.add('URL_DIRECTIVES_AUTO_FOCUSE', 'auto-focuse');
const urlAutoFocuse = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_DIRECTIVES_AUTO_FOCUSE');
const siteUrlsAutoFocuse: SiteUrl[] = [
  { label: 'Basic', url: urlAutoFocuse, fragment: 'Basic' },
  { label: 'Api', url: urlAutoFocuse, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'AutoFocuse', { label: 'AutoFocuse', siteUrls: siteUrlsAutoFocuse });

// ** Menu for "RegexCheck". **

UrlUtil.add('URL_DIRECTIVES_REGEX_CHECK', 'regex-check');
const urlRegexCheck = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_DIRECTIVES_REGEX_CHECK');
const siteUrlsRegexCheck: SiteUrl[] = [
  { label: 'Basic', url: urlRegexCheck, fragment: 'Basic' },
  { label: 'Api', url: urlRegexCheck, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexCheck', { label: 'RegexCheck', siteUrls: siteUrlsRegexCheck });

// ** Menu for "RegexMatch". **

UrlUtil.add('URL_DIRECTIVES_REGEX_MATCH', 'regex-match');
const urlRegexMatch = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_DIRECTIVES_REGEX_MATCH');
const siteUrlsRegexMatch: SiteUrl[] = [
  { label: 'Basic', url: urlRegexMatch, fragment: 'Basic' },
  { label: 'Api', url: urlRegexMatch, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexMatch', { label: 'RegexMatch', siteUrls: siteUrlsRegexMatch });

// ** Menu for "RegexRemove". **

UrlUtil.add('URL_DIRECTIVES_REGEX_REMOVE', 'regex-remove');
const urlRegexRemove = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_DIRECTIVES_REGEX_REMOVE');
const siteUrlsRegexRemove: SiteUrl[] = [
  { label: 'Basic', url: urlRegexRemove, fragment: 'Basic' },
  { label: 'Api', url: urlRegexRemove, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexRemove', { label: 'RegexRemove', siteUrls: siteUrlsRegexRemove });

@NgModule({
  imports: [CommonModule],
})
export class LmDirectivesRouterMapModule {}

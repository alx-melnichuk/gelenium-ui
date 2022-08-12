import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';
import { UrlUtil } from '../lib-core/utils/url.util';

export class UrlDirectives extends UrlUtil {}

UrlDirectives.add('URL_DIRECTIVES', 'directives');

UrlDirectives.add('URL_AUTO_FOCUSE', 'auto-focuse');

const urlAutoFocuse = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_AUTO_FOCUSE');
const siteUrlsAutoFocuse: SiteUrl[] = [
  { label: 'Basic', url: urlAutoFocuse, fragment: 'Basic' },
  { label: 'Api', url: urlAutoFocuse, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'AutoFocuse', { label: 'AutoFocuse', siteUrls: siteUrlsAutoFocuse });

UrlDirectives.add('URL_REGEX_CHECK', 'regex-check');
const urlRegexCheck = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_CHECK');
const siteUrlsRegexCheck: SiteUrl[] = [
  { label: 'Basic', url: urlRegexCheck, fragment: 'Basic' },
  { label: 'Api', url: urlRegexCheck, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexCheck', { label: 'RegexCheck', siteUrls: siteUrlsRegexCheck });

UrlDirectives.add('URL_REGEX_MATCH', 'regex-match');
const urlRegexMatch = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_MATCH');
const siteUrlsRegexMatch: SiteUrl[] = [
  { label: 'Basic', url: urlRegexMatch, fragment: 'Basic' },
  { label: 'Api', url: urlRegexMatch, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexMatch', { label: 'RegexMatch', siteUrls: siteUrlsRegexMatch });

UrlDirectives.add('URL_REGEX_REMOVE', 'regex-remove');
const urlRegexRemove = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_REMOVE');
const siteUrlsRegexRemove: SiteUrl[] = [
  { label: 'Basic', url: urlRegexRemove, fragment: 'Basic' },
  { label: 'Api', url: urlRegexRemove, fragment: 'Api' },
];
SiteMenuUtil.addItem('Directives', 'RegexRemove', { label: 'RegexRemove', siteUrls: siteUrlsRegexRemove });

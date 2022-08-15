import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';
import { UrlUtil } from '../lib-core/utils/url.util';

export class UrlPalette extends UrlUtil {}

UrlPalette.add('URL_PALETTE', 'palette');

UrlPalette.add('URL_INPUT', 'input');
const urlInput = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_INPUT');
const siteUrlsInput: SiteUrl[] = [{ label: 'Palette', url: urlInput, fragment: 'Palette' }];
SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

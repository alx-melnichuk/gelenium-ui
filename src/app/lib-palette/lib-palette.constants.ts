import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';
import { UrlUtil } from '../lib-core/utils/url.util';

export class UrlPalette extends UrlUtil {}

UrlPalette.add('URL_PALETTE', 'palette');

// ** Palette Input **

UrlPalette.add('URL_INPUT', 'input');
const urlPlInput = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_INPUT');

const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlPlInput, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlInput, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlInput, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

// ** **

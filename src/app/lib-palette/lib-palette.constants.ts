import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';
import { UrlUtil } from '../lib-core/utils/url.util';

export class UrlPalette extends UrlUtil {}

UrlPalette.add('URL_PALETTE', 'palette');

// ** Menu for "Input". **

UrlPalette.add('URL_INPUT', 'input');
const urlPlInput = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_INPUT');

const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlPlInput, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlInput, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlInput, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

// ** Menu for "Select". **

UrlPalette.add('URL_SELECT', 'select');
const urlPlSelect = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_SELECT');

const siteUrlsSelect: SiteUrl[] = [
  { label: 'Basic', url: urlPlSelect, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlSelect, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlSelect, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

// ** Menu for "Textarea". **

UrlPalette.add('URL_TEXTAREA', 'textarea');
const urlPlTextarea = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_TEXTAREA');

const siteUrlsTextarea: SiteUrl[] = [
  { label: 'Basic', url: urlPlTextarea, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlTextarea, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlTextarea, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Textarea', { label: 'Textarea', siteUrls: siteUrlsTextarea });

// ** **

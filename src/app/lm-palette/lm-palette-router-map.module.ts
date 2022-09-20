import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlUtil } from '../lib-core/utils/url.util';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Palette' partition.

UrlUtil.add('URL_PALETTE', 'palette');

// ** Menu for "Button". **

UrlUtil.add('URL_PALETTE_BUTTON', 'button');
const urlPlButton = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_BUTTON');

const siteUrlsButton: SiteUrl[] = [
  { label: 'Basic', url: urlPlButton, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlButton, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlButton, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Button', { label: 'Button', siteUrls: siteUrlsButton });

// ** Menu for "Frame". **

UrlUtil.add('URL_PALETTE_FRAME', 'frame');
const urlPlFrame = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_FRAME');

const siteUrlsFrame: SiteUrl[] = [{ label: 'Customer', url: urlPlFrame, fragment: 'Customer' }];

SiteMenuUtil.addItem('Palette', 'Frame', { label: 'Frame', siteUrls: siteUrlsFrame });

// ** Menu for "Input". **

UrlUtil.add('URL_PALETTE_INPUT', 'input');
const urlPlInput = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_INPUT');

const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlPlInput, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlInput, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlInput, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

// ** Menu for "Select". **

UrlUtil.add('URL_PALETTE_SELECT', 'select');
const urlPlSelect = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_SELECT');

const siteUrlsSelect: SiteUrl[] = [
  { label: 'Basic', url: urlPlSelect, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlSelect, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlSelect, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

// ** Menu for "Textarea". **

UrlUtil.add('URL_PALETTE_TEXTAREA', 'textarea');
const urlPlTextarea = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_TEXTAREA');

const siteUrlsTextarea: SiteUrl[] = [
  { label: 'Basic', url: urlPlTextarea, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlTextarea, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlTextarea, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Textarea', { label: 'Textarea', siteUrls: siteUrlsTextarea });

@NgModule({
  imports: [CommonModule],
})
export class LmPaletteRouterMapModule {}

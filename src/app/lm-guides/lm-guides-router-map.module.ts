import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlUtil } from '../lib-core/utils/url.util';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Guides' partition.

UrlUtil.add('URL_GUIDES', 'guides');

// ** Menu for "Guides - Start". **

UrlUtil.add('URL_GUIDES_START', 'start');
const urlGtStStart = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_GUIDES_START');
const siteUrlsGtStStart: SiteUrl[] = [{ label: 'Getting Started', url: urlGtStStart, fragment: 'GettingStarted' }];
SiteMenuUtil.addItem('Guides', 'Start', { label: 'Start', siteUrls: siteUrlsGtStStart, order: 1 });

// ** Menu for "Guides - Description". **

UrlUtil.add('URL_GUIDES_DESCRIPTION', 'description');
const urlGtStDescription = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_GUIDES_DESCRIPTION');
const siteUrlsGtStDescription: SiteUrl[] = [{ label: 'About library', url: urlGtStDescription, fragment: 'AboutLibrary' }];
SiteMenuUtil.addItem('Guides', 'Description', { label: 'Description', siteUrls: siteUrlsGtStDescription, order: 2 });

@NgModule({
  imports: [CommonModule],
})
export class LmGuidesRouterMapModule {}

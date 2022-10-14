import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterConfig } from '../lib-core/config/router-config';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Guides' partition.

RouterConfig.add('URL_GUIDES', 'guides');

// ** Menu for "Guides - Start". **

RouterConfig.add('URL_GUIDES_START', 'start');
const urlGtStStart = '/' + RouterConfig.get('URL_GUIDES') + '/' + RouterConfig.get('URL_GUIDES_START');
const siteUrlsGtStStart: SiteUrl[] = [{ label: 'Getting Started', url: urlGtStStart, fragment: 'GettingStarted' }];
SiteMenuUtil.addItem('Guides', 'Start', { label: 'Start', siteUrls: siteUrlsGtStStart, order: 1 });

// ** Menu for "Guides - Description". **

RouterConfig.add('URL_GUIDES_DESCRIPTION', 'description');
const urlGtStDescription = '/' + RouterConfig.get('URL_GUIDES') + '/' + RouterConfig.get('URL_GUIDES_DESCRIPTION');
const siteUrlsGtStDescription: SiteUrl[] = [{ label: 'About library', url: urlGtStDescription, fragment: 'AboutLibrary' }];
SiteMenuUtil.addItem('Guides', 'Description', { label: 'Description', siteUrls: siteUrlsGtStDescription, order: 2 });

@NgModule({
  imports: [CommonModule],
})
export class LmGuidesRouterMapModule {}

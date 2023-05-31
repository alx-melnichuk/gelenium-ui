import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterConfig } from '../lib-core/config/router-config';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Palette' partition.

RouterConfig.add('URL_PALETTE', 'palette');

// ** Menu for "Button". **

RouterConfig.add('URL_PALETTE_BUTTON', 'button');
const urlPlButton = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_BUTTON');

const siteUrlsButton: SiteUrl[] = [
  { label: 'Basic', url: urlPlButton, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlButton, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlButton, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Button', { label: 'Button', siteUrls: siteUrlsButton });

//  ** Menu for "Calendar". **

RouterConfig.add('URL_PALETTE_CALENDAR', 'calendar');
const urlPlCalendar = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_CALENDAR');

const siteUrlsCalendar: SiteUrl[] = [
  { label: 'Basic', url: urlPlCalendar, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlCalendar, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlCalendar, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Calendar', { label: 'Calendar', siteUrls: siteUrlsCalendar });

// ** Menu for "Checkbox". **

RouterConfig.add('URL_PALETTE_CHECKBOX', 'checkbox');
const urlPlCheckbox = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_CHECKBOX');

const siteUrlsCheckbox: SiteUrl[] = [
  { label: 'Basic', url: urlPlCheckbox, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlCheckbox, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlCheckbox, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Checkbox', { label: 'Checkbox', siteUrls: siteUrlsCheckbox });

// ** Menu for "Frame". **

RouterConfig.add('URL_PALETTE_FRAME', 'frame');
const urlPlFrame = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_FRAME');

const siteUrlsFrame: SiteUrl[] = [{ label: 'Customer', url: urlPlFrame, fragment: 'Customer' }];

SiteMenuUtil.addItem('Palette', 'Frame', { label: 'Frame', siteUrls: siteUrlsFrame });

// ** Menu for "Input". **

RouterConfig.add('URL_PALETTE_INPUT', 'input');
const urlPlInput = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_INPUT');

const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlPlInput, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlInput, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlInput, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

// ** Menu for "Pagination". **

RouterConfig.add('URL_PALETTE_PAGINATION', 'pagination');
const urlPlPagination = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_PAGINATION');

const siteUrlsPagination: SiteUrl[] = [
  { label: 'Basic', url: urlPlPagination, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlPagination, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlPagination, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Pagination', { label: 'Pagination', siteUrls: siteUrlsPagination });

// ** Menu for "RadioButton". **

RouterConfig.add('URL_PALETTE_RADIOBUTTON', 'radiobutton');
const urlPlRadioButton = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_RADIOBUTTON');

const siteUrlsRadioButton: SiteUrl[] = [
  { label: 'Basic', url: urlPlRadioButton, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlRadioButton, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlRadioButton, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Radio button', { label: 'Radio button', siteUrls: siteUrlsRadioButton });

// ** Menu for "Select". **

RouterConfig.add('URL_PALETTE_SELECT', 'select');
const urlPlSelect = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SELECT');

const siteUrlsSelect: SiteUrl[] = [
  { label: 'Basic', url: urlPlSelect, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlSelect, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlSelect, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

// ** Menu for "Snackbar". **

RouterConfig.add('URL_PALETTE_SNACKBAR', 'snackbar');
const urlPlSnackbar = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SNACKBAR');

const siteUrlsSnackbar: SiteUrl[] = [
  { label: 'Basic', url: urlPlSnackbar, fragment: 'Basic' },
  { label: 'Like a Bootstrap', url: urlPlSnackbar, fragment: 'Bootstrap' },
  { label: 'Like a Material-UI', url: urlPlSnackbar, fragment: 'MaterialUI' },
];

SiteMenuUtil.addItem('Palette', 'Snackbar', { label: 'Snackbar', siteUrls: siteUrlsSnackbar });

// ** Menu for "Textarea". **

RouterConfig.add('URL_PALETTE_TEXTAREA', 'textarea');
const urlPlTextarea = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_TEXTAREA');

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

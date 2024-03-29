import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterConfig } from '../lib-core/config/router-config';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Components' partition.

RouterConfig.add('URL_COMPONENTS', 'components');

// -- Autocomplete --
RouterConfig.add('URL_COMPONENTS_AUTOCOMPLETE', 'autocomplete');
const urlAutocomplete = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_AUTOCOMPLETE');
const siteUrlsAutocomplete: SiteUrl[] = [
  { label: 'Basic', url: urlAutocomplete, fragment: 'Basic' },
  { label: 'Attributes', url: urlAutocomplete, fragment: 'Attributes' },
  { label: 'Asynchrony', url: urlAutocomplete, fragment: 'Asynchrony' },
  { label: 'Feature', url: urlAutocomplete, fragment: 'Feature' },
  { label: 'Config', url: urlAutocomplete, fragment: 'Config' },
  { label: 'Api', url: urlAutocomplete, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Autocomplete', { label: 'Autocomplete', siteUrls: siteUrlsAutocomplete });

// -- Button --
RouterConfig.add('URL_COMPONENTS_BUTTON', 'button');
const urlButton = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_BUTTON');
const siteUrlsButton: SiteUrl[] = [
  { label: 'Basic', url: urlButton, fragment: 'Basic' },
  { label: 'Attributes', url: urlButton, fragment: 'Attributes' },
  { label: 'Size', url: urlButton, fragment: 'Size' },
  { label: 'Border Radius', url: urlButton, fragment: 'BorderRadius' },
  { label: 'Ornaments', url: urlButton, fragment: 'Ornaments' },
  { label: 'Palette', url: urlButton, fragment: 'Palette' },
  { label: 'Config', url: urlButton, fragment: 'Config' },
  { label: 'Api', url: urlButton, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Button', { label: 'Button', siteUrls: siteUrlsButton });

// -- Checkbox --
RouterConfig.add('URL_COMPONENTS_CHECKBOX', 'checkbox');
const urlCheckbox = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');
const siteUrlsCheckbox: SiteUrl[] = [
  { label: 'Basic', url: urlCheckbox, fragment: 'Basic' },
  { label: 'Attributes', url: urlCheckbox, fragment: 'Attributes' },
  { label: 'Size', url: urlCheckbox, fragment: 'Size' },
  { label: 'Palette', url: urlCheckbox, fragment: 'Palette' },
  { label: 'Config', url: urlCheckbox, fragment: 'Config' },
  { label: 'Api', url: urlCheckbox, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Checkbox', { label: 'Checkbox', siteUrls: siteUrlsCheckbox });

// -- Chip --
RouterConfig.add('URL_COMPONENTS_CHIP', 'chip');
const urlChip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHIP');
const siteUrlsChip: SiteUrl[] = [
  { label: 'Basic', url: urlChip, fragment: 'Basic' },
  { label: 'Attributes', url: urlChip, fragment: 'Attributes' },
  { label: 'Size', url: urlChip, fragment: 'Size' },
  { label: 'Ornaments', url: urlChip, fragment: 'Ornaments' },
  { label: 'Palette', url: urlChip, fragment: 'Palette' },
  { label: 'Config', url: urlChip, fragment: 'Config' },
  { label: 'Api', url: urlChip, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Chip', { label: 'Chip', siteUrls: siteUrlsChip });

// -- Frame --
RouterConfig.add('URL_COMPONENTS_FRAME', 'frame');
const urlFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
const siteUrlsFrame: SiteUrl[] = [
  { label: 'Basic', url: urlFrame, fragment: 'Basic' },
  { label: 'Attributes', url: urlFrame, fragment: 'Attributes' },
  { label: 'Size', url: urlFrame, fragment: 'Size' },
  { label: 'Label', url: urlFrame, fragment: 'Label' },
  { label: 'Helper text', url: urlFrame, fragment: 'HelperText' },
  { label: 'Border radius', url: urlFrame, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlFrame, fragment: 'Palette' },
  { label: 'Structure', url: urlFrame, fragment: 'Structure' },
  { label: 'Config', url: urlFrame, fragment: 'Config' },
  { label: 'Api', url: urlFrame, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Frame', { label: 'Frame', siteUrls: siteUrlsFrame });

// -- HintOrError --
RouterConfig.add('URL_COMPONENTS_HINT_OR_ERROR', 'hint-or-error');
const urlHintOrError = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_HINT_OR_ERROR');
const siteUrlsHintOrError: SiteUrl[] = [
  { label: 'Basic', url: urlHintOrError, fragment: 'Basic' },
  { label: 'Api', url: urlHintOrError, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'HintOrError', { label: 'HintOrError', siteUrls: siteUrlsHintOrError });

// -- InfiniteScroll --
RouterConfig.add('URL_COMPONENTS_INFINITE_SCROLL', 'infinite-scroll');
const urlInfiniteScroll = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INFINITE_SCROLL');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url: urlInfiniteScroll, fragment: 'Basic' },
  { label: 'Optional', url: urlInfiniteScroll, fragment: 'Optional' },
  { label: 'Api', url: urlInfiniteScroll, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'InfiniteScroll', { label: 'InfiniteScroll', siteUrls });

// -- Input --
RouterConfig.add('URL_COMPONENTS_INPUT', 'input');
const urlInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');
const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlInput, fragment: 'Basic' },
  { label: 'Attributes', url: urlInput, fragment: 'Attributes' },
  { label: 'Validation', url: urlInput, fragment: 'Validation' },
  { label: 'Numerical value', url: urlInput, fragment: 'NumericalValue' },
  { label: 'Ornaments', url: urlInput, fragment: 'Ornaments' },
  { label: 'Size', url: urlInput, fragment: 'Size' },
  { label: 'Helper text', url: urlInput, fragment: 'HelperText' },
  { label: 'Border radius', url: urlInput, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlInput, fragment: 'Palette' },
  { label: 'Config', url: urlInput, fragment: 'Config' },
  { label: 'Api', url: urlInput, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

// -- Pagination --
RouterConfig.add('URL_COMPONENTS_PAGINATION', 'pagination');
const urlPagination = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');
const siteUrlsPagination: SiteUrl[] = [
  { label: 'Basic', url: urlPagination, fragment: 'Basic' },
  { label: 'Attributes', url: urlPagination, fragment: 'Attributes' },
  { label: 'Size', url: urlPagination, fragment: 'Size' },
  { label: 'Border', url: urlPagination, fragment: 'Border' },
  { label: 'Ornaments', url: urlPagination, fragment: 'Ornaments' },
  { label: 'Palette', url: urlPagination, fragment: 'Palette' },
  { label: 'Config', url: urlPagination, fragment: 'Config' },
  { label: 'Api', url: urlPagination, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Pagination', { label: 'Pagination', siteUrls: siteUrlsPagination });

// -- Radio --
RouterConfig.add('URL_COMPONENTS_RADIOBUTTON', 'radio');
const urlRadio = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');
const siteUrlsRadio: SiteUrl[] = [
  { label: 'Basic', url: urlRadio, fragment: 'Basic' },
  { label: 'Attributes', url: urlRadio, fragment: 'Attributes' },
  { label: 'Size', url: urlRadio, fragment: 'Size' },
  { label: 'Palette', url: urlRadio, fragment: 'Palette' },
  { label: 'Config', url: urlRadio, fragment: 'Config' },
  { label: 'Api', url: urlRadio, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Radio button', { label: 'Radio button', siteUrls: siteUrlsRadio });

// -- Select --
RouterConfig.add('URL_COMPONENTS_SELECT', 'select');
const urlSelect = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');
const siteUrlsSelect: SiteUrl[] = [
  { label: 'Basic', url: urlSelect, fragment: 'Basic' },
  { label: 'Attributes', url: urlSelect, fragment: 'Attributes' },
  { label: 'Validation', url: urlSelect, fragment: 'Validation' },
  { label: 'Group', url: urlSelect, fragment: 'Group' },
  { label: 'Trigger', url: urlSelect, fragment: 'Trigger' },
  { label: 'Ornaments', url: urlSelect, fragment: 'Ornaments' },
  { label: 'Size', url: urlSelect, fragment: 'Size' },
  { label: 'Helper text', url: urlSelect, fragment: 'HelperText' },
  { label: 'Border radius', url: urlSelect, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlSelect, fragment: 'Palette' },
  { label: 'Feature', url: urlSelect, fragment: 'Feature' },
  { label: 'Config', url: urlSelect, fragment: 'Config' },
  { label: 'Api', url: urlSelect, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

// -- Snackbar --
RouterConfig.add('URL_COMPONENTS_SNACKBAR', 'snackbar');
const urlSnackbar = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SNACKBAR');
const siteUrlsSnackbar: SiteUrl[] = [
  { label: 'Basic', url: urlSnackbar, fragment: 'Basic' },
  { label: 'Attributes', url: urlSnackbar, fragment: 'Attributes' },
  { label: 'Customization', url: urlSnackbar, fragment: 'Customization' },
  { label: 'Palette', url: urlButton, fragment: 'Palette' },
  { label: 'Config', url: urlSnackbar, fragment: 'Config' },
  { label: 'Api', url: urlSnackbar, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Snackbar', { label: 'Snackbar', siteUrls: siteUrlsSnackbar });

// -- Spinner --
RouterConfig.add('URL_COMPONENTS_SPINNER', 'spinner');
const urlSpinner = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SPINNER');
const siteUrlsSpinner: SiteUrl[] = [
  { label: 'Basic', url: urlSpinner, fragment: 'Basic' },
  { label: 'Attributes', url: urlSpinner, fragment: 'Attributes' },
  { label: 'Size', url: urlSpinner, fragment: 'Size' },
  { label: 'Palette', url: urlSpinner, fragment: 'Palette' },
  { label: 'Customization', url: urlSpinner, fragment: 'Customization' },
  { label: 'Config', url: urlSpinner, fragment: 'Config' },
  { label: 'Api', url: urlSpinner, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Spinner', { label: 'Spinner', siteUrls: siteUrlsSpinner });

// -- Switch --
RouterConfig.add('URL_COMPONENTS_SWITCH', 'switch');
const urlSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');
const siteUrlsSwitch: SiteUrl[] = [
  { label: 'Basic', url: urlSwitch, fragment: 'Basic' },
  { label: 'Attributes', url: urlSwitch, fragment: 'Attributes' },
  { label: 'Size', url: urlSwitch, fragment: 'Size' },
  { label: 'Palette', url: urlSwitch, fragment: 'Palette' },
  { label: 'Customization', url: urlSwitch, fragment: 'Customization' },
  { label: 'Config', url: urlSwitch, fragment: 'Config' },
  { label: 'Api', url: urlSwitch, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Switch', { label: 'Switch', siteUrls: siteUrlsSwitch });

// -- Textarea --
RouterConfig.add('URL_COMPONENTS_TEXTAREA', 'textarea');
const urlTextarea = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TEXTAREA');
const siteUrlsTextarea: SiteUrl[] = [
  { label: 'Basic', url: urlTextarea, fragment: 'Basic' },
  { label: 'Attributes', url: urlTextarea, fragment: 'Attributes' },
  { label: 'Validation', url: urlTextarea, fragment: 'Validation' },
  { label: 'Capability', url: urlTextarea, fragment: 'Capability' },
  { label: 'Ornaments', url: urlTextarea, fragment: 'Ornaments' },
  { label: 'Size', url: urlTextarea, fragment: 'Size' },
  { label: 'Helper text', url: urlTextarea, fragment: 'HelperText' },
  { label: 'Border radius', url: urlTextarea, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlTextarea, fragment: 'Palette' },
  { label: 'Config', url: urlTextarea, fragment: 'Config' },
  { label: 'Api', url: urlTextarea, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Textarea', { label: 'Textarea', siteUrls: siteUrlsTextarea });

// -- Tooltip --
RouterConfig.add('URL_COMPONENTS_TOOLTIP', 'tooltip');
const urlTooltip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');
const siteUrlsTooltip: SiteUrl[] = [
  { label: 'Basic', url: urlTooltip, fragment: 'Basic' },
  { label: 'Attributes', url: urlTooltip, fragment: 'Attributes' },
  { label: 'Customization', url: urlTooltip, fragment: 'Customization' },
  { label: 'Feature', url: urlTooltip, fragment: 'Feature' },
  { label: 'Config', url: urlTooltip, fragment: 'Config' },
  { label: 'Api', url: urlTooltip, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Tooltip', { label: 'Tooltip', siteUrls: siteUrlsTooltip });

@NgModule({
  imports: [CommonModule],
})
export class LmComponentsRouterMapModule {}

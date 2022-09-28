import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterConfig } from '../lib-core/config/router-config';
import { SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

// Defining a route map for an 'Components' partition.

RouterConfig.add('URL_COMPONENTS', 'components');

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

RouterConfig.add('URL_COMPONENTS_FRAME', 'frame');
const urlFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
const siteUrlsFrame: SiteUrl[] = [
  { label: 'Basic', url: urlFrame, fragment: 'Basic' },
  { label: 'Attributes', url: urlFrame, fragment: 'Attributes' },
  { label: 'Frame size', url: urlFrame, fragment: 'FrameSize' },
  { label: 'Label', url: urlFrame, fragment: 'Label' },
  { label: 'Helper text', url: urlFrame, fragment: 'HelperText' },
  { label: 'Border radius', url: urlFrame, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlFrame, fragment: 'Palette' },
  { label: 'Feature', url: urlFrame, fragment: 'Feature' },
  { label: 'Structure', url: urlFrame, fragment: 'Structure' },
  { label: 'Config', url: urlFrame, fragment: 'Config' },
  { label: 'Api', url: urlFrame, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Frame', { label: 'Frame', siteUrls: siteUrlsFrame });

RouterConfig.add('URL_COMPONENTS_HINT_OR_ERROR', 'hint-or-error');
const urlHintOrError = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_HINT_OR_ERROR');
const siteUrlsHintOrError: SiteUrl[] = [
  { label: 'Basic', url: urlHintOrError, fragment: 'Basic' },
  { label: 'Api', url: urlHintOrError, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'HintOrError', { label: 'HintOrError', siteUrls: siteUrlsHintOrError });

RouterConfig.add('URL_COMPONENTS_INFINITE_SCROLL', 'infinite-scroll');
const urlInfiniteScroll = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INFINITE_SCROLL');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url: urlInfiniteScroll, fragment: 'Basic' },
  { label: 'Optional', url: urlInfiniteScroll, fragment: 'Optional' },
  { label: 'Api', url: urlInfiniteScroll, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'InfiniteScroll', { label: 'InfiniteScroll', siteUrls });

RouterConfig.add('URL_COMPONENTS_INPUT', 'input');
const urlInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');
const siteUrlsInput: SiteUrl[] = [
  { label: 'Basic', url: urlInput, fragment: 'Basic' },
  { label: 'Attributes', url: urlInput, fragment: 'Attributes' },
  { label: 'Validation', url: urlInput, fragment: 'Validation' },
  { label: 'Numerical value', url: urlInput, fragment: 'NumericalValue' },
  { label: 'Ornaments', url: urlInput, fragment: 'Ornaments' },
  { label: 'Item size', url: urlInput, fragment: 'ItemSize' },
  { label: 'Helper text', url: urlInput, fragment: 'HelperText' },
  { label: 'Border radius', url: urlInput, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlInput, fragment: 'Palette' },
  { label: 'Config', url: urlInput, fragment: 'Config' },
  { label: 'Api', url: urlInput, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

RouterConfig.add('URL_COMPONENTS_SELECT', 'select');
const urlSelect = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');
const siteUrlsSelect: SiteUrl[] = [
  { label: 'Basic', url: urlSelect, fragment: 'Basic' },
  { label: 'Attributes', url: urlSelect, fragment: 'Attributes' },
  { label: 'Validation', url: urlSelect, fragment: 'Validation' },
  { label: 'Group', url: urlSelect, fragment: 'Group' },
  { label: 'Trigger', url: urlSelect, fragment: 'Trigger' },
  { label: 'Ornaments', url: urlSelect, fragment: 'Ornaments' },
  { label: 'Item size', url: urlSelect, fragment: 'ItemSize' },
  { label: 'Helper text', url: urlSelect, fragment: 'HelperText' },
  { label: 'Border radius', url: urlSelect, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlSelect, fragment: 'Palette' },
  { label: 'Config', url: urlSelect, fragment: 'Config' },
  { label: 'Api', url: urlSelect, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

RouterConfig.add('URL_COMPONENTS_SWITCH', 'switch');
const urlSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');
const siteUrlsSwitch: SiteUrl[] = [
  { label: 'Basic', url: urlSwitch, fragment: 'Basic' },
  { label: 'Attributes', url: urlSwitch, fragment: 'Attributes' },
  { label: 'Item size', url: urlSwitch, fragment: 'ItemSize' },
  { label: 'Palette', url: urlSwitch, fragment: 'Palette' },
  { label: 'Customization', url: urlSwitch, fragment: 'Customization' },
  { label: 'Config', url: urlSwitch, fragment: 'Config' },
  { label: 'Api', url: urlSwitch, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Switch', { label: 'Switch', siteUrls: siteUrlsSwitch });

RouterConfig.add('URL_COMPONENTS_TEXTAREA', 'textarea');
const urlTextarea = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TEXTAREA');
const siteUrlsTextarea: SiteUrl[] = [
  { label: 'Basic', url: urlTextarea, fragment: 'Basic' },
  { label: 'Attributes', url: urlTextarea, fragment: 'Attributes' },
  { label: 'Validation', url: urlTextarea, fragment: 'Validation' },
  { label: 'Capability', url: urlTextarea, fragment: 'Capability' },
  { label: 'Ornaments', url: urlTextarea, fragment: 'Ornaments' },
  { label: 'Item size', url: urlTextarea, fragment: 'ItemSize' },
  { label: 'Helper text', url: urlTextarea, fragment: 'HelperText' },
  { label: 'Border radius', url: urlTextarea, fragment: 'BorderRadius' },
  { label: 'Palette', url: urlTextarea, fragment: 'Palette' },
  { label: 'Config', url: urlTextarea, fragment: 'Config' },
  { label: 'Api', url: urlTextarea, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'Textarea', { label: 'Textarea', siteUrls: siteUrlsTextarea });

@NgModule({
  imports: [CommonModule],
})
export class LmComponentsRouterMapModule {}

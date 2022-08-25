import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from './lib-core/decorators/auto-unsubscribe';
import { ScrollAfterRoutingUtil } from './lib-core/utils/scroll-after-routing.util';
import { SiteMenuUtil, SiteUrl } from './lib-core/utils/site-menu.util';
import { UrlUtil } from './lib-core/utils/url.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  title = 'gelenium-ui-demo';
  private routerEventsSub: Subscription | null = null;

  constructor(private router: Router) {
    this.initGuides();
    this.initMenuComponents();
    this.initMenuDirectives();
    this.initMenuPalette();
  }

  public ngOnInit(): void {
    this.routerEventsSub = ScrollAfterRoutingUtil.listenForRouterEvents(this.router);
  }

  public initGuides(): void {
    UrlUtil.add('URL_GUIDES', 'guides');

    // ** Menu for "Guides - Start". **

    UrlUtil.add('URL_START', 'start');
    const urlGtStStart = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_START');
    const siteUrlsGtStStart: SiteUrl[] = [{ label: 'Getting Started', url: urlGtStStart, fragment: 'GettingStarted' }];
    SiteMenuUtil.addItem('Guides', 'Start', { label: 'Start', siteUrls: siteUrlsGtStStart, order: 1 });

    // ** Menu for "Guides - Description". **

    UrlUtil.add('URL_DESCRIPTION', 'description');
    const urlGtStDescription = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_DESCRIPTION');
    const siteUrlsGtStDescription: SiteUrl[] = [{ label: 'About library', url: urlGtStDescription, fragment: 'AboutLibrary' }];
    SiteMenuUtil.addItem('Guides', 'Description', { label: 'Description', siteUrls: siteUrlsGtStDescription, order: 2 });
  }

  public initMenuComponents(): void {
    UrlUtil.add('URL_COMPONENTS', 'components');

    UrlUtil.add('URL_BUTTON', 'button');
    const urlButton = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_BUTTON');
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

    UrlUtil.add('URL_FRAME', 'frame');
    const urlFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
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

    UrlUtil.add('URL_HINT_OR_ERROR', 'hint-or-error');
    const urlHintOrError = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_HINT_OR_ERROR');
    const siteUrlsHintOrError: SiteUrl[] = [
      { label: 'Basic', url: urlHintOrError, fragment: 'Basic' },
      { label: 'Api', url: urlHintOrError, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Components', 'HintOrError', { label: 'HintOrError', siteUrls: siteUrlsHintOrError });

    UrlUtil.add('URL_INFINITE_SCROLL', 'infinite-scroll');
    const urlInfiniteScroll = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_INFINITE_SCROLL');
    const siteUrls: SiteUrl[] = [
      { label: 'Basic', url: urlInfiniteScroll, fragment: 'Basic' },
      { label: 'Optional', url: urlInfiniteScroll, fragment: 'Optional' },
      { label: 'Api', url: urlInfiniteScroll, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Components', 'InfiniteScroll', { label: 'InfiniteScroll', siteUrls });

    UrlUtil.add('URL_INPUT', 'input');
    const urlInput = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_INPUT');
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

    UrlUtil.add('URL_SELECT', 'select');
    const urlSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_SELECT');
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

    UrlUtil.add('URL_TEXTAREA', 'textarea');
    const urlTextarea = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_TEXTAREA');
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
  }

  public initMenuDirectives(): void {
    UrlUtil.add('URL_DIRECTIVES', 'directives');

    UrlUtil.add('URL_AUTO_FOCUSE', 'auto-focuse');

    const urlAutoFocuse = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_AUTO_FOCUSE');
    const siteUrlsAutoFocuse: SiteUrl[] = [
      { label: 'Basic', url: urlAutoFocuse, fragment: 'Basic' },
      { label: 'Api', url: urlAutoFocuse, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Directives', 'AutoFocuse', { label: 'AutoFocuse', siteUrls: siteUrlsAutoFocuse });

    UrlUtil.add('URL_REGEX_CHECK', 'regex-check');
    const urlRegexCheck = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_REGEX_CHECK');
    const siteUrlsRegexCheck: SiteUrl[] = [
      { label: 'Basic', url: urlRegexCheck, fragment: 'Basic' },
      { label: 'Api', url: urlRegexCheck, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Directives', 'RegexCheck', { label: 'RegexCheck', siteUrls: siteUrlsRegexCheck });

    UrlUtil.add('URL_REGEX_MATCH', 'regex-match');
    const urlRegexMatch = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_REGEX_MATCH');
    const siteUrlsRegexMatch: SiteUrl[] = [
      { label: 'Basic', url: urlRegexMatch, fragment: 'Basic' },
      { label: 'Api', url: urlRegexMatch, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Directives', 'RegexMatch', { label: 'RegexMatch', siteUrls: siteUrlsRegexMatch });

    UrlUtil.add('URL_REGEX_REMOVE', 'regex-remove');
    const urlRegexRemove = '/' + UrlUtil.get('URL_DIRECTIVES') + '/' + UrlUtil.get('URL_REGEX_REMOVE');
    const siteUrlsRegexRemove: SiteUrl[] = [
      { label: 'Basic', url: urlRegexRemove, fragment: 'Basic' },
      { label: 'Api', url: urlRegexRemove, fragment: 'Api' },
    ];
    SiteMenuUtil.addItem('Directives', 'RegexRemove', { label: 'RegexRemove', siteUrls: siteUrlsRegexRemove });
  }

  public initMenuPalette(): void {
    UrlUtil.add('URL_PALETTE', 'palette');

    // ** Menu for "Button". **

    UrlUtil.add('URL_BUTTON', 'button');
    const urlPlButton = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_BUTTON');

    const siteUrlsButton: SiteUrl[] = [
      { label: 'Basic', url: urlPlButton, fragment: 'Basic' },
      { label: 'Like a Bootstrap', url: urlPlButton, fragment: 'Bootstrap' },
      { label: 'Like a Material-UI', url: urlPlButton, fragment: 'MaterialUI' },
    ];

    SiteMenuUtil.addItem('Palette', 'Button', { label: 'Button', siteUrls: siteUrlsButton });

    // ** Menu for "Frame". **

    UrlUtil.add('URL_FRAME', 'frame');
    const urlPlFrame = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_FRAME');

    const siteUrlsFrame: SiteUrl[] = [{ label: 'Customer', url: urlPlFrame, fragment: 'Customer' }];

    SiteMenuUtil.addItem('Palette', 'Frame', { label: 'Frame', siteUrls: siteUrlsFrame });

    // ** Menu for "Input". **

    UrlUtil.add('URL_INPUT', 'input');
    const urlPlInput = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_INPUT');

    const siteUrlsInput: SiteUrl[] = [
      { label: 'Basic', url: urlPlInput, fragment: 'Basic' },
      { label: 'Like a Bootstrap', url: urlPlInput, fragment: 'Bootstrap' },
      { label: 'Like a Material-UI', url: urlPlInput, fragment: 'MaterialUI' },
    ];

    SiteMenuUtil.addItem('Palette', 'Input', { label: 'Input', siteUrls: siteUrlsInput });

    // ** Menu for "Select". **

    UrlUtil.add('URL_SELECT', 'select');
    const urlPlSelect = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_SELECT');

    const siteUrlsSelect: SiteUrl[] = [
      { label: 'Basic', url: urlPlSelect, fragment: 'Basic' },
      { label: 'Like a Bootstrap', url: urlPlSelect, fragment: 'Bootstrap' },
      { label: 'Like a Material-UI', url: urlPlSelect, fragment: 'MaterialUI' },
    ];

    SiteMenuUtil.addItem('Palette', 'Select', { label: 'Select', siteUrls: siteUrlsSelect });

    // ** Menu for "Textarea". **

    UrlUtil.add('URL_TEXTAREA', 'textarea');
    const urlPlTextarea = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_TEXTAREA');

    const siteUrlsTextarea: SiteUrl[] = [
      { label: 'Basic', url: urlPlTextarea, fragment: 'Basic' },
      { label: 'Like a Bootstrap', url: urlPlTextarea, fragment: 'Bootstrap' },
      { label: 'Like a Material-UI', url: urlPlTextarea, fragment: 'MaterialUI' },
    ];

    SiteMenuUtil.addItem('Palette', 'Textarea', { label: 'Textarea', siteUrls: siteUrlsTextarea });

    // ** **
  }
}

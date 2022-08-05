import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-button-api',
  templateUrl: './button-api.component.html',
  styleUrls: ['./button-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonApiComponent {
  public urlButton2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON2');
  public urlFrame = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

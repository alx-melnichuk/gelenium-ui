import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { UrlComponents } from 'src/app/lm-components/constants/url-components.constants';

@Component({
  selector: 'app-button-api',
  templateUrl: './button-api.component.html',
  styleUrls: ['./button-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonApiComponent {
  public urlButton = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON');
  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME_INPUT');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

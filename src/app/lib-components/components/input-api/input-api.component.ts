import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-input-api',
  templateUrl: './input-api.component.html',
  styleUrls: ['./input-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputApiComponent {
  public urlFrame = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

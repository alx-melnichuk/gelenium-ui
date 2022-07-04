import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-textarea-api',
  templateUrl: './textarea-api.component.html',
  styleUrls: ['./textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaApiComponent {
  public urlFrame = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

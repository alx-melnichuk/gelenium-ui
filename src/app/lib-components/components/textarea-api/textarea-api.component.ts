import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlComponents } from '../../../lib-components/lib-components.constants';

@Component({
  selector: 'app-textarea-api',
  templateUrl: './textarea-api.component.html',
  styleUrls: ['./textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaApiComponent {
  public urlFrame2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');
  public urlTextarea = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_TEXTAREA');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

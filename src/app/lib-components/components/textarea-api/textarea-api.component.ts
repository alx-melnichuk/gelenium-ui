import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-textarea-api',
  templateUrl: './textarea-api.component.html',
  styleUrls: ['./textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaApiComponent {
  public urlFrame2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlTextarea = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_TEXTAREA');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

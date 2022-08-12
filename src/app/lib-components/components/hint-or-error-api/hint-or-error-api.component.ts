import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlComponents } from '../../../lib-components/lib-components.constants';

@Component({
  selector: 'app-hint-or-error-api',
  templateUrl: './hint-or-error-api.component.html',
  styleUrls: ['./hint-or-error-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintOrErrorApiComponent {
  public urlHintOrError = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_HINT_OR_ERROR');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

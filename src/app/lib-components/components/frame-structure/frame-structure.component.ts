import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-frame-structure',
  templateUrl: './frame-structure.component.html',
  styleUrls: ['./frame-structure.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameStructureComponent {
  public urlFrame2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME2');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

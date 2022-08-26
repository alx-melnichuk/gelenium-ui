import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-gd-description-about-library',
  templateUrl: './gd-description-about-library.component.html',
  styleUrls: ['./gd-description-about-library.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdDescriptionAboutLibraryComponent {
  public urlGdDescription = '/' + UrlUtil.get('URL_GUIDES') + '/' + UrlUtil.get('URL_DESCRIPTION');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

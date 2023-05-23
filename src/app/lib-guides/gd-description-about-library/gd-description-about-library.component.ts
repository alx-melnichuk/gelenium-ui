import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-gd-description-about-library',
  templateUrl: './gd-description-about-library.component.html',
  styleUrls: ['./gd-description-about-library.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdDescriptionAboutLibraryComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlGdDescription = this.baseRef + '/' + RouterConfig.get('URL_GUIDES') + '/' + RouterConfig.get('URL_GUIDES_DESCRIPTION');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

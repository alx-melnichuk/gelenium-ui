import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';

@Component({
  selector: 'app-cm-autocomplete-api',
  templateUrl: './cm-autocomplete-api.component.html',
  styleUrls: ['./cm-autocomplete-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteApiComponent {
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmAutocomplete =
    this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_AUTOCOMPLETE');

  constructor() {}
}

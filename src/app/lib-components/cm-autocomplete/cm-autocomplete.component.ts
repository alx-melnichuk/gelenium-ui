import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { RouterConfig } from '../../lib-core/config/router-config';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'ComponentsAutocomplete';

@Component({
  selector: 'app-cm-autocomplete',
  templateUrl: './cm-autocomplete.component.html',
  styleUrls: ['./cm-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteComponent implements AfterViewInit {
  public showNum = '';

  // public urlPlButton = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_BUTTON');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
  }

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
    // The zone will become stable when all components have fully rendered.
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.timeEnd(logLabel);
    });
  }
}

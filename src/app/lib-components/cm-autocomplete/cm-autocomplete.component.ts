import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { GlnAutocompleteOpenUtil } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { CE_SITE_SCHEME_SCROLL } from '../../lib-core/constants';
import { CustomEventUtil } from '../../lib-core/custom-event.util';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'ComponentsAutocomplete';

@Component({
  selector: 'app-cm-autocomplete',
  templateUrl: './cm-autocomplete.component.html',
  styleUrls: ['./cm-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteComponent implements AfterViewInit, OnDestroy {
  public showNum = '';

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlPlSelect = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SELECT');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
    CustomEventUtil.add(CE_SITE_SCHEME_SCROLL, this.handlerEventSiteSchemeScroll);
  }

  public ngOnDestroy(): void {
    CustomEventUtil.remove(CE_SITE_SCHEME_SCROLL, this.handlerEventSiteSchemeScroll);
  }

  public handlerEventSiteSchemeScroll = (): void => {
    GlnAutocompleteOpenUtil.closeAll();
  };

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

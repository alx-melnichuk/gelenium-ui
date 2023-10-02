import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { GlnDatepickerOpenUtil } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { CE_SITE_SCHEME_SCROLL } from '../../lib-core/constants';
import { CustomEventUtil } from '../../lib-core/custom-event.util';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'ComponentsDatepicker';

@Component({
  selector: 'app-cm-datepicker',
  templateUrl: './cm-datepicker.component.html',
  styleUrls: ['./cm-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmDatepickerComponent implements AfterViewInit, OnDestroy {
  public showNum = '';
  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlCmDatepicker = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_DATEPICKER');
  // public urlPlDatepicker = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_DATEPICKER');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
    CustomEventUtil.add(CE_SITE_SCHEME_SCROLL, this.handlerEventSiteSchemeScroll);
  }

  public ngOnDestroy(): void {
    CustomEventUtil.remove(CE_SITE_SCHEME_SCROLL, this.handlerEventSiteSchemeScroll);
  }

  public handlerEventSiteSchemeScroll = (): void => {
    GlnDatepickerOpenUtil.closeAll();
  };

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
    // The zone will become stable when all components have fully rendered.
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.timeEnd(logLabel); // 800ms - 850ms
    });
  }
}
